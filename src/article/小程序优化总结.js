import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h2","title":"1.启动加载性能"},{"level":"h4","title":"控制代码包大小"},{"level":"h4","title":"分包加载"},{"level":"h4","title":"首屏加载优化"},{"level":"h2","title":"2.渲染性能优化"},{"level":"h4","title":"避免不当使用 setData"},{"level":"h4","title":"避免不当使用 onPageScroll"},{"level":"h4","title":"建议使用自定义组件"},{"level":"h4","title":"WXS响应事件"}]
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
<div className="title-content"><h1 className="title">小程序优化总结</h1></div>
<blockquote>
  <p>小程序的优化主要分两个方向优化，一个是对启动时的加载时间进行优化，另一个是在对页面进行渲染时的优化。</p>
</blockquote>

<h2 id='1.启动加载性能'>1.启动加载性能</h2>

<blockquote>
  <p>小程序打开经历的三个步骤：资源准备、业务代码注入和渲染、异步请求数据</p>
</blockquote>

<h4 id='控制代码包大小'>控制代码包大小</h4>

<p>压缩工具进行压缩，及时清理无用代码和资源、减少图片等资源文件（换成网络图片）</p>

<h4 id='分包加载'>分包加载</h4>

<p>主包只保留最常用的核心页面，启动时只加载主包（优化：即将推出 分包预加载、独立分包：不需要下载主包）</p>

<h4 id='首屏加载优化'>首屏加载优化</h4>

<ul>
<li>提前请求，不需要页面显示之后再加载</li>
<li>利用缓存，二次调用先调请求</li>
<li>避免白屏，先展示页面骨架和基础内容</li>
<li>及时反馈用户</li>
</ul>

<h2 id='2.渲染性能优化'>2.渲染性能优化</h2>

<h4 id='避免不当使用 setData'>避免不当使用 setData</h4>

<ul>
<li>每次的setData调用都是一次进程的通信操作，建议data对象只存储与页面相关的数据</li>
<li>通信开销和数据量成正比，建议使用key值来进行局部渲染（虚拟dom）</li>
<li>setData会引发视图层的内容更新，由于 js单线程的原因会阻塞用户交互，所以对连续的setData操作进行合并</li>
</ul>

<h4 id='避免不当使用 onPageScroll'>避免不当使用 onPageScroll</h4>

<ul>
<li>少用</li>
<li>避免复杂逻辑</li>
<li>在事件中减少频繁调用setData</li>
</ul>

<h4 id='建议使用自定义组件'>建议使用自定义组件</h4>

<ul>
<li>自定义组件更新只在自己的内部发生更新，不会造成全局重绘</li>
</ul>

<h4 id='WXS响应事件'>WXS响应事件</h4>

<p>有频繁用户交互的效果在小程序上表现是比较卡顿的,因为每进行一次操作就会经过2次的逻辑层和渲染层的通信以及一次渲染。为了解决这个问题，微信小程序提供了<code>WX响应事件</code>。基本思路就是让事件在视图层响应。</p>

<p>下面我们来动手实现一个元素跟随鼠标移动的效果。首先定义一个<code>movable.wxs</code>文件，与其他点击事件的区别是传参多了第二个参数，它表示触发事件的组件(或页面)的<code>ComponentDescriptor</code>实例,</p>

<pre><code><span></span>
<span>// movable.wxs</span>
<span>var startX = 0</span>
<span>var startY = 0</span>
<span>var lastLeft = lastTop = 50</span>
<span>function touchstart(event, ins) {'{'}</span>
<span>  var touch = event.touches[0] || event.changedTouches[0]</span>
<span>  startX = touch.pageX</span>
<span>  startY = touch.pageY</span>
<span>  ins.callMethod('testCallmethod', {'{'}</span>
<span>    complete: function(res) {'{'}</span>
<span>      console.log('args', res)</span>
<span>    }</span>
<span>  })</span>
<span>}</span>
<span>function touchmove(event, ins) {'{'}</span>
<span>  var touch = event.touches[0] || event.changedTouches[0]</span>
<span>  var pageX = touch.pageX</span>
<span>  var pageY = touch.pageY</span>
<span>  var left = pageX - startX + lastLeft</span>
<span>  var top = pageY - startY + lastTop</span>
<span>  startX = pageX</span>
<span>  startY = pageY</span>
<span>  lastLeft = left</span>
<span>  lastTop = top</span>
<span>  ins.selectComponent('.movable').setStyle({'{'}</span>
<span>    left: left + 'px',</span>
<span>    top: top + 'px'</span>
<span>  })</span>
<span>}</span>
<span>module.exports = {'{'}</span>
<span>  touchstart: touchstart,</span>
<span>  touchmove: touchmove,</span>
<span>}</span>
<span></span>
</code></pre>

<p>下面在<code>movable.wxml</code>文件中引入wxs文件，再进行事件的调用就可以了：</p>

<pre><code><span></span>
<span>// movable.wxml</span>
<span>&lt;wxs module="test" src="./movable.wxs"&gt;&lt;/wxs&gt; </span>
<span>&lt;view </span>
<span>  wx:if="{'{'}{'{'}show}}" </span>
<span>  class="area" </span>
<span>  style='position:relative;width:100%;height:100%;'&gt;</span>
<span>  &lt;view </span>
<span>    data-index="1" </span>
<span>    data-obj="{'{'}{'{'}dataObj}}" </span>
<span>    bindtouchstart="{'{'}{'{'}test.touchstart}}" </span>
<span>    bindtouchmove="{'{'}{'{'}test.touchmove}}" </span>
<span>    bindtouchend='{'{'}{'{'}test.touchmove}}' </span>
<span>    class="movable" </span>
<span>    style="position:absolute;width:100px;height:100px;background:red;left:{'{'}{'{'}left}}px;top:{'{'}{'{'}top}}px"&gt;</span>
<span>  &lt;/view&gt;</span>
<span>&lt;/view&gt;</span>
<span></span>
</code></pre>
</div>
            </Fragment>
        )
    }
}