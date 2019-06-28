import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"探底VUE"},{"level":"h3","title":"分析"},{"level":"h3","title":"watch实现"},{"level":"h3","title":"computed实现"},{"level":"h3","title":"后续问题"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title">小程序实现vue的watch和computed方法</div>
<p>博主现在的工作项目是以小程序为主，所以就开始涉猎小程序这一块坑了。个人感觉，小程序有点 miniVUE 的意思，同样是MVVM框架，小程序继承了vue很多的写法，入手还是很快的。同时小程序特有的一些api在微信生态里面用起来也是很爽歪歪～ 不过，用惯了vue就发现了小程序有很多功能是不支持的，这对于刚从vue转到小程序的我是何等的不习惯啊，所以这里面就打算首先来封装一下 watch 和 computed 两个方法。</p>

<h3 id='探底VUE'>探底VUE</h3>

<p>vue作为一个典型的MVVM框架，双向绑定可以说是很溜了。在 new Vue() 的时候，首先对data中的属性进行遍历，然后用 Object.defineProperty将它们转为 getter/setter，实现数据变化监听功能；Vue 的指令编译器Compile 对元素节点的指令进行扫描和解析，初始化视图，并订阅Watcher来更新视图，此时Wather 会将自己添加到消息订阅器中(Dep),初始化完毕。</p>

<h3 id='分析'>分析</h3>

<p>在小程序底层已经对data属性做好了双向绑定，那我需要做的呢就是在 onLoad 生命周期时，添加 wacth函数和computed函数，对其中的对象属性进行对应操作的初始化绑定。</p>

<h3 id='watch实现'>watch实现</h3>

<p>watch监听的话，看过vue源码就应该知道这里要用到 Object.defineProperty 拦截判断了，具体原理就是在渲染时执行watch函数，那么watch函数的具体作用呢就是操作数据对象的对象描述符，使得我们在setData修改其值的时候，每次在set里都能获取到监听，上源码：</p>

<pre><code><span></span>
<span>// vue watch 方法 监听值的变化</span>
<span>function watch(ctx, obj) {'{'}</span>
<span>  // obj是watch监听的一个一个对象集合 </span>
<span>  Object.keys(obj).forEach(key =&gt; {'{'}</span>
<span>    defineReactive(ctx.data, key, ctx.data[key], function (newVal, oldVal) {'{'}</span>
<span>      // obj[key] 对应监听值的回调函数</span>
<span>      obj[key].call(ctx, newVal, oldVal);</span>
<span>    })</span>
<span>  })</span>
<span>}</span>
<span></span>
<span>/**</span>
<span> * 检测函数的变化</span>
<span> * data 当前上下文的data，key 键名，val 键值，fn执行的回调函数</span>
<span> */</span>
<span>function defineReactive(data, key, val, fn) {'{'}</span>
<span>  // 通过 Object.defineProperty进行set操作拦截</span>
<span>  Object.defineProperty(data, key, {'{'}</span>
<span>    configurable: true,</span>
<span>    enumerable: true,</span>
<span>    get: function () {'{'}</span>
<span>      return val</span>
<span>    }, </span>
<span>    set: function (newVal) {'{'}</span>
<span>      if (newVal === val) return</span>
<span>      // 如果新值和老值不相同则执行回调函数fn</span>
<span>      fn &amp;&amp; fn(newVal,val)</span>
<span>      val = newVal;</span>
<span>    }</span>
<span>  })</span>
<span>}</span>
<span></span>
</code></pre>

<p>实际应用：</p>

<pre><code><span></span>
<span>onLoad: function () {'{'}</span>
<span>    watch(this, {'{'}</span>
<span>      i: function (newVal,oldVal) {'{'}</span>
<span>        console.log("watch监听到i的变化，现在的值：" + newVal+"原来的值："+oldVal</span>
<span>      }</span>
<span>    })</span>
<span>}</span>
<span></span>
</code></pre>

<h3 id='computed实现'>computed实现</h3>

<p>computed的话，原理和watch操作类似，不同的是需要在对应属性数值变化的时候同时更新该属性依赖的其他属性，（备注：这里有一些优化缺陷，每次数据有修改的时候都会重复执行computed里的所有函数，有些冗余，后续计划设计key值或者采用发布订阅模式优化）上源码：</p>

<pre><code><span></span>
<span>// computed 函数</span>
<span>function computed(ctx, obj) {'{'}</span>
<span>  let computedKeys = Object.keys(obj)//computed 对象集合</span>
<span>  let computedFn = [];//computedFn存储computed计算操作</span>
<span>  let computedObj = computedKeys.reduce((total, next) =&gt; {'{'}</span>
<span>    computedFn.push(function () {'{'}</span>
<span>      ctx.setData({'{'} [next]: obj[next].call(ctx) })</span>
<span>    })</span>
<span>    total[next] = obj[next].call(ctx);</span>
<span>    return total</span>
<span>  }, {'{'}})</span>
<span>  // 首次加载先设置一次</span>
<span>  ctx.setData(computedObj)</span>
<span>  // 绑定数据变化时，动态computed</span>
<span>  let dataKeys = Object.keys(ctx.data)</span>
<span>  dataKeys.forEach(dataKey =&gt; {'{'}</span>
<span>    defineReactive(ctx.data, dataKey, ctx.data[dataKey], "", computedFn)</span>
<span>  })</span>
<span>}</span>
<span></span>
<span>/**</span>
<span> * 检测函数的变化</span>
<span> * data 当前上下文的data，key 键名，val 键值，fn 回调函数</span>
<span> * 这里要兼容 watch问题了</span>
<span> */</span>
<span></span>
<span>function defineReactive(data, key, val, watchFn, computedFn) {'{'}</span>
<span>  // 通过 Object.defineProperty进行set操作拦截</span>
<span></span>
<span>  Object.defineProperty(data, key, {'{'}</span>
<span>    configurable: true,</span>
<span>    enumerable: true,</span>
<span>    get: function () {'{'}</span>
<span>      return val</span>
<span>    },</span>
<span>    set: function (newVal) {'{'}</span>
<span>      if (newVal === val) return</span>
<span>      // 如果新值和老值不相同则返回回调函数 fn</span>
<span>      watchFn &amp;&amp; watchFn(newVal, val)</span>
<span></span>
<span>      if (computedFn &amp;&amp; computedFn.length) {'{'}</span>
<span>        // 执行 computed的更新设置值</span>
<span>        setTimeout(() =&gt; {'{'}</span>
<span>          computedFn.forEach(sub =&gt; sub());</span>
<span>        })</span>
<span></span>
<span>      }</span>
<span>      val = newVal;</span>
<span>    },</span>
<span>  })</span>
<span>}</span>
<span></span>
</code></pre>

<p>实际应用：</p>

<pre><code><span></span>
<span>onLoad: function () {'{'}</span>
<span>    computed(this, {'{'}</span>
<span>      test2: function () {'{'}</span>
<span>        return 'computed封装：' + this.data.i + '次'</span>
<span>      }</span>
<span>    })</span>
<span>}</span>
<span></span>
</code></pre>

<h3 id='后续问题'>后续问题</h3>

<p>如果单纯实现watch或者computed，之前的方案是可行的，可是在实际操作中发现，后执行的活覆盖掉前者的回调函数，造成的问题是只执行后者的方法。所以经过一番实验和改造，对watchFn和computedFn进行了写入ctx.data变量，同时对watch添加了字段校验。源码如下：</p>

<pre><code><span></span>
<span>/**</span>
<span> * 检测函数的变化</span>
<span> * data 当前上下文的data，key 键名，val 键值，fn 回调函数</span>
<span> */</span>
<span>function defineReactive(data, key, val, watchFn, computedFn) {'{'}</span>
<span>  let realWatchFn = data['watchFn'];</span>
<span>  let realComputedFn = data['computedFn'];</span>
<span>  Object.defineProperty(data, key, {'{'}</span>
<span>    configurable: true,</span>
<span>    enumerable: true,</span>
<span>    get: function () {'{'}</span>
<span>      if (watchFn) {'{'}</span>
<span>        realWatchFn = watchFn;</span>
<span>        data['watchFn'] = realWatchFn;</span>
<span>      }</span>
<span>      if (computedFn) {'{'}</span>
<span>        realComputedFn=computedFn;</span>
<span>        data['computedFn']=realComputedFn;</span>
<span>      }</span>
<span>      return val</span>
<span>    },</span>
<span>    set: function (newVal) {'{'}</span>
<span>      if (newVal === val) return</span>
<span>      // 如果新值和老值不相同则返回回调函数 fn</span>
<span>      realWatchFn &amp;&amp; realWatchFn(newVal, val, key);</span>
<span>      val = newVal;</span>
<span>      if (realComputedFn &amp;&amp; realComputedFn.length) {'{'}</span>
<span>        // 执行 computed的更新设置值</span>
<span>        setTimeout(() =&gt; {'{'}</span>
<span>          realComputedFn.forEach(sub =&gt; sub());</span>
<span>        })</span>
<span>      }</span>
<span>    },</span>
<span>  })</span>
<span>}</span>
<span></span>
<span>// vue watch 方法 监听值的变化</span>
<span>function watch(ctx, obj) {'{'}</span>
<span>  // obj是watch监听的一个一个对象集合 </span>
<span>  Object.keys(obj).forEach(key =&gt; {'{'}</span>
<span>    // console.log(key);</span>
<span>    defineReactive(ctx.data, key, ctx.data[key], function (newVal, oldVal, realKey) {'{'}</span>
<span>      // obj[key] 对应监听值的回调函数,key值判断当前是否是需要watch的字段</span>
<span>      realKey == key &amp;&amp; obj[key].call(ctx, newVal, oldVal);</span>
<span>    })</span>
<span>  })</span>
<span>}</span>
<span></span>
<span>// computed 函数</span>
<span>function computed(ctx, obj) {'{'}</span>
<span>  console.log(ctx.data)</span>
<span>  let computedKeys = Object.keys(obj)//computed 对象集合</span>
<span>  let computedFn = [];//computedFn存储computed计算操作</span>
<span>  let computedObj = computedKeys.reduce((total, next) =&gt; {'{'}</span>
<span>    computedFn.push(function () {'{'}</span>
<span>      ctx.setData({'{'} [next]: obj[next].call(ctx) })</span>
<span>    })</span>
<span>    total[next] = obj[next].call(ctx);</span>
<span>    return total</span>
<span>  }, {'{'}})</span>
<span>  // 首次加载先设置一次</span>
<span>  ctx.setData(computedObj)</span>
<span>  // 绑定数据变化时，动态computed</span>
<span>  let dataKeys = Object.keys(ctx.data)</span>
<span>  dataKeys.forEach(dataKey =&gt; {'{'}</span>
<span>    defineReactive(ctx.data, dataKey, ctx.data[dataKey], false, computedFn)</span>
<span>  })</span>
<span>}</span>
<span></span>
<span>// 对外抛出 watch、computed 方法</span>
<span>module.exports = {'{'} watch, computed }</span>
<span></span>
<span></span>
</code></pre>
</div>
            </div>

        )
    }
}