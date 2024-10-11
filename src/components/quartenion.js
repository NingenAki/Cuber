//based on https://github.com/ondras/rubik/blob/master/js/quaternion.js

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

export const fromRotation = (axis, angle) => {
    const a = angle * DEG2RAD;

    const sin = Math.sin(a / 2);
    const cos = Math.cos(a / 2);

    return {
        x: axis[0] * sin,
        y: axis[1] * sin,
        z: axis[2] * sin,
        w: cos,
    };
};

const toObject = (x, y, z, w) => {
    return {...{x, y, z, w}}
}

export const toArray = (curr, withW = false) => {
    const { x, y, z, w } = {...curr};
    return withW ? [w || 0, x, y, z] : [x, y, z];
};

export const normalize = (curr) => {
    const { x, y, z, w } = curr;
    const norm = Math.sqrt(x * x + y * y + z * z + w * w);
    return toObject(x / norm, y / norm, z / norm, w / norm);
};

export const conjugate = (curr) => {
    const { x, y, z, w } = curr;
    return toObject(-x, -y, -z, w);
};

export const multiply = (curr, prod) => {
    const { x, y, z, w } = curr;
    return {
        x: w * prod.x + x * prod.w + y * prod.z - z * prod.y,
        y: w * prod.y + y * prod.w + z * prod.x - x * prod.z,
        z: w * prod.z + z * prod.w + x * prod.y - y * prod.x,
        w: w * prod.w - x * prod.x - y * prod.y - z * prod.z,
    };
};

export const getAngle = (curr) => {
    return RAD2DEG * 2 * Math.acos(curr.w);
};

export const getRotation = (curr) => {
    const { x, y, z } = curr;
    const angle = getAngle();
    return (
        `rotate3d(${x.toFixed(10)},` +
        `${y.toFixed(10)},` +
        `${z.toFixed(10)},` +
        `${angle.toFixed(10)}deg)`
    );
};

const round = (n, step = 90) => Math.round(n / step) * step;

export const toDegrees = curr => {
    let { x, y, z, w } = { ...curr };
    x = RAD2DEG * Math.atan2(2 * (w * x + y * z), 1 - 2 * (x * x + y * y));
    y = RAD2DEG * Math.asin(2 * (w * y - x * z));
    z = RAD2DEG * Math.atan2(2 * (w * z + x * y), 1 - 2 * (y * y + z * z));

    x = round(x);
    y = round(y);
    z = round(z);
    return { x, y, z };
};

const hamiltonProduct = (a, b) => {
    const w = a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3];
    const x = a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2];
    const y = a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1];
    const z = a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0];
    return [w, x, y, z];
};

export const getNewPosition = (rotation, currPos) => {
    const r = toArray(rotation, true);
    const p = toArray(currPos, true);
    const cR = toArray(conjugate(rotation), true);
    let [w, x, y, z] = hamiltonProduct(hamiltonProduct(r, p), cR);
    
    x = Math.round(x);
    y = Math.round(y);
    z = Math.round(z);
    return {x, y, z}
};

export const getRotations = (curr) => {
    const { x, y, z} = toDegrees(curr)
    
    /* 
    if (x < 0) x += 360;
    if (y < 0) y += 360;
    if (z < 0) z += 360; */

    return (
        `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`
    );
};
