import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"OOCSS"},{"level":"h3","title":"SMACSS"},{"level":"h4","title":"Base"},{"level":"h4","title":"Layout"},{"level":"h4","title":"Module"},{"level":"h4","title":"State"},{"level":"h4","title":"Theme"},{"level":"h3","title":"BEM命名法"},{"level":"h3","title":"总结"},{"level":"h3","title":"参考"}]
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
<div className="title-content"><h1 className="title">聊聊CSS设计模式</h1></div>
<blockquote>
  <p>日常开发业务的时候很令人头疼的一件事就是给CSS命名，瞎起名乱起名，等到版本迭代修改样式的时候可就痛苦了，无从下手。所以能写出一套可被维护的CSS也至关重要呀。</p>
</blockquote>

<h3 id='OOCSS'>OOCSS</h3>

<p><strong>OOCSS(Object Oriented CSS)</strong> 面向对象的CSS，主要有两个原则：</p>

<ol>
<li>Separate structure and skin（分离结构和主题）</li>
<li>Separate container and content（分离容器和内容）</li>
</ol>

<p>我们来看个例子：</p>

<pre><code><span></span>
<span>//- html</span>
<span>&lt;div class="box box-shadow"&gt;</span>
<span>  &lt;div class="box-title"&gt;这是标题&lt;/div&gt;</span>
<span>  &lt;div class="box-content"&gt;</span>
<span>    &lt;span class="box-text text-red"&gt;这是红色&lt;/span&gt;</span>
<span>    &lt;span class="box-text text-green"&gt;这是绿色&lt;/span&gt;</span>
<span>  &lt;/div&gt;</span>
<span>&lt;/div&gt;</span>
<span></span>
<span></span>
<span>//- css</span>
<span></span>
<span>.box{'{'}</span>
<span>  width:150px;</span>
<span>  height:150px;</span>
<span>  padding:20px;</span>
<span>}</span>
<span>.box-shadow{'{'}</span>
<span>  box-shadow: 0 0 10px #aaa;</span>
<span>}</span>
<span>.box-title{'{'}</span>
<span>  font-weight:bold;</span>
<span>}</span>
<span>.box-content{'{'}</span>
<span>  margin: 10px auto;</span>
<span>}</span>
<span>.box-text{'{'}</span>
<span>  font-size:12px;</span>
<span>}</span>
<span>.text-red{'{'}</span>
<span>  color:red;</span>
<span>}</span>
<span>.text-green{'{'}</span>
<span>  color:green;</span>
<span>}</span>
<span></span>
<span></span>
</code></pre>

<p><strong>分离结构和主题</strong>是将一个特定的主题样式分离出来，比如我们代码中的<code>box-shadow</code>，它没有直接将样式写到 <code>box</code>下，这样它就是可选择可拆分的了。<br></br><strong>分离容器和内容</strong>使得我们不在采用类似 <code>.box div span{'{'} }</code>的写法，既不使用继承选择符，这样是为了避免样式过度依赖标签的结构，可以在任何地方使用。</p>

<h3 id='SMACSS'>SMACSS</h3>

<p><strong>SMACSS(Scalable and Modular Architecture for CSS)</strong>,具体更详细的规范定义可以<a target="_blank" href="http://smacss.com/">戳这里</a>。SMACSS将css分为5类：Base(基础样式)、Layout(布局样式)、Module(模块样式)、State(状态样式)、Theme(主题样式)。</p>

<h4 id='Base'>Base</h4>

<blockquote>
  <p>Base 就是设定标签元素的预设值，这里只会对标签本身做限制，不会出现id 或者 class 选择器。</p>
</blockquote>

<pre><code><span></span>
<span>body, form {'{'}</span>
<span>    margin: 0;</span>
<span>    padding: 0;</span>
<span>}</span>
<span>a {'{'}</span>
<span>    color: #039;</span>
<span>}</span>
<span>a:hover {'{'}</span>
<span>    color: #03F;    </span>
<span>}</span>
<span></span>
</code></pre>

<h4 id='Layout'>Layout</h4>

<blockquote>
  <p>Layout 是对网站的整体架构，而不是一些细微的UI处理。</p>
</blockquote>

<pre><code><span></span>
<span>#header, #article, #footer {'{'}</span>
<span>    width: 960px;</span>
<span>    margin: auto;</span>
<span>}</span>
<span></span>
<span>#article {'{'}</span>
<span>    border: solid #CCC;</span>
<span>    border-width: 1px 0 0;</span>
<span>}</span>
<span></span>
</code></pre>

<h4 id='Module'>Module</h4>

<blockquote>
  <p>Module 是页面中更离散的组件，每个模块都应该设计为独立的组件。这样，页面将更加灵活。</p>
</blockquote>

<pre><code><span></span>
<span>.module &gt; h2 {'{'}</span>
<span>    padding: 5px;</span>
<span>}</span>
<span></span>
<span>.module span {'{'}</span>
<span>    padding: 5px;</span>
<span>}</span>
<span></span>
</code></pre>

<h4 id='State'>State</h4>

<blockquote>
  <p>State通常定义元素不同状态下的样式，主要应用于与布局规则相同的元素，或者应用于与基本模块类相同的元素。</p>
</blockquote>

<pre><code><span></span>
<span>&lt;div&gt;</span>
<span>    &lt;div class="tab"&gt;&lt;/div&gt;</span>
<span>    &lt;div class="tab"&gt;&lt;/div&gt;</span>
<span>    &lt;div class="tab is-tab-active"&gt;&lt;/div&gt;</span>
<span>    &lt;div class="tab"&gt;&lt;/div&gt;</span>
<span>&lt;/div&gt;</span>
<span></span>
<span>.tab {'{'}</span>
<span>    background-color: purple;</span>
<span>    color: white;</span>
<span>}</span>
<span></span>
<span>.is-tab-active {'{'}</span>
<span>    background-color: white;</span>
<span>    color: black;</span>
<span>}</span>
<span></span>
</code></pre>

<h4 id='Theme'>Theme</h4>

<blockquote>
  <p>Theme 是页面主视觉的定义。</p>
</blockquote>

<pre><code><span></span>
<span>.mod {'{'}</span>
<span>    border-color: blue;</span>
<span>    color:red;</span>
<span>}</span>
<span></span>
</code></pre>

<h3 id='BEM命名法'>BEM命名法</h3>

<p>BEM 即 Block、Element、Modifier 的缩写，这是一种 class 的命名技巧。使用 BEM命名法可以有效的提升CSS可读性，同时在多人协作开发下也可以避免命名冲突的问题。</p>

<p><strong>Block</strong>是页面中独立存在的区块，可以在不同场合下被重用。每个页面都可以看做是多个Block组成。</p>

<p><strong>Element</strong>是构成Block的元素，只有在对应Block内部才具有意义，是依赖于Block的存在。</p>

<p><strong>Modifier</strong>是描述Block或Element的属性或状态。同一Block或Element可以有多个Modifier。</p>

<p>不同 Block 和 Element 用<code>__</code>两个底线区隔开来，不同的 Modifier 则用<code>--</code>两个 dash 区隔。至于<code>-</code>一个 dash 则表示这个 class 不依赖任何 Block 或 Element，是个独立的存在。举个例子：</p>

<pre><code><span></span>
<span>.box{'{'}}</span>
<span>.box__title{'{'}}</span>
<span>.box__title--active{'{'}}</span>
<span>.box__content{'{'}}</span>
<span></span>
<span></span>
</code></pre>

<h3 id='总结'>总结</h3>

<p>任一种理论都只是对解决css编写、维护问题的一种尝试，具体使用时，还需结合业务多加思考。</p>

<h3 id='参考'>参考</h3>

<blockquote>
  <p><a target="_blank" href="https://segmentfault.com/a/1190000000389838">CSS设计模式：OOCSS 和 SMACSS</a><br></br><a target="_blank" href="https://segmentfault.com/a/1190000000388784">编写可维护的CSS</a></p>
</blockquote>
</div>
            </Fragment>
        )
    }
}