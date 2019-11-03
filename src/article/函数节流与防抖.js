import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"节流函数（Throttle）"},{"level":"h3","title":"防抖函数（Debounce）"},{"level":"h3","title":"利用 Throttle 优化 Debounce"},{"level":"h3","title":"requestAnimationFrame"},{"level":"h3","title":"总结"}]
        }
    }
    componentDidMount() {}
    render() {
        return (
            <Fragment>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">事件节流（throttle）与防抖（debounce）</h1></div>
<h3 id='节流函数（Throttle）'>节流函数（Throttle）</h3>

<blockquote>
  <p><strong>固定间隔时间内只执行一次</strong></p>
</blockquote>

<p>当我们触发 <code>scroll</code> 、 <code>mousemove</code> 等连续不断的事件时，如果有非常耗时耗内存的业务需要处理，那肯定会对页面的性能产生影响。所以节流函数的意义就是不管你触发多少次我只会在固定的间隔时间内执行一次。 <br></br>节流函数的实现原理很简单，利用闭包的缓存原理，将 lastTime （即上次执行任务的时间）缓存，每次执行时生成最新时间 nowTime 去和 lastTime 进行比对，如果时间大于设置的间隔时间则执行任务并将 lastTime 更新为最新时间。</p>

<pre><code><span></span>
<span>function throttle(fn, interval, delay) {'{'}</span>
<span>    let lastTime = 0, timer;</span>
<span>    return function () {'{'}</span>
<span>        let nowTime = new Date().getTime();</span>
<span>        let that = this, args = arguments;</span>
<span>        if (nowTime - lastTime &gt; 500) {'{'}</span>
<span>            fn.call(that, ...args);</span>
<span>            lastTime = nowTime</span>
<span>        }</span>
<span>    }</span>
<span>}</span>
<span></span>
</code></pre>

<h3 id='防抖函数（Debounce）'>防抖函数（Debounce）</h3>

<blockquote>
  <p><strong>无论触发多少次，只作用于最后一次</strong></p>
</blockquote>

<p>防抖函数的原理很简单，利用闭包的缓存原理对定时器进行缓存处理，每次执行 debounce 函数都会清除掉上一次创建的定时器，如果 delay 时间内 debounce 函数没被执行，则定时器中的操作将会被执行。</p>

<pre><code><span></span>
<span>function debounce(fn, delay) {'{'}</span>
<span>    let timeout;</span>
<span>    return function () {'{'}</span>
<span>        let self = this, args = arguments;</span>
<span>        // 每次执行 debounce 都将上次的事件清除</span>
<span>        clearTimeout(timeout);</span>
<span>        // 设置定时器，delay 时间内，debounce</span>
<span>        timeout = setTimeout(() =&gt; {'{'}</span>
<span>            fn.call(self, ...args)</span>
<span>        },delay)</span>
<span>    }</span>
<span>}</span>
<span></span>
</code></pre>

<blockquote>
  <p><strong>场景举例</strong>：比如我们业务场景中经常出现的按钮点击，为了防止用户频繁点击按钮而造成多余的逻辑处理，我们可以通过 debounce 函数来限制。再或者输入框提示词信息。</p>
</blockquote>

<p><img src="http://wx3.sinaimg.cn/mw690/a73bc6a1ly1g1ppxcogwug20j00c01ky.gif" alt="iamge" title="" /></p>

<h3 id='利用 Throttle 优化 Debounce'>利用 Throttle 优化 Debounce</h3>

<blockquote>
  <p><strong>不能让人家一直不执行啊！</strong></p>
</blockquote>

<p>上面我们看到了防抖函数的作用，不过思考一下如果一个用户一直点这个按钮会怎么样呢？那结果肯定是迟迟没有反应！这怎么能行，我们是不是也得来个限制，到了一段时间一定要执行一次才行呀，不能任由用户就这样点下去。<br></br>我们在 denounce 函数的基础上，引入 Throttle 的 lastTime 的概念，在闭包函数里，同样是先得到 nowTime，先判断是否达到间隔时间，达到就执行任务，否则继续进行原始的 debounce 函数。</p>

<pre><code><span></span>
<span>// debounce 节流函数</span>
<span>function debounceMore(fn, interval, delay) {'{'}</span>
<span>    let lastTime = 0, timer;</span>
<span>    return function () {'{'}</span>
<span>        let nowTime = new Date().getTime();</span>
<span>        let that = this, args = arguments;</span>
<span>        if (nowTime - lastTime &gt; 500) {'{'}</span>
<span>            fn.call(that, ...args);</span>
<span>            lastTime = nowTime</span>
<span>        } else {'{'}</span>
<span>            clearTimeout(timer);</span>
<span>            timer = setTimeout(() =&gt; {'{'}</span>
<span>                fn.call(self, ...args)</span>
<span>            }, delay)</span>
<span>        }</span>
<span></span>
<span>    }</span>
<span>}</span>
<span></span>
</code></pre>

<h3 id='requestAnimationFrame'>requestAnimationFrame</h3>

<p>Html5 提供了 <code>requestAnimationFrame</code> 方法来解决频繁操作的性能问题，而这个方法的触发间隔由系统来决定，每次浏览器重绘之前执行回调函数。</p>

<pre><code><span></span>
<span>window.requestAnimationFrame(callback);</span>
<span></span>
</code></pre>

<h3 id='总结'>总结</h3>

<p>频繁触发事件时，函数防抖只会在最后一次触发事件只会才会执行回调内容，其他情况下会重新计算延迟事件，而函数节流便会很有规律的每隔一定时间执行一次回调函数。节流和防抖是我们业务场景下进行性能优化非常重要的技能了，具体使用哪种方法实现还是要结合实际业务场景来区分哦。</p>
</div>
            </Fragment>
        )
    }
}