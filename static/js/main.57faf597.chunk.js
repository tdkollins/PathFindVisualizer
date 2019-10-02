(window.webpackJsonpPathFindVisualizer=window.webpackJsonpPathFindVisualizer||[]).push([[0],{14:function(t,e,i){},15:function(t,e,i){},16:function(t,e,i){"use strict";i.r(e);var n=i(0),s=i.n(n),h=i(8),a=i.n(h),o=(i(14),i(15),i(2)),r=i(3),c=i(5),d=i(4),u=i(1),l=i(6),v=function(t){function e(t){var i;return Object(o.a)(this,e),(i=Object(c.a)(this,Object(d.a)(e).call(this,t))).clientWidth=document.body.clientWidth,i.clientHeight=document.body.clientHeight,i}return Object(l.a)(e,t),Object(r.a)(e,[{key:"shouldComponentUpdate",value:function(){return(document.body.clientWidth!==this.clientWidth||document.body.clientHeight!==this.clientHeight)&&(this.clientWidth=document.body.clientWidth,this.clientHeight=document.body.clientHeight,!0)}},{key:"render",value:function(){var t=this;return s.a.createElement("canvas",{width:this.clientWidth,height:this.clientHeight,ref:function(e){return e?t.props.contextRef(e.getContext("2d")):null}})}}]),e}(s.a.Component),g=function(t){function e(t){var i;return Object(o.a)(this,e),(i=Object(c.a)(this,Object(d.a)(e).call(this,t))).state={forceRender:!0},i.saveContext=i.saveContext.bind(Object(u.a)(i)),i}return Object(l.a)(e,t),Object(r.a)(e,[{key:"saveContext",value:function(t){this.ctx=t,this.width=this.ctx.canvas.width,this.height=this.ctx.canvas.height}},{key:"shouldComponentUpdate",value:function(t){return!!(this.state.forceRender||t.forceRender||null!==t.renderId&&t.renderId>=t.start&&t.renderId<=t.end)}},{key:"componentDidUpdate",value:function(){this.state.forceRender&&this.setState({forceRender:!1});var t=this.props.nodes,e=t.length;this.ctx.save(),this.ctx.clearRect(0,0,this.width,this.height);for(var i=this.props.start;i<this.props.end&&i<e;i++){this.ctx.beginPath(),this.ctx.lineWidth=10,this.ctx.strokeStyle="Orange",this.ctx.fillStyle="Orange",this.ctx.arc(t[i].x,t[i].y,50,0,2*Math.PI),this.ctx.fill(),this.ctx.stroke(),this.ctx.restore();for(var n=t[i].neighbours,s=n.length,h=0;h<s;h++)i<n[h]&&(this.ctx.beginPath(),this.ctx.strokeStyle="Orange",this.ctx.moveTo(t[i].x,t[i].y),this.ctx.lineTo(t[n[h]].x,t[n[h]].y),this.ctx.lineWidth=15,this.ctx.stroke(),this.ctx.restore())}}},{key:"render",value:function(){return s.a.createElement(v,{contextRef:this.saveContext})}}]),e}(s.a.Component),f=function(){function t(e,i,n,s,h){Object(o.a)(this,t),this.x=e,this.y=i,this.neighbours=n,this.neighbourGroups=[],this.id=s,this.groupId=h;for(var a=0;a<this.neighbours.length;a++)this.neighbourGroups.includes(150*Math.floor(this.neighbours[a]/150))||this.neighbourGroups.push(150*Math.floor(this.neighbours[a]/150))}return Object(r.a)(t,[{key:"hover",value:function(t,e){var i=Math.abs(this.x-t),n=Math.abs(this.y-e);return i*i+n*n<3500}},{key:"updateNeighbours",value:function(t){this.neighbours.includes(t)||this.neighbours.push(t)}}]),t}(),p=function(t){function e(t){var i;return Object(o.a)(this,e),(i=Object(c.a)(this,Object(d.a)(e).call(this,t))).saveContext=i.saveContext.bind(Object(u.a)(i)),i}return Object(l.a)(e,t),Object(r.a)(e,[{key:"saveContext",value:function(t){this.ctx=t,this.width=this.ctx.canvas.width,this.height=this.ctx.canvas.height}},{key:"componentDidUpdate",value:function(){if(this.ctx.clearRect(0,0,this.width,this.height),this.props.hovering){var t=this.props.hovering.id;this.ctx.save(),this.ctx.beginPath(),this.ctx.lineWidth=10,this.ctx.strokeStyle="White",this.ctx.arc(this.props.nodes[t].x,this.props.nodes[t].y,50,0,2*Math.PI),this.ctx.stroke(),this.ctx.restore()}if(this.props.selection){var e=this.props.selection.id;this.ctx.save(),this.ctx.beginPath(),this.ctx.lineWidth=10,this.ctx.strokeStyle="Yellow",this.ctx.arc(this.props.nodes[e].x,this.props.nodes[e].y,50,0,2*Math.PI),this.ctx.stroke(),this.ctx.restore()}}},{key:"render",value:function(){return s.a.createElement(v,{contextRef:this.saveContext})}}]),e}(s.a.Component),b=function(t){function e(t){var i;return Object(o.a)(this,e),(i=Object(c.a)(this,Object(d.a)(e).call(this,t))).state={nodes:[],selection:null,dragOffX:0,dragOffY:0,dragging:!1,renderId:null,clickX:null,clickY:null,forceRender:!1},i.addNode=i.addNode.bind(Object(u.a)(i)),i.renderNode=i.renderNode.bind(Object(u.a)(i)),i.handleMove=i.handleMove.bind(Object(u.a)(i)),i.handleMousedown=i.handleMousedown.bind(Object(u.a)(i)),i.handleMouseup=i.handleMouseup.bind(Object(u.a)(i)),i.updateAnimationState=i.updateAnimationState.bind(Object(u.a)(i)),i.canvasElements=[],i}return Object(l.a)(e,t),Object(r.a)(e,[{key:"addNode",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n=this.state.nodes.length;this.state.nodes.push(new f(t,e,i,n,150*Math.floor(this.state.nodes.length/150)));for(var s=i.length,h=0;h<s;h++){var a=i[h];this.state.nodes[a].updateNeighbours(n)}return n}},{key:"renderNode",value:function(t){this.setState({renderId:t}),this.setState({renderId:null})}},{key:"componentDidMount",value:function(){this.rAF=requestAnimationFrame(this.updateAnimationState),this.addNode(200,200),this.addNode(70,80,[0]),this.addNode(300,100,[1]),document.addEventListener("mousemove",this.handleMove),document.addEventListener("mousedown",this.handleMousedown),document.addEventListener("mouseup",this.handleMouseup)}},{key:"handleMove",value:function(t){var e=this.state.nodes,i=e.length;if(this.state.dragging){this.state.hovering.x=t.x-this.state.dragOffX,this.state.hovering.y=t.y-this.state.dragOffY,this.renderNode(this.state.hovering.id);var n=[];n.push(this.state.hovering.groupId);for(var s=0;s<this.state.hovering.neighbourGroups.length;s++)n.includes(this.state.hovering.neighbourGroups[s])||n.push(this.state.hovering.neighbourGroups[s]);for(var h=0;h<n.length;h++)this.renderNode(n[h])}else{for(var a=i-1;a>=0;a--)if(e[a].hover(t.x,t.y))return void this.setState({hovering:e[a]});this.state.hovering&&this.setState({hovering:null})}}},{key:"handleMouseup",value:function(t){if(this.setState({dragging:!1}),null!=this.state.hovering&&Math.abs((this.state.clickX-t.x^2)+(this.state.clickY-t.y^2))<102){if(null!=this.state.selection){var e=this.state.selection.id,i=this.state.hovering.id;if(e==i)return void this.setState({selection:null});var n=this.state.nodes;if(!n[e].neighbours.includes(i))return n[e].updateNeighbours(i),n[i].updateNeighbours(e),void this.setState({selection:null,forceRender:!0})}this.setState({selection:this.state.hovering})}else null==this.state.hovering&&null!=this.state.selection&&(this.addNode(t.x,t.y,[this.state.selection.id]),this.setState({selection:null,forceRender:!0}));this.setState({clickX:null,clickY:null})}},{key:"handleMousedown",value:function(t){null==this.state.clickX&&this.setState({clickX:t.x,clickY:t.y}),this.state.hovering&&this.setState({dragOffX:t.x-this.state.hovering.x,dragOffY:t.y-this.state.hovering.y,dragging:!0})}},{key:"updateAnimationState",value:function(){this.setState((function(t){return{nodes:t.nodes}})),this.rAF=requestAnimationFrame(this.updateAnimationState)}},{key:"componentWillUnmount",value:function(){cancelAnimationFrame(this.rAF)}},{key:"componentDidUpdate",value:function(){this.state.forceRender&&this.setState({forceRender:!1})}},{key:"render",value:function(){for(var t=[],e=0;e<this.state.nodes.length;e+=150)t.push(s.a.createElement(g,{forceRender:this.state.forceRender,nodes:this.state.nodes,start:e,end:e+149,renderId:this.state.renderId}));return s.a.createElement("div",null,t,s.a.createElement(p,{nodes:this.state.nodes,hovering:this.state.hovering,selection:this.state.selection}))}}]),e}(s.a.Component);var x=function(){return s.a.createElement("div",null,s.a.createElement(b,null))};a.a.render(s.a.createElement(x,null),document.getElementById("root"))},9:function(t,e,i){t.exports=i(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.57faf597.chunk.js.map