(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{100:function(e,n,l){"use strict";l.d(n,"a",function(){return m});var t=l(3),a=l(4),c=l(6),r=l(5),o=l(7),s=l(0),u=l.n(s),m=(l(101),function(e){function n(){var e,l;Object(t.a)(this,n);for(var a=arguments.length,o=new Array(a),s=0;s<a;s++)o[s]=arguments[s];return(l=Object(c.a)(this,(e=Object(r.a)(n)).call.apply(e,[this].concat(o)))).clickPosBtn=function(e){var n=document.getElementById(e);window.scrollTo({top:n.offsetTop-10,left:0,behavior:"smooth"})},l}return Object(o.a)(n,e),Object(a.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return u.a.createElement("div",{className:"headerLink"},u.a.createElement("div",{className:"content"},u.a.createElement("div",{className:"real-content"},u.a.createElement("div",{className:"tag"},"Reading Assistance \xb7"),this.props.headerLink.map(function(n,l){return u.a.createElement("span",{className:"a"+n.level,key:l,onClick:function(){return e.clickPosBtn(n.title)}},n.title)}))))}}]),n}(u.a.Component))},101:function(e,n,l){},51:function(e,n,l){"use strict";l.r(n),l.d(n,"default",function(){return E});var t=l(3),a=l(4),c=l(6),r=l(5),o=l(7),s=l(0),u=l.n(s),m=(l(98),l(100)),E=function(e){function n(){var e;return Object(t.a)(this,n),(e=Object(c.a)(this,Object(r.a)(n).call(this))).state={headerLink:[{level:"h3",title:"\u670d\u52a1\u5668\u63a8\u9001\u6280\u672f"},{level:"h3",title:"WebSocket \u901a\u4fe1\u8fc7\u7a0b"},{level:"h3",title:"\u5b9e\u8df5"}]},e}return Object(o.a)(n,e),Object(a.a)(n,[{key:"componentWillMount",value:function(){}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return u.a.createElement(s.Fragment,null,u.a.createElement(m.a,{headerLink:this.state.headerLink}),u.a.createElement("div",{className:"article"},u.a.createElement("div",{className:"title-content"},u.a.createElement("h1",{className:"title"},"\u52a8\u624b\u5b9e\u73b0\u524d\u540e\u7aef websocket \u901a\u4fe1")),u.a.createElement("p",null,"\u6bd5\u8bbe\u505a\u7684\u662f\u4e00\u4e2a\u6821\u56ed\u7ea6\u81ea\u4e60\u5ba4\u7f51\u7ad9\uff0c\u4e3a\u4e86\u589e\u5f3a\u5176\u4e92\u52a8\u6027\uff0c\u6211\u51b3\u5b9a\u52a0\u5165\u804a\u5929\u7cfb\u7edf\u6765\u5b9e\u73b0\u5b66\u751f\u548c\u7ba1\u7406\u5458\u4e4b\u95f4\u7684\u8054\u7cfb\u3002\u63d0\u5230\u5b9e\u65f6\u804a\u5929\uff0c\u7b2c\u4e00\u65f6\u95f4\u80af\u5b9a\u8054\u60f3\u5230H5\u65b0\u52a0\u5165\u7684 WebSocket \u4e86\uff0cWebSocket \u4f5c\u4e3a\u4e00\u79cd\u901a\u4fe1\u534f\u8bae\uff0c\u5c5e\u4e8e\u670d\u52a1\u5668\u63a8\u9001\u6280\u672f\u7684\u4e00\u79cd\uff0c\u5176\u4ed6\u7684\u8fd8\u6709 \u77ed\u8f6e\u8be2\u3001\u957f\u8f6e\u8be2\u3001Server-sent Events\uff08SSE\uff09\u7b49\u3002"),u.a.createElement("h3",{id:"\u670d\u52a1\u5668\u63a8\u9001\u6280\u672f"},"\u670d\u52a1\u5668\u63a8\u9001\u6280\u672f"),u.a.createElement("ol",null,u.a.createElement("li",null,u.a.createElement("strong",null,"\u77ed\u8f6e\u8be2")," \u5c31\u662f\u9694\u6bb5\u65f6\u95f4\u8bf7\u6c42 ajax \u8bf7\u6c42\uff0c\u8fd9\u6837\u53ea\u80fd\u50bb\u74dc\u5f0f\u7684\u5faa\u73af\u4e0d\u4ec5\u4f1a\u5360\u7528\u8f83\u591a\u7684\u8d44\u6e90\u548c\u8bf7\u6c42\uff0c\u4e5f\u4e0d\u80fd\u505a\u5230\u5b9e\u65f6\u63a8\u9001\uff0c\u4f46\u662f\u517c\u5bb9\u6027\u5f88\u597d\u3002"),u.a.createElement("li",null,u.a.createElement("strong",null,"\u957f\u8f6e\u8be2")," \u5728\u77ed\u8f6e\u8be2\u7684\u57fa\u7840\u4e0a\u505a\u4e86\u5347\u7ea7\uff0c\u5728\u6ca1\u6709\u66f4\u65b0\u7684\u65f6\u5019\u4e0d\u4f1a\u518d\u8fd4\u56de\u7a7a\u54cd\u5e94\uff0c\u800c\u4e14\u628a\u8fde\u63a5\u4fdd\u6301\u5230\u6709\u66f4\u65b0\u7684\u65f6\u5019\u518d\u8fd4\u56de\u54cd\u5e94\u4fe1\u606f\u5e76\u4e14\u5173\u95ed\u8fde\u63a5\u3002\u867d\u7136\u5bf9\u6bd4\u77ed\u8f6e\u8be2\u6709\u4e86\u8fdb\u6b65\u4f46\u5f0a\u7aef\u4ecd\u7136\u662f\u5f88\u660e\u663e\u7684\u3002"),u.a.createElement("li",null,u.a.createElement("strong",null,"Server-sent Events\uff08SSE\uff09")," \u4e0e\u957f\u8f6e\u8be2\u7c7b\u4f3c\uff0c\u533a\u522b\u662f\u66f4\u65b0\u540e\u4e0d\u4f1a\u65ad\u5f00\u8fde\u63a5\uff0c\u8fd9\u6837\u670d\u52a1\u5668\u53ef\u4ee5\u7ee7\u7eed\u5355\u5411\u5411\u5ba2\u6237\u7aef\u53d1\u9001\u6d88\u606f\u3002\u7136\u9e45\uff0cIE 11 \u53ca\u4ee5\u4e0b\u7684\u7684\u6d4f\u89c8\u5668\u90fd\u4e0d\u652f\u6301\u3002"),u.a.createElement("li",null,u.a.createElement("strong",null,"WebSocket")," \u662fHTML5\u5f00\u59cb\u63d0\u4f9b\u7684\u4e00\u79cd\u6d4f\u89c8\u5668\u4e0e\u670d\u52a1\u5668\u95f4\u8fdb\u884c\u5168\u53cc\u5de5\u901a\u8baf\u7684\u7f51\u7edc\u6280\u672f\u3002\u5728WebSocket API\u4e2d\uff0c\u6d4f\u89c8\u5668\u548c\u670d\u52a1\u5668\u53ea\u9700\u8981\u8981\u505a\u4e00\u4e2a\u63e1\u624b(handshaking)\u7684\u52a8\u4f5c\uff0c\u7136\u540e\uff0c\u6d4f\u89c8\u5668\u548c\u670d\u52a1\u5668\u4e4b\u95f4\u5c31\u5f62\u6210\u4e86\u4e00\u6761\u5feb\u901f\u901a\u9053\u3002\u4e24\u8005\u4e4b\u95f4\u5c31\u76f4\u63a5\u53ef\u4ee5\u6570\u636e\u4e92\u76f8\u4f20\u9001\u3002")),u.a.createElement("blockquote",null,u.a.createElement("p",null,"\u7279\u70b9\uff1a",u.a.createElement("br",null),"1.\u5efa\u7acb\u5728TCP\u4e4b\u4e0a\uff0c\u670d\u52a1\u5668\u5bb9\u6613\u5b9e\u73b0",u.a.createElement("br",null),"2.\u826f\u597d\u517c\u5bb9\u6027\uff0c\u63e1\u624b\u91c7\u7528HTTP\u534f\u8bae\u4e0d\u5bb9\u6613\u88ab\u5c4f\u853d\uff0c\u4e14\u80fd\u901a\u8fc7\u5404\u79cd\u4ee3\u7406\u670d\u52a1\u5668",u.a.createElement("br",null),"3.\u652f\u6301\u4e8c\u8fdb\u5236\u6570\u636e\u683c\u5f0f\uff0c\u6570\u636e\u8f7b\u91cf\uff0c\u6027\u80fd\u5f00\u9500\u5c0f\uff0c\u901a\u4fe1\u9ad8\u6548",u.a.createElement("br",null),"4.\u6ca1\u6709\u540c\u6e90\u9650\u5236\uff0c\u5ba2\u6237\u7aef\u53ef\u4ee5\u4e0e\u4efb\u610f\u670d\u52a1\u5668\u8fde\u63a5\u901a\u4fe1",u.a.createElement("br",null),"5.\u65e0\u9700\u9891\u7e41\u521b\u5efa/\u9500\u6bc1 TCP \u8bf7\u6c42\uff0c\u51cf\u5c11\u7f51\u7edc\u5e26\u5bbd\u8d44\u6e90\u5360\u7528\uff0c\u8282\u7701\u670d\u52a1\u5668\u8d44\u6e90",u.a.createElement("br",null),"6.WebSocket\u7531\u4e8b\u4ef6\u9a71\u52a8\uff0c\u4e00\u65e6\u8fde\u63a5\u5efa\u7acb\uff0c\u901a\u8fc7\u76d1\u542c\u4e8b\u4ef6\u53ef\u4ee5\u5904\u7406\u5230\u6765\u7684\u6570\u636e\u548c\u6539\u53d8\u7684\u8fde\u63a5\u72b6\u6001\uff0c\u6570\u636e\u90fd\u4ee5\u5e27\u5e8f\u5217\u7684\u5f62\u5f0f\u4f20\u8f93\u3002\u670d\u52a1\u7aef\u53d1\u9001\u6570\u636e\u540e\uff0c\u6d88\u606f\u548c\u4e8b\u4ef6\u4f1a\u5f02\u6b65\u5230\u8fbe\u3002",u.a.createElement("br",null),"7.\u6ca1\u6709\u8d85\u65f6\u5904\u7406")),u.a.createElement("h3",{id:"WebSocket \u901a\u4fe1\u8fc7\u7a0b"},"WebSocket \u901a\u4fe1\u8fc7\u7a0b"),u.a.createElement("p",null,"Websocket\u533a\u522b Http \u534f\u8bae\u662f\u4e00\u4e2a\u6301\u4e45\u5316\u7684\u65b0\u534f\u8bae\uff0c\u4f46\u662f\u4e3a\u4e86\u517c\u5bb9\u73b0\u6709\u6d4f\u89c8\u5668\u7684\u63e1\u624b\u89c4\u8303\u800c\u501f\u7528\u4e86HTTP\u7684\u534f\u8bae\u6765\u5b8c\u6210\u4e00\u90e8\u5206\u63e1\u624b\u3002WebSocket\u662f\u7eaf\u4e8b\u4ef6\u9a71\u52a8\u7684\uff0c\u5e76\u9075\u5faa\u5f02\u6b65\u7f16\u7a0b\u6a21\u578b\uff0c\u53ea\u9700\u8981\u5bf9WebSocket\u5bf9\u8c61\u589e\u52a0\u56de\u8c03\u51fd\u6570\u5c31\u53ef\u4ee5\u76d1\u542c\u4e8b\u4ef6\uff0c\u4e00\u65e6\u8fde\u63a5\u5efa\u7acb\u53ef\u4ee5\u901a\u8fc7\u76d1\u542c\u4e8b\u4ef6\u589e\u52a0\u56de\u8c03\u51fd\u6570\u6765\u5904\u7406\u6570\u636e\u3002"),u.a.createElement("p",null,"\u4e3a\u4ec0\u4e48WebSocket\u8fde\u63a5\u53ef\u4ee5\u5b9e\u73b0\u5168\u53cc\u5de5\u901a\u4fe1\u800cHTTP\u8fde\u63a5\u4e0d\u884c\u5462\uff1f\u5b9e\u9645\u4e0aHTTP\u534f\u8bae\u662f\u5efa\u7acb\u5728TCP\u534f\u8bae\u4e4b\u4e0a\u7684\uff0cTCP\u534f\u8bae\u672c\u8eab\u5c31\u5b9e\u73b0\u4e86\u5168\u53cc\u5de5\u901a\u4fe1\uff0c\u4f46\u662fHTTP\u534f\u8bae\u7684\u8bf7\u6c42\uff0d\u5e94\u7b54\u673a\u5236\u9650\u5236\u4e86\u5168\u53cc\u5de5\u901a\u4fe1\u3002WebSocket\u8fde\u63a5\u5efa\u7acb\u4ee5\u540e\uff0c\u5176\u5b9e\u53ea\u662f\u7b80\u5355\u89c4\u5b9a\u4e86\u4e00\u4e0b\uff1a\u63a5\u4e0b\u6765\uff0c\u54b1\u4eec\u901a\u4fe1\u5c31\u4e0d\u4f7f\u7528HTTP\u534f\u8bae\u4e86\uff0c\u76f4\u63a5\u4e92\u76f8\u53d1\u6570\u636e\u5427\u3002"),u.a.createElement("p",null,"\u5f53Web\u5e94\u7528\u7a0b\u5e8f\u8c03\u7528",u.a.createElement("code",null,"new WebSocket(url)"),"\u63a5\u53e3\u65f6\uff0c\u5ba2\u6237\u7aef\u5c31\u5f00\u59cb\u4e86\u4e0e\u5730\u5740\u4e3aurl\u7684WebServer\u5efa\u7acb\u63e1\u624b\u8fde\u63a5\u7684\u8fc7\u7a0b\u3002",u.a.createElement("br",null),"1. \u5ba2\u6237\u7aef\u4e0e\u670d\u52a1\u5668\u901a\u8fc7TCP\u4e09\u6b21\u63e1\u624b\u5efa\u7acb\u8fde\u63a5\uff0c\u5982\u679c\u8fde\u63a5\u5931\u8d25\uff0c\u5ba2\u6237\u7aef\u4f1a\u6536\u5230\u62a5\u9519\u4fe1\u606f\u3002",u.a.createElement("br",null),"2. TCP\u5efa\u7acb\u8fde\u63a5\u540e\uff0c\u5ba2\u6237\u7aef\u901a\u8fc7HTTP\u534f\u8bae\u4f20\u9001WebSocket\u652f\u6301\u7684\u7248\u672c\u53f7\u3001\u534f\u8bae\u7684\u5b57\u7248\u672c\u53f7\u3001\u539f\u59cb\u5730\u5740\u3001\u4e3b\u673a\u5730\u5740\u7b49\u7b49\u4e00\u4e9b\u5217\u5b57\u6bb5\u7ed9\u670d\u52a1\u5668\u7aef\u3002"),u.a.createElement("pre",null,u.a.createElement("code",null,u.a.createElement("span",null),u.a.createElement("span",null,"    GET ws://localhost:3000/ws/chat HTTP/1.1"),u.a.createElement("span",null,"    Host: server.example.com"),u.a.createElement("span",null,"    Upgrade: websocket"),u.a.createElement("span",null,"    Connection: Upgrade"),u.a.createElement("span",null,"    Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw=="),u.a.createElement("span",null,"    Sec-WebSocket-Protocol: chat, superchat"),u.a.createElement("span",null,"    Sec-WebSocket-Version: 13"),u.a.createElement("span",null,"    Origin: http://example.com"),u.a.createElement("span",null,"    "))),u.a.createElement("blockquote",null,u.a.createElement("p",null,u.a.createElement("strong",null,"\u8bf7\u6c42\u62a5\u6587"),u.a.createElement("br",null),"    ",u.a.createElement("code",null,"GET")," \u8bf7\u6c42\u7684\u5730\u5740\u4e0d\u662f\u7c7b\u4f3c",u.a.createElement("code",null,"/path/"),"\u683c\u5f0f\uff0c\u800c\u662f\u4ee5",u.a.createElement("code",null,"ws:"),"\u5f00\u5934\u7684",u.a.createElement("br",null),"    ",u.a.createElement("code",null,"Connection: Upgrade")," \u6d4f\u89c8\u5668\u901a\u77e5\u670d\u52a1\u5668\uff0c\u5982\u679c\u53ef\u4ee5\uff0c\u5c31\u5347\u7ea7\u5230webSocket\u534f\u8bae",u.a.createElement("br",null),"    ",u.a.createElement("code",null,"Origin")," \u7528\u4e8e\u9a8c\u8bc1\u6d4f\u89c8\u5668\u57df\u540d\u662f\u5426\u5728\u670d\u52a1\u5668\u8bb8\u53ef\u7684\u8303\u56f4\u5185",u.a.createElement("br",null),"    ",u.a.createElement("code",null,"Sec-WebSocket-Key")," \u63e1\u624b\u65f6\u6240\u9700\u8981\u7684\u5bc6\u94a5",u.a.createElement("br",null),"    ",u.a.createElement("code",null,"Sec-WebSocket-Protocol")," \u662f\u4e00\u4e2a\u7528\u6237\u5b9a\u4e49\u7684\u5b57\u7b26\u4e32\uff0c\u7528\u6765\u533a\u5206\u540cURL\u4e0b\uff0c\u4e0d\u540c\u7684\u670d\u52a1\u6240\u9700\u8981\u7684\u534f\u8bae\u3002",u.a.createElement("br",null),"    ",u.a.createElement("code",null,"Sec-WebSocket-Version")," \u534f\u8bae\u7248\u672c")),u.a.createElement("ol",null,u.a.createElement("li",null,"\u670d\u52a1\u5668\u6536\u5230\u5ba2\u6237\u7aef\u53d1\u9001\u7684\u63e1\u624b\u8bf7\u6c42\u4fe1\u606f\uff0c\u5982\u679c\u6570\u636e\u6b63\u786e\u5339\u914d\u5219\u63a5\u53d7\u6b64\u6b21\u63e1\u624b\u8fde\u63a5\uff0c\u5e76\u901a\u8fc7HTTP\u534f\u8bae\u4f20\u9001\u56de\u590d\u6570\u636e\u5305\u3002")),u.a.createElement("pre",null,u.a.createElement("code",null,u.a.createElement("span",null),u.a.createElement("span",null,"    HTTP/1.1 101 Switching Protocols"),u.a.createElement("span",null,"    Upgrade: websocket"),u.a.createElement("span",null,"    Connection: Upgrade"),u.a.createElement("span",null,"    Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk="),u.a.createElement("span",null,"    Sec-WebSocket-Protocol: chat"),u.a.createElement("span",null,"    Sec-WebSocket-Origin: null"),u.a.createElement("span",null,"    Sec-WebSocket-Location: ws://example.com/"),u.a.createElement("span",null,"    "))),u.a.createElement("blockquote",null,u.a.createElement("p",null,u.a.createElement("strong",null,"\u56de\u590d\u62a5\u6587"),u.a.createElement("br",null),"\u8be5\u54cd\u5e94\u4ee3\u7801",u.a.createElement("code",null,"101"),"\u8868\u793a\u672c\u6b21\u8fde\u63a5\u7684HTTP\u534f\u8bae\u5373\u5c06\u88ab\u66f4\u6539\uff0c\u66f4\u6539\u540e\u7684\u534f\u8bae\u5c31\u662f",u.a.createElement("code",null,"Upgrade: websocket"),"\u6307\u5b9a\u7684WebSocket\u534f\u8bae\u3002",u.a.createElement("br",null),u.a.createElement("code",null,"Connection: Upgrade")," \u901a\u77e5\u6d4f\u89c8\u5668\u5df2\u7ecf\u5207\u6362\u534f\u8bae",u.a.createElement("br",null),u.a.createElement("code",null,"Sec-WebSocket-Accept")," \u7ecf\u8fc7\u670d\u52a1\u5668\u786e\u8ba4\u5e76\u4e14\u52a0\u5bc6\u8fc7\u540e\u7684\u5bc6\u94a5",u.a.createElement("br",null),u.a.createElement("code",null,"Sec-WebSocket-Location")," \u8fdb\u884cwebscoket\u901a\u4fe1\u7684\u7f51\u5740",u.a.createElement("br",null),u.a.createElement("code",null,"Sec-WebSocket-Protocol")," \u4f7f\u7528\u7684\u534f\u8bae\u7248\u672c")),u.a.createElement("ol",null,u.a.createElement("li",null,"\u5ba2\u6237\u7aef\u6536\u5230\u670d\u52a1\u7aef\u56de\u590d\u7684\u6570\u636e\u5305\u540e\uff0c\u5982\u679c\u5185\u5bb9\u3001\u683c\u5f0f\u90fd\u6ca1\u95ee\u9898\uff0c\u5c31\u8868\u793a\u6b64\u6b21\u8fde\u63a5\u6210\u529f\uff0c\u89e6\u53d1",u.a.createElement("code",null,"onopen"),"\u4e8b\u4ef6\uff0c\u6b64\u65f6\u5ba2\u6237\u7aef\u5c31\u53ef\u4ee5\u901a\u8fc7 ",u.a.createElement("code",null,"send()")," \u6765\u5411\u670d\u52a1\u5668\u53d1\u9001\u6570\u636e\u4e86\uff0c\u540c\u65f6\u5982\u679c\u8fc7\u7a0b\u51fa\u9519\u53ef\u4ee5\u901a\u8fc7 ",u.a.createElement("code",null,"onerror"),"\u83b7\u53d6\u62a5\u9519\u4fe1\u606f\u3002")),u.a.createElement("p",null,"\u5ba2\u6237\u7aef\u53d1\u8d77\u4e00\u4e2a WebSocket\u8fde\u63a5 \u793a\u4f8b\uff1a"),u.a.createElement("pre",null,u.a.createElement("code",null,u.a.createElement("span",null),u.a.createElement("span",null,"// \u521b\u5efa\u4e00\u4e2a WebSocket \u8fde\u63a5"),u.a.createElement("span",null,"const socket = new WebSocket('ws://localhost:8080');"),u.a.createElement("span",null),u.a.createElement("span",null,"// \u8fde\u63a5\u5efa\u7acb\u56de\u8c03\u4e8b\u4ef6"),u.a.createElement("span",null,"socket.addEventListener('open', function (event) ","{"),u.a.createElement("span",null,"    socket.send('Hello Server!');"),u.a.createElement("span",null,"});"),u.a.createElement("span",null),u.a.createElement("span",null,"// \u63a5\u53d7\u670d\u52a1\u5668\u4f20\u56de\u7684\u6570\u636e"),u.a.createElement("span",null,"socket.addEventListener('message', function (event) ","{"),u.a.createElement("span",null,"    console.log('Message from server ', event.data);"),u.a.createElement("span",null,"});"),u.a.createElement("span",null))),u.a.createElement("h3",{id:"\u5b9e\u8df5"},"\u5b9e\u8df5"),u.a.createElement("p",null,"\u9996\u5148\u6211\u4eec\u5728\u670d\u52a1\u5668\u521b\u5efa WebSocket\uff0cnodejs\u672c\u8eab\u662f\u4e0d\u652f\u6301WebSocket\u534f\u8bae\u7684\uff0c\u6240\u4ee5\u8fd9\u91cc\u6211\u4eec\u901a\u8fc7 ",u.a.createElement("code",null,"npm install ws")," \u6307\u4ee4\u5f15\u5165 ",u.a.createElement("code",null,"ws\u6a21\u5757"),"\u6765\u5b9e\u73b0\uff1a"),u.a.createElement("pre",null,u.a.createElement("code",null,u.a.createElement("span",null),u.a.createElement("span",null,"// \u5bfc\u5165WebSocket\u6a21\u5757:"),u.a.createElement("span",null,"const WebSocketServer = require('ws').Server;"),u.a.createElement("span",null,"// \u5b9e\u4f8b\u5316:"),u.a.createElement("span",null,"const wss = new WebSocketServer(","{"," port: 3000 });"),u.a.createElement("span",null,"// connection \u8fde\u63a5\u5efa\u7acb\u540e\u6267\u884c\u56de\u8c03"),u.a.createElement("span",null,"wss.on('connection', function (ws) ","{"),u.a.createElement("span",null,"    console.log(`[SERVER] connection()`);"),u.a.createElement("span",null,"    // message \u63a5\u53d7\u5ba2\u6237\u7aef\u53d1\u9001\u7684\u6d88\u606f"),u.a.createElement("span",null,"    ws.on('message', function (message) ","{"),u.a.createElement("span",null,"        console.log(`[SERVER] Received: $","{","message}`);"),u.a.createElement("span",null,"        // ws.send \u5411\u5ba2\u6237\u7aef\u53d1\u9001\u6d88\u606f"),u.a.createElement("span",null,"        ws.send(`ECHO: $","{","message}`, (err) => ","{"),u.a.createElement("span",null,"            if (err) ","{"),u.a.createElement("span",null,"                console.log(`[SERVER] error: $","{","err}`);"),u.a.createElement("span",null,"            }"),u.a.createElement("span",null,"        });"),u.a.createElement("span",null,"    })"),u.a.createElement("span",null,"});"),u.a.createElement("span",null))),u.a.createElement("p",null,"\u5ba2\u6237\u7aef\u914d\u7f6e WebSocket \u5982\u4e0b\uff1a"),u.a.createElement("pre",null,u.a.createElement("code",null,u.a.createElement("span",null),u.a.createElement("span",null,"// \u6253\u5f00\u4e00\u4e2aWebSocket:"),u.a.createElement("span",null,"var ws = new WebSocket('ws://localhost:3000/test');"),u.a.createElement("span",null,"// \u54cd\u5e94onmessage\u4e8b\u4ef6:"),u.a.createElement("span",null,"ws.onmessage = function(msg) ","{"," console.log(msg); };"),u.a.createElement("span",null,"// \u7ed9\u670d\u52a1\u5668\u53d1\u9001\u4e00\u4e2a\u5b57\u7b26\u4e32:"),u.a.createElement("span",null,"ws.send('Hello!');"),u.a.createElement("span",null)))))}}]),n}(u.a.Component)},98:function(e,n,l){}}]);
//# sourceMappingURL=27.7d5f8ec3.chunk.js.map