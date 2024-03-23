import { Button } from "semantic-ui-react";

export default function MoveButton(props) {
  return (
    <Button.Group style={{ margin: "10px" }}>
      <Button icon="redo" onClick={() => props.onMove(props.move)} />
      <Button>{props.move}</Button>
      <Button icon="undo" onClick={() => props.onMove(props.move + "'")} />
    </Button.Group>
  );
}
