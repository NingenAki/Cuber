/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import PIECE_VALUES from "components/config/3x3x3";

export default function Piece(props) {
  const [view, setView] = React.useState({ x: -22, y: -38, z: 0 });
  const [position, setPosition] = React.useState({ x: 0, y: 0, z: 0 });
  const [initPos, setInitPos] = React.useState({ x: 0, y: 0, z: 0 });
  const [rotation, setRotation] = React.useState({ x: 0, y: 0, z: 0 });
  const [layer, setLayer] = React.useState("0");
  const [mask, setMask] = React.useState([
    { white: true },
    { red: true },
    { green: true },
    { blue: true },
    { orange: true },
    { yellow: true },
  ]);
  const [size, setSize] = React.useState(0);

  const ref = React.useRef();

  React.useEffect(() => {
    let initPos = PIECE_VALUES[props.index].position;
    setInitPos(initPos);
    setPosition(initPos);
    checkMask();
  }, [props?.index]);

  React.useEffect(() => {
    checkMask();
  }, [props?.mask]);

  React.useEffect(() => {
    if (props?.move) move(props.move);
  }, [props?.move]);

  React.useEffect(() => {
    if (props?.view) setView(props.view);
  }, [props?.view]);

  React.useEffect(() => {
    changeLayer();
    checkMask();
  }, [position]);

  React.useEffect(() => {
    setSize(ref.current?.offsetWidth);
  }, [ref]);

  function changeLayer() {
    let i = PIECE_VALUES.findIndex(
      p =>
        p.position.x === position.x &&
        p.position.y === position.y &&
        p.position.z === position.z
    );
    setLayer(`${i + 1}`);
  }

  function checkMask() {
    switch (props?.mask) {
      case "corners":
        if (position.x === 0 || position.y === 0 || position.z === 0)
          setMask([
            { white: false },
            { red: false },
            { green: false },
            { blue: false },
            { orange: false },
            { yellow: false },
          ]);
        else setMask(PIECE_VALUES[props?.index].mask);
        break;
      default:
        setMask(PIECE_VALUES[props?.index].mask);
        break;
    }
  }

  function move(move) {
    const negative = move.includes("'")
    const _move = move.replace("'", "");
    const moves = {
        X: { axis: "x", direction: negative ? "CW" : "CCW", filter: null },
        L: { axis: "x", direction: negative ? "CCW" : "CW", filter: -1 },
        M: { axis: "x", direction: negative ? "CCW" : "CW", filter: 0 },
        R: { axis: "x", direction: negative ? "CW" : "CCW", filter: 1 },
        Y: { axis: "y", direction: negative ? "CCW" : "CW", filter: null },
        U: { axis: "y", direction: negative ? "CCW" : "CW", filter: -1 },
        E: { axis: "y", direction: negative ? "CW" : "CCW", filter: 0 },
        D: { axis: "y", direction: negative ? "CW" : "CCW", filter: 1 },
        Z: { axis: "z", direction: negative ? "CW" : "CCW", filter: null },
        F: { axis: "z", direction: negative ? "CW" : "CCW", filter: -1 },
        S: { axis: "z", direction: negative ? "CW" : "CCW", filter: 0 },
        B: { axis: "z", direction: negative ? "CCW" : "CW", filter: 1 },
    };
    const m = moves[_move];
    if (m && (m.filter === null || position[m.axis] === m.filter))
        rotate(m.axis, m.direction);
    props.onMove();
  }

  function rotate(axis, direction) {
    direction = direction === "CW" ? 1 : -1;
    let currRotation = {
      x: initPos.x - position.x,
      y: initPos.y - position.y,
      z: initPos.z - position.z,
    };
    switch (axis) {
      case "x":
        setPosition(p => ({
          x: p.x,
          y: p.z * direction,
          z: -p.y * direction,
        }));
        setRotation(p => ({ ...p, x: p.x + 90 * direction }));
        break;
      case "y":
        setPosition(p => ({
          x: -p.z * direction,
          y: p.y,
          z: p.x * direction,
        }));
        setRotation(p => ({ ...p, y: p.y + 90 * direction }));
      case "z":
        setPosition(p => ({
          x: p.y * direction,
          y: -p.x * direction,
          z: p.z,
        }));
        setRotation(p => ({ ...p, z: p.z + 90 * direction }));
      default:
        break;
    }
  }
  return (
    <div
      className="D3Cube"
      style={{
        zIndex: `${layer}`,
        transform:
          `rotateX(${view.x}deg) rotateY(${view.y}deg) rotateZ(${view.z}deg)` +
          ` rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)` +
          ` translateX(${size * PIECE_VALUES[props.index].position.x}px)` +
          ` translateY(${size * PIECE_VALUES[props.index].position.y}px)` +
          ` translateZ(${size * PIECE_VALUES[props.index].position.z}px)`,
      }}
      ref={ref}
    >
      {mask.map(color => (
        <div
          className={
            Object.values(color)[0]
              ? Object.keys(color)[0]
              : Object.keys(color)[0] + " grey"
          }
        />
      ))}
    </div>
  );
}
