import React from "react";
import ReactDOM from "react-dom";


import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import glue from "./images/glue.svg";
import eraser from "./images/eraser.svg";
import scissor from "./images/scissor.svg";

class App extends React.Component {
  state = {
    X: 0,
    Y: 0,
    iX: 0,
    iY: 0,
    rX: 0,
    rY: 0,
    rW: 0,
    rH: 0,
    mouseDown: false,
  };

  constructor() {
    super();
    this.state = {
      selectedOption: "",
    };
    this.radioChange = this.radioChange.bind(this);
  }

  radioChange(e) {
    this.setState({
      selectedOption: e.currentTarget.value,
    });
  }
  getMousePositionOnCanvas = (event) => {
    const rect = this.refs.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  onMouseMove = (event) => {
    const pos = this.getMousePositionOnCanvas(event);
    this.setState({
      X: pos.x,
      Y: pos.y,
      iX: this.state.iX,
      iY: this.state.iY,
      rX: Math.min(this.state.iX, pos.x),
      rY: Math.min(this.state.iY, pos.y),
      rW: this.state.iX ? Math.abs(this.state.iX - pos.x) : 0,
      rH: this.state.iY ? Math.abs(this.state.iY - pos.y) : 0,
    });

    if (this.state.mouseDown) {
      if (this.state.selectedOption === "Rectangle") {
        this.drawOutlineRectangle();
      } else if (this.state.selectedOption === "Circle") {
        this.drawCircle();
      } else if (this.state.selectedOption === "Triangle") {
        this.drawTriangle();
      }
    }
  };

  onMouseOut = (event) => {
    this.setState({ X: 0, Y: 0, iX: 0, iY: 0, rX: 0, rY: 0, rW: 0, rH: 0 });
  };

  startDraw = (event) => {
    const pos = this.getMousePositionOnCanvas(event);
    this.setState({
      X: pos.x,
      Y: pos.y,
      iX: pos.x,
      iY: pos.y,
      rX: 0,
      rY: 0,
      rW: 0,
      rH: 0,
      mouseDown: true,
    });
  };

  endDraw = (event) => {
    if (this.state.iX && this.state.iY) {
      this.setState({ mouseDown: false });

      if (this.state.selectedOption === "Rectangle") {
        this.drawRectangle();
      } else if (this.state.selectedOption === "Circle") {
        this.drawCircle();
      } else if (this.state.selectedOption === "Triangle") {
        this.drawTriangle();
      }
    }
  };

  drawRectangle = () => {
    const context = this.refs.canvas.getContext("2d");
    context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    context.beginPath();
    context.lineWidth = "4";
    context.fillStyle = "yellow";
    context.setLineDash([]);
    context.rect(this.state.rX, this.state.rY, this.state.rW, this.state.rH);
    context.fill();
  };

  drawTriangle = () => {
    const context = this.refs.canvas.getContext("2d");
    context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    context.beginPath();
    // the triangle

    context.moveTo(100, 100);
    context.lineTo(100, 300);
    context.lineTo(200, 300);
    context.closePath();

    // the outline
    context.lineWidth = 10;

    // the fill color
    context.fillStyle = "green";
    context.fill();
  };

  drawOutlineRectangle = () => {
    const context = this.refs.canvas.getContext("2d");
    context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    context.beginPath();
    context.lineWidth = "1";
    context.strokeStyle = "grey";
    context.setLineDash([5, 3]);
    context.rect(this.state.rX, this.state.rY, this.state.rW, this.state.rH);
    context.stroke();
  };

  drawCircle = () => {
    const context = this.refs.canvas.getContext("2d");
    context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    context.beginPath();
    context.lineWidth = "4";
    context.fillStyle = "orange";
    context.setLineDash([]);
    context.arc(this.state.rX, this.state.rY, 70, 0, 2 * Math.PI, false);
    context.fill();
  };

  resetCanvas = (event) => {
    this.setState({ X: 0, Y: 0, iX: 0, iY: 0, rX: 0, rY: 0, rW: 0, rH: 0 });
    const context = this.refs.canvas.getContext("2d");
    context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    context.beginPath();
  };

  drawSeparatedRectangle = () => {
    var coords = [
      [150, 50],
      [300, 50],
    ];
    const context = this.refs.canvas.getContext("2d");
    context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    context.beginPath();
    for (var i = 0; i < coords.length; i++) {
      context.lineWidth = "4";
      context.fillStyle = "yellow";
      context.setLineDash([]);
      context.rect(coords[i][0], coords[i][0], coords[i][1], coords[i][1]);
      context.fill();
    }
  };

  drawSeparatedCircles = () => {
    var coords = [
      [150, 50],
      [300, 95],
    ];
    const context = this.refs.canvas.getContext("2d");
    context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    context.beginPath();
    for (var i = 0; i < coords.length; i++) {
      context.lineWidth = "4";
      context.setLineDash([]);
      context.fillStyle = "orange";
      context.arc(coords[i][0], coords[i][1], 30, 0, Math.PI * 2, true);
      context.fill();
    }
  };

  splitShape = () => {
    if (this.state.selectedOption === "Rectangle") {
      this.drawSeparatedRectangle();
    } else if (this.state.selectedOption === "Circle") {
      this.drawSeparatedCircles();
    } else if (this.state.selectedOption === "Triangle") {
      this.drawSeparatedTriangle();
    }
  };

  drawSeparatedTriangle = () => {
    var coords = [
      [150, 50],
      [300, 50],
    ];
    var coordsLine = [
      [200, 100],
      [300, 200],
    ];
    var moveTooLine = [
      [100, 100],
      [200, 200],
    ];
    const context = this.refs.canvas.getContext("2d");
    context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    context.beginPath();
    for (var i = 0; i < coords.length; i++) {
      context.moveTo(moveTooLine[i][0], moveTooLine[i][1]);
      context.lineTo(coords[i][0], coords[i][1]);
      context.lineTo(coordsLine[i][0], coordsLine[i][0]);
      context.closePath();
      // the outline
      context.lineWidth = 10;
      // the fill color
      context.fillStyle = "green";
      context.fill();
    }
  };

  render() {
    return (
      <div class="container">
         
        <div class="radio-group">
          <input
            type="radio"
            value="Rectangle"
            checked={this.state.selectedOption === "Rectangle"}
            onChange={this.radioChange}
            class="radio-group"
          />
          Rectangle
          <input
            type="radio"
            value="Circle"
            checked={this.state.selectedOption === "Circle"}
            onChange={this.radioChange}
            class="radio-group"
          />
          Circle
          <input
            type="radio"
            value="Triangle"
            checked={this.state.selectedOption === "Triangle"}
            onChange={this.radioChange}
            class="radio-group"
          />
          Triangle
          <h3></h3>
          <div>
            <div style={{ float: "left" }}>
              <canvas
                id="reactCanvas"
                width="500"
                height="400"
                ref="canvas"
                onMouseMove={this.onMouseMove}
                onMouseDown={this.startDraw}
                onMouseUp={this.endDraw}
                onMouseOut={this.onMouseOut}
              />
            </div>
            <div>
              <div>
                <img
                  src={eraser}
                  class="imageStyle"
                  onClick={this.resetCanvas}
                />
              </div>
              <div>
                <img
                  src={scissor}
                  class="imageStyle"
                  onClick={this.splitShape}
                />
              </div>
              <div>
                <img src={glue} class="imageStyle" onClick={this.splitShape} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
