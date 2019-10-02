//This should really be split into a graph, and a graphinteraction component
import React from "react";
import Canvas from "./Canvas.js"
import Node from "./Node.js"
import Highlight from "./Highlight"

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      selection: null,
      dragOffX: 0,
      dragOffY: 0,
      dragging: false,
      renderId: null,
      clickX: null,
      clickY: null,
      forceRender: false
    };
    this.addNode = this.addNode.bind(this);
    this.renderNode = this.renderNode.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleMousedown = this.handleMousedown.bind(this);
    this.handleMouseup = this.handleMouseup.bind(this);
    this.updateAnimationState = this.updateAnimationState.bind(this);
    this.canvasElements = [];
  }

  addNode(x, y, neighbourIdList=[]) {
    const newNodeId = this.state.nodes.length;
    this.state.nodes.push(new Node(x, y, neighbourIdList, newNodeId, (Math.floor(this.state.nodes.length / 150) * 150)));
    const neighbourLength = neighbourIdList.length;
    for (let i = 0; i < neighbourLength; i++) {
      const id = neighbourIdList[i];
      this.state.nodes[id].updateNeighbours(newNodeId);
    }
    return newNodeId;
  }

  renderNode(id) {
    this.setState({renderId: id});
    this.setState({renderId: null});
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
    this.addNode(200, 200);
    this.addNode(70, 80, [0]);
    this.addNode(300, 100, [1]);
    /*for (let i = 2; i < 1000; i++) {
      this.addNode((100 * i) % 1000, (50 * i) % 1000, [i - 1, i - 2])
    }*/
    document.addEventListener('mousemove', this.handleMove);
    document.addEventListener('mousedown', this.handleMousedown);
    document.addEventListener('mouseup', this.handleMouseup);
  }

  handleMove(e) {
    const nodes = this.state.nodes;
    const nodeLength = nodes.length;
    if (this.state.dragging) {
      this.state.hovering.x = (e.x - this.state.dragOffX);
      this.state.hovering.y = (e.y - this.state.dragOffY);
      this.renderNode(this.state.hovering.id);
      const renderList = []
      renderList.push(this.state.hovering.groupId);
      for (let i = 0; i < this.state.hovering.neighbourGroups.length; i++) {
        if (!renderList.includes(this.state.hovering.neighbourGroups[i])) {
          renderList.push(this.state.hovering.neighbourGroups[i])
        }
      }
      for (let i = 0; i < renderList.length; i++) {
        this.renderNode(renderList[i])
      }
      return;
    }
    for (let i = nodeLength - 1; i >= 0; i--) {
      if (nodes[i].hover(e.x, e.y)) {
        this.setState({hovering: nodes[i]});
        return;
      }
    }
    if (this.state.hovering) {
      this.setState({hovering: null});
      return;
    }
  }

  handleMouseup(e) {
    this.setState({dragging: false});
    if (this.state.hovering != null &&
      Math.abs(((this.state.clickX - e.x) ^ 2) +
      ((this.state.clickY - e.y) ^ 2)) < (100 ^ 2))
    {
      if (this.state.selection != null) {
        const selectionId = this.state.selection.id;
        const hoveringId = this.state.hovering.id;
        if (selectionId == hoveringId) {
          this.setState({selection: null});
          return;
        }
        const nodes = this.state.nodes;
        if (!nodes[selectionId].neighbours.includes(hoveringId)) {
          nodes[selectionId].updateNeighbours(hoveringId);
          nodes[hoveringId].updateNeighbours(selectionId);
          this.setState({
            selection: null,
            forceRender: true
          });
          return;
        }
      }
      this.setState({selection: this.state.hovering});
    }
    else if (this.state.hovering == null && this.state.selection != null) {
      this.addNode(e.x, e.y, [this.state.selection.id]);
      this.setState({
        selection: null,
        forceRender: true
      });
    }
    this.setState({
      clickX: null,
      clickY: null
    });
  }

  handleMousedown(e) {
    if (this.state.clickX == null) {
      this.setState({
        clickX: e.x,
        clickY: e.y
      });
    }
    if (this.state.hovering) {
      this.setState({
        dragOffX: e.x - this.state.hovering.x,
        dragOffY: e.y - this.state.hovering.y,
        dragging: true
      });
      return;
    }
  }

  updateAnimationState() {
    this.setState(prevState => ({
      nodes: prevState.nodes
    }));
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  componentDidUpdate() {
    if (this.state.forceRender) {
      this.setState({forceRender: false});
    }
  }

  render() {
    const canvasElements = []
    for (let i = 0; i < this.state.nodes.length; i += 150) {
      canvasElements.push(<Canvas
        forceRender={this.state.forceRender}
        nodes={this.state.nodes}
        start={i}
        end={i + 149}
        renderId={this.state.renderId}
      />)
    }

    return (
      <div>
        {canvasElements}
        <Highlight
          nodes={this.state.nodes}
          hovering={this.state.hovering}
          selection={this.state.selection} />
      </div>
    );
  }
}

export default Graph;
