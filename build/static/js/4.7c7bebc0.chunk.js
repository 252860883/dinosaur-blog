(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{101:function(e,n,a){"use strict";a.d(n,"a",function(){return m});var t=a(3),l=a(4),r=a(6),c=a(5),s=a(7),u=a(0),o=a.n(u),m=(a(102),function(e){function n(){var e,a;Object(t.a)(this,n);for(var l=arguments.length,s=new Array(l),u=0;u<l;u++)s[u]=arguments[u];return(a=Object(r.a)(this,(e=Object(c.a)(n)).call.apply(e,[this].concat(s)))).clickPosBtn=function(e){var n=document.getElementById(e);window.scrollTo({top:n.offsetTop-10,left:0,behavior:"smooth"})},a}return Object(s.a)(n,e),Object(l.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"headerLink"},o.a.createElement("div",{className:"content"},o.a.createElement("div",{className:"real-content"},o.a.createElement("div",{className:"tag"},"Reading Assistance \xb7"),this.props.headerLink.map(function(n,a){return o.a.createElement("span",{className:"a"+n.level,key:a,onClick:function(){return e.clickPosBtn(n.title)}},n.title)}))))}}]),n}(o.a.Component))},102:function(e,n,a){},28:function(e,n,a){"use strict";a.r(n),a.d(n,"default",function(){return p});var t=a(3),l=a(4),r=a(6),c=a(5),s=a(7),u=a(0),o=a.n(u),m=(a(99),a(101)),p=function(e){function n(){var e;return Object(t.a)(this,n),(e=Object(r.a)(this,Object(c.a)(n).call(this))).state={headerLink:[{level:"h3",title:"\u6982\u5ff5"},{level:"h3",title:"\u5b9e\u73b0"},{level:"h3",title:"\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f"},{level:"h3",title:"\u4f18\u70b9"}]},e}return Object(s.a)(n,e),Object(l.a)(n,[{key:"componentWillMount",value:function(){}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return o.a.createElement(u.Fragment,null,o.a.createElement(m.a,{headerLink:this.state.headerLink}),o.a.createElement("div",{className:"article"},o.a.createElement("div",{className:"title-content"},o.a.createElement("h1",{className:"title"},"JavaScript\u8bbe\u8ba1\u6a21\u5f0f\uff08\u4e00\uff09\u89c2\u5bdf\u8005\u6a21\u5f0f")),o.a.createElement("blockquote",null,o.a.createElement("p",null,"\u89c2\u5bdf\u8005\u6a21\u5f0f\u53ef\u8c13\u662f\u8bbe\u8ba1\u6a21\u5f0f\u4e2d\u975e\u5e38\u7ecf\u5178\u7684\u4e00\u4e2a\u4e86\uff0c\u5728\u4f17\u591a\u7684\u524d\u7aef\u5e93\u4e2d\u4e5f\u80fd\u627e\u5230\u4ed6\u7684\u8e2a\u8ff9\uff0c\u6bd4\u5982JQ\u7684on\u548ctrigger\u4e2d\u5c01\u88c5\u7684\u65b9\u6cd5\u3001VUE\u7ec4\u4ef6\u95f4\u5b9e\u73b0\u901a\u4fe1\u7684emit()\u548con()\u65b9\u6cd5\u7b49\u7b49\u3002\u81ea\u4ece\u67d0\u6b21\u9762\u8bd5\u88ab\u65b0\u6d6adalao\u8981\u6c42\u624b\u5199\u89c2\u5bdf\u8005\u6a21\u5f0f\u4ee3\u7801\u88ab\u60e8\u8650\u4ee5\u540e\u4fbf\u51b3\u5fc3\u597d\u597d\u7814\u7a76\u4e00\u4e0b\u8fd9\u4e2a\u4e1c\u897f\uff01")),o.a.createElement("h3",{id:"\u6982\u5ff5"},"\u6982\u5ff5"),o.a.createElement("p",null,"\u89c2\u5bdf\u8005\u6a21\u5f0f\u662f\u6307\u4e00\u4e2a\u5bf9\u8c61\uff08subject\uff09\u7ef4\u6301\u4e00\u7cfb\u5217\u4f9d\u8d56\u4e8e\u5b83\u7684\u89c2\u5bdf\u8005\u5bf9\u8c61\uff08observer\uff09\uff0c\u5c06\u6709\u5173\u72b6\u6001\u7684\u53d8\u5316\u540c\u6b65\u901a\u77e5\u7ed9\u4ed6\u4eec\u3002"),o.a.createElement("h3",{id:"\u5b9e\u73b0"},"\u5b9e\u73b0"),o.a.createElement("p",null,"\u90a3\u4e48\u5177\u4f53\u5b9e\u73b0\u5f00\u53d1\u8005\u6a21\u5f0f\u4e3b\u8981\u5206\u4e09\u4e2a\u6b65\u9aa4\uff1a",o.a.createElement("br",null)," 1. \u521b\u5efa\u6784\u9020\u51fd\u6570\uff0c\u51fd\u6570\u5185\u521b\u5efa\u4e00\u4e2a\u89c2\u5bdf\u8005\u7f13\u5b58\u5217\u8868\uff0c\u7528\u6765\u5b58\u653e\u6240\u6709\u7684\u89c2\u5bdf\u8005\u5bf9\u8c61",o.a.createElement("br",null)," 2. \u5c01\u88c5\u6dfb\u52a0\u89c2\u5bdf\u8005\u65b9\u6cd5\uff0c\u5c06\u89c2\u5bdf\u8005\u5199\u5165\u7f13\u5b58\u5217\u8868",o.a.createElement("br",null)," 3. \u5c01\u88c5\u53d1\u5e03\u8005\u65b9\u6cd5\uff0c\u51fd\u6570\u6267\u884c\u65f6\uff0c\u904d\u5386\u7f13\u5b58\u5217\u8868\uff0c\u6267\u884c\u5bf9\u5e94\u89c2\u5bdf\u8005\u7684\u64cd\u4f5c",o.a.createElement("br",null)," 4. new\u6784\u9020\u51fd\u6570\u521b\u5efa\u4e00\u4e2a\u5b9e\u4f8b\uff0c\u6267\u884c\u540e\u7eed\u64cd\u4f5c"),o.a.createElement("p",null,"\u4e0a\u4ee3\u7801\uff1a",o.a.createElement("br",null)," "),o.a.createElement("pre",null,o.a.createElement("code",null,o.a.createElement("span",null),o.a.createElement("span",null,"        // \u521b\u5efa\u6784\u9020\u51fd\u6570"),o.a.createElement("span",null,"        function Observer() ","{"),o.a.createElement("span",null,"            //\u521b\u5efa\u89c2\u5bdf\u8005\u6570\u7ec4"),o.a.createElement("span",null,"            this.observerList = [];"),o.a.createElement("span",null,"        }"),o.a.createElement("span",null,"        Observer.prototype.on = function (obj) ","{"),o.a.createElement("span",null,"            this.observerList.push(obj);"),o.a.createElement("span",null,"        }"),o.a.createElement("span",null,"        Observer.prototype.emit = function () ","{"),o.a.createElement("span",null,"            // \u904d\u5386\u6570\u7ec4\u6240\u6709\u7684\u89c2\u5bdf\u8005\u5e76\u6267\u884c\u64cd\u4f5c"),o.a.createElement("span",null,"            this.observerList.forEach(obj => ","{"),o.a.createElement("span",null,"                obj.apply(this, arguments)"),o.a.createElement("span",null,"            })"),o.a.createElement("span",null,"        }"),o.a.createElement("span",null,"        // \u6e05\u9664\u7ed1\u5b9a\uff0c\u6e05\u695a\u67d0\u4e2a\u7ed1\u5b9a\u76f4\u63a5\u5bf9\u6570\u7ec4\u8fdb\u884c\u589e\u5220\u64cd\u4f5c\uff0c\u8fd9\u91cc\u4e0d\u4e00\u4e00\u5217\u4e3e"),o.a.createElement("span",null,"        Observer.prototype.clean = function (obj) ","{"),o.a.createElement("span",null,"            this.observerList = [];"),o.a.createElement("span",null,"        }"),o.a.createElement("span",null),o.a.createElement("span",null,"        var ob = new Observer();"),o.a.createElement("span",null,"        ob.on(function (name) ","{"),o.a.createElement("span",null,'            console.log("\u4f60\u7684\u540d\u5b57\u662f" + name)'),o.a.createElement("span",null,"        })"),o.a.createElement("span",null,"        ob.on(function (year) ","{"),o.a.createElement("span",null,'            console.log("\u4f60\u7684\u5e74\u7eaa" + year)'),o.a.createElement("span",null,"        })"),o.a.createElement("span",null,"        ob.emit('Dan')"),o.a.createElement("span",null,"        ob.emit(6)"),o.a.createElement("span",null,"        ob.clean()"),o.a.createElement("span",null,"        ob.emit('Danny', 23)"),o.a.createElement("span",null),o.a.createElement("span",null,"        /** "),o.a.createElement("span",null,"         * \u8f93\u51fa\uff1a"),o.a.createElement("span",null,"         * \u4f60\u7684\u540d\u5b57\u662fDan"),o.a.createElement("span",null,"         * \u4f60\u7684\u5e74\u7eaaDan"),o.a.createElement("span",null,"         * \u4f60\u7684\u540d\u5b57\u662f6"),o.a.createElement("span",null,"         * \u4f60\u7684\u5e74\u7eaa6"),o.a.createElement("span",null,"        */"),o.a.createElement("span",null),o.a.createElement("span",null," "))),o.a.createElement("p",null,"\u8fd9\u6837\u4e00\u4e2a\u7b80\u5355\u7684\u89c2\u5bdf\u8005\u6a21\u5f0f\u5c31\u53ef\u4ee5\u5b9e\u73b0\u4e86\uff0c\u4f46\u662f\u540c\u65f6\u53d1\u73b0\u4e86\u4e00\u4e2a\u95ee\u9898 subject \u548c observer\u662f\u6df7\u6dc6\u7684\uff0c\u5e76\u4e0d\u4f1a\u5206\u5f00\u5bf9\u5e94\uff0c\u6240\u4ee5\u4e0b\u9762\u5c31\u505a\u8fdb\u4e00\u6b65\u7684\u5347\u7ea7\uff0c\u4e5f\u5c31\u662f\u6211\u4eec\u5e38\u5e38\u63d0\u5230\u7684\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f\u4e86\u3002"),o.a.createElement("h3",{id:"\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f"},"\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f"),o.a.createElement("p",null,"\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f\u7684\u4e0d\u540c\u4e4b\u5904\u662f\u4f7f\u7528\u4e86\u4e00\u4e2a\u4e3b\u9898/\u4e8b\u4ef6\u901a\u9053\uff0c\u8fd9\u4e2a\u901a\u9053\u662f\u4ecb\u4e8e\u5e0c\u671b\u63a5\u6536\u5230\u901a\u77e5\u7684\u5bf9\u8c61\u548c\u6fc0\u6d3b\u4e8b\u4ef6\u5bf9\u8c61\u4e4b\u95f4\uff0c\u901a\u4fd7\u8bb2\u53ef\u4ee5\u901a\u8fc7\u4f20\u9012\u4e00\u4e2a\u7279\u5b9a\u7684key\u6307\u6765\u5b9e\u73b0\u3002\u5176\u76ee\u7684\u662f\u4f7f\u53d1\u5e03\u8005\u548c\u8ba2\u9605\u8005\u4e4b\u95f4\u4ea7\u751f\u4f9d\u8d56\u5173\u7cfb\u3002",o.a.createElement("br",null),"\u4fee\u6539\u4ee3\u7801\u5982\u4e0b\uff1a"),o.a.createElement("pre",null,o.a.createElement("code",null,o.a.createElement("span",null),o.a.createElement("span",null,"        // \u521b\u5efa\u6784\u9020\u51fd\u6570"),o.a.createElement("span",null,"        function Observer2() ","{"),o.a.createElement("span",null,"            //\u521b\u5efa\u89c2\u5bdf\u8005\u6570\u7ec4"),o.a.createElement("span",null,"            this.observerList = [];"),o.a.createElement("span",null,"        }"),o.a.createElement("span",null,"        Observer2.prototype.on = function (key, obj) ","{"),o.a.createElement("span",null,"            if (!this.observerList[key]) ","{"),o.a.createElement("span",null,"                this.observerList[key] = []"),o.a.createElement("span",null,"            }"),o.a.createElement("span",null,"            //\u5c06observerpush\u8fdb\u5bf9\u5e94\u7684key\u5185\u5b58\u4e2d"),o.a.createElement("span",null,"            this.observerList[key].push(obj);"),o.a.createElement("span",null,"        }"),o.a.createElement("span",null,"        Observer2.prototype.emit = function () ","{"),o.a.createElement("span",null,"            //\u83b7\u53d6key\u503c"),o.a.createElement("span",null,"            var oKey = Array.prototype.shift.apply(arguments);"),o.a.createElement("span",null,"            // \u904d\u5386\u6570\u7ec4\u6240\u6709\u7684\u89c2\u5bdf\u8005\u5e76\u6267\u884c\u64cd\u4f5c"),o.a.createElement("span",null,"            this.observerList[oKey].forEach(obj => ","{"),o.a.createElement("span",null,"                obj.apply(this, arguments)"),o.a.createElement("span",null,"            })"),o.a.createElement("span",null,"        }"),o.a.createElement("span",null),o.a.createElement("span",null,"        var ob2 = new Observer2();"),o.a.createElement("span",null),o.a.createElement("span",null,"        ob2.on('buy', function (shop) ","{"),o.a.createElement("span",null,'            console.log("\u8d2d\u4e70\uff1a" + shop);'),o.a.createElement("span",null,"        })"),o.a.createElement("span",null,"        ob2.on('sale', function (shop) ","{"),o.a.createElement("span",null,"            console.log('\u552e\u5356\uff1a' + shop)"),o.a.createElement("span",null,"        })"),o.a.createElement("span",null,"        ob2.emit('buy', \"\u51b0\u6fc0\u51cc\")"),o.a.createElement("span",null,"        ob2.emit('sale', \"\u897f\u74dc\")"),o.a.createElement("span",null))),o.a.createElement("h3",{id:"\u4f18\u70b9"},"\u4f18\u70b9"),o.a.createElement("ol",null,o.a.createElement("li",null,"\u5f02\u6b65\u7f16\u7a0b"),o.a.createElement("li",null,"\u5229\u4e8e\u4ee3\u7801\u7684\u677e\u6563\u8026\u5408"))))}}]),n}(o.a.Component)},99:function(e,n,a){}}]);
//# sourceMappingURL=4.7c7bebc0.chunk.js.map