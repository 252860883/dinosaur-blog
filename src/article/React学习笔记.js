import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"脚手架 create-react-app"},{"level":"h3","title":"JSX"},{"level":"h3","title":"渲染 DOM"},{"level":"h3","title":"组件"},{"level":"h3","title":"事件"},{"level":"h3","title":"总结"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title">React 学习笔记</div>
<h3 id='脚手架 create-react-app'>脚手架 create-react-app</h3>

<p>create-react-app是github上面开源点星最多的react脚手架,也是官方比较推荐的，所以打算用这个架子上手了。后续可以再学习用webpack去自己搭一套。</p>

<ul>
<li>安装 </li>
</ul>

<pre><code><span></span>
<span>npm install -g create-react-app</span>
<span></span>
</code></pre>

<ul>
<li>创建</li>
</ul>

<pre><code><span></span>
<span>create-react-app my-app</span>
<span>cd my-app</span>
<span></span>
</code></pre>

<ul>
<li>运行</li>
</ul>

<pre><code><span></span>
<span>npm start (默认3000端口)</span>
<span></span>
</code></pre>

<ul>
<li>api开发请求代理
开发环境时的域名重定向，只需要在package.json中加入 </li>
</ul>

<pre><code><span></span>
<span>“proxy”:”http://localhost:3031/”</span>
<span></span>
</code></pre>

<ul>
<li><p>打包文件路径不对问题<br></br>在package.json中加入  “homepage”：“.”</p></li>
<li><p>找到webpack配置文件<br></br>默认情况下，为了便于开发，该脚手架直接隐藏掉了webpack配置文件，如果想要自己手动修改一些配置文件怎么办呢？直接：</p></li>
</ul>

<pre><code><span></span>
<span>指令 npm run eject</span>
<span></span>
</code></pre>

<ul>
<li>安装 sass/less</li>
</ul>

<pre><code><span></span>
<span>npm install sass-loader node-sass --save-dev</span>
<span></span>
</code></pre>

<p>安装后修改config -> webpack.config.dev.js 和 webpack.config.prod.js ，分别在css的loader配置里面修改两处：<br></br>一是 test: /.css$/ 增加scss和sass；<br></br>二是use里面最后再加个loader，直接加 "sass-loader" 就可以了，也不用配置别的了。</p>

<ul>
<li>添加 ant-design</li>
</ul>

<pre><code><span></span>
<span>npm install antd babel-plugin-import --save-dev</span>
<span></span>
</code></pre>

<p>配置，按需加载</p>

<pre><code><span></span>
<span>  // 配置ant-design的按需加载</span>
<span> plugins: [</span>
<span>      ['import', [{'{'} libraryName: "antd", style: 'css' }]],</span>
<span> ],</span>
<span></span>
</code></pre>

<p>bundle-loader 路由懒加载</p>

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

<h3 id='渲染 DOM'>渲染 DOM</h3>

<pre><code><span></span>
<span>ReactDOM.render(</span>
<span>  Element,</span>
<span>  document.getElementById('root')</span>
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

<ul>
<li>组件生命周期钩子
componentDidMount()   组件插入到dom中的时候执行
componentWillUnmount()    组件被移除的时候执行</li>
</ul>

<h3 id='事件'>事件</h3>

<p>书写 驼峰式</p>

<pre><code><span></span>
<span> function handleClick(e) {'{'}</span>
<span>    e.preventDefault();</span>
<span>    console.log('The link was clicked.');</span>
<span> }</span>
<span></span>
<span>  return (</span>
<span>    &lt; a href=" " onClick={'{'}handleClick}&gt;</span>
<span>      Click me</span>
<span>    &lt;/ a&gt;</span>
<span>  );</span>
<span></span>
</code></pre>

<p>在组件中的时候需要添加 this.handleClick</p>

<p>处理回调函数的 this：<br></br>方法1: 在constructor中添加 bind 绑定 this</p>

<pre><code><span></span>
<span>this.handleClick = this.handleClick.bind(this);</span>
<span></span>
</code></pre>

<p>方法2: 使用属性初始化器(箭头函数)绑定回调函数</p>

<pre><code><span></span>
<span>handleClick = () =&gt; {'{'}</span>
<span>    console.log('this is:', this);</span>
<span>  }</span>
<span></span>
</code></pre>

<h3 id='总结'>总结</h3>

<p>作为目前最流行的MVVM框架React和vue有很多异同点，那就在这来总结一下吧，来更深刻的对两个框架理解，并有能力知道在何种场景适合使用vue或者react来进行快速开发。</p>
</div>
            </div>

        )
    }
}