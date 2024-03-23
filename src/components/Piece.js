import React from "react";

export default function Piece(props) {
  const [view, setView] = React.useState({ x: -22, y: -38, z: 0 });
  const [rotation, setRotation] = React.useState({ x: 0, y: 0, z: 0 });
  const [position, setPosition] = React.useState({ x: 0, y: 0, z: 0 });
  const [layer, setLayer] = React.useState(0);
  const [size, setSize] = React.useState(0);

  const ref = React.useRef();

  React.useEffect(() => {
    if (props?.view) setView(props.view);
    if (props?.layer) setLayer(props.layer);
    if (props?.position) setPosition(props.position);
    if (props?.move) move(props.move);
    // eslint-disable-next-line
  }, [props]);

  React.useEffect(() => {
    setSize(ref.current?.offsetWidth);
  }, [ref]);

  function move(move) {
    switch (move) {
      case "X":
        rotate("x", "CCW");
        break;
      case "X'":
        rotate("x", "CW");
        break;
      case "L":
        if (position.x === -1) rotate("x", "CCW");
        break;
      case "L'":
        if (position.x === -1) rotate("x", "CW");
        break;
      case "M":
        if (position.x === 0) rotate("x", "CCW");
        break;
      case "M'":
        if (position.x === 0) rotate("x", "CW");
        break;
      case "R":
        if (position.x === 1) rotate("x", "CW");
        break;
      case "R'":
        if (position.x === 1) rotate("x", "CCW");
        break;
      case "Y":
        rotate("y", "CW");
        break;
      case "Y'":
        rotate("y", "CCW");
        break;
      case "U":
        if (position.y === -1) rotate("y", "CW");
        break;
      case "U'":
        if (position.y === -1) rotate("y", "CCW");
        break;
      case "E":
        if (position.y === 0) rotate("y", "CCW");
        break;
      case "E'":
        if (position.y === 0) rotate("y", "CW");
        break;
      case "D":
        if (position.y === 1) rotate("y", "CCW");
        break;
      case "D'":
        if (position.y === 1) rotate("y", "CW");
        break;
      case "Z":
        rotate("z", "CCW");
        break;
      case "Z'":
        rotate("z", "CW");
        break;
      case "F":
        if (position.z === 1) rotate("z", "CCW");
        break;
      case "F'":
        if (position.z === 1) rotate("z", "CW");
        break;
      case "S":
        if (position.z === 0) rotate("z", "CCW");
        break;
      case "S'":
        if (position.z === 0) rotate("z", "CW");
        break;
      case "B":
        if (position.z === -1) rotate("z", "CW");
        break;
      case "B'":
        if (position.z === -1) rotate("z", "CCW");
        break;
      default:
        break;
    }
    props.onMove();
  }

  function rotate(axis, direction) {
    direction = direction === "CW" ? -90 : 90;
    setRotation((p) => ({ ...p, [axis]: p[axis] + direction }));
  }
  return (
    <div
      className="D3Cube"
      style={{
        zIndex: layer.toString(),
        transform:
          `rotateX(${view.x}deg) rotateY(${view.y}deg) rotateZ(${view.z}deg)` +
          ` rotateX(${rotation.x}deg)` +
          ` rotateY(${rotation.y}deg)` +
          ` rotateZ(${rotation.z}deg)` +
          ` translateX(${size * position.x}px)` +
          ` translateY(${size * position.y}px)` +
          ` translateZ(${size * position.z}px)`,
      }}
      ref={ref}
    >
      <div className="white"></div>
      <div className="orange"></div>
      <div className="green"></div>
      <div className="red"></div>
      <div className="blue"></div>
      <div className="yellow"></div>
    </div>
  );
}
