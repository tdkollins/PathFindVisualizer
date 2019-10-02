import React from "react";

class PureCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.clientWidth = document.body.clientWidth;
    this.clientHeight = document.body.clientHeight;
  }

  shouldComponentUpdate() {
    if (document.body.clientWidth !== this.clientWidth || document.body.clientHeight !== this.clientHeight) {
      this.clientWidth = document.body.clientWidth;
      this.clientHeight = document.body.clientHeight;
      return true;
    }
    return false;
  }

  render() {
    return (
      <canvas
        width={this.clientWidth}
        height={this.clientHeight}
        ref={node =>
          node ? this.props.contextRef(node.getContext('2d')) : null
        }
      />
    );
  }
}

export default PureCanvas
