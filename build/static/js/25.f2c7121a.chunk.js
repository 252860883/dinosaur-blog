(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{100:function(e,l,t){"use strict";t.d(l,"a",function(){return E});var a=t(3),n=t(4),r=t(6),c=t(5),u=t(7),m=t(0),o=t.n(m),E=(t(101),function(e){function l(){var e,t;Object(a.a)(this,l);for(var n=arguments.length,u=new Array(n),m=0;m<n;m++)u[m]=arguments[m];return(t=Object(r.a)(this,(e=Object(c.a)(l)).call.apply(e,[this].concat(u)))).clickPosBtn=function(e){var l=document.getElementById(e);window.scrollTo({top:l.offsetTop-10,left:0,behavior:"smooth"})},t}return Object(u.a)(l,e),Object(n.a)(l,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"headerLink"},o.a.createElement("div",{className:"content"},o.a.createElement("div",{className:"real-content"},o.a.createElement("div",{className:"tag"},"Reading Assistance \xb7"),this.props.headerLink.map(function(l,t){return o.a.createElement("span",{className:"a"+l.level,key:t,onClick:function(){return e.clickPosBtn(l.title)}},l.title)}))))}}]),l}(o.a.Component))},101:function(e,l,t){},49:function(e,l,t){"use strict";t.r(l),t.d(l,"default",function(){return i});var a=t(3),n=t(4),r=t(6),c=t(5),u=t(7),m=t(0),o=t.n(m),E=(t(98),t(100)),i=function(e){function l(){var e;return Object(a.a)(this,l),(e=Object(r.a)(this,Object(c.a)(l).call(this))).state={headerLink:[{level:"h3",title:"\u6570\u636e\u7c7b\u578b"},{level:"h3",title:"\u5806\u4e0e\u6808\u5b58\u50a8"},{level:"h3",title:"\u5806\u4e0e\u6808\u7684\u533a\u522b"},{level:"h3",title:"\u6df1\u62f7\u8d1d\u4e0e\u6d45\u62f7\u8d1d"},{level:"h3",title:"\u5185\u5b58\u7684\u751f\u547d\u5468\u671f"},{level:"h3",title:"\u5783\u573e\u56de\u6536\u673a\u5236"},{level:"h3",title:"\u5185\u5b58\u6cc4\u6f0f"},{level:"h3",title:"WeakMap"},{level:"h3",title:"\u603b\u7ed3"}]},e}return Object(u.a)(l,e),Object(n.a)(l,[{key:"componentWillMount",value:function(){}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return o.a.createElement(m.Fragment,null,o.a.createElement(E.a,{headerLink:this.state.headerLink}),o.a.createElement("div",{className:"article"},o.a.createElement("div",{className:"title-content"},o.a.createElement("h1",{className:"title"},"\u5256\u6790JavaScript\u7684\u5185\u5b58\u673a\u5236")),o.a.createElement("blockquote",null,o.a.createElement("p",null,"\u5728\u5b66\u4e60JavaScript\u7684\u8fc7\u7a0b\u4e2d\uff0c\u5185\u5b58\u7a7a\u95f4\u8fd9\u4e2a\u6982\u5ff5\u5bf9\u6211\u6765\u8bf4\u5f88\u964c\u751f\uff0c\u5e73\u65f6\u7684\u4e1a\u52a1\u95ee\u9898\u4e5f\u5f88\u5c11\u4f1a\u6d89\u53ca\u5230\u5b83\u3002\u4f46\u662f\u7531\u4e8e\u5bf9\u4e8e\u5185\u5b58\u7a7a\u95f4\u7684\u6a21\u7cca\u8ba4\u77e5\uff0c\u4f7f\u5f97\u6211\u5728\u5f88\u591a\u95ee\u9898\u4e0a\u90fd\u4e00\u77e5\u534a\u89e3\uff0c\u6bd4\u5982\u6df1\u62f7\u8d1d\u6d45\u62f7\u8d1d\u3001\u57fa\u672c\u6570\u636e\u7c7b\u578b\u5f15\u7528\u7b49\u7b49\u95ee\u9898\u3002\u4e86\u89e3\u4e86JavaScript\u7684\u5185\u5b58\u673a\u5236\u6709\u6709\u52a9\u4e8e\u5f00\u53d1\u4eba\u5458\u80fd\u591f\u6e05\u6670\u7684\u8ba4\u8bc6\u5230\u81ea\u5df1\u5199\u7684\u4ee3\u7801\u5728\u6267\u884c\u7684\u8fc7\u7a0b\u4e2d\u53d1\u751f\u8fc7\u4ec0\u4e48\uff0c\u4e5f\u80fd\u591f\u63d0\u9ad8\u9879\u76ee\u7684\u4ee3\u7801\u8d28\u91cf\u3002\u6240\u4ee5\u8fd9\u7bc7\u535a\u5ba2\u5c31\u6765\u63a2\u7d22\u4e00\u4e0bJavaScript\u7684\u5185\u5b58\u95ee\u9898\u3002")),o.a.createElement("h3",{id:"\u6570\u636e\u7c7b\u578b"},"\u6570\u636e\u7c7b\u578b"),o.a.createElement("p",null,"\u9996\u5148\uff0c\u4e86\u89e3\u4e00\u4e0bJavaScript\u7684\u57fa\u672c\u6570\u636e\u7c7b\u578b\uff0c\u9762\u8bd5\u5e38\u8003\u9898\u5427\uff01 \u5012\u7740\u90fd\u80fd\u8bf4\u4e0b\u6765\uff0c",o.a.createElement("strong",null,"Number / String / Bollean / Undefined / Null / Symbol"),".\u90a3\u4e48\u5176\u4ed6\u7684\u4e0d\u662f\u57fa\u672c\u7684\u6570\u636e\u7c7b\u578b\u5462\uff1f\u5c31\u5305\u62ec ",o.a.createElement("strong",null,"Object / Array / RegExp / Date")," \u7b49\u7b49\u3002"),o.a.createElement("h3",{id:"\u5806\u4e0e\u6808\u5b58\u50a8"},"\u5806\u4e0e\u6808\u5b58\u50a8"),o.a.createElement("blockquote",null,o.a.createElement("p",null,"JS\u5185\u5b58\u7a7a\u95f4\u5206\u4e3a\u6808(stack)\u3001\u5806(heap)\u3001\u6c60(\u4e00\u822c\u4e5f\u4f1a\u5f52\u7c7b\u4e3a\u6808\u4e2d)\u3002 \u5176\u4e2d\u6808\u5b58\u653e\u53d8\u91cf\uff0c\u5806\u5b58\u653e\u590d\u6742\u5bf9\u8c61\uff0c\u6c60\u5b58\u653e\u5e38\u91cf\u3002")),o.a.createElement("p",null,o.a.createElement("strong",null,"\u6808\u5b58\u50a8\uff08\u5148\u8fdb\u540e\u51fa\uff09"),"\uff1a\u662f\u4e00\u5757\u5185\u5b58\u533a\u57df\uff0c\u5b58\u50a8\u7684\u90fd\u662f\u5c40\u90e8\u53d8\u91cf\uff0c\u50cf\u4e0a\u9762\u63d0\u5230\u7684\u516d\u79cd\u57fa\u672c\u7c7b\u578b\u5c31\u5b58\u653e\u5728\u6808\u5185\u5b58\u4e2d\uff0c\u662f\u53ef\u4ee5\u76f4\u63a5\u8bbf\u95ee\u5230\u7684\uff0c\u5b58\u653e\u5728\u6808(stack)\u5185\u5b58\u4e2d\u7684\u7b80\u5355\u6570\u636e\u6bb5\uff0c\u6570\u636e\u5927\u5c0f\u786e\u5b9a\uff0c\u5185\u5b58\u7a7a\u95f4\u5927\u5c0f\u53ef\u4ee5\u5206\u914d\u3002",o.a.createElement("br",null),o.a.createElement("strong",null,"\u5806\u5b58\u50a8\uff08\u5148\u8fdb\u5148\u51fa\uff09"),"\uff1a\u50cfArray\u7b49\u7c7b\u578b\u7684\u53d8\u91cf\u5b9e\u9645\u4fdd\u5b58\u7684\u662f\u4e00\u4e2a\u6307\u9488\uff0c\u8fd9\u4e2a\u6307\u9488\u6307\u5411\u5806\u5185\u5b58\u5bf9\u5e94\u7684\u5b9e\u9645\u5185\u5bb9\u5b9e\u4f53\u3002"),o.a.createElement("p",null,"\u4e00\u5f20\u76f4\u89c2\u56fe\u8868\u793a\uff1a"),o.a.createElement("p",null,o.a.createElement("img",{src:"http://wx4.sinaimg.cn/mw690/a73bc6a1ly1fq8s7oymrjj212e0lqdho.jpg",alt:"image",title:""})),o.a.createElement("p",null,"\u4e3e\u4e2a\u4f8b\u5b50\uff1a"),o.a.createElement("pre",null,o.a.createElement("code",null,o.a.createElement("span",null),o.a.createElement("span",null,"var a = 22; //\u5b58\u653e\u5728\u6808"),o.a.createElement("span",null,"var b = ","{"," m: 20 }; // \u53d8\u91cfb\u5b58\u5728\u4e8e\u6808\u4e2d\uff0c","{","m: 20} \u4f5c\u4e3a\u5bf9\u8c61\u5b58\u5728\u4e8e\u5806\u5185\u5b58\u4e2d"),o.a.createElement("span",null))),o.a.createElement("h3",{id:"\u5806\u4e0e\u6808\u7684\u533a\u522b"},"\u5806\u4e0e\u6808\u7684\u533a\u522b"),o.a.createElement("ol",null,o.a.createElement("li",null,"\u6808\u5185\u5b58\u5b58\u50a8\u7684\u662f\u5c40\u90e8\u53d8\u91cf\u800c\u5806\u5185\u5b58\u5b58\u50a8\u7684\u662f\u5b9e\u4f53\uff1b"),o.a.createElement("li",null,"\u6808\u5185\u5b58\u7684\u66f4\u65b0\u901f\u5ea6\u8981\u5feb\u4e8e\u5806\u5185\u5b58\uff0c\u56e0\u4e3a\u5c40\u90e8\u53d8\u91cf\u7684\u751f\u547d\u5468\u671f\u5f88\u77ed\uff1b"),o.a.createElement("li",null,"\u6808\u5185\u5b58\u5b58\u653e\u7684\u53d8\u91cf\u751f\u547d\u5468\u671f\u4e00\u65e6\u7ed3\u675f\u5c31\u4f1a\u88ab\u91ca\u653e\uff0c\u800c\u5806\u5185\u5b58\u5b58\u653e\u7684\u5b9e\u4f53\u4f1a\u88ab\u5783\u573e\u56de\u6536\u673a\u5236\u4e0d\u5b9a\u65f6\u7684\u56de\u6536\uff1b"),o.a.createElement("li",null,"\u5f00\u53d1\u4eba\u5458\u5e76\u4e0d\u80fd\u76f4\u63a5\u64cd\u4f5c\u5806\u5185\u5b58\uff0c\u5806\u5185\u5b58\u7531JS\u5f15\u64ce\u64cd\u4f5c\u5b8c\u6210")),o.a.createElement("h3",{id:"\u6df1\u62f7\u8d1d\u4e0e\u6d45\u62f7\u8d1d"},"\u6df1\u62f7\u8d1d\u4e0e\u6d45\u62f7\u8d1d"),o.a.createElement("p",null,"\u901a\u8fc7\u4e0a\u9762\u7684\u5806\u6808\u5206\u6790\uff0c\u5c31\u5f15\u7533\u5230\u4e86\u5bf9\u8c61\u6df1\u6d45\u62f7\u8d1d\u7684\u95ee\u9898\u3002",o.a.createElement("br",null),"- ",o.a.createElement("strong",null,"\u6d45\u62f7\u8d1d"),o.a.createElement("br",null),"\u6d45\u62f7\u8d1d\u53ea\u80fd\u590d\u5236\u4e00\u5c42\u5bf9\u8c61\u7684\u5c5e\u6027\uff0c\u6df1\u5c42\u7684\u5c5e\u6027\u53ea\u80fd\u88ab\u5f15\u7528\uff0c\u5f53\u88ab\u5f15\u7528\u7684\u6df1\u5c42\u5c5e\u6027\u503c\u6539\u53d8\u65f6\uff0c\u590d\u5236\u8005\u4e5f\u4f1a\u968f\u7740\u6539\u53d8\u3002\u901a\u4fd7\u6765\u8bb2\uff0c\u6d45\u62f7\u8d1d\u5c31\u662f\u62f7\u8d1d\u7b2c\u4e00\u5c42\u7684\u57fa\u672c\u7c7b\u578b\u503c\uff0c\u4ee5\u53ca\u7b2c\u4e00\u5c42\u7684\u5f15\u7528\u7c7b\u578b\u5730\u5740\u3002\u4e00\u5f20\u56fe\u770b\u539f\u7406\uff1a",o.a.createElement("br",null),o.a.createElement("img",{src:"http://wx4.sinaimg.cn/mw690/a73bc6a1ly1fq8t5rivvmj20gf075weq.jpg",alt:"image",title:""})),o.a.createElement("p",null,"\u540c\u65f6\u9700\u8981\u6ce8\u610f\u6d45\u62f7\u8d1d\u548c\u8d4b\u503c\u64cd\u4f5c\u662f\u4e0d\u4e00\u6837\u7684\uff1a\u8d4b\u503c\u64cd\u4f5c\u53ea\u662f\u628a\u6808\u4e2d\u7684\u5730\u5740\u4f20\u7ed9\u65b0\u7684\u5bf9\u8c61\uff0c\u6240\u4ee5\u4e24\u4e2a\u5bf9\u8c61\u54ea\u4e00\u4e2a\u8fdb\u884c\u4fee\u6539\u90fd\u4f1a\u88ab\u6539\u53d8\u3002\u800c\u6d45\u62f7\u8d1d\u4f1a\u521b\u5efa\u4e00\u4e2a\u65b0\u7684\u5bf9\u8c61\uff0c\u548c\u8d4b\u503c\u4e0d\u4e00\u6837\u7684\u5730\u65b9\u662f\u5982\u679c\u5bf9\u5e94\u7684\u76f8\u5173\u5c5e\u6027\u503c\u662f\u57fa\u672c\u7c7b\u578b\uff0c\u4e92\u76f8\u4e0d\u5e72\u6d89\u3002"),o.a.createElement("p",null,"\u5e38\u89c1\u7684\u6d45\u62f7\u8d1d\u64cd\u4f5c\u6709\uff1a",o.a.createElement("code",null,"Object.assign()")," \u3001 ",o.a.createElement("code",null,"Array.prototype.concat()")," \u3001 ",o.a.createElement("code",null,"Array.prototype.slice()"),"\u7b49\u3002"),o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement("p",null,o.a.createElement("strong",null,"\u6df1\u62f7\u8d1d"),o.a.createElement("br",null),"\u6df1\u62f7\u8d1d\u76f8\u53cd\uff0c\u4f1a\u5b8c\u5b8c\u6574\u6574\u7684\u6df1\u5c42\u904d\u5386\u590d\u5236\u4e00\u4e2a\u5bf9\u8c61\uff0c\u800c\u4e0d\u662f\u6df1\u5c42\u5f15\u7528\u3002\u5982\u56fe\uff1a",o.a.createElement("br",null),o.a.createElement("img",{src:"http://wx2.sinaimg.cn/mw690/a73bc6a1ly1fq8t5rz7uuj20g906wmxe.jpg",alt:"image",title:""}))),o.a.createElement("li",null,o.a.createElement("p",null,o.a.createElement("strong",null,"\u5b9e\u73b0\u6df1\u62f7\u8d1d"))),o.a.createElement("li",null,o.a.createElement("p",null,"\u5229\u7528JSON API"))),o.a.createElement("pre",null,o.a.createElement("code",null,o.a.createElement("span",null),o.a.createElement("span",null,"let newobj=JSON.parse(JSON.stringify(obj));"),o.a.createElement("span",null),o.a.createElement("span",null))),o.a.createElement("p",null,"\u6ce8\u610f\uff1a\u7531\u4e8e JSON.stringify() \u4e0d\u63a5\u53d7\u51fd\u6570\uff0c\u6240\u4ee5\u8be5\u65b9\u6cd5\u4e0d\u80fd\u62f7\u8d1d\u51fd\u6570"),o.a.createElement("ul",null,o.a.createElement("li",null,"\u9012\u5f52\u904d\u5386")),o.a.createElement("pre",null,o.a.createElement("code",null,o.a.createElement("span",null),o.a.createElement("span",null,"/**"),o.a.createElement("span",null," * \u6df1\u62f7\u8d1d\u51fd\u6570"),o.a.createElement("span",null," */"),o.a.createElement("span",null,"function deepClone(obj) ","{"),o.a.createElement("span",null,"    // \u9996\u5148\u5224\u65ad Date \u548c RegExp \u7c7b\u578b"),o.a.createElement("span",null,"    if (obj instanceof RegExp) return new RegExp(obj);"),o.a.createElement("span",null,"    if (obj instanceof Date) return new Date(obj);"),o.a.createElement("span",null,"    // \u57fa\u7840\u6570\u636e\u7c7b\u578b\u76f4\u63a5\u8fd4\u56de"),o.a.createElement("span",null,"    if (obj === null || (typeof obj != 'object')) return obj;"),o.a.createElement("span",null,"    // obj\u5982\u679c\u662f\u6570\u7ec4 obj.constructor \u8fd4\u56de [function:Array],obj\u5982\u679c\u662f\u5bf9\u8c61\u8fd4\u56de [function:Object]"),o.a.createElement("span",null,"    let t = new obj.constructor();"),o.a.createElement("span",null,"    // \u590d\u6742\u7c7b\u578b\u8fdb\u884c\u9012\u5f52"),o.a.createElement("span",null,"    for (let key in obj) ","{"),o.a.createElement("span",null,"        if (obj.hasOwnProperty(key)) ","{"),o.a.createElement("span",null,"            t[key] = deepClone(obj[key]);"),o.a.createElement("span",null,"        }"),o.a.createElement("span",null,"    }"),o.a.createElement("span",null,"    return t;"),o.a.createElement("span",null,"}"),o.a.createElement("span",null))),o.a.createElement("ul",null,o.a.createElement("li",null,"\u9012\u5f52\u904d\u5386\u89e3\u51b3\u73af\u95ee\u9898")),o.a.createElement("p",null,"\u4e0a\u9762\u7684\u9012\u5f52\u6df1\u62f7\u8d1d\u770b\u4f3c\u6ca1\u4ec0\u4e48\u95ee\u9898\u4e86\uff0c\u4f46\u662f\u6211\u4eec\u5f97\u601d\u8003\u4e00\u4e0b\u5982\u679c\u6211\u4eec\u8981\u6df1\u62f7\u8d1d\u7684\u5bf9\u8c61\u51fa\u73b0\u4e86",o.a.createElement("strong",null,"\u5faa\u73af\u5f15\u7528"),"\uff0c\u5373\u7c7b\u4f3c\u4e8e",o.a.createElement("code",null,"obj.loop = obj"),"\u7684\u60c5\u51b5\u65f6\uff0c\u6211\u4eec\u518d\u6267\u884cdeepClone\u51fd\u6570\u5c31\u4f1a\u9677\u5165\u6b7b\u5faa\u73af\uff0c\u4e3a\u4e86\u89e3\u51b3\u8fd9\u4e2a\u95ee\u9898\uff0c\u6211\u4eec\u9700\u8981\u5f15\u5165WeakMap\u6765\u5b58\u50a8\u62f7\u8d1d\u8fc7\u7684\u5bf9\u8c61\uff0c\u6bcf\u6b21\u6267\u884cdeepClone\u65f6\u5019\u90fd\u5148\u67e5\u8be2\u662f\u5426\u62f7\u8d1d\u8fc7\uff0c\u5982\u679c\u62f7\u8d1d\u8fc7\u76f4\u63a5\u8fd4\u56de\u8be5\u5bf9\u8c61\u7684\u5f15\u7528\uff0c\u5426\u5219\u6267\u884c\u540e\u7eed\u6b65\u9aa4\uff1a"),o.a.createElement("pre",null,o.a.createElement("code",null,o.a.createElement("span",null),o.a.createElement("span",null,"function deepClone(obj,hash = new WeakMap()) ","{"),o.a.createElement("span",null,"    // \u5224\u65ad\u662f\u5426\u5df2\u7ecf\u62f7\u8d1d\u8fc7\u8be5\u5bf9\u8c61"),o.a.createElement("span",null,"    if(hash.has(obj))","{"),o.a.createElement("span",null,"        return hash.get(obj)"),o.a.createElement("span",null,"    }"),o.a.createElement("span",null,"    // \u9996\u5148\u5224\u65ad Date \u548c RegExp \u7c7b\u578b"),o.a.createElement("span",null,"    if (obj instanceof RegExp) return new RegExp(obj);"),o.a.createElement("span",null,"    if (obj instanceof Date) return new Date(obj);"),o.a.createElement("span",null,"    // \u57fa\u7840\u6570\u636e\u7c7b\u578b\u76f4\u63a5\u8fd4\u56de"),o.a.createElement("span",null,"    if (obj === null || (typeof obj != 'object')) return obj;"),o.a.createElement("span",null,"    // obj\u5982\u679c\u662f\u6570\u7ec4 obj.constructor \u8fd4\u56de [function:Array],obj\u5982\u679c\u662f\u5bf9\u8c61\u8fd4\u56de [function:Object]"),o.a.createElement("span",null,"    let t = new obj.constructor();"),o.a.createElement("span",null,"    // \u5c06 obj \u4f5c\u4e3a key \u5199\u5165 weakmap"),o.a.createElement("span",null,"    hash.set(obj,t);"),o.a.createElement("span",null,"    // \u590d\u6742\u7c7b\u578b\u8fdb\u884c\u9012\u5f52"),o.a.createElement("span",null,"    for (let key in obj) ","{"),o.a.createElement("span",null,"        if (obj.hasOwnProperty(key)) ","{"),o.a.createElement("span",null,"            t[key] = deepClone(obj[key],hash);"),o.a.createElement("span",null,"        }"),o.a.createElement("span",null,"    }"),o.a.createElement("span",null,"    return t;"),o.a.createElement("span",null,"}"),o.a.createElement("span",null))),o.a.createElement("h3",{id:"\u5185\u5b58\u7684\u751f\u547d\u5468\u671f"},"\u5185\u5b58\u7684\u751f\u547d\u5468\u671f"),o.a.createElement("ul",null,o.a.createElement("li",null,"\u73af\u5883\u4e2d\u5206\u914d\u7684\u5185\u5b58\u4e00\u822c\u6709\u5982\u4e0b\u751f\u547d\u5468\u671f\uff1a",o.a.createElement("ol",null,o.a.createElement("li",null,"\u5185\u5b58\u5206\u914d\uff1a\u5f53\u6211\u4eec\u7533\u660e\u53d8\u91cf\u3001\u51fd\u6570\u3001\u5bf9\u8c61\u7684\u65f6\u5019\uff0c\u7cfb\u7edf\u4f1a\u81ea\u52a8\u4e3a\u4ed6 \u4eec\u5206\u914d\u5185\u5b58"),o.a.createElement("li",null,"\u5185\u5b58\u4f7f\u7528\uff1a\u5373\u8bfb\u5199\u5185\u5b58\uff0c\u4e5f\u5c31\u662f\u4f7f\u7528\u53d8\u91cf\u3001\u51fd\u6570\u7b49"),o.a.createElement("li",null,"\u5185\u5b58\u56de\u6536\uff1a\u4f7f\u7528\u5b8c\u6bd5\uff0c\u7531\u5783\u573e\u56de\u6536\u673a\u5236\u81ea\u52a8\u56de\u6536\u4e0d\u518d\u4f7f\u7528\u7684\u5185\u5b58 \u4e3e\u4e2a\u6817\u5b50\ud83c\udf30\uff1a")))),o.a.createElement("pre",null,o.a.createElement("code",null,o.a.createElement("span",null),o.a.createElement("span",null,"var a = 2; // \u5728\u5185\u5b58\u4e2d\u7ed9\u6570\u503c\u53d8\u91cf\u5206\u914d\u7a7a\u95f4"),o.a.createElement("span",null,"alert(a + 100); // \u4f7f\u7528\u5185\u5b58"),o.a.createElement("span",null,"var a = null; // \u4f7f\u7528\u5b8c\u6bd5\u4e4b\u540e\uff0c\u91ca\u653e\u5185\u5b58\u7a7a\u95f4"),o.a.createElement("span",null))),o.a.createElement("h3",{id:"\u5783\u573e\u56de\u6536\u673a\u5236"},"\u5783\u573e\u56de\u6536\u673a\u5236"),o.a.createElement("p",null,"JavaScript\u6709\u81ea\u52a8\u5783\u573e\u6536\u96c6\u673a\u5236\uff0c\u90a3\u4e48\u8fd9\u4e2a\u81ea\u52a8\u5783\u573e\u6536\u96c6\u673a\u5236\u7684\u539f\u7406\u662f\u4ec0\u4e48\u5462\uff1f\u5176\u5b9e\u5f88\u7b80\u5355\uff0c\u5c31\u662f\u627e\u51fa\u90a3\u4e9b\u4e0d\u518d\u7ee7\u7eed\u4f7f\u7528\u7684\u503c\uff0c\u7136\u540e\u91ca\u653e\u5176\u5360\u7528\u7684\u5185\u5b58\u3002\u5783\u573e\u6536\u96c6\u5668\u4f1a\u6bcf\u9694\u56fa\u5b9a\u7684\u65f6\u95f4\u6bb5\u5c31\u6267\u884c\u4e00\u6b21\u91ca\u653e\u64cd\u4f5c\u3002 \u5728JavaScript\u4e2d\uff0c\u6700\u5e38\u7528\u7684\u662f\u901a\u8fc7",o.a.createElement("strong",null,"\u6807\u8bb0\u6e05\u9664\u7b97\u6cd5"),"\u6765\u627e\u5230\u54ea\u4e9b\u5bf9\u8c61\u662f\u4e0d\u518d\u7ee7\u7eed\u4f7f\u7528\u7684\uff0c\u56e0\u6b64 a = null \u5176\u5b9e\u4ec5\u4ec5\u53ea\u662f\u505a\u4e86\u4e00\u4e2a\u91ca\u653e\u5f15\u7528\u7684\u64cd\u4f5c\uff0c\u8ba9 a \u539f\u672c\u5bf9\u5e94\u7684\u503c\u5931\u53bb\u5f15\u7528\uff0c\u8131\u79bb\u6267\u884c\u73af\u5883\uff0c\u8fd9\u4e2a\u503c\u4f1a\u5728\u4e0b\u4e00\u6b21\u5783\u573e\u6536\u96c6\u5668\u6267\u884c\u64cd\u4f5c\u65f6\u88ab\u627e\u5230\u5e76\u91ca\u653e\u3002\u800c\u5728\u9002\u5f53\u7684\u65f6\u5019\u89e3\u9664\u5f15\u7528\uff0c\u662f\u4e3a\u9875\u9762\u83b7\u5f97\u66f4\u597d\u6027\u80fd\u7684\u4e00\u4e2a\u91cd\u8981\u65b9\u5f0f\u3002"),o.a.createElement("h3",{id:"\u5185\u5b58\u6cc4\u6f0f"},"\u5185\u5b58\u6cc4\u6f0f"),o.a.createElement("blockquote",null,o.a.createElement("p",null,"\u5bf9\u4e8e\u6301\u7eed\u8fd0\u884c\u7684\u670d\u52a1\u8fdb\u7a0b\uff08daemon\uff09\uff0c\u5fc5\u987b\u53ca\u65f6\u91ca\u653e\u4e0d\u518d\u7528\u5230\u7684\u5185\u5b58\u3002\u5426\u5219\uff0c\u5185\u5b58\u5360\u7528\u8d8a\u6765\u8d8a\u9ad8\uff0c\u8f7b\u5219\u5f71\u54cd\u7cfb\u7edf\u6027\u80fd\uff0c\u91cd\u5219\u5bfc\u81f4\u8fdb\u7a0b\u5d29\u6e83\u3002 \u4e0d\u518d\u7528\u5230\u7684\u5185\u5b58\uff0c\u6ca1\u6709\u53ca\u65f6\u91ca\u653e\uff0c\u5c31\u53eb\u505a\u5185\u5b58\u6cc4\u6f0f\uff08memory leak\uff09\u3002")),o.a.createElement("p",null,"\u5e38\u89c1\u5185\u5b58\u6cc4\u6f0f\u539f\u56e0\uff1a"),o.a.createElement("ol",null,o.a.createElement("li",null,"setTimeout\u7684\u7b2c\u4e00\u4e2a\u53c2\u6570\u4f7f\u7528\u5b57\u7b26\u4e32\u800c\u975e\u51fd\u6570\u7684\u8bdd\uff0c\u4f1a\u5f15\u53d1\u5185\u5b58\u6cc4\u6f0f\u3002"),o.a.createElement("li",null,"\u95ed\u5305"),o.a.createElement("li",null,"\u5728\u4f20\u9012\u7ed9 console.log\u7684\u5bf9\u8c61\u662f\u4e0d\u80fd\u88ab\u5783\u573e\u56de\u6536\uff0c\u56e0\u4e3a\u5728\u4ee3\u7801\u8fd0\u884c\u4e4b\u540e\u9700\u8981\u5728\u5f00\u53d1\u5de5\u5177\u80fd\u67e5\u770b\u5bf9\u8c61\u4fe1\u606f\u3002"),o.a.createElement("li",null,"\u5faa\u73af\uff08\u5728\u4e24\u4e2a\u5bf9\u8c61\u5f7c\u6b64\u5f15\u7528\u4e14\u5f7c\u6b64\u4fdd\u7559\u65f6\uff0c\u5c31\u4f1a\u4ea7\u751f\u4e00\u4e2a\u5faa\u73af\uff09"),o.a.createElement("li",null,"\u8d85\u51faDOM\u5f15\u7528\uff08\u5728\u67d0\u4e9b\u60c5\u51b5\u4e0b\uff0c\u5f00\u53d1\u4eba\u5458\u4f1a\u5728\u6570\u636e\u7ed3\u6784\u4e2d\u5b58\u50a8DOM\u8282\u70b9\uff0c\u4f8b\u5982\u4f60\u60f3\u5feb\u901f\u66f4\u65b0\u8868\u683c\u4e2d\u7684\u51e0\u884c\u5185\u5bb9\u7684\u60c5\u51b5\u3002\u5982\u679c\u5728\u5b57\u5178\u6216\u6570\u7ec4\u4e2d\u5b58\u50a8\u5bf9\u6bcf\u4e2aDOM\u884c\u7684\u5f15\u7528\uff0c\u5219\u4f1a\u6709\u4e24\u4e2a\u5bf9\u540c\u4e00\u4e2aDOM\u5143\u7d20\u7684\u5f15\u7528\uff09")),o.a.createElement("h3",{id:"WeakMap"},"WeakMap"),o.a.createElement("p",null,"ES6 \u8003\u8651\u5230\u5783\u573e\u56de\u6536\u95ee\u9898\uff0c\u63a8\u51fa\u4e86\u4e24\u79cd\u65b0\u7684\u6570\u636e\u7ed3\u6784\uff1aWeakSet \u548c WeakMap\u3002\u5b83\u4eec\u5bf9\u4e8e\u503c\u7684\u5f15\u7528\u90fd\u662f\u4e0d\u8ba1\u5165\u5783\u573e\u56de\u6536\u673a\u5236\u7684\uff0c\u8868\u793a\u8fd9\u662f\u5f31\u5f15\u7528\u3002"),o.a.createElement("h3",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),o.a.createElement("p",null,"1.\u57fa\u672c\u6570\u636e\u7c7b\u578b\u90fd\u662f\u76f4\u63a5\u5728\u6808\u5b58\u50a8\uff0c\u5176\u4ed6\u6570\u636e\u7c7b\u578b\u53ea\u662f\u4e00\u4e2a\u6307\u9488\uff0c\u5b9e\u4f53\u5b58\u653e\u5728\u5806\u4e2d",o.a.createElement("br",null),"2.\u7531\u4e8e\u975e\u57fa\u672c\u6570\u636e\u7c7b\u578b\u7684\u6570\u636e\u7ed3\u6784\u9020\u6210\u6d45\u62f7\u8d1d\u548c\u6df1\u62f7\u8d1d\u7684\u95ee\u9898\uff0c\u53ef\u901a\u8fc7\u904d\u5386\u6216\u8005 JSON\u7684api\u65b9\u6cd5\u5b9e\u73b0\u6df1\u62f7\u8d1d")))}}]),l}(o.a.Component)},98:function(e,l,t){}}]);
//# sourceMappingURL=25.f2c7121a.chunk.js.map