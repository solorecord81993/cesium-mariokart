export function updatePhysics(car, keys, scene) {
    const accel = 0.5;
    const maxSpeed = keys["shift"] ? 20 : 10;
    const turnSpeed = 0.03;

    if (keys["w"] || keys["arrowup"]) car.speed += accel;
    if (keys["s"] || keys["arrowdown"]) car.speed -= accel;

    // Friction
    car.speed *= 0.98;

    // Clamp
    car.speed = Math.max(-5, Math.min(maxSpeed, car.speed));

    let turn = 0;
    if (keys["a"] || keys["arrowleft"]) turn = -turnSpeed;
    if (keys["d"] || keys["arrowright"]) turn = turnSpeed;

    // Drift
    if (keys[" "]) turn *= 2;

    const forward = car.speed;

    // Move tentative
    const oldPos = car.position.clone();
    car.move(forward, turn);

    // Collision check with buildings
    const ray = new Cesium.Ray(car.position, Cesium.Cartesian3.UNIT_Z);
    const hit = scene.pickFromRay(ray);

    if (hit) {
        // ชนตึก → เด้งออก
        car.position = oldPos;
        car.speed *= -0.3;
        car.entity.position = car.position;
    }
}
