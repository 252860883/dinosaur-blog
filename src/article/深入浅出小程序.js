import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"小程序的由来"},{"level":"h3","title":"小程序和传统web的区别"},{"level":"h3","title":"小程序运行环境"},{"level":"h3","title":"小程序的JavaScript"},{"level":"h3","title":"宿主环境"},{"level":"h3","title":"微信登陆"},{"level":"h3","title":"微信缓存"},{"level":"h3","title":"底层分析"},{"level":"h3","title":"优化"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">深入浅出小程序原理</h1></div>
<blockquote>
  <p>最近入职新公司负责小程序开发线的部分，有过vue的经历，其实微信的生态还是好上手的。就是得一点点的刨坑填坑，好在微信小程序的社区还算勤快，明显严重的bug官方会很快更新。之前已经写过一篇小程序的基础使用，那么这里就打算记录微信小程序的坑和底层原理东西啦～</p>
</blockquote>

<h3 id='小程序的由来'>小程序的由来</h3>

<p>起初，微信中的 WebView 逐渐成为 web大部分的入口，微信就推出了相关的 JS API - WeixinJSBridge。再到后来的15年初，微信推出了 JS-SDK（对WeixinJSBridge的封装），开放了几十个有关拍照、地图等等非常有用的API。使得开发人员减轻了很多开发成本。虽然 JS-SDK的出现解决了功能逻辑上的许多大问题，却没有解决诸如复杂页面的白屏、页面切换卡顿等等性能上的问题。所以需要一个全新的系统，来优化这些问题，那么小程序应运而生。</p>

<p>​对于开发者而言，小程序框架本身所具有的快速加载和快速渲染能力，加之配套的云能力、运维能力和数据汇总能力，使得开发者不需要去处理琐碎的工作，可以把精力放置在具体的业务逻辑的开发上。</p>

<h3 id='小程序和传统web的区别'>小程序和传统web的区别</h3>

<ul>
<li>web网页开发渲染线程和脚本是互斥的，而小程序对于两者是分开的，分别运行在不同的进程中，是基于双线程的</li>
<li>小程序逻辑层和渲染层是分开的所以没有DOM、BOM，相关API也不能使用（所以好多第三方和dom有关的库也不能使用）</li>
<li>每个页面都是不同的webview渲染，减轻了单个webview的压力</li>
</ul>

<h3 id='小程序运行环境'>小程序运行环境</h3>

<table><tbody><tr><th>运行环境</th><th> 逻辑层 </th></tr><tr><td> iOS </td><td> JavaScriptCore </td></tr><tr><td> Android</td><td> X5 JSCore </td></tr><tr><td> 小程序开发工具</td><td> NWJS </td></tr></tbody></table>

<h3 id='小程序的JavaScript'>小程序的JavaScript</h3>

<p>小程序的javascript和传统浏览器javascript以及nodejs是不同的。具体区分可以见下表，因为小程序没有 DOM、BOM所以不能直接获取显示元素，也不能使用JQ等库。同时小程序也不支持npm，所以小程序不支持通过npm引入其他第三方的库。</p>

<table><tbody><tr><th>小程序</th><th> 浏览器 </th><th> nodejs </th></tr><tr><td> ECMAScript </td><td> ECMAScript </td><td> ECMAScript </td></tr><tr><td> 小程序框架 </td><td> DOM </td><td> NPM </td></tr><tr><td> 小程序API </td><td> BOM </td><td> Native </td></tr></tbody></table>

<h3 id='宿主环境'>宿主环境</h3>

<p>小程序可以调用宿主环境提供的微信客户端的能力，这就使得小程序比普通网页拥有更多的能力。<br></br>- <strong>通信模型</strong><br></br>小程序的渲染层和逻辑层分别由两个进程管理，通信会由微信客户端做中转。<br></br>- <strong>数据驱动</strong><br></br>数据驱动使得数据状态和视图绑定在一起,wxml文件对应着一个js对象，可以假使这是一个dom树，当数据变化时，直接修改dom树对应的js对象，wxml对比js对象前后的差别然后进行部分渲染。这个原理听起来很熟悉嘛？是的，和vue、react的虚拟DOM大同小异，都是为了避免重复渲染“dom”做的优化。<br></br>- <strong>全局数据</strong><br></br>因为渲染层和逻辑层的分离，没打开一个页面都会各自又一个 WebView进程进行渲染，在逻辑层的JS脚本运行上下文依旧在一个进程中没有变。所以App里的globalData是可以全局获取到的喔😯</p>

<h3 id='微信登陆'>微信登陆</h3>

<p>直接摘抄官网文档的流程图：<br></br><img src="http://wx4.sinaimg.cn/mw690/a73bc6a1ly1fqgmpvs1rvj21hc0u4q6t.jpg" alt="image" title="" /></p>

<h3 id='微信缓存'>微信缓存</h3>

<p>微信提供了关于缓存的api，wx.getStorage、wx.setStorage、wx.setStorageSync。官网文档很详情，换汤不换药和传统 H5的 webStorage 很相似（确切的说这里应该和localStorage相似，因为微信的缓存如果不主动清理，一般是不会消失的）。那我就总结一下小程序专属缓存机制：<br></br>- 小程序缓存空间最大10MB，内存超出在set时会执行fail回调<br></br>- 小程序安全机制缓存对应微信号，切换微信号读取不到之前的缓存<br></br>- 如果用户储存空间不足，小程序会清空最近最久未使用的小程序的本地缓存</p>

<h3 id='底层分析'>底层分析</h3>

<ul>
<li><p><strong>Hybird技术实现小程序</strong><br></br>现在的应用形态大致分为 NativeApp（即原生app）、webApp（h5网页）、HybirdApp（字面意思，混合app）。原生和web的形态都有各自的缺点对于小程序的设计有很大缺陷，所以微信官方最后采用 HybirdApp的形态实现小程序。<br></br>市面上现有的Hybird技术比如 PhoneGap、RN(react native)，JS-SDK等。由于RN底层实现的一些问题，微信官方并没有采用RN方案。最终选择类似JS-SDK的方案实现，即界面主要由成熟的 Web 技术渲染，辅之以大量的接口提供丰富的客户端原生能力。</p></li>
<li><p><strong>双进程由来的原因</strong><br></br>1.更快，万变不离其宗，逻辑层和渲染层分开执行而不会出现逻辑阻塞不能加载UI的情况<br></br>2.安全，微信文档中是这样解释的：“我们必须提供一个沙箱环境来运行开发者的JavaScript 代码。这个沙箱环境不能有任何浏览器相关接口，只提供纯JavaScript 的解释执行环”，微信把逻辑层和渲染层隔离开，开发者便不能跳转页面、操作DOM、动态执行脚本等等，对于用户的安全性就增强了很多，当然这给刚转到小程序开发的我造成了很多困扰。</p></li>
<li><p><strong>组件</strong><br></br>1.原生组件<br></br>小程序中提供了诸如map、video、camera、canvas等原生组件，原生组件在WebView这一层的渲染任务是很简单，只需要渲染一个占位元素，之后客户端在这块占位元素之上叠了一层原生界面。因此，原生组件的层级会比所有在WebView层渲染的普通组件要高。<br></br>优点：扩展Web的能力。体验更好，同时也减轻WebView的渲染工作。绕过setData、数据通信和重渲染流程，使渲染性能更好。<br></br>缺点：一些样式不能应用于原生组件，层级覆盖问题（可以利用 cover-view），也有很多不可避免的坑<br></br>2.自定义组件</p></li>
</ul>

<h3 id='优化'>优化</h3>

<ul>
<li><strong>启动优化</strong>
小程序第一次启动时，微信需要下载小程序代码包，之后小程序代码包会被缓存，如果没有改变则会直接调用。一般情况下，小程序的代码将打包在一起，在小程序启动时一次性下载完成，所以控制代码包大小有助于减少小程序的启动时间。</li>
<li><strong>分包加载</strong>
为了减缓启动加载的压力，小程序引入了分包加载，“主包”即启动时就加载，而“分包”呢？就是在需要加载的时候再加载，和vue中得路由懒加载一样的解决办法。</li>
<li><strong>本地缓存</strong>
刚才提到微信提供了关于缓存的api，wx.getStorage、wx.setStorage、wx.setStorageSync。官网文档很详情，换汤不换药和传统 H5的 webStorage 很相似。
<strong>优点</strong>：解决的首页白屏问题，用户体验更加良好。
<strong>缺点</strong>：用户进入页面可能会闪一下之前的页面数据。</li>
</ul>

<p><strong>适用场景</strong><br></br>数据更新频率大的页面不建议写缓存，数据较少更新的适合写入缓存优化页面加载。</p>
</div>
            </div>

        )
    }
}