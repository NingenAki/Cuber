import { BrowserRouter as Router } from "react-router-dom";
import { Container, Header, Image, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./styles.css";
import Cube from "components/Cube";

export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Header className="App-header">
          <Image
            src={process.env.PUBLIC_URL + "/logo.svg"}
            className="App-logo"
            alt="logo"
            size="huge"
          />
          <h1 className="App-title">Cuber</h1>
        </Header>
        <Container>
          <Segment>
            <Cube />
          </Segment>
        </Container>
      </div>
    </Router>
  );
}
