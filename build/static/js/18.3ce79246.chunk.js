(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{100:function(e,t,n){"use strict";n.d(t,"a",function(){return s});var a=n(3),l=n(4),c=n(6),r=n(5),o=n(7),u=n(0),i=n.n(u),s=(n(101),function(e){function t(){var e,n;Object(a.a)(this,t);for(var l=arguments.length,o=new Array(l),u=0;u<l;u++)o[u]=arguments[u];return(n=Object(c.a)(this,(e=Object(r.a)(t)).call.apply(e,[this].concat(o)))).clickPosBtn=function(e){var t=document.getElementById(e);window.scrollTo({top:t.offsetTop-10,left:0,behavior:"smooth"})},n}return Object(o.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"headerLink"},i.a.createElement("div",{className:"content"},i.a.createElement("div",{className:"real-content"},i.a.createElement("div",{className:"tag"},"Reading Assistance \xb7"),this.props.headerLink.map(function(t,n){return i.a.createElement("span",{className:"a"+t.level,key:n,onClick:function(){return e.clickPosBtn(t.title)}},t.title)}))))}}]),t}(i.a.Component))},101:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return m});var a=n(3),l=n(4),c=n(6),r=n(5),o=n(7),u=n(0),i=n.n(u),s=(n(98),n(100)),m=function(e){function t(){var e;return Object(a.a)(this,t),(e=Object(c.a)(this,Object(r.a)(t).call(this))).state={headerLink:[]},e}return Object(o.a)(t,e),Object(l.a)(t,[{key:"componentWillMount",value:function(){}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return i.a.createElement(u.Fragment,null,i.a.createElement(s.a,{headerLink:this.state.headerLink}),i.a.createElement("div",{className:"article"},i.a.createElement("div",{className:"title-content"},i.a.createElement("h1",{className:"title"},"\u5bf9\u4e8ecookie\u5b58\u53d6\u65b9\u6cd5\u7684\u5c01\u88c5")),i.a.createElement("p",null,"\u5e73\u65f6\u5728\u524d\u7aef\u5de5\u4f5c\u4e2d\uff0c\u53ef\u80fd\u4f1a\u7ecf\u5e38\u6d89\u53ca\u5230\u5bf9\u4e8e cookie\u7684\u8bfb\u53d6\u548c\u5b58\u50a8\uff0c\u5199\u8d77\u6765\u7ecf\u5e38\u6d6a\u8d39\u4e0d\u5fc5\u8981\u7684\u65f6\u95f4\u67e5\u5230\u60f3\u8981\u7684\u4fe1\u606f\uff0c\u6240\u4ee5\u5728\u8fd9\u91cc\uff0c\u6211\u5c01\u88c5\u4e86\u4e24\u4e2a\u7b80\u5355\u7684\u65b9\u6cd5\uff0c\u6765\u8bfb\u53d6 cookie\u3002"),i.a.createElement("ul",null,i.a.createElement("li",null,"\u83b7\u53d6cookie")),i.a.createElement("pre",null,i.a.createElement("code",null,i.a.createElement("span",null),i.a.createElement("span",null,"getCookie(name) ","{"),i.a.createElement("span",null,"    let arr = document.cookie.split('; '),arr2;"),i.a.createElement("span",null,"    for ( let i = 0; i < arr.length; i++) ","{"),i.a.createElement("span",null,"        arr2 = arr[i].split('=');"),i.a.createElement("span",null,"        if (arr2[0] == name) ","{"),i.a.createElement("span",null,"            return arr2[1];"),i.a.createElement("span",null,"        }"),i.a.createElement("span",null,"    }"),i.a.createElement("span",null,"    return;"),i.a.createElement("span",null,"}"),i.a.createElement("span",null," "))),i.a.createElement("ul",null,i.a.createElement("li",null,"\u8bbe\u7f6ecookie")),i.a.createElement("pre",null,i.a.createElement("code",null,i.a.createElement("span",null),i.a.createElement("span",null,"setCookie(name, value, iDay) ","{"),i.a.createElement("span",null,"    let oDate = new Date();"),i.a.createElement("span",null,"    oDate.setDate(oDate.getDate() + iDay);"),i.a.createElement("span",null,"    document.cookie = name + '=' + value + ';expires=' + oDate;"),i.a.createElement("span",null),i.a.createElement("span",null,"}"),i.a.createElement("span",null," ")))))}}]),t}(i.a.Component)},98:function(e,t,n){}}]);
//# sourceMappingURL=18.3ce79246.chunk.js.map