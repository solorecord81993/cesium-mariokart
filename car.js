export class Car {
    constructor(viewer, position) {
        this.viewer = viewer;
        this.position = position;
        this.heading = 0;
        this.speed = 0;

        this.entity = viewer.entities.add({
            position: position,
            model: {
                uri: './assets/CesiumMilkTruck.glb',
                minimumPixelSize: 64
            }
        });
    }

    move(forward, turn) {
        this.heading += turn;

        const direction = new Cesium.Cartesian3(
            Math.cos(this.heading),
            Math.sin(this.heading),
            0
        );

        const movement = Cesium.Cartesian3.multiplyByScalar(direction, forward, new Cesium.Cartesian3());
        this.position = Cesium.Cartesian3.add(this.position, movement, new Cesium.Cartesian3());
        this.entity.position = this.position;
    }

    updateCamera(viewer) {
        const offset = new Cesium.Cartesian3(
            -30 * Math.cos(this.heading),
            -30 * Math.sin(this.heading),
            20
        );

        const camPos = Cesium.Cartesian3.add(this.position, offset, new Cesium.Cartesian3());

        viewer.camera.setView({
            destination: camPos,
            orientation: {
                heading: this.heading,
                pitch: Cesium.Math.toRadians(-20),
                roll: 0
            }
        });
    }
}
