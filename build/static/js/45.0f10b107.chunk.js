(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{101:function(e,a,n){"use strict";n.d(a,"a",function(){return o});var t=n(3),l=n(4),r=n(6),c=n(5),s=n(7),u=n(0),m=n.n(u),o=(n(102),function(e){function a(){var e,n;Object(t.a)(this,a);for(var l=arguments.length,s=new Array(l),u=0;u<l;u++)s[u]=arguments[u];return(n=Object(r.a)(this,(e=Object(c.a)(a)).call.apply(e,[this].concat(s)))).clickPosBtn=function(e){var a=document.getElementById(e);window.scrollTo({top:a.offsetTop-10,left:0,behavior:"smooth"})},n}return Object(s.a)(a,e),Object(l.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return m.a.createElement("div",{className:"headerLink"},m.a.createElement("div",{className:"content"},m.a.createElement("div",{className:"real-content"},m.a.createElement("div",{className:"tag"},"Reading Assistance \xb7"),this.props.headerLink.map(function(a,n){return m.a.createElement("span",{className:"a"+a.level,key:n,onClick:function(){return e.clickPosBtn(a.title)}},a.title)}))))}}]),a}(m.a.Component))},102:function(e,a,n){},69:function(e,a,n){"use strict";n.r(a),n.d(a,"default",function(){return p});var t=n(3),l=n(4),r=n(6),c=n(5),s=n(7),u=n(0),m=n.n(u),o=(n(99),n(101)),p=function(e){function a(){var e;return Object(t.a)(this,a),(e=Object(r.a)(this,Object(c.a)(a).call(this))).state={headerLink:[{level:"h3",title:"AJAX"},{level:"h3",title:"$.ajax()"},{level:"h3",title:"Axios"},{level:"h3",title:"Fetch"},{level:"h3",title:"\u603b\u7ed3"}]},e}return Object(s.a)(a,e),Object(l.a)(a,[{key:"componentWillMount",value:function(){}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return m.a.createElement(u.Fragment,null,m.a.createElement(o.a,{headerLink:this.state.headerLink}),m.a.createElement("div",{className:"article"},m.a.createElement("div",{className:"title-content"},m.a.createElement("h1",{className:"title"},"\u804a\u804aajax\u3001fetch\u3001axios")),m.a.createElement("blockquote",null,m.a.createElement("p",null,"\u5173\u4e8e\u63a5\u53e3\u8bf7\u6c42\u65b9\u6cd5\uff0c\u8fd1\u51e0\u5e74\u6765\u6709\u4e9b\u53d8\u5316\uff0c\u4ece\u4e00\u5f00\u59cb\u539f\u751fJS ",m.a.createElement("code",null,"AJAX")," \u5230 JQuery \u7684 ",m.a.createElement("code",null,"$.ajax()"),",\u518d\u5230 ",m.a.createElement("code",null,"Fetch")," \u548c vue \u63a8\u8350\u7684 ",m.a.createElement("code",null,"Axios"),"\uff0c\u4f46\u662f\u5426\u771f\u6b63\u4e86\u89e3\u5230\u6bcf\u4e00\u4e2a\u65b9\u6cd5\u7684\u4f18\u52a3\u4e0e\u4f7f\u7528\u573a\u666f\u4e86\u5417\uff1f")),m.a.createElement("h3",{id:"AJAX"},"AJAX"),m.a.createElement("p",null,"\u5728\u524d\u51e0\u5e74\u7684\u65f6\u5019\uff0cAJAX \u53ef\u8c13\u662f\u524d\u7aef\u4e00\u5927\u8003\u70b9\u554a\uff0c\u5404\u8def\u5173\u4e8e\u524d\u7aef\u62db\u8058\u7684\u7b80\u4ecb\u91cc\uff0c\u600e\u4e48\u4e5f\u5f97\u8ba9 AJAX \u62e5\u6709\u59d3\u540d\u3002AJAX\uff08Asynchronous JavaScript and XML\uff09\u5f02\u6b65\u7684 Javascript \u548c XML\uff0c\u6838\u5fc3\u5c31\u662f\u4f7f\u7528 XMLHttpRequest \u5bf9\u8c61\uff08\u5bf9\u4e8e\u65e7\u7248\u672c\u6d4f\u89c8\u5668\u4f8b\u5982 IE5\u3001IE6\u5219\u4f7f\u7528 ActiveXObject \u5bf9\u8c61\uff09\u3002",m.a.createElement("br",null),"AJAX\u8fdb\u884c\u540e\u7aef\u6570\u636e\u8bf7\u6c42\u4e3b\u8981\u5206\u4e00\u4e0b\u51e0\u6b65\uff1a",m.a.createElement("br",null),"1.\u521b\u5efa XMLHttpRequest \u5bf9\u8c61",m.a.createElement("br",null),"2.\u8fdb\u884c get \u8bf7\u6c42",m.a.createElement("br",null),"3.\u5229\u7528 readyState \u5bf9\u8c61\u7684 onreadystatechange \u4e8b\u4ef6\u8fdb\u884c\u540e\u7eedDOM\u6216\u5176\u4ed6\u64cd\u4f5c"),m.a.createElement("p",null,"\u5177\u4f53\u5b9e\u73b0\u89c1\u4ee5\u4e0b\u4ee3\u7801\uff1a"),m.a.createElement("pre",null,m.a.createElement("code",null,m.a.createElement("span",null),m.a.createElement("span",null,"// 1.\u521b\u5efa XMLHttpRequest \u5bf9\u8c61"),m.a.createElement("span",null),m.a.createElement("span",null,"var xmlhttp;"),m.a.createElement("span",null,"if(window.XMLHttpRequest)","{"),m.a.createElement("span",null,"    //IE7+,Firefox,Chrome,Opera,Safari\u6d4f\u89c8\u5668\u6267\u884c\u4ee3\u7801"),m.a.createElement("span",null,"    xmlhttp=new XMLHttpRequest();"),m.a.createElement("span",null,"}else","{"),m.a.createElement("span",null,"    //IE6,IE5\u6d4f\u89c8\u5668\u6267\u884c\u4ee3\u7801"),m.a.createElement("span",null,'    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");'),m.a.createElement("span",null,"}"),m.a.createElement("span",null),m.a.createElement("span",null,"// 2.\u8fdb\u884c get \u8bf7\u6c42"),m.a.createElement("span",null),m.a.createElement("span",null,'xmlhttp.open("GET","/ajax/demo_get?t="+Math.random(),true);'),m.a.createElement("span",null,"xmlhttp.send();"),m.a.createElement("span",null),m.a.createElement("span",null,"// 3.readyState "),m.a.createElement("span",null,"// XMLHttpRequest \u5bf9\u8c61\u901a\u8fc7 readyState \u5bf9\u8c61\u5b58\u50a8\u72b6\u6001\u4fe1\u606f"),m.a.createElement("span",null,"// \u5f53 readyState \u72b6\u6001\u6539\u53d8\u65f6\u89e6\u53d1 onreadystatechange \u4e8b\u4ef6\u3002"),m.a.createElement("span",null),m.a.createElement("span",null,"xmlhttp.onreadystatechange=function()","{"),m.a.createElement("span",null,"    if(xmlhttp.readyState==4 && xmlhttp.status==200)","{"),m.a.createElement("span",null,"        var responseData = xmlhttp.responseText;"),m.a.createElement("span",null,"    }"),m.a.createElement("span",null,"}"),m.a.createElement("span",null))),m.a.createElement("p",null,"\u50cf\u4e0a\u9762\u8fd9\u6837\u4f7f\u7528 XMLHttpRequest \u662f\u6765\u8fdb\u884c ajax \u8bf7\u6c42\u662f\u975e\u5e38\u75db\u82e6\u7684\uff0c\u6bcf\u505a\u4e00\u4e2a\u8bf7\u6c42\u90fd\u8981\u5199\u8fd9\u4e48\u957f\u7684\u4ee3\u7801\uff01\u6240\u4ee5\u540e\u6765\u6709\u8bb8\u591a\u7684\u5e93\u90fd\u5bf9\u5176\u8fdb\u884c\u7684\u5c01\u88c5\uff0c\u6bd4\u5982\u6211\u4eec\u6700\u5e38\u89c1\u7684 JQuery\u3002"),m.a.createElement("h3",{id:"$.ajax()"},"$.ajax()"),m.a.createElement("p",null,"JQuery ajax \u662f\u5bf9\u539f\u751fXHR\u7684\u5c01\u88c5\uff0c\u9664\u6b64\u4ee5\u5916\u8fd8\u589e\u6dfb\u4e86\u5bf9JSONP\u7684\u652f\u6301\uff0c\u76f8\u8f83\u4e8e\u76f4\u63a5\u4f7f\u7528ajax\u7684\u201c\u957f\u7bc7\u5927\u8bba\u201d\uff0c\u76f4\u63a5\u4e00\u4e2a\u65b9\u6cd5\u5c31\u53ef\u4ee5\u641e\u5b9a\u8bf7\u6c42\u4e86:"),m.a.createElement("pre",null,m.a.createElement("code",null,m.a.createElement("span",null),m.a.createElement("span",null,"$.ajax(","{"),m.a.createElement("span",null,"   type: 'POST',"),m.a.createElement("span",null,"   url: url,"),m.a.createElement("span",null,"   data: data,"),m.a.createElement("span",null,"   dataType: dataType,"),m.a.createElement("span",null,"   success: function () ","{","},"),m.a.createElement("span",null,"   error: function () ","{","}"),m.a.createElement("span",null,"});"),m.a.createElement("span",null))),m.a.createElement("p",null,"\u867d\u7136JQuery\u4fbf\u6377\u4e86\u5f00\u53d1\uff0c\u4f46\u4f9d\u65e7\u53d7\u9650\u4e8e XHR \u7684\u7f3a\u70b9\u3002\u540c\u65f6\u5bf9\u57fa\u4e8e\u4e8b\u4ef6\u7684\u5f02\u6b65\u505a\u7684\u4e0d\u597d\uff0c\u800c\u4e14\u5982\u679c\u6211\u4eec\u53ea\u662f\u4f7f\u7528 ",m.a.createElement("code",null,"$.ajax()")," \u8fd9\u4e2a\u65b9\u6cd5\u8fd8\u9700\u8981\u5c06\u6574\u4e2a Jquery \u6587\u4ef6\u5f15\u5165\u3002\u603b\u4e4b\uff0c\u5982\u679c\u4e0d\u662f\u5728 JQuery \u9879\u76ee\uff0c\u5efa\u8bae\u8fd8\u662f\u4e0d\u8981\u4f7f\u7528\u6b64\u65b9\u6cd5\u3002"),m.a.createElement("h3",{id:"Axios"},"Axios"),m.a.createElement("p",null,"\u81ea\u4ece\u5c24\u5927\u5f00\u59cb\u505c\u6b62\u7ef4\u62a4 vue-resource \u5e76\u63a8\u8350\u5927\u5bb6\u4f7f\u7528 axios \u4e4b\u540e\uff0caxios \u9010\u6e10\u88ab\u5927\u5bb6\u6240\u8ba4\u8bc6\u3002axios \u662f\u4e00\u4e2a\u57fa\u4e8ePromise \u7528\u4e8e\u6d4f\u89c8\u5668\u548c nodejs \u7684 HTTP \u5ba2\u6237\u7aef\uff0c\u5176\u5b9e\u672c\u8d28\u4e0a\u5e95\u5c42\u4e5f\u662f\u901a\u8fc7 XHR \u6765\u5b9e\u73b0\u7684\u3002\u5c24\u5927\u63a8\u8350\u81ea\u7136\u6709\u4ed6\u7684\u539f\u56e0\uff0caxios \u4f7f\u7528 Promise \u5c01\u88c5\uff0c\u6ee1\u8db3\u4e86\u73b0\u5728\u7684 ES6 \u7684\u89c4\u8303\uff0c\u540c\u65f6\u8fd8\u589e\u52a0\u4e86\u5f88\u591a\u7684\u65b9\u6cd5\u548c\u529f\u80fd\uff0c\u5177\u4f53\u5982\u4e0b\uff1a"),m.a.createElement("p",null,"1.\u62e6\u622a\u8bf7\u6c42\u548c\u54cd\u5e94",m.a.createElement("br",null),"2.\u8f6c\u6362\u8bf7\u6c42\u548c\u54cd\u5e94\u6570\u636e",m.a.createElement("br",null),"3.\u652f\u6301 Promise API",m.a.createElement("br",null),"4.\u63d0\u4f9b\u4e86\u4e00\u4e9b\u5e76\u53d1\u64cd\u4f5c\u7684\u65b9\u6cd5",m.a.createElement("br",null),"5.\u81ea\u52a8\u8f6c\u6362JSON\u6570\u636e",m.a.createElement("br",null),"6.\u5ba2\u6237\u7aef\u652f\u6301\u9632\u8303XSRF",m.a.createElement("br",null),"7.\u652f\u6301\u53d6\u6d88\u8bf7\u6c42",m.a.createElement("br",null),"8.\u4ecenode.js\u53d1\u51fahttp\u8bf7\u6c42"),m.a.createElement("pre",null,m.a.createElement("code",null,m.a.createElement("span",null),m.a.createElement("span",null,"\x3c!-- \u57fa\u7840\u793a\u4f8b --\x3e"),m.a.createElement("span",null),m.a.createElement("span",null,"const axios = require('axios');"),m.a.createElement("span",null),m.a.createElement("span",null,"axios.get('/user?ID=12345')"),m.a.createElement("span",null,"  .then(function (response) ","{"),m.a.createElement("span",null,"    // handle success"),m.a.createElement("span",null,"    console.log(response);"),m.a.createElement("span",null,"  })"),m.a.createElement("span",null,"  .catch(function (error) ","{"),m.a.createElement("span",null,"    // handle error"),m.a.createElement("span",null,"    console.log(error);"),m.a.createElement("span",null,"  })"),m.a.createElement("span",null),m.a.createElement("span",null,"\x3c!-- \u62e6\u622a\u5668 \u5728\u8bf7\u6c42\u6216\u54cd\u5e94\u88ab then \u6216 catch \u5904\u7406\u524d\u62e6\u622a\u5b83\u4eec--\x3e"),m.a.createElement("span",null),m.a.createElement("span",null,"// \u6dfb\u52a0\u8bf7\u6c42\u62e6\u622a\u5668"),m.a.createElement("span",null,"axios.interceptors.request.use(function (config) ","{"),m.a.createElement("span",null,"    // \u5728\u53d1\u9001\u8bf7\u6c42\u4e4b\u524d\u505a\u4e9b\u4ec0\u4e48"),m.a.createElement("span",null,"    return config;"),m.a.createElement("span",null,"  }, function (error) ","{"),m.a.createElement("span",null,"    // \u5bf9\u8bf7\u6c42\u9519\u8bef\u505a\u4e9b\u4ec0\u4e48"),m.a.createElement("span",null,"    return Promise.reject(error);"),m.a.createElement("span",null,"  });"),m.a.createElement("span",null),m.a.createElement("span",null,"// \u6dfb\u52a0\u54cd\u5e94\u62e6\u622a\u5668"),m.a.createElement("span",null,"axios.interceptors.response.use(function (response) ","{"),m.a.createElement("span",null,"    // \u5bf9\u54cd\u5e94\u6570\u636e\u505a\u70b9\u4ec0\u4e48"),m.a.createElement("span",null,"    return response;"),m.a.createElement("span",null,"  }, function (error) ","{"),m.a.createElement("span",null,"    // \u5bf9\u54cd\u5e94\u9519\u8bef\u505a\u70b9\u4ec0\u4e48"),m.a.createElement("span",null,"    return Promise.reject(error);"),m.a.createElement("span",null,"  });"),m.a.createElement("span",null),m.a.createElement("span",null,"\x3c!-- \u5e76\u53d1\u5904\u7406 --\x3e"),m.a.createElement("span",null),m.a.createElement("span",null,"axios.all([getRequest1(), getRequest2()])"),m.a.createElement("span",null,"  .then(axios.spread(function (acct, perms) ","{"),m.a.createElement("span",null,"    // Both requests are now complete"),m.a.createElement("span",null,"  }));"),m.a.createElement("span",null),m.a.createElement("span",null))),m.a.createElement("p",null,"\u66f4\u591a\u5173\u4e8e axios \u7684\u4f7f\u7528\u65b9\u6cd5\uff0c\u76f4\u63a5\u8bbf\u95ee ",m.a.createElement("a",{target:"_blank",href:"https://github.com/axios/axios"},"github")," \u67e5\u9605\u5427\u3002"),m.a.createElement("h3",{id:"Fetch"},"Fetch"),m.a.createElement("p",null,"Fetch API \u5df2\u7ecf\u4f5c\u4e3a\u73b0\u4ee3\u6d4f\u89c8\u5668\u4e2d\u5f02\u6b65\u7f51\u7edc\u8bf7\u6c42\u7684\u6807\u51c6\u65b9\u6cd5\uff0c\u5176\u4f7f\u7528 Promise \u4f5c\u4e3a\u57fa\u672c\u6784\u9020\u8981\u7d20\u3002Fetch \u63d0\u4f9b\u4e86\u5bf9 Request \u548c Response \uff08\u4ee5\u53ca\u5176\u4ed6\u4e0e\u7f51\u7edc\u8bf7\u6c42\u6709\u5173\u7684\uff09\u5bf9\u8c61\u7684\u901a\u7528\u5b9a\u4e49\u3002\u53d1\u9001\u8bf7\u6c42\u6216\u8005\u83b7\u53d6\u8d44\u6e90\uff0c\u9700\u8981\u4f7f\u7528 WindowOrWorkerGlobalScope.fetch \u65b9\u6cd5\uff0c\u5b83\u5728Window \u548c WorkerGlobalScope\u63a5\u53e3\u4e0a\uff0c\u56e0\u6b64\u5728\u51e0\u4e4e\u6240\u6709\u73af\u5883\u4e2d\u90fd\u53ef\u4ee5\u7528\u8fd9\u4e2a\u65b9\u6cd5\u83b7\u53d6\u5230\u8d44\u6e90\u3002\u65e0\u8bba\u662fservice workers\u3001Cache API\u3001\u53c8\u6216\u8005\u662f\u5176\u4ed6\u5904\u7406\u8bf7\u6c42\u548c\u54cd\u5e94\u7684\u65b9\u5f0f\u3002"),m.a.createElement("pre",null,m.a.createElement("code",null,m.a.createElement("span",null),m.a.createElement("span",null,"fetch(url, ","{"),m.a.createElement("span",null,'  method: "POST",'),m.a.createElement("span",null,"  body: JSON.stringify(data),"),m.a.createElement("span",null,"  headers: ","{"),m.a.createElement("span",null,'    "Content-Type": "application/json"'),m.a.createElement("span",null,"  },"),m.a.createElement("span",null,'  credentials: "same-origin"'),m.a.createElement("span",null,"}).then(function(response) ","{"),m.a.createElement("span",null,"  response.status     //=> number 100\u2013599"),m.a.createElement("span",null,"  response.statusText //=> String"),m.a.createElement("span",null,"  response.headers    //=> Headers"),m.a.createElement("span",null,"  response.url        //=> String"),m.a.createElement("span",null,"  return response.text() // .text() \u6216\u8005 .json() \u53ef\u4ee5\u83b7\u5f97\u54cd\u5e94\u4f53\uff0c\u5e76\u8fd4\u56de\u4e00\u4e2a promise \u5bf9\u8c61\u3002"),m.a.createElement("span",null,"}, function(error) ","{"),m.a.createElement("span",null,"  error.message //=> String"),m.a.createElement("span",null,"})"),m.a.createElement("span",null))),m.a.createElement("p",null,"Fetch \u7528\u9014\u8fd9\u4e48\u5e7f\u6cdb\uff0c\u65e2\u53ef\u4ee5\u5728 window \u53c8\u53ef\u4ee5\u5728 service worker \uff0c\u4f46\u662f Fetch \u73b0\u5728",m.a.createElement("strong",null,"\u6ca1\u6709\u529e\u6cd5\u7ec8\u6b62\u4e00\u4e2a\u8bf7\u6c42\uff0c\u5e76\u4e14\u4e0d\u80fd\u76d1\u6d4b\u4e0a\u4f20\u8fdb\u5ea6"),"\u3002\u5982\u679c\u6211\u4eec\u9700\u8981\u8fd9\u4e9b\u529f\u80fd\u53ef\u4ee5\u9009\u62e9 axios\u3002\u4e0d\u8fc7\u5df2\u7ecf\u6709\u4e9b\u65b9\u6848\u6765\u89e3\u51b3\u8fd9\u4e9b\u95ee\u9898\u4e86\u3002"),m.a.createElement("p",null,"\u6211\u4eec\u5728\u4f7f\u7528 Fetch \u65f6\u53ef\u4ee5\u5f15\u5165 ",m.a.createElement("code",null,"AbortController")," \u548c ",m.a.createElement("code",null,"AbortSignal"),"\uff0c\u8fd9\u4e2a\u901a\u7528\u7684API\u6765\u901a\u77e5\u4e2d\u6b62\u4e8b\u4ef6:"),m.a.createElement("pre",null,m.a.createElement("code",null,m.a.createElement("span",null),m.a.createElement("span",null,"const controller = new AbortController()"),m.a.createElement("span",null,"const signal = controller.signal"),m.a.createElement("span",null,"fetch('./file.json', ","{"," signal })"),m.a.createElement("span",null),m.a.createElement("span",null,"// 5s\u540e\u7ec8\u6b62\u8bf7\u6c42"),m.a.createElement("span",null,"setTimeout(() => controller.abort(), 5 * 1000)"),m.a.createElement("span",null),m.a.createElement("span",null))),m.a.createElement("h3",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),m.a.createElement("ol",null,m.a.createElement("li",null,"ajax \u662f\u901a\u8fc7 XHR \u5b9e\u73b0\u4e0e\u670d\u52a1\u5668\u7684\u5f02\u6b65\u8bf7\u6c42"),m.a.createElement("li",null,"$.ajax() \u662f\u5bf9\u539f\u751f\u7684 ajax \u8fdb\u884c\u7684\u5c01\u88c5\uff0c\u7b80\u5316\u4e86\u4ee3\u7801\u7f16\u5199"),m.a.createElement("li",null,"aixos \u4e5f\u662f\u5bf9 XHR \u7684\u8fdb\u4e00\u6b65\u5c01\u88c5\uff0c\u652f\u6301 Promise API, \u540c\u65f6\u8fd8\u589e\u52a0\u4e86\u5e76\u53d1\u8bf7\u6c42\u3001\u62e6\u622a\u8bf7\u6c42\u548c\u54cd\u5e94\u3001\u8f6c\u6362\u8bf7\u6c42\u54cd\u5e94\u6570\u636e\u3001\u53d6\u6d88\u8bf7\u6c42\u7b49\u529f\u80fd\u3002"),m.a.createElement("li",null,"fetch \u662f ES\u89c4\u8303\u4e2d\u7684\u8bed\u6cd5\uff0c\u4e0e XHR\u65e0\u5173\uff0c\u51e0\u4e4e\u6240\u6709\u73af\u5883\u4e2d\u90fd\u53ef\u4ee5\u7528\uff0c\u4f46\u539f\u751f\u7684 Fetch \u4e0d\u80fd\u7ec8\u6b62\u8bf7\u6c42\u4e5f\u4e0d\u80fd\u68c0\u6d4b\u4e0a\u4f20\u8fdb\u5ea6\u3002")),m.a.createElement("blockquote",null,m.a.createElement("p",null,"\u53c2\u8003:",m.a.createElement("br",null),m.a.createElement("a",{target:"_blank",href:"https://www.jianshu.com/p/8bc48f8fde75"},"ajax\u548caxios\u3001fetch\u7684\u533a\u522b"),m.a.createElement("br",null),m.a.createElement("a",{target:"_blank",href:"https://mp.weixin.qq.com/s/qM_tvb2-A__hdjjgnS1y6w"},"\u8ba4\u8bc6 Fetch API")))))}}]),a}(m.a.Component)},99:function(e,a,n){}}]);
//# sourceMappingURL=45.0f10b107.chunk.js.map