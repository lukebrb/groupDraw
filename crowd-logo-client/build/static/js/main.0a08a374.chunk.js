(this["webpackJsonpcrowd-logo-frontend"]=this["webpackJsonpcrowd-logo-frontend"]||[]).push([[0],{37:function(e,t,a){e.exports=a(78)},42:function(e,t,a){},46:function(e,t,a){},75:function(e,t){},78:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(7),c=a.n(o),l=(a(42),a(30)),i=a(31),s=a(35),u=a(32),m=a(3),d=a(36),h=a(33),g=a.n(h),v=(a(45),a(1)),b=(a(46),a(34)),C=a.n(b)()("http://localhost:5000"),w=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={canvasAttrs:{brushColor:"#000000",lineWidth:4,canvasStyle:{backgroundColor:"#FAFAFA"},clear:!1},name:null,otherDrawings:[]},a.clearCanvas=a.clearCanvas.bind(Object(m.a)(a)),a.addDrawing=a.addDrawing.bind(Object(m.a)(a)),a.submitDrawing=a.submitDrawing.bind(Object(m.a)(a)),a.componentDidMount=a.componentDidMount.bind(Object(m.a)(a)),a.handleNameChange=a.handleNameChange.bind(Object(m.a)(a)),a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;C.on("connect",(function(){console.log("connection made!")})),C.on("view drawing",(function(t){return e.addDrawing(t)}))}},{key:"addDrawing",value:function(e){var t=this.state.otherDrawings.concat(e);this.setState({otherDrawings:t})}},{key:"toColor",value:function(e){var t=this.state;switch(e){case"red":t.canvasAttrs.brushColor="#FF0000";break;case"blue":t.canvasAttrs.brushColor="#0000FF";break;case"green":t.canvasAttrs.brushColor="#00FF00";break;default:t.canvasAttrs.brushColor="#FFFFFF"}t.canvasAttrs.clear=!1,this.setState({newState:t})}},{key:"clearCanvas",value:function(){var e=this.state;e.canvasAttrs.clear=!0,this.setState({newState:e})}},{key:"submitDrawing",value:function(){var e=document.querySelector("canvas").toDataURL("image/png"),t={name:this.state.name,img:e};C.emit("drawing",t)}},{key:"handleNameChange",value:function(e){this.setState({name:e.target.value})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"App"},r.a.createElement(v.Navbar.Brand,{position:"centered"},r.a.createElement(v.Navbar.Item,null,r.a.createElement("strong",null,"CrowdLogo")," | Made for COGS 123")),r.a.createElement(v.Container,null,r.a.createElement(v.Button.Group,{position:"centered"},r.a.createElement(v.Button,{color:"danger",onClick:function(){return e.toColor("red")}},"Red"),r.a.createElement(v.Button,{color:"info",onClick:function(){return e.toColor("blue")}},"Blue"),r.a.createElement(v.Button,{color:"primary",onClick:function(){return e.toColor("green")}},"Green"),r.a.createElement(v.Button,{color:"dark",onClick:this.toColor},"Black"))),r.a.createElement(v.Container,{className:"canvas-container"},r.a.createElement(g.a,this.state.canvasAttrs)),r.a.createElement(v.Container,null,r.a.createElement("div",{className:"columns is-centered"},r.a.createElement("div",{className:"column is-one-quarter has-text-centered"},r.a.createElement("input",{className:"input is-medium name-field",placeholder:"Your name",value:this.state.name,onChange:this.handleNameChange})))),r.a.createElement(v.Button.Group,{position:"centered"},r.a.createElement(v.Button,{onClick:this.clearCanvas},"Clear"),r.a.createElement(v.Button,{color:"dark",onClick:this.submitDrawing},"Submit")),r.a.createElement(v.Tile,{kind:"ancestor",className:"drawings-container"},this.state.otherDrawings.map((function(e){return r.a.createElement(v.Tile,{kind:"child",size:3,className:"drawing-tile"},r.a.createElement(v.Card,null,r.a.createElement(v.Card.Image,{size:"1by1",src:e.img}),r.a.createElement(v.Card.Content,null,"A work of art by ",r.a.createElement("strong",null,e.name))))}))))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[37,1,2]]]);
//# sourceMappingURL=main.0a08a374.chunk.js.map