import React from "react";
import { Checkbox } from "semantic-ui-react";
import MoveButton from "./MoveButton";
import Piece from "./Piece";
import "./styles.css";
export default function Cube() {
  const [move, setMove] = React.useState("");
  const [mask, setMask] = React.useState("");
  return (
    <>
      <Checkbox
        label="corners"
        value={mask}
        onChange={() => setMask(p => (p === "corners" ? "" : "corners"))}
      />
      <div className="wrapD3Cube">
        {[...Array(26)].map((x, i) => (
          <Piece
            index={i}
            move={move}
            mask={mask}
            onMove={() => setMove(null)}
          />
        ))}
      </div>
      <MoveButton move="X" onMove={move => setMove(move)} />
      <MoveButton move="Y" onMove={move => setMove(move)} />
      <MoveButton move="Z" onMove={move => setMove(move)} />
      <br />
      <MoveButton move="L" onMove={move => setMove(move)} />
      <MoveButton move="M" onMove={move => setMove(move)} />
      <MoveButton move="R" onMove={move => setMove(move)} />
      <br />
      <MoveButton move="U" onMove={move => setMove(move)} />
      <MoveButton move="E" onMove={move => setMove(move)} />
      <MoveButton move="D" onMove={move => setMove(move)} />
      <br />
      <MoveButton move="F" onMove={move => setMove(move)} />
      <MoveButton move="S" onMove={move => setMove(move)} />
      <MoveButton move="B" onMove={move => setMove(move)} />
      <br />
    </>
  );
}
