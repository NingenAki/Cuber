// https://github.com/ondras/rubik/blob/master/js/quaternion.js

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

const buildState = (x, y, z, w) => {
  return {x, y, z, w}
}

export const normalize = (state) => {
    const { x, y, z, w } = state;
    const norm = Math.sqrt(x * x + y * y + z * z + w * w);
    return buildState(x / norm, y / norm, z / norm, w / norm);
};

export const conjugate = (state) => {
    const { x, y, z, w } = state;
    return buildState(-x, -y, -z, -w);
};

export const multiply = (state, p) => {
    const { x, y, z, w } = state;
    return {
        x: w * p.x + x * p.w + y * p.z - z * p.y,
        y: w * p.y + y * p.w + z * p.x - x * p.z,
        z: w * p.z + z * p.w + x * p.y - y * p.x,
        w: w * p.w - x * p.x - y * p.y - z * p.z,
    };
};

export const getAxis = (state) => {
    const { x, y, z } = state;
    return [x, y, z];
};

export const getAngle = (state) => {
    return RAD2DEG * 2 * Math.acos(state.w);
};

export const getRotation = (state) => {
    const { x, y, z } = state;
    const angle = getAngle();
    return (
        `rotate3d(${x.toFixed(10)},` +
        `${y.toFixed(10)},` +
        `${z.toFixed(10)},` +
        `${angle.toFixed(10)}deg)`
    );
};

export const getRotations = (state) => {
    const { x, y, z, w } = state;
    let _x = RAD2DEG * Math.atan2(2 * (w * x + y * z), 1 - 2 * (x * x + y * y));
    let _y = RAD2DEG * Math.asin(2 * (w * y - x * z));
    let _z = RAD2DEG * Math.atan2(2 * (w * z + x * y), 1 - 2 * (y * y + z * z));

    if (_x < 0) _x += 360;
    if (_y < 0) _y += 360;
    if (_z < 0) _z += 360;

    return (
        `rotateX(${_x.toFixed(10)}deg) ` +
        `rotateY(${_y.toFixed(10)}deg) ` +
        `rotateZ(${_z.toFixed(10)}deg)`
    );
};
