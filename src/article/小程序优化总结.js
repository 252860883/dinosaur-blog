import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h2","title":"1.启动加载性能"},{"level":"h4","title":"控制代码包大小"},{"level":"h4","title":"分包加载"},{"level":"h4","title":"首屏加载优化"},{"level":"h2","title":"2.渲染性能优化"},{"level":"h4","title":"避免不当使用 setData"},{"level":"h4","title":"避免不当使用 onPageScroll"},{"level":"h4","title":"建议使用自定义组件"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
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
</div>
            </div>

        )
    }
}