import React from "react";
import PureCanvas from "./PureCanvas.js"

class Connections extends React.Component {
  constructor(props) {
    super(props);
    this.saveContext = this.saveContext.bind(this);
  }

  saveContext(ctx) {
    this.ctx = ctx;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
  }

  componentDidUpdate() {
    const nodes = this.props.nodes;
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < nodes.length; i++) {
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
    return <PureCanvas onClick={this.handleClick} contextRef={this.saveContext} />;
  }
}

export default Connections
