import React from "react";
import PureCanvas from "./PureCanvas.js"

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forceRender: true
    };
    this.saveContext = this.saveContext.bind(this);
  }

  saveContext(ctx) {
    this.ctx = ctx;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
  }

  shouldComponentUpdate(nextProps) {
    if (this.state.forceRender ||
        nextProps.forceRender ||
        nextProps.renderId !== null &&
        nextProps.renderId >= nextProps.start &&
        nextProps.renderId <= nextProps.end) {
          return true;
        }
    return false;
  }

  componentDidUpdate() {
    if (this.state.forceRender) {
      this.setState({forceRender: false});
    }
    const nodes = this.props.nodes;
    const nodeLength = nodes.length;
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i = this.props.start; i < this.props.end && i < nodeLength; i++) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 10;
      this.ctx.strokeStyle = 'Orange';
      this.ctx.fillStyle = 'Orange';
      this.ctx.arc(nodes[i].x, nodes[i].y, 50, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.restore();

      const connections = nodes[i].neighbours;
      const connectionsLength = connections.length;
      for (let j = 0; j < connectionsLength; j++) {
        if (i < connections[j]) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = 'Orange';
          this.ctx.moveTo(nodes[i].x, nodes[i].y);
          this.ctx.lineTo(nodes[connections[j]].x, nodes[connections[j]].y);
          this.ctx.lineWidth = 15;
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
    }
  }

  render() {
    return <PureCanvas contextRef={this.saveContext} />;
  }
}

export default Canvas;
