(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{29:function(e,t,a){e.exports=a(40)},33:function(e,t,a){},34:function(e,t,a){},40:function(e,t,a){"use strict";a.r(t);var n=a(4),l=a.n(n),r=a(24),c=a.n(r),i=(a(33),a(8)),m=(a(34),a(14)),u=a(23);function s(){var e=Object(n.useRef)(),t=0;Object(u.b)((function(){var a=5*Math.sin(m.b.degToRad(t+=.01)),n=Math.sin(m.b.degToRad(5*t));e.current.rotation.set(a,a,a),e.current.scale.set(n,n,n)}));var a=Object(n.useMemo)((function(){return[new m.d(1,10,10),new m.c({color:new m.a("#eeeeee")}),new Array(2e3).fill().map((function(e){return[800*Math.random()-400,800*Math.random()-400,800*Math.random()-400]}))]}),[]),r=Object(i.a)(a,3),c=r[0],s=r[1],o=r[2];return l.a.createElement("group",{ref:e},o.map((function(e,t){var a=Object(i.a)(e,3),n=a[0],r=a[1],m=a[2];return l.a.createElement("mesh",{key:t,geometry:c,material:s,position:[n,r,m]})})))}function o(){return l.a.createElement(u.a,null,l.a.createElement("ambientLight",{color:"lightblue"}),l.a.createElement("pointLight",{color:"white",intensity:1,position:[10,10,10]}),l.a.createElement(s,null))}function E(e){var t=Object(n.useState)(!0),a=Object(i.a)(t,2),l=a[0],r=a[1];return setTimeout((function(){r(!1)}),e.duration),l?"":e.children}function d(e){var t=e.children.split(""),a=Object(n.useState)(""),r=Object(i.a)(a,2),c=r[0],m=r[1],u=Object(n.useRef)(c);return Object(n.useEffect)((function(){u.current=c}),[c]),Object(n.useEffect)((function(){var e=0,a=setInterval((function(){m(u.current+t[e]),++e>t.length-1&&clearInterval(a)}),40)}),[]),l.a.createElement("span",null,c)}var f=function(){return l.a.createElement("div",{className:"app"},l.a.createElement("div",{className:"detail"},l.a.createElement("h1",{className:"detail__heading"},l.a.createElement(E,{duration:2500},l.a.createElement(d,null,"Kikuchi Tetsuro"))),l.a.createElement("p",{className:"detail__text"},l.a.createElement(E,{duration:2900},l.a.createElement(d,null,"Front-end Development"),l.a.createElement("br",null)),l.a.createElement(E,{duration:3300},l.a.createElement(d,null,"Web Design"),l.a.createElement("br",null)),l.a.createElement(E,{duration:3700},l.a.createElement("a",{href:"https://github.com/kikuchi5555",target:"_blank",rel:"noopener noreferrer"},l.a.createElement(d,null,"GitHub \u2192"))))),l.a.createElement("div",{className:"skill"},l.a.createElement("ul",{className:"skill__list"},l.a.createElement(E,{duration:3e3},l.a.createElement("li",{className:"skill__item"},l.a.createElement(d,null,"CSS(Sass/SCSS/Stylus)"))),l.a.createElement(E,{duration:3400},l.a.createElement("li",{className:"skill__item"},l.a.createElement(d,null,"JavaScript(ES6 or later)"))),l.a.createElement(E,{duration:3800},l.a.createElement("li",{className:"skill__item"},l.a.createElement(d,null,"jQuery"))),l.a.createElement(E,{duration:4e3},l.a.createElement("li",{className:"skill__item"},l.a.createElement(d,null,"TypeScript"))),l.a.createElement(E,{duration:4200},l.a.createElement("li",{className:"skill__item"},l.a.createElement(d,null,"Vue.js"))),l.a.createElement(E,{duration:4400},l.a.createElement("li",{className:"skill__item"},l.a.createElement(d,null,"React"))),l.a.createElement(E,{duration:4600},l.a.createElement("li",{className:"skill__item"},l.a.createElement(d,null,"Angular.js"))),l.a.createElement(E,{duration:4800},l.a.createElement("li",{className:"skill__item"},l.a.createElement(d,null,"Ruby on Rails"))))),l.a.createElement(o,null))};c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(f,null)),document.getElementById("root"))}},[[29,1,2]]]);
//# sourceMappingURL=main.3a3b9f06.chunk.js.map