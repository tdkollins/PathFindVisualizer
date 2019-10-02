import React from 'react';
import './App.css';
import Graph from "./Graph.js"

function App() {
  return (
    <div>
      <Graph />
    </div>
  );
}

export default App;

/*import React from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";

function App() {
  let nodeList = []
  let edgeList= []
  for (let i = 0; i < 1000; i++) {
    nodeList.push({ id: i, label: "Node " + i, title: "node " + i + " tootip text" })
    if (i >= 3) {
        edgeList.push({ from: i, to: i - 1 })
        edgeList.push({ from: i, to: i - 2 })
    }
  }
  const graph = {
    nodes: nodeList,
    edges: edgeList
  };

  const options = {
    layout: {
      hierarchical: true
    },
    edges: {
      color: "#000000"
    },
    height: "500px"
  };

  const events = {
    select: function(event) {
      var { nodes, edges } = event;
    }
  };
  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      getNetwork={network => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
      }}
    />
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App*/
