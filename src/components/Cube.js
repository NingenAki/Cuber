import React from "react";
import MoveButton from "./MoveButton";
import Piece from "./Piece";
import "./styles.css";
export default function Cube() {
  const initialPosition = [
    { x: -1, y: 1, z: -1 },
    { x: -1, y: 0, z: -1 },
    { x: -1, y: -1, z: -1 },
    { x: -1, y: 1, z: 0 },
    { x: -1, y: 0, z: 0 },
    { x: -1, y: -1, z: 0 },
    { x: 0, y: 1, z: -1 },
    { x: 0, y: 0, z: -1 },
    { x: 0, y: -1, z: -1 },
    { x: 0, y: 1, z: 0 },
    { x: 0, y: -1, z: 0 },
    { x: -1, y: 1, z: 1 },
    { x: -1, y: 0, z: 1 },
    { x: -1, y: -1, z: 1 },
    { x: 1, y: 1, z: -1 },
    { x: 1, y: 0, z: -1 },
    { x: 1, y: -1, z: -1 },
    { x: 0, y: 1, z: 1 },
    { x: 0, y: 0, z: 1 },
    { x: 0, y: -1, z: 1 },
    { x: 1, y: 1, z: 0 },
    { x: 1, y: 0, z: 0 },
    { x: 1, y: -1, z: 0 },
    { x: 1, y: 1, z: 1 },
    { x: 1, y: 0, z: 1 },
    { x: 1, y: -1, z: 1 },
  ];
  const [move, setMove] = React.useState();
  return (
    <>
      <div className="wrapD3Cube">
        {initialPosition.map((position, i) => (
          <Piece
            layer={i + 1}
            position={position}
            move={move}
            onMove={() => setMove(null)}
          />
        ))}
      </div>
      <MoveButton move="X" onMove={(move) => setMove(move)} />
      <MoveButton move="Y" onMove={(move) => setMove(move)} />
      <MoveButton move="Z" onMove={(move) => setMove(move)} />
      <br />
      <MoveButton move="L" onMove={(move) => setMove(move)} />
      <MoveButton move="M" onMove={(move) => setMove(move)} />
      <MoveButton move="R" onMove={(move) => setMove(move)} />
      <br />
      <MoveButton move="U" onMove={(move) => setMove(move)} />
      <MoveButton move="E" onMove={(move) => setMove(move)} />
      <MoveButton move="D" onMove={(move) => setMove(move)} />
      <br />
      <MoveButton move="F" onMove={(move) => setMove(move)} />
      <MoveButton move="S" onMove={(move) => setMove(move)} />
      <MoveButton move="B" onMove={(move) => setMove(move)} />
      <br />
    </>
  );
}
