/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import PIECE_VALUES from "components/config/3x3x3";
import { fromRotation, getRotations, multiply, getNewPosition, toArray } from "./quartenion";

export default function Piece({ index, move, onMove, filter, view }) {
  const initPos = PIECE_VALUES[index].position;
  const [position, setPosition] = React.useState({...initPos});
  const [rotation, setRotation] = React.useState();
  const [layer, setLayer] = React.useState("0");
  const [mask, setMask] = React.useState();
  const [size, setSize] = React.useState(0);

  const ref = React.useRef();

  React.useEffect(() => {
    setRotation(fromRotation(toArray(position), 0))
    handleMask();
    changeLayer();
  }, [index]);

  React.useEffect(() => {
    handleMask();
  }, [filter]);

  React.useEffect(() => {
    if (move) handleMove(move);
  }, [move]);

  React.useEffect(() => {
    changeLayer();
    handleMask();
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

  function handleMask() {
    switch (filter) {
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
        else setMask(PIECE_VALUES[index].mask);
        break;
      default:
        setMask(PIECE_VALUES[index].mask);
        break;
    }
  }

  function handleMove(move) {
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
    onMove();
  }

  function rotate(axis, direction) {
    direction = direction === "CW" ? 1 : -1;
    const axisVectors = {
      x: [1, 0, 0],
      y: [0, 1, 0], //TODO: algo de errado nao esta certo
      z: [0, 0, 1]
    }
    const newRotation = multiply(rotation, fromRotation(axisVectors[axis], direction * 90))
    setRotation(newRotation);
    setPosition(getNewPosition(newRotation, initPos))
  }

  return (
    <div
      className="D3Cube"
      style={{
        zIndex: `${layer}`,
        transform:
          `rotateX(${view.x}deg) rotateY(${view.y}deg) rotateZ(${view.z}deg)` +
          `${rotation ? getRotations(rotation) : ""}` +
          ` translateX(${size * PIECE_VALUES[index].position.x}px)` +
          ` translateY(${size * PIECE_VALUES[index].position.y}px)` +
          ` translateZ(${size * PIECE_VALUES[index].position.z}px)` 
      }}
      ref={ref}
    >
      {mask?.map(color => (
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
