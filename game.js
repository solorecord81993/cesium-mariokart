import { Car } from './car.js';
import { updatePhysics } from './physics.js';

Cesium.Ion.defaultAccessToken = "PUT_YOUR_TOKEN";

const viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.Terrain.fromWorldTerrain(),
    shouldAnimate: true
});

viewer.scene.primitives.add(Cesium.createOsmBuildings());

let keys = {};
window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

const lon = 100.5018;
const lat = 13.7563;

const carto = Cesium.Cartographic.fromDegrees(lon, lat);

Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, [carto]).then((updated) => {

    const height = updated[0].height;
    const startPosition = Cesium.Cartesian3.fromDegrees(lon, lat, height + 2);

    const car = new Car(viewer, startPosition);

    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(lon, lat, height + 80),
        orientation: {
            heading: 0,
            pitch: Cesium.Math.toRadians(-35),
            roll: 0
        }
    });

    // เกมเริ่มทำงาน "หลังจากรถถูกสร้างเท่านั้น"
    viewer.clock.onTick.addEventListener(() => {
        updatePhysics(car, keys, viewer.scene);
        car.updateCamera(viewer);
        document.getElementById("speed").innerText = car.speed.toFixed(1);
    });
});
