import React from 'react'
import '../style/main.scss'
import { IsPC } from "../utils/screen";
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h2","title":"运行机制"},{"level":"h2","title":"响应式绑定"},{"level":"h4","title":"Object.defineProperty"},{"level":"h3","title":"依赖收集"}]
        }
    }
    componentDidMount() {
        if (!IsPC()) {
            const dom = document.getElementsByClassName('article')[0]
            dom.classList.add('article-mobile');
        }
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title">VUE核心原理解析（一）依赖收集与响应式绑定</div>
<blockquote>
  <p>众所周知，VUE 是目前一款很流行专注于视图层、用于构建用户交互界面的响应式渐进框架。在使用 VUE 框架大力缩减了开发成本的同时，是否有想过VUE是如何实现双向绑定的？计算属性、监听器等方法又是如何实现的？带着一系列的疑问，就开始这篇解析吧。</p>
</blockquote>

<h2 id='运行机制'>运行机制</h2>

<p><img src="http://p70gzm2sm.bkt.clouddn.com/1606e7eaa2a664e8.jpg" alt="image" title="" /></p>

<p>如上面流程图所示，大致流程：</p>

<ol>
<li><p>new Vue() 创建 vue实例的过程，会调用 _init() 进行初始化操作，它会初始化生命周期、事件、 props、 methods、 data、 computed 与 watch 等。通过 Object.defineProperty 的 setter、getter 实现<strong>响应式</strong>以及<strong>依赖</strong>的收集。初始化后调用 $mount 挂载组件</p></li>
<li><p>然后开始 complie 编译，分为三个阶段：parse、optimize、generate。<strong>parse</strong> 会用正则等方式解析 template 模板中的指令、class、style等数据，形成AST。<strong>optimize</strong> 的主要作用是标记 static 静态节点，在后续diff算法计算时会直接跳过静态节点，节省的比较时间，起到优化作用。<strong>generate</strong> 是将 AST 转化成 render function 字符串的过程，最终拿到 render function。</p></li>
<li><p>接下来，由于之前在初始化的时候对 getter 和 setter 进行了设置，所以我们在读取对象的时候就会执行 getter 函数进行依赖收集，目的是将观察者 Watcher 对象放到当前的订阅者 Dep 的 subs 中。当给对象赋值的时候执行 setter 函数，setter 会通知之前设定的 Watcher 值发生变化需要更新视图。</p></li>
<li><p>前面的 renderFunction 会转化为 VNode节点，在修改一个对象值的时候，会通过 setter -> Watcher -> update 的流程生成一个新的VNode。将新的 VNode 与旧的 VNode 一起传入 patch 进行比较，经过 diff 算法得出它们的「差异」。最后我们只需要将这些「差异」的对应 DOM 进行修改即可。</p></li>
</ol>

<h2 id='响应式绑定'>响应式绑定</h2>

<p>我们都熟知 Vue.js 是一个 MVVM 的库，响应式系统可以说是它的一大特色了，下面就来了解vue是如何实现响应式的。</p>

<h4 id='Object.defineProperty'>Object.defineProperty</h4>

<p>vue之所以能实现响应式的绑定，主要靠的就是 <code>Object.defineProperty</code> 了。其实在之前的博文里，已经用到过很多次这个神奇的方法了，这里再了解一下：</p>

<pre><code><span></span>
<span>// obj 要在其上定义属性的对象</span>
<span>// prop 要定义或修改的属性的名称</span>
<span>// descriptor 将被定义或修改的属性描述符</span>
<span></span>
<span>Object.defineProperty(obj, prop, descriptor)</span>
<span></span>
<span></span>
</code></pre>

<p>其中，descriptor有如下几个属性：<br></br>- <strong>configurable</strong>：当该值为true时,该属性描述符才能被改变<br></br>- <strong>enumerable</strong>：当值为true时，该属性才能够出现在对象的枚举属性中（比如 for...in、Object.keys等）<br></br>- <strong>value</strong>：该属性对应的值<br></br>- <strong>writable</strong>：值为true时，value才能被赋值运算符改变<br></br>- <strong>get</strong>：给属性提供 getter 方法，当访问该属性时执行方法<br></br>- <strong>set</strong>：给属性提供 setter 方法，当属性值修改时执行方法</p>

<p>下面就来模拟一下用 <code>Object.defineProperty</code> 实现一个响应式的 demo，首先通过 <code>defineReactive</code> 函数封装 <code>Object.defineProperty</code> 方法，通过设置 <code>set</code> 方法实现当属性值变化时执行 <code>cb</code> 函数;然后封装 <code>observer</code>函数对 <code>data</code> 对象的所以属性进行绑定，当 <code>data</code> 对象中的属性值被修改时，则执行回调函数。具体代码如下：</p>

<pre><code><span></span>
<span>// 创建一个 data 对象</span>
<span>var data = {'{'}</span>
<span>    num: 2</span>
<span>}</span>
<span></span>
<span>// 对一个对象的其中一个属性进行响应式绑定</span>
<span>function defineReactive(obj, key, val) {'{'}</span>
<span>    Object.defineProperty(obj, key, {'{'}</span>
<span>        enumerable: true,</span>
<span>        configurable: true,</span>
<span>        get: function () {'{'}</span>
<span>            // 在 vue 中，通过get会进行依赖</span>
<span>            return val</span>
<span>        },</span>
<span>        set: function (newval) {'{'}</span>
<span>            if (newval == val) return;</span>
<span>            // 这里直接模拟一个简单的回调函数，当属性值被修改时执行</span>
<span>            cb(key, newval);</span>
<span>        }</span>
<span>    })</span>
<span>}</span>
<span></span>
<span>// 对 data 对象的所有属性进行响应式绑定</span>
<span>function observer(data) {'{'}</span>
<span>    Object.keys(data).forEach((key) =&gt; {'{'}</span>
<span>        defineReactive(vale, key, data[key])</span>
<span>    })</span>
<span>}</span>
<span></span>
<span>// 数据更新时的回调数据</span>
<span>function cb(key, val) {'{'}</span>
<span>    /* 渲染视图 */</span>
<span>    console.log("属性：" + key + "更新为：" + val);</span>
<span>}</span>
<span></span>
<span>// 创建一个Vue类</span>
<span>class Vue {'{'}</span>
<span>    constructor(options) {'{'}</span>
<span>        this._data = options.data</span>
<span>        observer(this._data)</span>
<span>    }</span>
<span>}</span>
<span></span>
<span>// 实例化</span>
<span>var vue = new Vue({'{'}</span>
<span>    data: {'{'}</span>
<span>        num: 2</span>
<span>    }</span>
<span>})</span>
<span>vue._data.num = 3;</span>
<span>vue._data.num = 8;</span>
<span></span>
<span></span>
</code></pre>

<p>上面的 demo 最终会输出，:</p>

<pre><code><span></span>
<span>属性：num更新为：3</span>
<span>属性：num更新为：8</span>
<span></span>
</code></pre>

<p>Emmm，神奇～</p>

<h3 id='依赖收集'>依赖收集</h3>

<p>上面我们已经实现了一个简单的响应式系统，那么接下来就就聊聊依赖收集。</p>

<p>上一节讲响应式绑定的时候是否有些漏洞呢？如果我们多个vue实例绑定同一个data对象，当data对象更新时该如何通知这些vue实例呢？所以这里就引入了 <strong>依赖收集</strong> 的概念。<br></br>demo如下：</p>

<pre><code><span></span>
<span>// 对一个对象的其中一个属性进行响应式绑定</span>
<span>function defineReactive(obj, key, val) {'{'}</span>
<span>    // 创建一个Dep实例</span>
<span>    var dep = new Dep()</span>
<span></span>
<span>    Object.defineProperty(obj, key, {'{'}</span>
<span>        enumerable: true,</span>
<span>        configurable: true,</span>
<span>        get: function () {'{'}</span>
<span>            if (Dep.target) {'{'}</span>
<span>                // 将当前watcher实例加入subs数组进行依赖收集</span>
<span>                dep.add(Dep.target)</span>
<span>            }</span>
<span>            // console.log(dep)</span>
<span>            return val</span>
<span>        },</span>
<span>        set: function (newval) {'{'}</span>
<span>            if (newval == val) return;</span>
<span>            // cb(key, newval);</span>
<span>            dep.notify();</span>
<span>        }</span>
<span>    })</span>
<span>}</span>
<span></span>
<span>// 对 data 对象的所有属性进行响应式绑定</span>
<span>function observer(data) {'{'}</span>
<span>    Object.keys(data).forEach((key) =&gt; {'{'}</span>
<span>        defineReactive(data, key, data[key])</span>
<span>    })</span>
<span>}</span>
<span></span>
<span>// 依赖收集，当数据更新时通知所有Watcher更新</span>
<span>class Dep {'{'}</span>
<span>    constructor() {'{'}</span>
<span>        // 存放所有的Watcher对象</span>
<span>        this.subs = [];</span>
<span>    }</span>
<span>    // 添加一个watcher对象</span>
<span>    add(sub) {'{'}</span>
<span>        this.subs.push(sub)</span>
<span>    }</span>
<span>    // 通知所有的视图更新</span>
<span>    notify() {'{'}</span>
<span>        this.subs.map((sub) =&gt; {'{'}</span>
<span>            sub.update();</span>
<span>        })</span>
<span>    }</span>
<span>}</span>
<span></span>
<span>// 观察者，当数据更新时需要收到通知</span>
<span>class Watcher {'{'}</span>
<span>    constructor(vm, expOrFn, cb, options) {'{'}</span>
<span>        // Dep.target指向创建当前的watcher实例</span>
<span>        Dep.target=this;</span>
<span>    }</span>
<span>    update() {'{'}</span>
<span>        console.log('视图更新啦！')</span>
<span>    }</span>
<span>}</span>
<span></span>
<span>class Vue {'{'}</span>
<span>    constructor(options) {'{'}</span>
<span>        this._data = options.data;</span>
<span>        // 实例化 watcher</span>
<span>        new Watcher();</span>
<span>        // 响应式绑定数据</span>
<span>        observer(this._data)</span>
<span>        // 这里为了触发 get 函数，读取一下num</span>
<span>        this._data.num</span>
<span>    }</span>
<span>}</span>
<span></span>
<span>var vue = new Vue({'{'}</span>
<span>    data: {'{'}</span>
<span>        num:2</span>
<span>    }</span>
<span>})</span>
<span>vue._data.num = 10</span>
<span></span>
<span></span>
</code></pre>

<p>通过上面的demo我们了解几个概念：<br></br><code>Dep</code> 类可以理解为依赖收集器，主要用来收集当前响应式对象的依赖关系，当数据改变时，依赖的wahcer会被通知。可以看出来这是一个很典型的观察者模式。<br></br><code>Watcher</code> 类是一个观察者，当数据更新时会触发 Watcher 进行更新。其分为 渲染 watcher、计算属性 watcher 和 监听器 watcher。</p>

<p>只要会被其他的观察者 (watchers) 依赖，比如data、data的属性、计算属性、props等，就会在闭包里生成一个 Dep 的实例 dep 并在被调用 getter 的时候 dep.depend 收集它被谁依赖了，并把被依赖的watcher存放到自己的subs中 this.subs.push(sub)，以便在自身改变的时候通知 notify 存放在 dep.subs 数组中依赖自己的 watchers 自己改变了，及时 update。</p>

<p>只要依赖别的响应式的对象，就会生成一个 watcher，来统计这个 watcher 依赖了哪些响应式对象，在这个 watcher 求值前把当前 watcher 设置到全局 Dep.target，并在自己依赖的响应式对象发生改变的时候及时 update。</p>
</div>
            </div>

        )
    }
}