import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"create-react-app"},{"level":"h3","title":"JSX"},{"level":"h3","title":"组件"},{"level":"h4","title":"组件生命周期钩子"},{"level":"h4","title":"setState"},{"level":"h3","title":"事件"},{"level":"h3","title":"总结"}]
        }
    }
    componentDidMount() {}
    render() {
        return (
            <Fragment>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">React 笔记</h1></div>
<h3 id='create-react-app'>create-react-app</h3>

<p>create-react-app是github上面开源star最多的react脚手架,也是官方比较推荐的，所以打算用这个架子上手了。后续可以再学习用webpack自己去搭一套。</p>

<ul>
<li>安装以及启动项目</li>
</ul>

<pre><code><span></span>
<span>npm install -g create-react-app</span>
<span>create-react-app my-app</span>
<span>cd my-app</span>
<span>npm start</span>
<span></span>
</code></pre>

<ul>
<li>api开发请求代理
开发环境时的域名重定向，只需要在<code>package.json</code>中加入 </li>
</ul>

<pre><code><span></span>
<span>“proxy”:”http://localhost:3031/”</span>
<span></span>
</code></pre>

<ul>
<li><p>打包文件路径不对问题,在<code>package.json</code>中加入<code>“homepage”：“.”</code></p></li>
<li><p>找到webpack配置文件<br></br>默认情况下，为了便于开发，该脚手架直接隐藏掉了webpack配置文件，如果想要自己手动修改一些配置文件怎么办呢？直接：</p></li>
</ul>

<pre><code><span></span>
<span>指令 npm run eject</span>
<span></span>
</code></pre>

<ul>
<li>添加 ant-design</li>
</ul>

<pre><code><span></span>
<span>npm install antd babel-plugin-import --save-dev</span>
<span></span>
<span>// 配置ant-design的按需加载</span>
<span>plugins: [</span>
<span>      ['import', [{'{'} libraryName: "antd", style: 'css' }]],</span>
<span>],</span>
<span></span>
</code></pre>

<h3 id='JSX'>JSX</h3>

<p>JSX是react特有的一个语法扩展。在react中通常用JSX来描述界面，它是写在JavaScript里的。这也是react倡导的 “all in js”，它和vue的单文件组件是不一样的。</p>

<pre><code><span></span>
<span>const element = (</span>
<span>  &lt;h1&gt;</span>
<span>    Hello, {'{'}formatName(user)}!</span>
<span>  &lt;/h1&gt;</span>
<span>);</span>
<span></span>
</code></pre>

<p>JSX就相当于一个语法糖文件，Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用，所以我们在每一个JSX文件中都需要<code>import React from 'react'</code>这样引入<code>React</code>。</p>

<pre><code><span></span>
<span>const element = (</span>
<span>  &lt;h1 className="greeting"&gt;</span>
<span>    Hello, world!</span>
<span>  &lt;/h1&gt;</span>
<span>);</span>
<span>&lt;!-- babel 转译如下 --&gt;</span>
<span>const element = React.createElement(</span>
<span>  'h1',</span>
<span>  {'{'}className: 'greeting'},</span>
<span>  'Hello, world!'</span>
<span>);</span>
<span></span>
</code></pre>

<h3 id='组件'>组件</h3>

<pre><code><span></span>
<span>class Welcome extends React.Component {'{'}</span>
<span>  render() {'{'}</span>
<span>    return &lt;h1&gt;Hello, {'{'}this.props.name}&lt;/h1&gt;;</span>
<span>  }</span>
<span>}</span>
<span>&lt;Welcome name=‘Du Honghui’   /&gt;</span>
<span></span>
<span>State</span>
<span></span>
<span>class Welcome extends React.Component {'{'}</span>
<span></span>
<span>constructor(props){'{'}</span>
<span>    super(props);</span>
<span>    // 初始化 state</span>
<span>    this.state={'{'}</span>
<span>        name:’Du Honghui’</span>
<span>    }</span>
<span>}</span>
<span></span>
<span>//当绑定到dom时执行</span>
<span>componentDidMount() {'{'}</span>
<span>    this.setState({'{'}</span>
<span>        name:’Du now’</span>
<span>    })    </span>
<span>}</span>
<span></span>
<span>render() {'{'}</span>
<span>    return &lt;h1&gt;Hello, {'{'}this.state.name}&lt;/h1&gt;;</span>
<span> }</span>
<span>}</span>
<span></span>
</code></pre>

<h4 id='组件生命周期钩子'>组件生命周期钩子</h4>

<ul>
<li><code>componentDidMount()</code> 组件插入到dom中的时候执行</li>
<li><code>componentWillUnmount()</code>  组件被移除的时候执行</li>
</ul>

<h4 id='setState'>setState</h4>

<p><strong>为什么要用setState进行赋值?</strong><br></br>在React中，修改state中的属性需要调用<code>setState</code>进行修改。如果习惯写vue的开发人员一上来肯定是不习惯的，为何我不能直接<code>this.state.xx=xxx</code>的方法来进行修改呢？这是因为<code>setState</code>操作不只是赋值这么简单，他还会触发React的更新机制，也就是进行<code>diff</code>和<code>patch</code>以及<code>更新dom</code>的操作。直接对<code>state</code>的属性进行赋值，虽然值能被修改但不会触发视图更新。vue之所以可以直接通过修改data中的值即可触发视图更新，是因为在实例创建的时候会进行响应式以及依赖的收集。</p>

<p><strong>setState是同步还是异步操作?</strong><br></br>首先，代码是同步执行的。之所以有时候让我们产生异步的错觉，是合成事件和钩子函数的调用顺序有可能在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值。</p>

<p><code>setState</code>操作只在合成事件和钩子函数中是“异步”的，在原生事件和<code>setTimeout</code>/<code>setInterval</code>等原生API中都是同步的。这是因为React出于性能的考虑，如果频繁的<code>setState</code>操作会造成频繁渲染dom，这个开销是非常大的。所以会把多个 setState() 调用合并成一个调用。为了解决这个问题,可以让<code>setState()</code>接收一个函数而不是一个对象：</p>

<pre><code><span></span>
<span>this.setState((state, props) =&gt; ({'{'}</span>
<span>  counter: state.counter + props.increment</span>
<span>}));</span>
<span></span>
</code></pre>

<h3 id='事件'>事件</h3>

<pre><code><span></span>
<span>function handleClick(e) {'{'}</span>
<span>  e.preventDefault();</span>
<span>  console.log('The link was clicked.');</span>
<span>}</span>
<span></span>
<span>return (</span>
<span>  &lt;a href="" onClick={'{'}handleClick}&gt;</span>
<span>    Click me</span>
<span>  &lt;/a&gt;</span>
<span>);</span>
<span></span>
</code></pre>

<blockquote>
  <p>注意：在组件中需要为事件处理函数绑定<code>this</code>,这是因为class的方法默认不会绑定<code>this</code>。因为 render 多次调用每次都要 bind 会影响性能，所以官方就没有进行处理，而要我们需要绑定的地方手动去绑定，以达到性能优化的目的。</p>
</blockquote>

<p>目前我们一般有四种方法去绑定this:</p>

<ul>
<li><strong>直接在事件里进行bind操作</strong>，这样写起来顺手，但是如果我们有多个事件绑定同一个事件函数的话，就会进行多次的bind操作，会对性能造成影响。</li>
<li><strong>在constructor种手动bind</strong>，相比第一种方法，在构造函数中只进行一次绑定操作即可，节省多余开销</li>
<li><strong>箭头函数</strong>，利用箭头函数不会创建this的特性，但是每次我们都要创建一个不同的回调函数</li>
<li><strong>public class fields</strong>，需要安装babel插件来支持</li>
</ul>

<pre><code><span></span>
<span>class Foo extends React.Component {'{'}</span>
<span>  constuctor(props) {'{'}</span>
<span>    super(props)</span>
<span>    this.handleClick2 = this.handleClick.bind(this)</span>
<span>  }</span>
<span></span>
<span>  handleClick () {'{'}</span>
<span>    this.setState({'{'} xxx: aaa })</span>
<span>  }</span>
<span></span>
<span>  render() {'{'}</span>
<span>    return (</span>
<span>      &lt;div&gt;</span>
<span>        &lt;!-- 直接进行 bind this --&gt;</span>
<span>        &lt;button onClick={'{'}this.handleClick.bind(this)}&gt;Click me&lt;/button&gt;</span>
<span>        &lt;!-- 在 constructor 中手动绑定函数 --&gt;</span>
<span>        &lt;button onClick={'{'}this.handleClick2}&gt;Click me&lt;/button&gt;</span>
<span>        &lt;!-- 箭头函数形式 --&gt;</span>
<span>        &lt;button onClick={'{'}(e) =&gt; this.handleClick(e)}&gt;Click me&lt;/button&gt;</span>
<span>      &lt;/div&gt;</span>
<span>    )</span>
<span>  }</span>
<span>}</span>
<span></span>
</code></pre>

<h3 id='总结'>总结</h3>

<p>作为目前最流行的MVVM框架React和vue有很多异同点，那就在这来总结一下吧，来更深刻的对两个框架理解，并有能力知道在何种场景适合使用vue或者react来进行快速开发。</p>
</div>
            </Fragment>
        )
    }
}