import { Car } from './car.js';
import { updatePhysics } from './physics.js';

Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5NmYzOWVmYy1jYWM5LTQ4MGEtYWZjMC03MGVmYzFkYzg4ZWUiLCJpZCI6Mzg4NzA5LCJpYXQiOjE3NzA2Mjk0MTl9.MDXC-Ll9x0V6LxH10HMwMzapqTjHDrj0Dv1oANR5Ugk";

const viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.Terrain.fromWorldTerrain(),
    shouldAnimate: true
});

// OSM Buildings (ฟรี)
viewer.scene.primitives.add(Cesium.createOsmBuildings());

// เมืองเริ่มต้น (กรุงเทพ)
const startPosition = Cesium.Cartesian3.fromDegrees(100.5018, 13.7563, 10);

const car = new Car(viewer, startPosition);

let keys = {};
window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

viewer.clock.onTick.addEventListener((clock) => {
    updatePhysics(car, keys, viewer.scene);
    car.updateCamera(viewer);
    document.getElementById("speed").innerText = car.speed.toFixed(1);
});
