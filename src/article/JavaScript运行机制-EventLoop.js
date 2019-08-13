import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"单线程"},{"level":"h3","title":"执行栈"},{"level":"h3","title":"任务队列"},{"level":"h3","title":"Event Loop"},{"level":"h3","title":"Nodejs环境的 Event Loop"},{"level":"h4","title":"事件循环六个阶段"},{"level":"h4","title":"process.nextTick 与 setImmediate"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">JavaScript运行机制 EventLoop</h1></div>
<h3 id='单线程'>单线程</h3>

<p>相信了解 JavaScript 语言的人都知道，由于 JavaScript 脚本语言的特殊性，决定了它需要单线程运行。后来H5规范推出了 Web Worker 允许 JavaScript 可以创建多个线程，但是子线程仍然是完全受主线程的控制，所以本质上还是单线程的。</p>

<p>既然是单线程的，那我就有疑问了，我们平时经常进行 Ajax请求 、 setTimeout 等异步操作，浏览器会一直等待事件结束才执行下一个吗？如果一个请求的时间非常长，那这肯定是不行的。所以我们下面就来引入 任务队列 和 执行栈 的概念。</p>

<h3 id='执行栈'>执行栈</h3>

<p>首先来讲下JS执行栈，既然是栈嘛，那肯定采用的是后进先出的规则,主要用于存储在代码执行期间创建的所有执行上下文。<br></br>当 JavaScript 引擎首次读取脚本时，会创建一个全局执行上下文并将其推入当前的执行栈。每当发生一个函数调用，引擎都会为该函数创建一个新的执行上下文并将其推到当前执行栈的顶端。引擎会运行执行上下文在执行栈顶端的函数，当此函数运行完成后，其对应的执行上下文将会从执行栈中弹出，上下文控制权将移到当前执行栈的下一个执行上下文。我们来举个例子：</p>

<pre><code><span></span>
<span>var a= 1;</span>
<span>function father(){'{'}</span>
<span>    console.log('enter father function');</span>
<span>    child();</span>
<span>    console.log('father function is over')</span>
<span>}</span>
<span>function child(){'{'}</span>
<span>    console.log('enter child function');</span>
<span>}</span>
<span>father();</span>
<span></span>
</code></pre>

<p>上述函数的执行栈操作顺序如下图所示：<br></br><img src="http://wx3.sinaimg.cn/large/a73bc6a1ly1g0nh0euy5zj219s0ce75m.jpg" alt="image" title="" /></p>

<p>理解了执行栈，我们可以知道我们脚本中的代码都会被依次执行，可是这依然没有解决我们一开始的疑惑，异步代码该怎么办呢？</p>

<h3 id='任务队列'>任务队列</h3>

<p>前面已经知道了，同步任务会被依次放到执行栈执行。那异步任务执行得到的结果回调函数会被放到任务队列中。当我们的执行栈中的所有同步任务执行完毕，引擎就会读取任务队列的事件，放入执行栈进行执行。任务队列是一个先进先出的数据结构，排在前面的事件会被优先处理。当然涉及到定时器任务时，只会在规定时间之后被执行。</p>

<p>除了异步任务，一些用户产生的事件比如 click 、 scroll 等只要涉及到了回调函数，都会统一放进任务队列等待主线程处理。而任务队列也分为两种，宏任务队列与微任务队列。不同的任务会被分配进入不同的队列。<br></br><strong>- 宏任务 与 微任务</strong><br></br>**macrotask(宏任务)<strong>：包括<code>整体代码script</code>，<code>setTimeout</code>，<code>setInterval</code>，<code>setImmediate</code>,<code>I/O</code>,<code>requestAnimationFrame</code>。<br></br>**microtask（微任务）</strong>，每个宏任务中都可以执行微任务，当宏任务执行完成会去执行包含的所有微任务，微任务执行完毕后这一轮事件循环才算结束。<strong>但是当 microtask 执行完之前是不会执行下一个宏任务的</strong>。 常见的 microtask 有：<code>Process.nextTick（Node独有）</code>、<code>Promise</code>、<code>Object.observe(废弃)</code>、<code>MutationObserver</code>。同时由于 <code>async\await</code>本质上是基于 promise 的一些封装，所以也属于微任务。</p>

<p>所以简单来记,执行的过程一般是：一个宏任务，所有微任务，一个宏任务，所有微任务...</p>

<p>知道了微任务与宏任务，来做一个非常经典的面试题：</p>

<pre><code><span></span>
<span>setTimeout(function() {'{'}</span>
<span>    console.log(1);</span>
<span>})</span>
<span></span>
<span>new Promise(function(resolve) {'{'}</span>
<span>    console.log(2);</span>
<span>}).then(function() {'{'}</span>
<span>    console.log(3);</span>
<span>})</span>
<span></span>
<span>console.log(4);</span>
<span></span>
</code></pre>

<p>我们来梳理一下：<br></br>1.首先整段代码作为一个宏任务，放进执行栈执行<br></br>2.setTimout，将其回调函数放入宏任务队列<br></br>3.执行 new Promise() ,输出 2, then函数分发到微任务队列<br></br>4.执行 console.log(4),输出 4<br></br>5.第一轮的宏任务结束，开始查询微任务队列，then函数在，执行，输出 3 <br></br>6.第一轮事件循环结束，开始第二轮<br></br>7.宏任务队列查询，setTimeout在，执行，输出1</p>

<p>所以答案就是：<code>2 4 3 1</code></p>

<h3 id='Event Loop'>Event Loop</h3>

<p>通过上面，我们已经对执行栈、宏任务、微任务队列有所了解，那事件循环是什么呢？每次宏任务结束（包含微任务结束）之后，系统会检查是否有要执行的宏任务，这个检查的过程是持续的，每完成一个任务都会进行一次检查，这样的操作被称为<strong>事件循环</strong>。<br></br>最后来张图表示下吧：<br></br><img src="http://wx2.sinaimg.cn/mw690/a73bc6a1ly1g1wqhooik6j20h90cfaak.jpg" alt="image" title="" /></p>

<h3 id='Nodejs环境的 Event Loop'>Nodejs环境的 Event Loop</h3>

<h4 id='事件循环六个阶段'>事件循环六个阶段</h4>

<p>在node中事件每一轮循环按照顺序分为6个阶段：</p>

<ol>
<li>timers：执行满足条件的setTimeout、setInterval回调。</li>
<li>I/O callbacks：是否有已完成的I/O操作的回调函数，来自上一轮的poll残留。</li>
<li>idle，prepare：仅系统内部使用。</li>
<li>poll：等待还没完成的I/O事件，会因timers和超时时间等结束等待。</li>
<li>check：执行setImmediate的回调。</li>
<li>close callbacks：关闭所有的closing handles，例如socket.on('close'[,fn])、http.server.on('close, fn)等。</li>
</ol>

<p>与浏览器不同的是，nodejs环境下每个阶段结束后都会执行完所有的微任务，同时 <code>process.nextTick</code> 会优先于其他微任务执行。</p>

<h4 id='process.nextTick 与 setImmediate'>process.nextTick 与 setImmediate</h4>

<p>与浏览器相比，Nodejs 拥有两个特殊的异步操作API <code>process.nextTick</code> 与 <code>setImmediate</code>。<br></br><code>process.nextTick</code> ,Nodejs执行完所有同步任务，接下来就会执行process.nextTick的任务队列，如果希望异步的任务尽快执行完毕，那就可以使用它:</p>

<pre><code><span></span>
<span> process.nextTick(() =&gt; console.log(3)); </span>
<span> Promise.resolve().then(() =&gt; console.log(4)); </span>
<span> //output: 3 4</span>
<span></span>
</code></pre>

<p><code>setImmediate</code> 的回调函数是被放在check阶段执行，即相当于事件循环的最后阶段，它的执行顺序会比 <code>setTimeout</code> 晚。</p>

<p><code>process.nextTick</code> 的优势就在于可以插入到每个阶段之后，当该阶段执行完毕后就能立马执行，但是使用不当也可能会造成I/O饥饿。</p>

<p>我们举个例子看下</p>

<blockquote>
  <p>参考:<br></br><a href="https://juejin.im/post/59e85eebf265da430d571f89#comment">这一次，彻底弄懂 JavaScript 执行机制</a><br></br><a href="https://www.oecom.cn/understand-js-run-stack-and-world/">如何理解js的执行上下文与执行栈</a><br></br><a href="https://www.imooc.com/article/40020#">一次搞懂Event loop</a><br></br><a href="https://juejin.im/post/5aa5dcabf265da239c7afe1e">浏览器和Node不同的事件循环</a></p>
</blockquote>
</div>
            </div>

        )
    }
}