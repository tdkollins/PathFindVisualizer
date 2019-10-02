import React from "react";
import PureCanvas from "./PureCanvas.js"

class Highlight extends React.Component {
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
    this.ctx.clearRect(0, 0, this.width, this.height);
    if (this.props.hovering) {
      const hoveringId = this.props.hovering.id;
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.lineWidth = 10;
      this.ctx.strokeStyle = 'White';
      this.ctx.arc(this.props.nodes[hoveringId].x,
         this.props.nodes[hoveringId].y, 50, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.restore();
    }
    if (this.props.selection) {
      const selectionId = this.props.selection.id;
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.lineWidth = 10;
      this.ctx.strokeStyle = 'Yellow';
      this.ctx.arc(this.props.nodes[selectionId].x,
         this.props.nodes[selectionId].y, 50, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.restore();
    }
  }

  render() {
    return <PureCanvas contextRef={this.saveContext} />;
  }
}

export default Highlight
