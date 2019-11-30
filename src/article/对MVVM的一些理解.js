import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"回顾MVC"},{"level":"h3","title":"前端开发中的痛点"},{"level":"h3","title":"MVVM"},{"level":"h4","title":"Modal 层"},{"level":"h4","title":"View 层"},{"level":"h4","title":"ViewModal 层"},{"level":"h3","title":"参考"}]
        }
    }
    componentWillMount(){
    }
    componentDidMount() {
    }
    render() {
        return (
            <Fragment>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">对MVVM的一些理解</h1></div>
<h3 id='回顾MVC'>回顾MVC</h3>

<p>MVC（Modal数据模型,View视图,Controller控制器）是一种架构设计模式，它通过关注点分离鼓励改进应用程序组织。对于后端技术，MVC模式很常见，在Javascript语言中也出现了一些支持MVC的框架，比如 Backbone、Ember.js、AngularJS等。</p>

<p>MVC这种关注点分离有利于进一步简化应用程序功能的模块化，并且可以实现：</p>

<ol>
<li>整体更容易维护</li>
<li>解耦 Modal 和 View</li>
<li>模块分离可以使负责界面或是核心逻辑的开发人员同时工作</li>
</ol>

<h3 id='前端开发中的痛点'>前端开发中的痛点</h3>

<ol>
<li>在代码中大量调用相同的 DOM API, 处理繁琐 ，操作冗余，使得代码难以维护。</li>
<li>大量的DOM操作使页面渲染性能降低，加载速度变慢，影响用户体验。</li>
<li>当 Model 频繁发生变化，开发者需要主动更新到View；当用户的操作导致 Model 发生变化，开发者同样需要将变化的数据同步到Model中，这样的工作不仅繁琐，而且很难维护复杂多变的数据状态。</li>
</ol>

<p>虽然后来出现了JQuery库，封装了api和polyfill，大大的减轻了前端的开发工作，但是这仅仅只是解决了第一个痛点，关于 DOM 和 Modal 数据更新并没有得到解决。</p>

<h3 id='MVVM'>MVVM</h3>

<p>MVVM 由 MVC模式衍生而来，它的出现促进了前端开发与后端业务逻辑的分离，极大地提高了前端开发效率 实践出了 React、Vue等框架。MVVM 包括三个部分： <strong>Modal(模型)</strong> 、 <strong>View(视图)</strong> 、 <strong>viewModel(视图模型)</strong> 。</p>

<p><img src="http://wx2.sinaimg.cn/mw690/a73bc6a1ly1g68ooz9ckij20qu08nwen.jpg" alt="image" title="" /></p>

<h4 id='Modal 层'>Modal 层</h4>

<p>和 MVC 中的 Modal一样，它表示应用程序中将用到的数据或信息，通俗来讲也就是后端接口返回的数据，接口给啥咱们就要啥，不会对其进行处理：</p>

<pre><code><span></span>
<span>"data": {'{'}</span>
<span>    "success": true,</span>
<span>    "name": "IoveC",</span>
<span>    "domain": "www.cnblogs.com"</span>
<span>}</span>
<span></span>
</code></pre>

<h4 id='View 层'>View 层</h4>

<p>View 层也就是视图层，前端主要通过 HTML 和 CSS 来构建。</p>

<pre><code><span></span>
<span>&lt;div id="app"&gt;</span>
<span>    &lt;p&gt;{'{'}{'{'}message}}&lt;/p&gt;</span>
<span>    &lt;button v-on:click="showMessage()"&gt;Click me&lt;/button&gt;</span>
<span>&lt;/div&gt;</span>
<span></span>
</code></pre>

<h4 id='ViewModal 层'>ViewModal 层</h4>

<p>ViewModal 是 MVVM 的核心思想，它作为 View 和 Model 的中间者架起一座通道,是由前端开发人员组织生成和维护的视图数据层。在 ViewModal 中需要将从后端获取的 Modal 数据进行封装，生成符合 View 层展现的数据模型。和 Modal 层的数据模型不同的是，ViewModal 层的数据模型不仅包括状态同时也包含页面行为，比如页面在不同的状态下如何去展示，点击按钮如何展示等等。这样的封装使得 ViewModel 可以完整地去描述 View 层。</p>

<p>同时，MVVM 框架实现了双向绑定，这样 ViewModel 的内容会实时展现在 View 层，前端开发者再也不必低效又麻烦地通过操纵 DOM 去更新视图。下面用Vue的例子来说明 ViewModal 层做了哪些：</p>

<pre><code><span></span>
<span>var app = new Vue({'{'}</span>
<span>    el: '#app',</span>
<span>    data: {'{'}  // 用于描述视图状态   </span>
<span>        message: 'Hello Vue!', </span>
<span>    },</span>
<span>    methods: {'{'}  // 用于描述视图行为  </span>
<span>        showMessage(){'{'}</span>
<span>            let vm = this;</span>
<span>            alert(vm.message);</span>
<span>        }</span>
<span>    },</span>
<span>    created(){'{'}</span>
<span>        let vm = this;</span>
<span>        // Ajax 获取 Model 层的数据</span>
<span>        ajax({'{'}</span>
<span>            url: '/your/server/data/api',</span>
<span>            success(res){'{'}</span>
<span>                vm.message = res;</span>
<span>            }</span>
<span>        });</span>
<span>    }</span>
<span>})</span>
<span></span>
</code></pre>

<h3 id='参考'>参考</h3>

<blockquote>
  <p><a target="_blank" href="https://www.liaoxuefeng.com/wiki/1022910821149312/1108898947791072">MVVM</a><br></br><a target="_blank" href="https://www.amazon.cn/dp/B00K745SMO/ref=sr_1_3?__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&amp;keywords=js%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F&amp;qid=1566472810&amp;s=gateway&amp;sr=8-3">JavaScript设计模式</a><br></br><a target="_blank" href="https://juejin.im/post/5d59f2a451882549be53b170#heading-20">30 道 Vue 面试题</a></p>
</blockquote>
</div>
            </Fragment>
        )
    }
}