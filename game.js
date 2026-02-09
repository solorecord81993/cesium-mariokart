import { Car } from './car.js';
import { updatePhysics } from './physics.js';

Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5NmYzOWVmYy1jYWM5LTQ4MGEtYWZjMC03MGVmYzFkYzg4ZWUiLCJpZCI6Mzg4NzA5LCJpYXQiOjE3NzA2Mjk0MTl9.MDXC-Ll9x0V6LxH10HMwMzapqTjHDrj0Dv1oANR5Ugk";

const viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.Terrain.fromWorldTerrain(),
    shouldAnimate: true
});

// OSM Buildings (ฟรี)
viewer.scene.primitives.add(Cesium.createOsmBuildings());

const lon = 100.5018;
const lat = 13.7563;

const carto = Cesium.Cartographic.fromDegrees(lon, lat);

Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, [carto]).then((updated) => {
    const height = updated[0].height;

    const startPosition = Cesium.Cartesian3.fromDegrees(lon, lat, height + 1);

    const car = new Car(viewer, startPosition);

    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(lon, lat, height + 80),
        orientation: {
            heading: 0,
            pitch: Cesium.Math.toRadians(-35),
            roll: 0
        }
    });

    viewer.clock.onTick.addEventListener((clock) => {
        updatePhysics(car, keys, viewer.scene);
        car.updateCamera(viewer);
        document.getElementById("speed").innerText = car.speed.toFixed(1);
    });
});


viewer.camera.flyTo({
    destination: startPosition,
    orientation: {
        heading: 0,
        pitch: Cesium.Math.toRadians(-30),
        roll: 0
    }
});


let keys = {};
window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

viewer.clock.onTick.addEventListener((clock) => {
    updatePhysics(car, keys, viewer.scene);
    car.updateCamera(viewer);
    document.getElementById("speed").innerText = car.speed.toFixed(1);
});
