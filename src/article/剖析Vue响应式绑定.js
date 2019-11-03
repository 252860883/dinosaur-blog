import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"如何实现数据双向绑定"},{"level":"h3","title":"如何对数组和对象进行数据劫持"},{"level":"h3","title":"Vue.set 原理"},{"level":"h3","title":"Proxy"},{"level":"h3","title":"参考"}]
        }
    }
    componentDidMount() {}
    render() {
        return (
            <Fragment>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">剖析Vue响应式绑定</h1></div>
<p>Vue的一大特色就是双向绑定，关于其原理我想大多数人都能直接说出来，使用<code>Object.defineProperty</code>对象拦截通过<code>setter</code>、<code>getter</code>监听数据变化作出相应操作。虽然原理大概如此，但是还需要再深入的进行一些了解。</p>

<h3 id='如何实现数据双向绑定'>如何实现数据双向绑定</h3>

<p>Vue 的数据双向绑定主要是指：数据变化更新视图，视图变化更新数据。</p>

<p>Vue 主要通过4个步骤实现数据双向绑定：</p>

<ol>
<li><strong>实现一个监听器 Observer：</strong>对数据对象进行遍历，包括子属性对象的属性，利用<code>Object.defineProperty()</code>对属性都加上<code>setter</code>和<code>getter</code>。这样，给这个对象的某个值赋值，就会触发 <code>setter</code>,就能听到了数据变化。</li>
<li><strong>实现一个解析器 Compile：</strong>解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。</li>
<li><strong>实现一个订阅者 Watcher：</strong>Watcher 订阅者是<code>Observer</code>和<code>Compile</code>之间通信的桥梁 ，主要的任务是订阅<code>Observer</code>中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 <code>Compile</code>中对应的更新函数。</li>
<li><strong>实现一个订阅器 Dep：</strong>订阅器采用 发布-订阅 设计模式，用来收集订阅者<code>Watcher</code>，对监听器<code>Observer</code>和<code>订阅者 Watcher</code>进行统一管理。</li>
</ol>

<p>具体的实现流程可以围观<a target="_blank" href="https://juejin.im/post/5d421bcf6fb9a06af23853f1">《0 到 1 掌握：Vue 核心之数据双向绑定》</a>这篇博客。</p>

<h3 id='如何对数组和对象进行数据劫持'>如何对数组和对象进行数据劫持</h3>

<p>上面已经提到了 Vue 通过<code>Object.defineProperty()</code>进行数据劫持，但是<code>Object.defineProperty()</code>有个缺陷，<strong>只能对属性进行数据劫持</strong>，所以不能对整个对象或是数组进行劫持。对此，Vue 也对数组和对象类型进行了一些增强处理，即通过递归遍历来实现：</p>

<pre><code><span></span>
<span>/**</span>
<span> * 对数组进行遍历</span>
<span> */</span>
<span>observeArray (items: Array&lt;any&gt;) {'{'}</span>
<span>    for (let i = 0, l = items.length; i &lt; l; i++) {'{'}</span>
<span>        observe(items[i])  // observe 功能为监测数据的变化</span>
<span>    }</span>
<span>}</span>
<span></span>
<span>/**</span>
<span> * 对属性进行递归遍历</span>
<span> */</span>
<span>let childOb = !shallow &amp;&amp; observe(val) // observe 功能为监测数据的变化</span>
<span></span>
</code></pre>

<p>虽然 Vue 尽自己最大限度的解决了对象和数组的双向绑定问题，但是它还是<strong>无法监测到对象属性的增加或者是删除</strong>，因为 Vue 会在初始化实例的时候对属性执行<code>getter</code>/<code>setter</code>转化，所以属性必须在初始化的时候存在才会实现响应式。</p>

<p>对于数组，Vue对 Array 的一些原生方法进行了包裹，包括：<code>push()</code>/<code>pop()</code>/<code>shift()</code>/<code>unshift()</code>/<code>splice()</code>/<code>sort()</code>/<code>reverse()</code>，这些方法都会触发视图响应式更新。具体我们可以来参考Vue源码中<a target="_blank" href="https://github.com/vuejs/vue/blob/dev/src/core/observer/array.js">array.js</a>文件：</p>

<pre><code><span></span>
<span>/*</span>
<span> * not type checking this file because flow doesn't play well with</span>
<span> * dynamically accessing methods on Array prototype</span>
<span> */</span>
<span>import {'{'} def } from '../util/index'</span>
<span>// </span>
<span>const arrayProto = Array.prototype</span>
<span>export const arrayMethods = Object.create(arrayProto)</span>
<span></span>
<span>const methodsToPatch = [</span>
<span>  'push',</span>
<span>  'pop',</span>
<span>  'shift',</span>
<span>  'unshift',</span>
<span>  'splice',</span>
<span>  'sort',</span>
<span>  'reverse'</span>
<span>]</span>
<span></span>
<span>/**</span>
<span> * Intercept mutating methods and emit events</span>
<span> */</span>
<span>methodsToPatch.forEach(function (method) {'{'}</span>
<span>  // cache original method</span>
<span>  const original = arrayProto[method]</span>
<span>  // def 的作用是重新定义对象属性的value值</span>
<span>  def(arrayMethods, method, function mutator (...args) {'{'}</span>
<span>    const result = original.apply(this, args)</span>
<span>    const ob = this.__ob__</span>
<span>    let inserted</span>
<span>    switch (method) {'{'}</span>
<span>      case 'push':</span>
<span>      case 'unshift':</span>
<span>        inserted = args</span>
<span>        break</span>
<span>      case 'splice':</span>
<span>        inserted = args.slice(2)</span>
<span>        break</span>
<span>    }</span>
<span>    if (inserted) ob.observeArray(inserted)</span>
<span>    // notify change</span>
<span>    ob.dep.notify()</span>
<span>    return result</span>
<span>  })</span>
<span>})</span>
<span></span>
</code></pre>

<p>从上面源码可以看出，Vue 对 Array 几个方法进行重写，除了执行数组原始方法以外，还会额外执行<code>ob.dep.notify()</code>，在这里通知变更就是很关键的实现响应式了。但是到这一步我们<strong>通过索引设置一个数组项或者改变数组的长度仍然无法实现响应式</strong>：</p>

<pre><code><span></span>
<span>var vm = new Vue({'{'}</span>
<span>  data: {'{'}</span>
<span>    items: ['a', 'b', 'c']</span>
<span>  }</span>
<span>})</span>
<span>vm.items[1] = 'x' // 不是响应性的</span>
<span>vm.items.length = 2 // 不是响应性的</span>
<span></span>
</code></pre>

<p>既然 Vue 都对数组下手开刀支持响应式了，为什么对数组下标形式也处理下呢？对此问题尤大给出的解释是出于性能的考虑。所以针对上述不支持响应式的情况，Vue 也给出了解决办法,就是使用 <code>Vue.set</code>向响应式对象中新增属性。</p>

<h3 id='Vue.set 原理'>Vue.set 原理</h3>

<blockquote>
  <p>Vue.set( target, propertyName/index, value )</p>
</blockquote>

<p>作用：向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性。</p>

<pre><code><span></span>
<span>var vm = new Vue({'{'}</span>
<span>  data: {'{'}</span>
<span>    userProfile: {'{'}</span>
<span>      name: 'Anika'</span>
<span>    }</span>
<span>  }</span>
<span>})</span>
<span>Vue.set(vm.userProfile, 'age', 27); // age 是响应式属性</span>
<span>vm.userProfile.height = 20; // height 不是响应式属性</span>
<span></span>
</code></pre>

<p>这神奇的<code>Vue.set</code>究竟是怎么实现的呢？在源码<a target="_blank" href="https://github.com/vuejs/vue/blob/dev/src/core/observer/index.js">core/observer/index.js</a>文件中可以找到<code>set</code>方法的定义：</p>

<pre><code><span></span>
<span>/**</span>
<span> * Set a property on an object. Adds the new property and</span>
<span> * triggers change notification if the property doesn't</span>
<span> * already exist.</span>
<span> */</span>
<span>export function set (target: Array&lt;any&gt; | Object, key: any, val: any): any {'{'}</span>
<span>  if (process.env.NODE_ENV !== 'production' &amp;&amp;</span>
<span>    (isUndef(target) || isPrimitive(target))</span>
<span>  ) {'{'}</span>
<span>    warn(`Cannot set reactive property on undefined, null, or primitive value: ${'{'}(target: any)}`)</span>
<span>  }</span>
<span>  // 如果是数组 执行 splice方法触发响应式</span>
<span>  if (Array.isArray(target) &amp;&amp; isValidArrayIndex(key)) {'{'}</span>
<span>    target.length = Math.max(target.length, key)</span>
<span>    target.splice(key, 1, val)</span>
<span>    return val</span>
<span>  }</span>
<span>  // 如果属性已经存在则直接进行赋值操作</span>
<span>  if (key in target &amp;&amp; !(key in Object.prototype)) {'{'}</span>
<span>    target[key] = val</span>
<span>    return val</span>
<span>  }</span>
<span>  const ob = (target: any).__ob__</span>
<span>  if (target._isVue || (ob &amp;&amp; ob.vmCount)) {'{'}</span>
<span>    process.env.NODE_ENV !== 'production' &amp;&amp; warn(</span>
<span>      'Avoid adding reactive properties to a Vue instance or its root $data ' +</span>
<span>      'at runtime - declare it upfront in the data option.'</span>
<span>    )</span>
<span>    return val</span>
<span>  }</span>
<span>  if (!ob) {'{'}</span>
<span>    target[key] = val</span>
<span>    return val</span>
<span>  }</span>
<span>  defineReactive(ob.value, key, val)</span>
<span>  ob.dep.notify()</span>
<span>  return val</span>
<span>}</span>
<span></span>
</code></pre>

<p>可以看到，如果对象是数组的话直接使用<code>target.splice(key, 1, val)</code>来触发响应式，如果给对象增加新属性，会调用<code>defineReactive()</code>方法,这个方法其实就是在Vue在初始化对象时给对象属性采用<code>Object.defineProperty</code>动态添加<code>getter</code>和<code>setter</code>的功能，说白了可以理解为就给新增对象就像初始化那样做一套响应式逻辑。</p>

<h3 id='Proxy'>Proxy</h3>

<p>尤大之前就说过了 Vue3.0 要把 <code>Object.defineProperty</code> 用 <code>Proxy</code> 来进行重构了。这个<code>Proxy</code>可真是个好东西，和<code>Object.defineProperty</code>比起来有诸多优点：</p>

<ol>
<li>Proxy 可以直接监听对象而非属性；</li>
<li>Proxy 可以直接监听数组的变化；</li>
<li>Proxy 有多达 13 种拦截方法,不限于<code>apply</code>、<code>ownKeys</code>、<code>deleteProperty</code>、<code>has</code>等等,是<code>Object.defineProperty</code>不具备的；</li>
<li>Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而<code>Object.defineProperty</code>只能遍历对象属性直接修改；</li>
<li>Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；</li>
</ol>

<p>最后再来回顾一下 <code>Proxy</code>如何使用吧，Proxy对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）：</p>

<pre><code><span></span>
<span>let handler = {'{'}</span>
<span>    // 获取属性时执行的回调函数</span>
<span>    get: function(target, name){'{'}</span>
<span>        return name in target ? target[name] : 37;</span>
<span>    },</span>
<span>    // 设置属性时执行的回调函数</span>
<span>    set: function (obj, prop, value) {'{'}</span>
<span>        ...</span>
<span>    }</span>
<span>};</span>
<span></span>
<span>let p = new Proxy({'{'}}, handler); // 第一个参数为被包装的目标对象，第二个参数为各种操作回调函数的集合</span>
<span></span>
<span>p.a = 1; </span>
<span>p.b = undefined;</span>
<span></span>
<span>console.log(p.a, p.b);    // 1, undefined</span>
<span>console.log('c' in p, p.c);    // false, 37</span>
<span></span>
</code></pre>

<h3 id='参考'>参考</h3>

<blockquote>
  <p><a target="_blank" href="https://juejin.im/post/5d421bcf6fb9a06af23853f1">0 到 1 掌握：Vue 核心之数据双向绑定</a><br></br><a target="_blank" href="https://juejin.im/post/5a04231af265da431f4a84be">Vue响应式----数组变异方法</a></p>
</blockquote>
</div>
            </Fragment>
        )
    }
}