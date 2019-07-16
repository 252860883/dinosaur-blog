import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h2","title":"Hash模式"},{"level":"h2","title":"History模式"},{"level":"h3","title":"两种模式比较"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title">前端两种路由的实现原理</div>
<blockquote>
  <p>过去,路由都是由后端实现，直接根据url来重载页面，但随着前端的工程越来越复杂，服务器压力变大。后来我们可以通过记录 url 来记录 ajax 的变化。再到后来的SPA的出现，为了实现单页应用从而出现了前端路由。在这里主要讲解前端路由的两种实现方式：history模式和hash模式。</p>
</blockquote>

<h2 id='Hash模式'>Hash模式</h2>

<p>在URL中看到 # 有两种可能，一种是我们熟知的锚点，比如点击回到顶部等等，另一种就是我们这里说到的hash路由了。许多框架，比如我们看到的vue-router等都用到了hash模式。<br></br>实现hash模式的核心就是：<strong>hashchange事件</strong>，它可以监听地址的hash值的变化。下面用原生js来一步步实现一个hash路由。</p>

<ol>
<li>首先实现一个构造函数Router:</li>
</ol>

<pre><code><span></span>
<span>// 创建构造函数</span>
<span>function Router(routes) {'{'}</span>
<span>    this.routes = routes</span>
<span>}</span>
<span>//注册路由</span>
<span>Router.prototype.init = function () {'{'}</span>
<span>    // 坚听路由变化</span>
<span>    window.addEventListener('hashchange', this.update.bind(this));</span>
<span>    // 监听页面加载</span>
<span>    window.addEventListener('load', this.update.bind(this));</span>
<span>}</span>
<span>// 更新路由</span>
<span>Router.prototype.update = function () {'{'}</span>
<span>    let hashPath = location.hash.split('#')[1];</span>
<span>    let routerData = this.routes.filter(item =&gt; item.path === hashPath)[0]</span>
<span>    // 这里进行模拟组件切换操作</span>
<span>    document.getElementById('app').innerHTML =  routerData.component;</span>
<span>}</span>
<span></span>
</code></pre>

<p>从上面代码知道，首先我们需要一个盛放路由配置的容器 <code>routes</code> , <code>update方法</code> 即地址路由更新时根据 path 在路由容器里找到对应的路由信息并执行相关操作；<code>init</code> 即注册路由，将路由更新操作绑定在 <code>load</code> 和 <code>hashchange</code> 事件上。</p>

<ol>
<li>下面我们可以在实际生产环境进行使用：</li>
</ol>

<pre><code><span></span>
<span>&lt;body&gt;</span>
<span>    &lt;a href="#/a"&gt;切换a路由&lt;/a&gt;</span>
<span>    &lt;a href="#/b"&gt;切换b路由&lt;/a&gt;</span>
<span>    &lt;a href="#/c"&gt;切换c路由&lt;/a&gt;</span>
<span>    &lt;div id="app"&gt;&lt;/div&gt;</span>
<span>&lt;/body&gt;</span>
<span>&lt;script&gt;</span>
<span>    // 路由配置文件</span>
<span>    let router = [</span>
<span>        {'{'} path: 'a', component: 'a页面' },</span>
<span>        {'{'} path: 'b', component: 'b页面' },</span>
<span>        {'{'} path: 'c', component: 'c页面' }</span>
<span>    ]</span>
<span>    let route = new Router(router);</span>
<span>    route.init()</span>
<span>&lt;/script&gt;</span>
<span></span>
</code></pre>

<p>来看看实际效果：<br></br><img src="http://wx4.sinaimg.cn/large/a73bc6a1ly1g523tcdr2sg20ps0g4hdv.gif" alt="image" title="" /><br></br>由此原理，可以在vue等单页面SPA中通过路由的变化来决定显示哪些模块。</p>

<h2 id='History模式'>History模式</h2>

<p>vue-router 同时也支持 H5 history模式的路由，其主要原理用到了 H5 History 新增的两个API: <code>history.pushState()</code>  和  <code>history.replaceState()</code> 。这两个API的作用是可以操作浏览器的历史记录，而不会引起页面的刷新。但不同之处是pushState会增加一条新的记录，而后者是直接替换当前的历史记录。<br></br>同时也需要配合 <code>onpopstate</code>事件来实现,它可以监听浏览器的前进后退事件，当我们点击前进后退的时候可以使得路由同时受控。</p>

<p><code>pushState()</code> 和 <code>replaceState()</code> 接受三个对象，分别是：<br></br>1. <strong>状态对象</strong>,  opstate事件监听时，可以通过 <code>event.state</code> 拿到该对象，状态对象不能超过 640k,如果数据较大建议用缓存实现<br></br>2. <strong>标题</strong><br></br>3. <strong>URL</strong>,该参数定义了新的URL，但是页面不会进行刷新</p>

<p>具体实现见下方代码：</p>

<pre><code><span></span>
<span>&lt;body&gt;</span>
<span>    &lt;button id="a" onClick='clickHandler()'&gt;切换a路由&lt;/button&gt;</span>
<span>    &lt;button id="b" onClick='clickHandler()'&gt;切换b路由&lt;/button&gt;</span>
<span>    &lt;button id="c" onClick='clickHandler()'&gt;切换c路由&lt;/button&gt;</span>
<span>    &lt;div id="app"&gt;&lt;/div&gt;</span>
<span>&lt;/body&gt;</span>
<span>&lt;script&gt;</span>
<span>    let routerMap = [</span>
<span>        {'{'} path: 'a', component: 'a页面' },</span>
<span>        {'{'} path: 'b', component: 'b页面' },</span>
<span>        {'{'} path: 'c', component: 'c页面' }</span>
<span>    ]</span>
<span>    // 监听左右键切换</span>
<span>    window.onpopstate = function (event) {'{'}</span>
<span>        let route = event.state.route;</span>
<span>        handleRoute(route)</span>
<span>    }</span>
<span>    // 点击切换路由</span>
<span>    function clickHandler() {'{'}</span>
<span>        let route = window.event.target.id;</span>
<span>        // 向历史记录添加url</span>
<span>        history.pushState({'{'} route: route }, null, route);</span>
<span>        // 路由操作</span>
<span>        handleRoute(route)</span>
<span>    }</span>
<span>    // 模拟路由处理</span>
<span>    function handleRoute(route) {'{'}</span>
<span>        let routerData = routerMap.filter(item =&gt; item.path === route)[0]</span>
<span>        document.getElementById('app').innerHTML = routerData.component;</span>
<span>    }</span>
<span>&lt;/script&gt;</span>
<span></span>
</code></pre>

<p>实现效果：<br></br><img src="http://wx1.sinaimg.cn/large/a73bc6a1ly1g523tdmlfng20ps0g4e83.gif" alt="image" title="" /></p>

<p>但是需要注意，History模式有一个很严重的问题，因为我们的应用是个单页客户端应用，如果刷新页面 <code>xxx.com/history/a</code> 的话就会返回 404。所以需要在服务端配置，增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面。对此，vue-router 官方文档已经给了很详细的示例。</p>

<h3 id='两种模式比较'>两种模式比较</h3>

<ol>
<li><strong>Hash模式：</strong> 实现方式较为简单，兼容性较好，大部分浏览器支持，但是“#”不太美观，并且服务器不能识别hash，对SEO不友好</li>
<li><strong>History模式：</strong> 没有“#”看起来像正常的URL，由于用到了H5的API需考虑浏览器兼容性，并且需要后端配置配合，否则刷新页面会出现404</li>
</ol>
</div>
            </div>

        )
    }
}