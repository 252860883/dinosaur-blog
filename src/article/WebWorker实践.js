import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"Web Workers"},{"level":"h4","title":"兼容性"},{"level":"h4","title":"限制"},{"level":"h3","title":"实践"},{"level":"h3","title":"webpack环境下使用"},{"level":"h3","title":"使用场景"},{"level":"h3","title":"参考"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">WebWorkers 实践</h1></div>
<blockquote>
  <p>在讨论到前端该如何优化时，我们都知道可以将复杂的、耗时的任务放到 webWorker 里来处理，这样就不会去阻塞JS其余的任务处理了。那这篇文章就来进行实践一下 webWorker。</p>
</blockquote>

<h3 id='Web Workers'>Web Workers</h3>

<p>Web Workers 可以使得一个Web应用程序在与主执行线程分离的后台线程中运行一个脚本。这样的做法使得我们可以将一些复杂耗时的任务单独开发一个线程进行处理而不会导致主线程阻塞。但是这并不意味着JS语言本身支持了多线程能力，而是浏览器作为宿主环境提供了JS一个多线程运行的环境。</p>

<h4 id='兼容性'>兼容性</h4>

<table><tbody><tr><th>IE</th><th>Edge</th><th>FireFox</th><th>Chrome</th><th>Safari</th></tr><tr><td>10+</td><td>12+</td><td>3.5+</td><td>4+</td><td>4+</td></tr></tbody></table>

<h4 id='限制'>限制</h4>

<ol>
<li><strong>同源限制</strong>，worker线程必须和主线程同源</li>
<li><strong>文件限制</strong>，不能读取本地文件，并且加载的脚本必须与主线程同源</li>
<li><strong>DOM操作限制</strong>，worker线程不能读取<code>DOM对象</code>,<code>document</code>,<code>window</code>等对象，但是可以使用 <code>navigator</code>,<code>location</code>(只读),<code>XMLHttpRequest</code>,<code>setTimeout</code>等浏览器对象</li>
<li><strong>脚本限制</strong>，worker线程不能执行 <code>alert</code> 和 <code>confirm</code></li>
<li><strong>外部引用限制</strong>，必须使用 <code>importScripts</code> 来引用外部脚本</li>
</ol>

<h3 id='实践'>实践</h3>

<p>首先，我们在主线程创建 worker线程：</p>

<pre><code><span></span>
<span>// 创建 worker线程</span>
<span>let worker = new Worker('./webworker.js');</span>
<span>// 向 worker线程 发送数据</span>
<span>worker.postMessage('main message');</span>
<span>// worker线程 发送数据时的监听回调</span>
<span>worker.onmessage = ((res) =&gt; {'{'}</span>
<span>    console.log(res.data)</span>
<span>    alert(res.data)</span>
<span>})</span>
<span>// worker线程 错误时的回调</span>
<span>worker.onerror = ((error) =&gt; {'{'}</span>
<span>    console.log(error);</span>
<span>})</span>
<span>// 关闭 worker线程</span>
<span>worker.terminate();</span>
<span></span>
</code></pre>

<p>根据以上代码可知，对于主线程分别有如下几个API：</p>

<ol>
<li><strong>worker.postMessage：</strong>主线程给worker线程发送消息</li>
<li><strong>worker.onmessage：</strong>接受worker线程的消息</li>
<li><strong>worker.onerror：</strong>worker线程报错时的回调</li>
<li><strong>worker.terminate：</strong>从主线程关闭worker线程</li>
</ol>

<p>我们构建worker线程文件 <code>worker.js</code> :</p>

<pre><code><span></span>
<span>// 监听主线程</span>
<span>self.onmessage = ((res) =&gt; {'{'}</span>
<span>    console.log(res.data)</span>
<span>})</span>
<span>// 向主线程发送数据</span>
<span>self.postMessage = "worker message"</span>
<span>// 错误时的回调</span>
<span>self.onerror = ((error) =&gt; {'{'}</span>
<span>    console.log(error)</span>
<span>})</span>
<span>// worker线程关闭</span>
<span>self.close()</span>
<span></span>
</code></pre>

<p>因为主线程和worker线程不在一个线程，所以上下文也不能共用，worker线程的全局对象为 self（worker线程自身），在这里 this 指向 self，默认也可以不写self</p>

<ol>
<li><strong>self.postMessage：</strong>给主线程发送消息</li>
<li><strong>self.onmessage：</strong>接受主线程的消息</li>
<li><strong>self.onerror：</strong>worker线程报错时的回调</li>
<li><strong>self.close：</strong>从主线程关闭worker线程</li>
</ol>

<h3 id='webpack环境下使用'>webpack环境下使用</h3>

<p>上面的例子是用原生js来搞的，那我们实际生产环境呢大部分都已经用 Vue、React等等框架来写业务了，由于模块化+webpack环境，直接像原生这样用可就不行了。</p>

<p>首先，我们通过指令 <code>npm install -D worker-loader</code> 来安装 <code>worker-loader</code>。然后在 webpack配置文件中进行配置：</p>

<pre><code><span></span>
<span>...</span>
<span>  module: {'{'}</span>
<span>    rules: [</span>
<span>        ...</span>
<span>        {'{'}</span>
<span>        test: /\.worker\.js$/,</span>
<span>        loader: 'worker-loader',</span>
<span>        options: {'{'}</span>
<span>          name: '[name]:[hash:8].js',</span>
<span>          // inline: true,</span>
<span>          // fallback: false</span>
<span>          // publicPath: '/scripts/workers/'</span>
<span>        }</span>
<span>      }</span>
<span>    ]</span>
<span>  }</span>
<span></span>
</code></pre>

<p>上面的options还有几个配置项：<code>inline</code> 可以解除同源限制，把 worker 文件内联成 blob 数据格式，而不再是通过下载脚本文件的方式来使用 worker；<code>publicPath</code> 可以重写掉 worker 脚本的下载 url，当然脚本也要放到对应的位置。<br></br>这样我们对于 woker线程命名为 <code>xxx.worker.js</code> 就可以被lodar识别了，woker线程的用法和原生一样，但是在主线程的调用稍有区别：</p>

<pre><code><span></span>
<span>import Worker from "./utils/file.worker.js";</span>
<span>let webWork = new Worker();</span>
<span></span>
</code></pre>

<p><strong>坑</strong> ：在devServer模式下会报 <code>window is not defined</code> 的错，这里我们需要对 webpack配置文件进行一下修改，将 output 下添加 <code>globalObject: 'this'</code>：</p>

<pre><code><span></span>
<span>output: {'{'}</span>
<span>  path: DIST_PATH,</span>
<span>  publicPath: '/dist/',</span>
<span>  filename: '[name].bundle.[hash:8].js',</span>
<span>  chunkFilename: "[name].chunk.[chunkhash:8].js",</span>
<span>  globalObject: 'this',</span>
<span>}</span>
<span></span>
</code></pre>

<h3 id='使用场景'>使用场景</h3>

<ol>
<li>加密数据，有些加密算法会非常复杂，耗费资源与时间</li>
<li>复杂数据，一些复杂的算法比如排序、过滤、分析等等</li>
<li>预取数据，有时候为了提升数据加载速度，可以提前使用Worker线程获取数据，因为Worker线程是可以是用 XMLHttpRequest 的</li>
<li>预渲染，在一些渲染场景需要复杂的计算，比如反射、折射、材料等，这些可以使用 worker线程来做</li>
<li>预加载图片，如果一个页面有很多图片并且业务不需要懒加载则可以使用worker线程来加载</li>
</ol>

<h3 id='参考'>参考</h3>

<blockquote>
  <p><a href="https://juejin.im/post/5acf348151882579ef4f5a77">怎么在 ES6+Webpack 下使用 Web Worker</a><br></br><a href="https://mp.weixin.qq.com/s/i1xBLUtVRPhWnl_1EuJVkA">前端 Web Workers 到底是什么？</a></p>
</blockquote>
</div>
            </div>

        )
    }
}