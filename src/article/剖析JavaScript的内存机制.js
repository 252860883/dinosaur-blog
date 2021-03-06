import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"数据类型"},{"level":"h3","title":"堆与栈存储"},{"level":"h3","title":"堆与栈的区别"},{"level":"h3","title":"深拷贝与浅拷贝"},{"level":"h3","title":"内存的生命周期"},{"level":"h3","title":"垃圾回收机制"},{"level":"h3","title":"内存泄漏"},{"level":"h3","title":"WeakMap"},{"level":"h3","title":"总结"}]
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
<div className="title-content"><h1 className="title">剖析JavaScript的内存机制</h1></div>
<blockquote>
  <p>在学习JavaScript的过程中，内存空间这个概念对我来说很陌生，平时的业务问题也很少会涉及到它。但是由于对于内存空间的模糊认知，使得我在很多问题上都一知半解，比如深拷贝浅拷贝、基本数据类型引用等等问题。了解了JavaScript的内存机制有有助于开发人员能够清晰的认识到自己写的代码在执行的过程中发生过什么，也能够提高项目的代码质量。所以这篇博客就来探索一下JavaScript的内存问题。</p>
</blockquote>

<h3 id='数据类型'>数据类型</h3>

<p>首先，了解一下JavaScript的基本数据类型，面试常考题吧！ 倒着都能说下来，<strong>Number / String / Bollean / Undefined / Null / Symbol</strong>.那么其他的不是基本的数据类型呢？就包括 <strong>Object / Array / RegExp / Date</strong> 等等。</p>

<h3 id='堆与栈存储'>堆与栈存储</h3>

<blockquote>
  <p>JS内存空间分为栈(stack)、堆(heap)、池(一般也会归类为栈中)。 其中栈存放变量，堆存放复杂对象，池存放常量。</p>
</blockquote>

<p><strong>栈存储（先进后出）</strong>：是一块内存区域，存储的都是局部变量，像上面提到的六种基本类型就存放在栈内存中，是可以直接访问到的，存放在栈(stack)内存中的简单数据段，数据大小确定，内存空间大小可以分配。<br></br><strong>堆存储（先进先出）</strong>：像Array等类型的变量实际保存的是一个指针，这个指针指向堆内存对应的实际内容实体。</p>

<p>一张直观图表示：</p>

<p><img src="http://wx4.sinaimg.cn/mw690/a73bc6a1ly1fq8s7oymrjj212e0lqdho.jpg" alt="image" title="" /></p>

<p>举个例子：</p>

<pre><code><span></span>
<span>var a = 22; //存放在栈</span>
<span>var b = {'{'} m: 20 }; // 变量b存在于栈中，{'{'}m: 20} 作为对象存在于堆内存中</span>
<span></span>
</code></pre>

<h3 id='堆与栈的区别'>堆与栈的区别</h3>

<ol>
<li>栈内存存储的是局部变量而堆内存存储的是实体；</li>
<li>栈内存的更新速度要快于堆内存，因为局部变量的生命周期很短；</li>
<li>栈内存存放的变量生命周期一旦结束就会被释放，而堆内存存放的实体会被垃圾回收机制不定时的回收；</li>
<li>开发人员并不能直接操作堆内存，堆内存由JS引擎操作完成</li>
</ol>

<h3 id='深拷贝与浅拷贝'>深拷贝与浅拷贝</h3>

<p>通过上面的堆栈分析，就引申到了对象深浅拷贝的问题。<br></br>- <strong>浅拷贝</strong><br></br>浅拷贝只能复制一层对象的属性，深层的属性只能被引用，当被引用的深层属性值改变时，复制者也会随着改变。通俗来讲，浅拷贝就是拷贝第一层的基本类型值，以及第一层的引用类型地址。一张图看原理：<br></br><img src="http://wx4.sinaimg.cn/mw690/a73bc6a1ly1fq8t5rivvmj20gf075weq.jpg" alt="image" title="" /></p>

<p>同时需要注意浅拷贝和赋值操作是不一样的：赋值操作只是把栈中的地址传给新的对象，所以两个对象哪一个进行修改都会被改变。而浅拷贝会创建一个新的对象，和赋值不一样的地方是如果对应的相关属性值是基本类型，互相不干涉。</p>

<p>常见的浅拷贝操作有：<code>Object.assign()</code> 、 <code>Array.prototype.concat()</code> 、 <code>Array.prototype.slice()</code>等。</p>

<ul>
<li><p><strong>深拷贝</strong><br></br>深拷贝相反，会完完整整的深层遍历复制一个对象，而不是深层引用。如图：<br></br><img src="http://wx2.sinaimg.cn/mw690/a73bc6a1ly1fq8t5rz7uuj20g906wmxe.jpg" alt="image" title="" /></p></li>
<li><p><strong>实现深拷贝</strong></p></li>
<li><p>利用JSON API</p></li>
</ul>

<pre><code><span></span>
<span>let newobj=JSON.parse(JSON.stringify(obj));</span>
<span></span>
<span></span>
</code></pre>

<p>注意：由于 JSON.stringify() 不接受函数，所以该方法不能拷贝函数</p>

<ul>
<li>递归遍历</li>
</ul>

<pre><code><span></span>
<span>/**</span>
<span> * 深拷贝函数</span>
<span> */</span>
<span>function deepClone(obj) {'{'}</span>
<span>    // 首先判断 Date 和 RegExp 类型</span>
<span>    if (obj instanceof RegExp) return new RegExp(obj);</span>
<span>    if (obj instanceof Date) return new Date(obj);</span>
<span>    // 基础数据类型直接返回</span>
<span>    if (obj === null || (typeof obj != 'object')) return obj;</span>
<span>    // obj如果是数组 obj.constructor 返回 [function:Array],obj如果是对象返回 [function:Object]</span>
<span>    let t = new obj.constructor();</span>
<span>    // 复杂类型进行递归</span>
<span>    for (let key in obj) {'{'}</span>
<span>        if (obj.hasOwnProperty(key)) {'{'}</span>
<span>            t[key] = deepClone(obj[key]);</span>
<span>        }</span>
<span>    }</span>
<span>    return t;</span>
<span>}</span>
<span></span>
</code></pre>

<ul>
<li>递归遍历解决环问题</li>
</ul>

<p>上面的递归深拷贝看似没什么问题了，但是我们得思考一下如果我们要深拷贝的对象出现了<strong>循环引用</strong>，即类似于<code>obj.loop = obj</code>的情况时，我们再执行deepClone函数就会陷入死循环，为了解决这个问题，我们需要引入WeakMap来存储拷贝过的对象，每次执行deepClone时候都先查询是否拷贝过，如果拷贝过直接返回该对象的引用，否则执行后续步骤：</p>

<pre><code><span></span>
<span>function deepClone(obj,hash = new WeakMap()) {'{'}</span>
<span>    // 判断是否已经拷贝过该对象</span>
<span>    if(hash.has(obj)){'{'}</span>
<span>        return hash.get(obj)</span>
<span>    }</span>
<span>    // 首先判断 Date 和 RegExp 类型</span>
<span>    if (obj instanceof RegExp) return new RegExp(obj);</span>
<span>    if (obj instanceof Date) return new Date(obj);</span>
<span>    // 基础数据类型直接返回</span>
<span>    if (obj === null || (typeof obj != 'object')) return obj;</span>
<span>    // obj如果是数组 obj.constructor 返回 [function:Array],obj如果是对象返回 [function:Object]</span>
<span>    let t = new obj.constructor();</span>
<span>    // 将 obj 作为 key 写入 weakmap</span>
<span>    hash.set(obj,t);</span>
<span>    // 复杂类型进行递归</span>
<span>    for (let key in obj) {'{'}</span>
<span>        if (obj.hasOwnProperty(key)) {'{'}</span>
<span>            t[key] = deepClone(obj[key],hash);</span>
<span>        }</span>
<span>    }</span>
<span>    return t;</span>
<span>}</span>
<span></span>
</code></pre>

<h3 id='内存的生命周期'>内存的生命周期</h3>

<ul>
<li>环境中分配的内存一般有如下生命周期：
<ol><li>内存分配：当我们申明变量、函数、对象的时候，系统会自动为他 们分配内存</li>
<li>内存使用：即读写内存，也就是使用变量、函数等</li>
<li>内存回收：使用完毕，由垃圾回收机制自动回收不再使用的内存
举个栗子🌰：</li></ol></li>
</ul>

<pre><code><span></span>
<span>var a = 2; // 在内存中给数值变量分配空间</span>
<span>alert(a + 100); // 使用内存</span>
<span>var a = null; // 使用完毕之后，释放内存空间</span>
<span></span>
</code></pre>

<h3 id='垃圾回收机制'>垃圾回收机制</h3>

<p>JavaScript有自动垃圾收集机制，那么这个自动垃圾收集机制的原理是什么呢？其实很简单，就是找出那些不再继续使用的值，然后释放其占用的内存。垃圾收集器会每隔固定的时间段就执行一次释放操作。 在JavaScript中，最常用的是通过<strong>标记清除算法</strong>来找到哪些对象是不再继续使用的，因此 a = null 其实仅仅只是做了一个释放引用的操作，让 a 原本对应的值失去引用，脱离执行环境，这个值会在下一次垃圾收集器执行操作时被找到并释放。而在适当的时候解除引用，是为页面获得更好性能的一个重要方式。</p>

<h3 id='内存泄漏'>内存泄漏</h3>

<blockquote>
  <p>对于持续运行的服务进程（daemon），必须及时释放不再用到的内存。否则，内存占用越来越高，轻则影响系统性能，重则导致进程崩溃。 不再用到的内存，没有及时释放，就叫做内存泄漏（memory leak）。</p>
</blockquote>

<p>常见内存泄漏原因：</p>

<ol>
<li>setTimeout的第一个参数使用字符串而非函数的话，会引发内存泄漏。</li>
<li>闭包</li>
<li>在传递给 console.log的对象是不能被垃圾回收，因为在代码运行之后需要在开发工具能查看对象信息。</li>
<li>循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）</li>
<li>超出DOM引用（在某些情况下，开发人员会在数据结构中存储DOM节点，例如你想快速更新表格中的几行内容的情况。如果在字典或数组中存储对每个DOM行的引用，则会有两个对同一个DOM元素的引用）</li>
</ol>

<h3 id='WeakMap'>WeakMap</h3>

<p>ES6 考虑到垃圾回收问题，推出了两种新的数据结构：WeakSet 和 WeakMap。它们对于值的引用都是不计入垃圾回收机制的，表示这是弱引用。</p>

<h3 id='总结'>总结</h3>

<p>1.基本数据类型都是直接在栈存储，其他数据类型只是一个指针，实体存放在堆中<br></br>2.由于非基本数据类型的数据结构造成浅拷贝和深拷贝的问题，可通过遍历或者 JSON的api方法实现深拷贝</p>
</div>
            </Fragment>
        )
    }
}