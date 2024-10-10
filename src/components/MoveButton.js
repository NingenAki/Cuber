import { Button } from "semantic-ui-react";

export default function MoveButton(props) {
  return (
    <Button.Group style={{ margin: "10px", width: "110px" }}>
      <Button content={props.move} onClick={() => props.onMove(props.move)} />
      <Button content={props.move + "'"} onClick={() => props.onMove(props.move + "'")} />
    </Button.Group>
  );
}
