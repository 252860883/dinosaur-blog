import React from 'react'
import '../style/main.scss'
import MainPic3D from '../components/pic3D'

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="article">
<hr/>

<hr/>

<blockquote><p>过去,路由都是由后端实现，直接根据url来重载页面，但随着前端的工程越来越复杂，服务器压力变大。后来我们可以通过记录 url 来记录 ajax 的变化。再到后来的SPA的出现，为了实现单页应用从而出现了前端路由。在这里主要讲解前端路由的两种实现方式：history模式和hash模式。</p></blockquote>

<h2>hash模式</h2>

<p>在URL中看到 # 有两种可能，一种是我们熟知的锚点，比如点击回到顶部等等，另一种就是我们这里说到的hash路由了。许多框架，比如我们看到的vue-router等都用到了hash模式。提到hash模式需要用到一个事件：<strong>hashchange事件</strong>。它可以监听地址的hash值的变化，通过这个特性，我们可以实现hash模式的前端路由了。下面是一个实现hash路由跳转的一个demo.</p>

<p>思路如下：首先添加构造函数Router，建立一个routes对象,添加init\route\update拓展方法。作用分别是将router操作绑定到事件上、添加router、更新router。具体见下代码所示：</p>

<p><code></code>`
&lt;body&gt;
    &lt;div id=&quot;routerName&quot;&gt;&lt;/div&gt;
    &lt;a href=&quot;#/a&quot;&gt;切换a路由&lt;/a&gt;
    &lt;a href=&quot;#/b&quot;&gt;切换b路由&lt;/a&gt;
    &lt;a href=&quot;#/c&quot;&gt;切换c路由&lt;/a&gt;
&lt;/body&gt;
&lt;script&gt;
    // 创建构造函数
    function Router() {'{'}
        this.routes = {'{'}}
    }
    //注册路由
    Router.prototype.init = function () {'{'}
        // 监听路由变化
        window.addEventListener(&#39;hashchange&#39;, this.update.bind(this));
        // 监听页面加载
        window.addEventListener(&#39;load&#39;, this.update.bind(this));
    }
    // 添加路由
    Router.prototype.route = function (path, callback) {'{'}
        this.routes[path] = callback || function () {'{'} };
    }
    // 更新路由
    Router.prototype.update = function () {'{'}
        let hashPath = location.hash.split(&#39;#&#39;)[1];
        return this.routes<a href="">hashPath</a>
    }</p>

<pre><code>let updateRoute = function (path) {'{'}
    document.getElementById(&#39;routerName&#39;).innerHTML = &quot;当前路由是：&quot; + path;
}

/**
 * 创建一个路由实例
 **/
let Route = new Router();
// 添加路由
Route.route(&#39;/a&#39;, function () {'{'}
    updateRoute(&#39;/a&#39;)
})
Route.route(&#39;/b&#39;, function () {'{'}
    updateRoute(&#39;/b&#39;)
})
Route.route(&#39;/c&#39;, function () {'{'}
    updateRoute(&#39;/c&#39;)
})
// 发布路由
Route.init()</code></pre>

<p>&lt;/script&gt;
<code></code>`</p>

<p>由此原理，在vue等单页面SPA中通过路由的变化来决定显示哪些模块。</p>

<h2>History模式</h2>

<p>提到 History模式就想到了浏览器BOM的history对象了，有我们常见的 back、forward、go、length等方法。但是今天主要用到新增的两个API: <strong>history.pushState()</strong>  和  <strong>history.replaceState()</strong> 。
这两个API的作用是可以操作浏览器的历史记录，而不会引起页面的刷新。但不同之处是pushState会增加一条新的记录，而后者是直接替换当前的历史记录。
同时了解一个<code>onpopstate</code>事件,它可以监听浏览器的前进后退事件，当我们点击前进后退的时候可以使得路由同时受控。</p>
</div>
        )
    }
}