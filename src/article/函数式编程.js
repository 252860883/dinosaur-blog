import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"什么是函数式编程"},{"level":"h3","title":"声明式与命令式"},{"level":"h3","title":"纯函数"},{"level":"h3","title":"柯里化 与 高阶函数"},{"level":"h3","title":"部分应用"},{"level":"h3","title":"组合函数"},{"level":"h3","title":"总结"}]
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
<div className="title-content"><h1 className="title">函数式编程</h1></div>
<blockquote>
  <p>函数式编程又是一个平时在工作时经常听到但是从来没有接触过并且会被搞的一头雾水的东西。所以我打算一探究竟这个函数式编程究竟是何物？</p>
</blockquote>

<h3 id='什么是函数式编程'>什么是函数式编程</h3>

<p>通常我们比较熟悉面向对象编程（Object-oriented programming,OOP），那么函数式编程（functional programming,FP）有何不同？</p>

<p><strong>面向对象编程</strong>是以数据为核心，对象则指的是类的实例。它将对象作为程序的基本单元，将程序和数据封装其中，可以看作一种在程序中包含各种独立而又互相调用的对象的思想。面向对象编程由于其有继承、封装、多态的特性，使得其具有高内聚低耦合、已扩展、成本低等优点。但是会造成数据的不确定性，在运行效率上也不如面向过程编程。</p>

<p><strong>函数式编程</strong>是一种编程范型，面向过程（动作）的编程，它将电脑运算视为数学上的函数计算，并且避免使用程序状态以及易变对象。简单说，函数式编程所有的数据都是不可变的，所以安全性和稳定性上更盛一筹。函数式编程广泛运用于科学研究中，因为在科研中对于代码的工程化要求比较低，写起来更加简单。但是由于数据不可变在运行中一直存在，所以内存资源占用很大。同时由于先天性的设计，性能也不乐观。</p>

<h3 id='声明式与命令式'>声明式与命令式</h3>

<p>编程分为命令式编程和声明式编程，这里的函数式编程属于声明式编程范畴。<br></br><strong>命令式编程</strong>，命令如何去做，不管想要的是什么都会按照我们的代码命令去实现<br></br><strong>声明式编程</strong>，告诉需要获取什么，而不需要关注具体怎么去实现，直接由“机器”思考实现的过程</p>

<p>举例实现数组每个值乘2的操作：</p>

<pre><code><span></span>
<span>//命令式</span>
<span>let a=[1,2,3],doubleArr=[];</span>
<span>for(let i=0 ; i&lt;a.length ;i++){'{'}</span>
<span>  doubleArr[i]=a[i]*2</span>
<span>}</span>
<span></span>
<span>//声明式</span>
<span>let a=[1,2,3]</span>
<span>let doubleArr=a.map((i)=&gt; return i*2)</span>
<span></span>
</code></pre>

<p>在这里我们推荐使用声明式的原因是：循环是一种重要的命令控制结构，但是很难复用，并且无法插入到其他的操作中，而函数式编程旨在尽可能的提高代码的无状态性和不变性。</p>

<h3 id='纯函数'>纯函数</h3>

<p>前面聊到了函数式编程是一个面向过程的编程，举个例子：a*3+5,通过函数式编程思想，a需要执行m和n操作，m和n首先合成l操作，然后a直接执行l操作，输出。那么m和n怎么能完成合成操作呢？任意的m和n都能合成吗？也许你已经开始产生疑问，那么这里就引入了纯函数的概念。</p>

<p><strong>纯函数</strong>：一个函数如果输入参数确定，输出结果唯一不变，不依赖于任何在函数求值或调用间隔时可能变化的隐藏状态和外部状态，那么该函数就是纯函数。它无状态，没有副作用也无关时序问题，更不会修改传递的参数和外部作用域的状态。<br></br>举例：</p>

<pre><code><span></span>
<span>let arr = [1,2,3];</span>
<span>let count = 0; </span>
<span></span>
<span>arr.slice(0,3); //是纯函数</span>
<span>arr.splice(0,3); //不是纯函数，arr被修改</span>
<span></span>
<span>function add(x,y){'{'} // 是纯函数</span>
<span>  return x + y // 无状态，无副作用，无关时序，幂等</span>
<span>} // 输入参数确定，输出结果是唯一确定</span>
<span></span>
<span></span>
<span>function addCount(){'{'} //不是纯函数，输出不确定</span>
<span>  count++ // 有副作用，改变参数值</span>
<span>}</span>
<span></span>
<span></span>
</code></pre>

<p>现在有这么一种情况：</p>

<pre><code><span></span>
<span>function move(func,a,b){'{'}</span>
<span>    func(a,b)</span>
<span>}</span>
<span>move(delete,a,b)</span>
<span></span>
</code></pre>

<p>如果delete函数会清楚a、b的数据，那move还算纯函数吗？答案是不算。那怎么样可以使move变成纯函数？这里就引入了<strong>柯里化</strong>操作，它是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。<br></br>柯里化后的函数：</p>

<pre><code><span></span>
<span>function move(func){'{'}</span>
<span>    return function(a,b){'{'}</span>
<span>        func(a,b)</span>
<span>    }</span>
<span>}</span>
<span>move(delete,a,b)</span>
<span></span>
</code></pre>

<p>这样，无论func输入什么输出的都是确定不变的函数，并且也没有副作用，无关时序，所以现在该函数就是纯函数了。</p>

<h3 id='柯里化 与 高阶函数'>柯里化 与 高阶函数</h3>

<p>简单讲，<strong>柯里化</strong>是把一个多参函数转换成接受单参的一个函数，并且返回接受余下的参数而且返回结果的新函数的技术。</p>

<p>首先，举个例子来了解柯里化，现在有个场景商店要给VIP顾客打九折：</p>

<pre><code><span></span>
<span>function discount(price,discount){'{'}return price * discount };</span>
<span></span>
</code></pre>

<p>给客户操作：</p>

<pre><code><span></span>
<span>discount(2000,0.9);</span>
<span>discount(200,0.9);</span>
<span>discount(500,0.9);</span>
<span>...</span>
<span></span>
</code></pre>

<p>可以看到我们每次都在进行 0.9 的操作，这里我们引入柯里化思想，保留 discount 传参，将 price * discount 操作作为返回函数：</p>

<pre><code><span></span>
<span>function discount(discount){'{'}</span>
<span>    return (price)=&gt;{'{'}</span>
<span>      return price * discount </span>
<span>    }</span>
<span>  };</span>
<span>const vipDiscount = discount(0.9);</span>
<span></span>
<span>// 执行优惠操作</span>
<span>vipDiscount(2000);</span>
<span>vipDiscount(200);</span>
<span>vipDiscount(500);</span>
<span>...</span>
<span></span>
</code></pre>

<p>来实现一个通用的柯里化函数：</p>

<pre><code><span></span>
<span>const curry = (fn) =&gt; {'{'}</span>
<span>    if (fn.length &lt;= 1) return fn;</span>
<span>    const generator = (args, rest) =&gt; (!rest ? fn(...args) : arg =&gt; generator([...args, arg], rest - 1));</span>
<span>    return generator([], fn.length);</span>
<span>};</span>
<span></span>
</code></pre>

<p>再来一个实现方式：</p>

<pre><code><span></span>
<span>const curry = (fn, arr = []) =&gt; (...args) =&gt; (</span>
<span>  arg =&gt; arg.length === fn.length</span>
<span>    ? fn(...arg)</span>
<span>    : curry(fn, arg)</span>
<span>)([...arr, ...args])</span>
<span></span>
</code></pre>

<p>上面实现柯里化函数就用到了<strong>高阶函数</strong>：函数当参数，把传入的函数做一个封装，然后返回这个封装函数,达到更高程度的抽象。比如我们经常使用的 map/reduce、filter等函数方法都是高阶函数。再比如我们在滚动优化中涉及到的节流函数：</p>

<pre><code><span></span>
<span>function throttle(fn,wait){'{'}</span>
<span>  var timer;</span>
<span>  return function(...args){'{'}</span>
<span>    if(!timer){'{'}</span>
<span>      timer = setTimeout(()=&gt;timer=null , wait);</span>
<span>      return fn.apply(this,args)</span>
<span>    }</span>
<span>  }</span>
<span>}</span>
<span>const fn = function(){'{'}</span>
<span> console.log("scroll shw")</span>
<span>}</span>
<span></span>
<span>xDom.onscroll = throttle(fn , 5000);</span>
<span></span>
</code></pre>

<h3 id='部分应用'>部分应用</h3>

<p>部分应用是一种通过将函数的不可变参数子集，初始化为固定值来创建更小元数函数的操作.<br></br>简单实现一个部分应用的通用函数：</p>

<pre><code><span></span>
<span>function partial(fn, ...args) {'{'}</span>
<span>    return fn.bind(null, ...args)</span>
<span>}</span>
<span></span>
</code></pre>

<h3 id='组合函数'>组合函数</h3>

<p>函数组合就是一种将已被分解的简单任务组织成复杂的整体过程。柯里化是把函数“切”好多刀，直到中间每个函数都是单参的，部分应用则是把一个多参函数“切”一刀。<br></br>简单的来模拟一下组合函数：</p>

<pre><code><span></span>
<span>function compose(...args) {'{'}</span>
<span>    return (result) =&gt; {'{'}</span>
<span>        return args.reduce((result, fn) =&gt; {'{'}</span>
<span>            return fn(result)</span>
<span>        }, result)</span>
<span>    }</span>
<span>}</span>
<span></span>
</code></pre>

<p>有了组合函数，我们就可以来写业务了，下面举例实现将一个字符串转大写并翻转：</p>

<pre><code><span></span>
<span>// 实现将字符串转大写</span>
<span>function toWordUp(str) {'{'}</span>
<span>    return str.toUpperCase()</span>
<span>}</span>
<span>// 实现将字符串翻转</span>
<span>function toWordReverse(str) {'{'}</span>
<span>    return str.split('').reverse().join('')</span>
<span>}</span>
<span></span>
<span>let madeNewWord = compose(toWordUp, toWordReverse);</span>
<span></span>
<span>madeNewWord('abc')  // CBA</span>
<span></span>
</code></pre>

<p>比如我们现在的需求是将一个字符串转大写再拓展成数组。这样我们只需要再写一个拓展数组的函数</p>

<h3 id='总结'>总结</h3>

<ol>
<li>函数式编程与面向对象的区别在于一个注重动作过程（比如把节流函数这个动作抽象出来），而另一个更侧重数据。</li>
<li>这样的函数必须输入输出确定并且对外界没有影响，称其为纯函数</li>
<li>对于不纯的函数可以进行柯里化的操作进行提纯</li>
<li>在柯里化过程中，如果传参是一个函数，且返回的也是这个函数，那么就称其为高阶函数</li>
<li>高阶函数可以抽象出节流函数这样的功能函数</li>
<li>声明式就是使用这样的功能函数</li>
</ol>
</div>
            </Fragment>
        )
    }
}