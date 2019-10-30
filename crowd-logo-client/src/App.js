import React from "react";
import DrawableCanvas from "react-drawable-canvas";
import posed from "react-pose";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Tile, Card, Navbar, Button, Container } from "react-bulma-components";
import "./App.css";
import io from "socket.io-client";

const socket = io();
const ArtboardContainer = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: "spring", stiffness: 1000, default: { duration: 300 } }
    }
  },
  exit: {
    y: "-50%",
    opacity: 0,
    display: "none",
    transition: { duration: 150 }
  }
});

const ArtView = posed.div({
  moveUp: {
    y: "-60vh",
    opacity: 1
  },
  invisible: {
    opacity: 0
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasVisible: true,
      canvasAttrs: {
        brushColor: "#000000",
        lineWidth: 4,
        canvasStyle: {
          backgroundColor: "#FAFAFA"
        },
        clear: false
      },
      name: "",
      otherDrawings: []
    };

    this.clearCanvas = this.clearCanvas.bind(this);
    this.addDrawing = this.addDrawing.bind(this);
    this.submitDrawing = this.submitDrawing.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  componentDidMount() {
    document.body.addEventListener("touchmove", e => e.preventDefault(), {
      passive: false
    });
    socket.on("connect", function() {
      console.log("This connection is made");
    });
    socket.on("view drawing", drawing => this.addDrawing(drawing));
  }

  addDrawing(drawing) {
    var newDrawings = [drawing].concat(this.state.otherDrawings);
    this.setState({ otherDrawings: newDrawings });
    document.body.removeEventListener("touchmove", e => e.preventDefault());
  }

  toColor(colorName) {
    const newState = this.state;

    switch (colorName) {
      case "red":
        newState.canvasAttrs.brushColor = "#FF3860";
        break;

      case "blue":
        newState.canvasAttrs.brushColor = "#209CEE";
        break;

      case "green":
        newState.canvasAttrs.brushColor = "#00D1B2";
        break;

      default:
        newState.canvasAttrs.brushColor = "#FFFFFF";
        break;
    }
    newState.canvasAttrs.clear = false;
    this.setState({ newState });
    // Actually change the state
  }

  clearCanvas() {
    const newState = this.state;
    newState.canvasAttrs.clear = true;
    this.setState({ newState });
  }

  submitDrawing() {
    const img = document.querySelector("canvas").toDataURL("image/png");
    const userDrawing = {
      name: this.state.name,
      img: img
    };
    socket.emit("drawing", userDrawing);
    this.setState({ canvasVisible: false });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  render() {
    return (
      <div className="App">
        <Navbar.Brand color="dark">
          <Navbar.Item position="centered">
            <strong>GroupDraw</strong> | Made for COGS 123
          </Navbar.Item>
        </Navbar.Brand>
        <ArtboardContainer
          pose={this.state.canvasVisible ? "enter" : "exit"}
          id="main-canvas"
        >
          <Container>
            <Button.Group position="centered">
              <Button color="danger" onClick={() => this.toColor("red")}>
                Red
              </Button>
              <Button color="info" onClick={() => this.toColor("blue")}>
                Blue
              </Button>
              <Button color="primary" onClick={() => this.toColor("green")}>
                Green
              </Button>
              <Button color="dark" onClick={this.toColor}>
                Black
              </Button>
            </Button.Group>
          </Container>
          <Container className="canvas-container">
            <DrawableCanvas {...this.state.canvasAttrs}></DrawableCanvas>
          </Container>

          <Container>
            <div className="columns is-centered">
              <div className="column is-one-quarter has-text-centered">
                <input
                  className="input is-medium name-field"
                  placeholder="Your name"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                ></input>
              </div>
            </div>
          </Container>
          <Button.Group position="centered">
            <Button onClick={this.clearCanvas}>Clear</Button>
            <Button color="dark" onClick={this.submitDrawing}>
              Submit
            </Button>
          </Button.Group>
        </ArtboardContainer>

        <ArtView pose={this.state.canvasVisible ? "invisible" : "moveUp"}>
          <Tile kind="ancestor" className="drawings-container">
            {this.state.otherDrawings.map(x => (
              <Tile key={x.name} kind="child" size={3} className="drawing-tile">
                <Card>
                  <Card.Image size="1by1" src={x.img}></Card.Image>
                  <Card.Content>
                    A work of art by <strong>{x.name}</strong>
                  </Card.Content>
                </Card>
              </Tile>
            ))}
          </Tile>
        </ArtView>
      </div>
    );
  }
}

export default App;
