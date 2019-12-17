!function(e){var t={};function i(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(s,n,function(t){return e[t]}.bind(null,n));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=5)}([function(e,t,i){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=i(10);t.Graph=n.Graph,t.WeightedGraph=n.WeightedGraph;const a=i(1);t.BaseGrid=a.BaseGrid,t.GridType=a.GridType,t.TileState=a.TileState;const r=s(i(12));t.HexagonGrid=r.default;const o=s(i(13));t.SquareGrid=o.default;const l=s(i(14));t.HashMap=l.default;const d=s(i(15));t.PriorityQueue=d.default;const u=s(i(16));t.Queue=u.default},function(e,t,i){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=i(11),a=s(i(4));var r,o;!function(e){e[e.Start=0]="Start",e[e.Goal=1]="Goal",e[e.Wall=2]="Wall",e[e.Weighted=3]="Weighted",e[e.Unvisited=4]="Unvisited",e[e.Visited=5]="Visited",e[e.Path=6]="Path"}(r||(r={})),t.TileState=r,function(e){e[e.Square=0]="Square",e[e.Hexagon=1]="Hexagon"}(o||(o={})),t.GridType=o;class l extends EventTarget{constructor(e,t,i){super(),this.grabbedTileState=null,this.isShiftKeyPressed=!1,this.startTile=null,this.goalTile=null,this.parent=e,this.horizontalCount=t,this.verticalCount=i,this.tiles=Array.from({length:this.horizontalCount},()=>Array.from({length:this.verticalCount})),this.parent.addEventListener("mouseup",e=>this.onMouseUp(e)),document.addEventListener("keydown",e=>this.onKeyDown(e)),document.addEventListener("keyup",e=>this.onKeyUp(e))}initStartAndGoalTiles(){const e=Math.floor(.2*this.horizontalCount),t=Math.round(this.verticalCount/2);this.startTile=this.tiles[e][t],this.goalTile=this.tiles[this.horizontalCount-e][t],this.setTileState(this.startTile,r.Start),this.setTileState(this.goalTile,r.Goal)}onTileMouseDown(e,t){e.preventDefault(),a.default.isSimulationRunning||(this.grabbedTileState=t.state,t.state!==r.Start&&t.state!==r.Goal&&this.grabbedTileState!==r.Start&&this.grabbedTileState!==r.Goal&&(this.setTileStateByGrabbedTileState(t),this.dispatchEvent(new CustomEvent("change"))))}onTileMouseOver(e){if(null!==this.grabbedTileState&&this.startTile&&this.goalTile&&e.state!==r.Start&&e.state!==r.Goal){if(this.grabbedTileState===r.Start)return this.setTileState(this.startTile,r.Unvisited),this.setTileState(e,r.Start),this.startTile=e,void this.dispatchEvent(new CustomEvent("change"));if(this.grabbedTileState===r.Goal)return this.setTileState(this.goalTile,r.Unvisited),this.setTileState(e,r.Goal),this.goalTile=e,void this.dispatchEvent(new CustomEvent("change"));this.setTileStateByGrabbedTileState(e),this.dispatchEvent(new CustomEvent("change"))}}setTileStateByGrabbedTileState(e){let t=null;if(this.isShiftKeyPressed)t=r.Weighted;else switch(this.grabbedTileState){case r.Wall:t=r.Unvisited;break;default:t=r.Wall}this.setTileState(e,t)}onMouseUp(e){this.grabbedTileState=null}onKeyDown(e){16===e.keyCode&&(this.isShiftKeyPressed=!0)}onKeyUp(e){16===e.keyCode&&(this.isShiftKeyPressed=!1)}setTileState(e,t){for(e.state=t;0!==e.htmlEl.classList.length;)e.htmlEl.classList.remove(e.htmlEl.classList[0]);let i=this.type===o.Square?"square":"hexagon";switch(t){case r.Wall:e.htmlEl.classList.add(`${i}-tile--wall`);break;case r.Weighted:e.htmlEl.classList.add(`${i}-tile--weighted`);break;case r.Visited:e.htmlEl.classList.add(`${i}-tile--visited`);break;case r.Unvisited:e.htmlEl.classList.add(`${i}-tile--unvisited`);break;case r.Start:e.htmlEl.classList.add(`${i}-tile--start`);break;case r.Goal:e.htmlEl.classList.add(`${i}-tile--goal`);break;case r.Path:e.htmlEl.classList.add(`${i}-tile--path`)}}clearWallTiles(){if(!a.default.isSimulationRunning)for(let e=0;e<this.horizontalCount;e++)for(let t=0;t<this.verticalCount;t++){const i=this.tiles[e][t];[r.Wall,r.Weighted].includes(i.state)&&this.setTileState(i,r.Unvisited)}}mapTilesToGraphNodes(){let e=[];for(let t=0;t<this.horizontalCount;t++){e[t]=[];for(let i=0;i<this.verticalCount;i++){const s=this.tiles[t][i],a=s.state===r.Wall,o=s.state===r.Weighted?n.WEIGHTED_NODE_WEIGHT:0;e[t][i]={x:s.x,y:s.y,isWall:a,weight:o}}}return e}}t.BaseGrid=l},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SQUARE_TILE_SIZE=30,t.HEXAGON_TILE_WIDTH=40},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.convertAxialToArrayIndicies=function(e,t){return{i:e+Math.floor(t/2),j:t}},t.convertArrayToAxialCoordinates=function(e,t){return{q:e-Math.floor(t/2),r:t}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(3),n=i(0);class a{static get isSimulationRunning(){return a._isSimulationRunning}static setTileStateByNodeCoordinates(e,t,i,a){let r=null;if(e instanceof n.SquareGrid)r=e.tiles[t.x][t.y];else if(e instanceof n.HexagonGrid){let{i:i,j:n}=s.convertAxialToArrayIndicies(t.x,t.y);r=e.tiles[i][n]}!r||[n.TileState.Start,n.TileState.Goal].includes(r.state)||r.state===n.TileState.Weighted&&!a||e.setTileState(r,i)}static simulateTiles(e,t,i,s,n,r=!1){a._intervalId=setInterval(()=>{const s=e.dequeue();if(!s)return clearInterval(a._intervalId),void(n&&n());this.setTileStateByNodeCoordinates(t,s,i,r)},s)}static simulate(e,t,i=100){if(a._isSimulationRunning)return;a._isSimulationRunning=!0;const s=new n.Queue(t.visited),r=new n.Queue(t.path);a.simulateTiles(s,e,n.TileState.Visited,i,()=>{a.simulateTiles(r,e,n.TileState.Path,35,()=>{a._isSimulationRunning=!1},!0)})}static showShortestPath(e,t,i=!1){this.reset(e),t.visited.forEach(t=>{this.setTileStateByNodeCoordinates(e,t,n.TileState.Visited,i)}),t.path.forEach(t=>{this.setTileStateByNodeCoordinates(e,t,n.TileState.Path,i)})}static reset(e){clearInterval(a._intervalId),a._isSimulationRunning=!1;for(let t=0;t<e.horizontalCount;t++)for(let i=0;i<e.verticalCount;i++){const s=e.tiles[t][i];[n.TileState.Start,n.TileState.Goal,n.TileState.Wall,n.TileState.Weighted].includes(s.state)||e.setTileState(s,n.TileState.Unvisited)}}}a._isSimulationRunning=!1,t.default=a},function(e,t,i){i(6),e.exports=i(7)},function(e,t,i){},function(e,t,i){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),i(8);const n=i(2),a=i(9),r=i(0),o=s(i(4)),l=document.getElementById("grid-container"),d=document.getElementById("square-grid"),u=document.getElementById("hexagon-grid"),c=document.getElementById("algorithm-selector"),h=document.getElementById("simulation-delay-selector"),f={activeGridType:r.GridType.Square,selectedAlgorithm:"dijkstra",selectedSimulationDelay:30,isVisualizerActivated:!1};let p,m,g,y,v;function T(){if(g.classList.contains("cancel"))return o.default.reset(p),o.default.reset(m),g.innerHTML="Visualize",g.className="start",void(f.isVisualizerActivated=!1);let e;switch(f.isVisualizerActivated=!0,f.activeGridType){case r.GridType.Square:(e=a.searchShortestPath(p,f.selectedAlgorithm,r.GridType.Square))&&o.default.simulate(p,e,f.selectedSimulationDelay);break;case r.GridType.Hexagon:(e=a.searchShortestPath(m,f.selectedAlgorithm,r.GridType.Hexagon))&&o.default.simulate(m,e,f.selectedSimulationDelay)}g.innerHTML="Cancel visualization",g.className="cancel"}function b(){p.clearWallTiles(),m.clearWallTiles()}function S(){let e="";switch(f.activeGridType){case r.GridType.Square:d.classList.remove("active"),u.classList.add("active"),e="Switch to <b>square</b> grid",f.activeGridType=r.GridType.Hexagon;break;case r.GridType.Hexagon:u.classList.remove("active"),d.classList.add("active"),e="Switch to <b>hexagon</b> grid",f.activeGridType=r.GridType.Square}v.innerHTML=e}function E(e){f.selectedAlgorithm=e.detail}function _(e){f.selectedSimulationDelay=+e.detail}!function(){const e=Math.floor(l.clientWidth/n.SQUARE_TILE_SIZE),t=Math.floor(l.clientHeight/n.SQUARE_TILE_SIZE);(p=new r.SquareGrid(d,e,t)).addEventListener("change",()=>{if(o.default.isSimulationRunning||!f.isVisualizerActivated)return;const e=a.searchShortestPath(p,f.selectedAlgorithm,r.GridType.Square);e&&o.default.showShortestPath(p,e)})}(),function(){const e=Math.floor(l.clientWidth/n.HEXAGON_TILE_WIDTH),t=Math.floor(l.clientHeight/n.HEXAGON_TILE_WIDTH);(m=new r.HexagonGrid(u,e,t)).addEventListener("change",()=>{if(o.default.isSimulationRunning||!f.isVisualizerActivated)return;const e=a.searchShortestPath(m,f.selectedAlgorithm,r.GridType.Hexagon);e&&o.default.showShortestPath(m,e)})}(),(g=document.getElementById("visualize-toggle-btn")).addEventListener("click",T),(y=document.getElementById("clear-walls-btn")).addEventListener("click",b),(v=document.getElementById("grid-type-toggle-btn")).addEventListener("click",S),c.addEventListener("select",E),h.addEventListener("select",_)},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class s extends HTMLElement{constructor(){super(),this.menuOptionElements=[];const e=this.getAttribute("width"),t=this.getAttribute("bg-color"),i=this.getAttribute("txt-color"),s=this.getAttribute("item-hover-bg-color"),n=this.getAttribute("item-hover-txt-color")||"#ffffff";this.shadowDom=this.attachShadow({mode:"open"}),this.shadowDom.innerHTML=`\n      <style>\n        #dropdown-menu {\n          position: relative;\n          font-family: Consolas;\n          width: ${e};\n          display: block;\n          background-color: transparent;\n          user-select: none;\n        }\n\n        .dropdown-menu__head:hover {\n          cursor: pointer;\n        }\n    \n        .dropdown-menu__head {\n          display: flex;\n          align-items: center;\n          background-color: ${t};\n        }\n\n        .dropdown-menu__body {\n          position: absolute;\n          width: 100%;\n          background-color: ${t};\n        }\n    \n        .dropdown-menu__head,\n        ::slotted(.menu-option) {\n          min-height: 3rem;\n        }\n\n        .collapse-icon {\n          height: 2rem;\n          width: 2rem;\n          position: absolute;\n          right: 1rem;\n        }\n\n        .collapse-icon.rotated {\n          transform: rotate(180deg);\n        }\n\n        .dropdown-menu__body {\n          max-height: 20rem;\n          overflow-y: scroll;\n          overflow-x: hidden;\n          margin-top: .5rem;\n        }\n    \n        .selected-text {\n          color: ${i};\n          height: 3rem;\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap;\n          padding: 1rem 0 0 1.5rem;\n        }\n    \n        .selected-text,\n        ::slotted(.menu-option) {\n          font-size: 1.5rem;\n        }\n    \n        ::slotted(.menu-option) {\n          color: ${i};\n          position: relative;\n          padding: .5rem 0 .5rem 1.5rem !important;\n          display: flex;\n          align-items: center;\n          transition: padding .1s ease-in-out, background-color .1s linear, color .1s linear;\n        }\n    \n        ::slotted(.menu-option:hover), ::slotted(.menu-option.selected) {\n          cursor: pointer;\n          padding-left: 1.8rem !important;\n          background-color: ${s};\n          color: ${n};\n        }\n    \n        .dropdown-menu__body::-webkit-scrollbar {\n          width: 0;\n        }\n    \n        .dropdown-menu__body::-webkit-scrollbar-thumb {\n          background-color: black;\n          border-left: 2.4rem solid rgba(0, 0, 0, 0);\n          background-clip: padding-box;\n        }\n    \n        .dropdown-menu__body::-webkit-scrollbar-track {\n          background-color: ${t};\n        }\n      </style>\n    \n      <div id="dropdown-menu">\n        <div class="dropdown-menu__head">\n          <div class="selected-text"></div>\n          <img class="collapse-icon" src="./assets/icon-arrow-down.svg"">\n        </div>\n        <div class="dropdown-menu__body">\n          <slot></slot>\n        </div>\n      </div>\n    `;const a=this.shadowDom.getElementById("dropdown-menu");this.headElement=a.getElementsByClassName("dropdown-menu__head")[0],this.bodyElement=a.getElementsByClassName("dropdown-menu__body")[0],this.selectedTextElement=a.getElementsByClassName("selected-text")[0],this.collapseIconElement=a.getElementsByClassName("collapse-icon")[0]}connectedCallback(){this.close(),this.setInitialValue(),this.setupEventHandlers()}setInitialValue(){const e=this.getAttribute("selected-value");if(!e)return;const t=i=>{const s=i.target;let n={};s.assignedElements().forEach(t=>{var i;const s=t.dataset.value;n[t.dataset.value]=t.textContent,s===e&&t.classList.add("selected"),null===(i=this.menuOptionElements)||void 0===i||i.push(t)}),this.selectedTextElement.textContent=n[e]||"Choose item",this.shadowDom.removeEventListener("slotchange",t)};this.shadowDom.addEventListener("slotchange",t)}setupEventHandlers(){this.headElement.addEventListener("click",()=>{"none"===this.bodyElement.style.display?this.open():this.close()}),this.bodyElement.addEventListener("click",e=>{const t=e.target;if(t&&t!==e.currentTarget){const e=t.dataset.value;this.selectedTextElement.textContent=t.textContent,this.menuOptionElements.forEach(t=>{t.classList.remove("selected"),t.dataset.value===e&&t.classList.add("selected")}),this.dispatchEvent(new CustomEvent("select",{detail:e}))}this.close()})}open(){this.bodyElement.style.display="block",this.collapseIconElement.classList.add("rotated")}close(){this.bodyElement.style.display="none",this.collapseIconElement.classList.remove("rotated")}}customElements.define("drop-down",s),t.default=s},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(0),n=i(17),a=i(18);t.searchShortestPath=function(e,t,i){const r={x:e.startTile.x,y:e.startTile.y,isWall:!1,weight:0},o={x:e.goalTile.x,y:e.goalTile.y,isWall:!1,weight:0};return function(e,t,i,s,n){switch(e){case"bfs":return a.breadthFirstSearch(t,i,s);case"gbfs":return a.greedyBestFirstSearch(t,i,s,n);case"dijkstra":return a.dijkstraAlgorithm(t,i,s);case"astar":return a.aStarSearch(t,i,s,n)}}(t,new s.WeightedGraph(e),r,o,i===s.GridType.Square?n.squareGridHeuristic:n.hexagonGridHeuristic)}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(3),n=i(1);class a{constructor(e){this.nodes=e.mapTilesToGraphNodes(),this.width=e.horizontalCount,this.height=e.verticalCount,this.gridType=e.type}squareGridNeighbors(e){let t=[];return this.isInBounds(e.x+1,e.y)&&t.push(this.nodes[e.x+1][e.y]),this.isInBounds(e.x-1,e.y)&&t.push(this.nodes[e.x-1][e.y]),this.isInBounds(e.x,e.y+1)&&t.push(this.nodes[e.x][e.y+1]),this.isInBounds(e.x,e.y-1)&&t.push(this.nodes[e.x][e.y-1]),t=t.filter(e=>!e.isWall)}hexagonGridNeighbors(e){let t=[];return[[1,0],[1,-1],[0,-1],[-1,0],[-1,1],[0,1]].forEach(i=>{const n=e.x+i[0],a=e.y+i[1];let{i:r,j:o}=s.convertAxialToArrayIndicies(n,a);this.isInBounds(r,o)&&t.push(this.nodes[r][o])}),t=t.filter(e=>!e.isWall)}neighbors(e){switch(this.gridType){case n.GridType.Square:return this.squareGridNeighbors(e);case n.GridType.Hexagon:return this.hexagonGridNeighbors(e)}}isInBounds(e,t){switch(this.gridType){case n.GridType.Square:case n.GridType.Hexagon:return e>=0&&e<this.width&&t>=0&&t<this.height}}areEqual(e,t){return e.x===t.x&&e.y===t.y}}t.Graph=a;t.WeightedGraph=class extends a{cost(e,t){return 1+e.weight+t.weight}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.WEIGHTED_NODE_WEIGHT=.4},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(2),n=i(3),a=i(1);class r extends a.BaseGrid{constructor(e,t,i){super(e,t,i),this.type=a.GridType.Hexagon,this.createGrid(),this.initStartAndGoalTiles()}createGrid(){const e=.57*s.HEXAGON_TILE_WIDTH,t=(t,i)=>{let s=[];for(let n=0;n<2*Math.PI;n+=Math.PI/3){let a,r;a=t+e*Math.sin(n),r=i+e*Math.cos(n),s.push(a+","+r)}return s.join(" ")};for(let i=0;i<this.verticalCount;i++)for(let s=0;s<this.horizontalCount;s++){const r=Math.sqrt(3)*e/2;let o=e+r*s*2,l=e+r*i*Math.sqrt(3);i%2!=0&&(o+=r);let{q:d,r:u}=n.convertArrayToAxialCoordinates(s,i);const c=document.createElementNS("http://www.w3.org/2000/svg","polygon"),h={x:d,y:u,state:a.TileState.Unvisited,htmlEl:c};c.setAttribute("points",t(o,l)),c.style.transformOrigin=`${o}px ${l}px`,c.classList.add("hexagon-tile--unvisited"),this.tiles[s][i]=h,c.addEventListener("mousedown",e=>this.onTileMouseDown(e,h)),c.addEventListener("mouseover",()=>this.onTileMouseOver(h)),this.parent.appendChild(c)}}}t.default=r},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(2),n=i(1);class a extends n.BaseGrid{constructor(e,t,i){super(e,t,i),this.type=n.GridType.Square,this.createGrid(),this.initStartAndGoalTiles()}createGrid(){for(let e=0;e<this.verticalCount;e++){const t=document.createElement("tr");for(let i=0;i<this.horizontalCount;i++){const a=document.createElement("td"),r={x:i,y:e,state:n.TileState.Unvisited,htmlEl:a};a.style.width=`${s.SQUARE_TILE_SIZE.toString()}px`,a.style.height=`${s.SQUARE_TILE_SIZE.toString()}px`,a.classList.add("square-tile--unvisited"),this.tiles[i][e]=r,a.addEventListener("mousedown",e=>this.onTileMouseDown(e,r)),a.addEventListener("mouseover",()=>this.onTileMouseOver(r)),t.appendChild(a)}this.parent.appendChild(t)}}}t.default=a},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(){this.items={}}getIndex(e){return JSON.stringify(e)}set(e,t){if(!e)throw"HashMap: set(key) - invalid key";const i=this.getIndex(e);this.items[i]=t}get(e){if(!e)throw"HashMap: get(key) - invalid key";const t=this.getIndex(e);return this.items[t]}contains(e){if(!e)throw"HashMap: contains(key) - invalid key";const t=this.getIndex(e);return!!this.items[t]}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(){this.elements=[]}isEmpty(){return 0===this.elements.length}enqueue(e,t){this.elements.push({item:e,priority:t})}dequeue(){if(0===this.elements.length)return null;let e=0;for(let t=0;t<this.elements.length;t++)this.elements[t].priority<this.elements[e].priority&&(e=t);let t=this.elements[e].item;return e>-1&&this.elements.splice(e,1),t}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e=[]){this.elements=e}isEmpty(){return 0===this.elements.length}enqueue(e){this.elements.push(e)}dequeue(){if(0===this.elements.length)return null;let e=this.elements[0];return this.elements.splice(0,1),e}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.squareGridHeuristic=function(e,t){return Math.abs(e.x-t.x)+Math.abs(e.y-t.y)},t.hexagonGridHeuristic=function(e,t){return(Math.abs(e.x-t.x)+Math.abs(e.x+e.y-t.x-t.y)+Math.abs(e.y-t.y))/2}},function(e,t,i){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=s(i(19));t.breadthFirstSearch=n.default;const a=s(i(20));t.dijkstraAlgorithm=a.default;const r=s(i(21));t.greedyBestFirstSearch=r.default;const o=s(i(22));t.aStarSearch=o.default},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(0);t.default=function(e,t,i){let n=new s.Queue,a=new s.HashMap,r=[],o=[];for(n.enqueue(t),a.set(t,null);!n.isEmpty();){const t=n.dequeue();if(r.push(t),e.areEqual(t,i))break;e.neighbors(t).forEach(e=>{a.contains(e)||(a.set(e,t),n.enqueue(e))})}let l=i;for(;!e.areEqual(l,t);)o.push(l),l=a.get(l);return o.reverse(),{path:o,visited:r}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(0);t.default=function(e,t,i){let n=new s.PriorityQueue,a=new s.HashMap,r=new s.HashMap,o=[],l=[];for(n.enqueue(t,0),a.set(t,null),r.set(t,0);!n.isEmpty();){const t=n.dequeue();if(o.push(t),e.areEqual(t,i))break;e.neighbors(t).forEach(i=>{const s=r.get(t)+e.cost(t,i);if(!r.contains(i)||s<r.get(i)){r.set(i,s),a.set(i,t);const e=s;n.enqueue(i,e)}})}let d=i;for(;!e.areEqual(d,t);)l.push(d),d=a.get(d);return l.reverse(),{path:l,visited:o}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(0);t.default=function(e,t,i,n){let a=new s.PriorityQueue,r=new s.HashMap,o=[],l=[];for(a.enqueue(t,0),r.set(t,null);!a.isEmpty();){const t=a.dequeue();if(o.push(t),e.areEqual(t,i))break;e.neighbors(t).forEach(e=>{if(r.contains(e))return;r.set(e,t);const s=n(e,i);a.enqueue(e,s)})}let d=i;for(;!e.areEqual(d,t);)l.push(d),d=r.get(d);return l.reverse(),{path:l,visited:o}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(0);t.default=function(e,t,i,n){let a=new s.PriorityQueue,r=new s.HashMap,o=new s.HashMap,l=[],d=[];for(a.enqueue(t,0),r.set(t,null),o.set(t,0);!a.isEmpty();){const t=a.dequeue();if(l.push(t),e.areEqual(t,i))break;e.neighbors(t).forEach(s=>{const l=o.get(t)+e.cost(t,s);if(!o.contains(s)||l<o.get(s)){o.set(s,l),r.set(s,t);const e=l+n(s,i);a.enqueue(s,e)}})}let u=i;for(;!e.areEqual(u,t);)d.push(u),u=r.get(u);return d.reverse(),{path:d,visited:l}}}]);