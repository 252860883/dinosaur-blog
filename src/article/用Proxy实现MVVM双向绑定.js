import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"Proxy"},{"level":"h3","title":"实现一个简单的 MVVM 框架"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">用Proxy实现MVVM双向绑定</h1></div>
<blockquote>
  <p>在之前我们了解到 VUE 的框架底层通过 <code>Object.defineProperty()</code> 来实现双向绑定的。那这次咱们就来玩点不一样的，用 ES6 的 Proxy 来实现 MVVM 的双向绑定。</p>
</blockquote>

<h3 id='Proxy'>Proxy</h3>

<p>首先来了解一下 <code>Proxy</code> ，该对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。看下面的基础示例：</p>

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

<h3 id='实现一个简单的 MVVM 框架'>实现一个简单的 MVVM 框架</h3>

<p>好了，有了这个前提，我们就可以开始封装我们的“框架”了。</p>

<p>首先，我们创建一个<code>viewModel</code>对象,并将其赋值为一个Proxy对象，设置<code>set</code>回调函数，当属性值被修改时便可以执行对应的操作。</p>

<pre><code><span></span>
<span>let viewModel = {'{'}</span>
<span>    a: "111"</span>
<span>}</span>
<span></span>
<span>let handler = {'{'}</span>
<span>    set: function (obj, prop, newValue) {'{'}</span>
<span>        let oldValue = obj[prop]</span>
<span>        if (oldValue != newValue) {'{'}</span>
<span>            obj[prop] = newValue</span>
<span>            console.log(`${'{'}prop} is changing from ${'{'}oldValue} to ${'{'}newValue}`)</span>
<span>        }</span>
<span>    }</span>
<span>}</span>
<span>viewModel = new Proxy(viewModel, handler);</span>
<span></span>
</code></pre>

<p>然后我们进行单向绑定，将我们的dom中的value值和viewModel进行绑定，当value值变化时，viewModel会自动进行更新。这里我们模拟dom元素中的model属性值对应绑定viewModel中的属性值。</p>

<pre><code><span></span>
<span>// html</span>
<span>&lt;input id='input' type="text" model="a"&gt;</span>
<span></span>
<span>// js</span>
<span>// 获取所有需要绑定的dom元素</span>
<span>let modelElements = document.querySelectorAll('[model]');</span>
<span>// 绑定事件</span>
<span>function init() {'{'}</span>
<span>    modelElements.forEach(element =&gt; {'{'}</span>
<span>        let prop = element.getAttribute('model')</span>
<span>        if (prop in viewModel) {'{'}</span>
<span>            element.value = viewModel[prop];</span>
<span>            element.addEventListener('keyup', function () {'{'}</span>
<span>                viewModel[prop] = element.value</span>
<span>            })</span>
<span>        }</span>
<span>    })</span>
<span>}</span>
<span>init()</span>
<span></span>
</code></pre>

<p>这样当我们修改 input 的值的时候，控制台就会输出日志，viewModel对应的属性值会同步更新。下面我们继续进行另一向的绑定：当修改 viewModel 的属性值，对应绑定的 dom 元素的值也会发生变化。代码如下：</p>

<pre><code><span></span>
<span>// 当 viewModel 的某个属性被修改时，动态修改被绑定的dom值</span>
<span>function setValue(prop) {'{'}</span>
<span>    modelElements.forEach(element =&gt; {'{'}</span>
<span>        if (element.getAttribute('model') === prop) {'{'}</span>
<span>            element.value= viewModel[prop]</span>
<span>        }</span>
<span>    })</span>
<span>}</span>
<span></span>
<span>// 修改 handler 的set函数</span>
<span>let handler = {'{'}</span>
<span>    set: function (obj, prop, newValue) {'{'}</span>
<span>        let oldValue = obj[prop]</span>
<span>        if (oldValue != newValue) {'{'}</span>
<span>            console.log(`${'{'}prop} is changing from ${'{'}oldValue} to ${'{'}newValue}`)</span>
<span>            obj[prop] = newValue</span>
<span>            // 添加 setValue 函数</span>
<span>            setValue(prop)</span>
<span>        }</span>
<span>    }</span>
<span>}</span>
<span></span>
</code></pre>

<p>这样，双向绑定就完成啦，我们可以添加一个 setTimeout 进行验证：</p>

<pre><code><span></span>
<span>setTimeout(() =&gt; {'{'}</span>
<span>    viewModel.a = 233</span>
<span>}, 1000)</span>
<span></span>
</code></pre>

<p>一秒中后，input中的值由 ‘111’ 变为 ‘233’。成功～</p>

<blockquote>
  <p>完整代码：https://github.com/MagicalDinosaur/demos/blob/master/proxy/mvvm.html</p>
</blockquote>
</div>
            </div>

        )
    }
}