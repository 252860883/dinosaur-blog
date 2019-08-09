import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"1.💎易混淆的组合选择器"},{"level":"h4","title":"后代选择器： 空格符 与 >"},{"level":"h4","title":"兄弟选择器： + 与 ～"},{"level":"h4","title":"总结"},{"level":"h3","title":"2.💎CSS函数"},{"level":"h4","title":"attr()"},{"level":"h4","title":"calc()"},{"level":"h4","title":"自定义变量 var()"},{"level":"h3","title":"3.💎实现条纹效果"},{"level":"h3","title":"4.💎配合 outline 实现双层描边"},{"level":"h3","title":"5.💎单行文本与多行文本超出部分省略"},{"level":"h3","title":"6.💎object-fit 设置图片何种比例显示"},{"level":"h3","title":"参考"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title">每天一点CSS小技巧（不定期更新中...）</div>
<h3 id='1.💎易混淆的组合选择器'>1.💎易混淆的组合选择器</h3>

<p>前提，我们先构建一个Html：</p>

<pre><code><span></span>
<span>// html</span>
<span>&lt;div&gt;</span>
<span>  &lt;span&gt;1&lt;/span&gt;</span>
<span>  &lt;span class='second'&gt;2&lt;/span&gt;</span>
<span>  &lt;span&gt;</span>
<span>      3</span>
<span>      &lt;span&gt;3-1&lt;/span&gt;</span>
<span>  &lt;/span&gt;</span>
<span>  &lt;span&gt;4&lt;/span&gt;</span>
<span>&lt;/div&gt;</span>
<span></span>
</code></pre>

<h4 id='后代选择器： 空格符 与 >'>后代选择器： 空格符 与 ></h4>

<p><strong>空格符</strong>我们再熟悉不过了。<code>A B</code> 表示元素 A 的任意一个子元素 B 以及所有任意后代节点。</p>

<pre><code><span></span>
<span>// css</span>
<span></span>
<span>div span {'{'}</span>
<span>  border:1px solid red</span>
<span>}</span>
<span></span>
</code></pre>

<p>效果如下：<br></br><img src="http://wx4.sinaimg.cn/mw690/a73bc6a1ly1g0ezl3xpyij209m02kjra.jpg" alt="image" title="" /></p>

<p>与空格符的区别是<strong>>符</strong>只作用于直系后代。即 <code>A B</code> 表示元素 A 的任一元素 B，而没有B的后代节点。<br></br>举个例子：</p>

<pre><code><span></span>
<span>// css</span>
<span></span>
<span>div &gt; span {'{'}</span>
<span>  border:1px solid red;</span>
<span>}</span>
<span></span>
</code></pre>

<p>效果如下：<br></br><img src="http://wx2.sinaimg.cn/mw690/a73bc6a1ly1g0ezl496zvj209e02c0sn.jpg" alt="image" title="" /></p>

<h4 id='兄弟选择器： + 与 ～'>兄弟选择器： + 与 ～</h4>

<p><code>A + B</code> 表示元素A的下一个兄弟元素B。</p>

<pre><code><span></span>
<span>// css</span>
<span></span>
<span>.second + .last {'{'}</span>
<span>  border:1px solid red;</span>
<span>}</span>
<span></span>
</code></pre>

<p>效果如下：<br></br><img src="http://wx2.sinaimg.cn/mw690/a73bc6a1ly1g0igw2w8foj209k02cwee.jpg" alt="image" title="" /></p>

<p><code>A ~ B</code>表示A元素后面的有共同父元素的兄弟元素B。与<code>A + B</code>的区别是可以作用于多个B元素。</p>

<pre><code><span></span>
<span>// css</span>
<span></span>
<span>.second ~ .last {'{'}</span>
<span>  border:1px solid red;</span>
<span>}</span>
<span></span>
</code></pre>

<p>效果如下：<br></br><img src="http://wx2.sinaimg.cn/mw690/a73bc6a1ly1g0igw37vqhj214c09swfe.jpg" alt="image" title="" /></p>

<h4 id='总结'>总结</h4>

<ol>
<li><code>空格</code>与<code>&gt;</code>符都作用于后代节点元素，区别是<code>空格</code>符作用于所有子元素，而<code>&gt;</code>符只作用于第一层子元素。</li>
<li><code>+</code>与<code>～</code>符都作用于后面的兄弟节点元素，区别是<code>+</code>只作用于相邻第一个兄弟元素，而<code>～</code>作用于多个兄弟元素。</li>
</ol>

<h3 id='2.💎CSS函数'>2.💎CSS函数</h3>

<h4 id='attr()'>attr()</h4>

<blockquote>
  <p>attr()函数返回选择元素的属性值</p>
</blockquote>

<p>如下操作可以使每个 item 元素的伪类中展示其对应的 value 值。</p>

<pre><code><span></span>
<span>&lt;style&gt;</span>
<span>.item::after {'{'}</span>
<span>  content: attr(value);</span>
<span>}</span>
<span>&lt;/style&gt;</span>
<span>&lt;body&gt;</span>
<span>  &lt;div class="item" value="red"&gt;&lt;/div&gt;</span>
<span>  &lt;div class="item" value="green"&gt;&lt;/div&gt;</span>
<span>&lt;/body&gt;</span>
<span></span>
<span></span>
</code></pre>

<h4 id='calc()'>calc()</h4>

<blockquote>
  <p>calc() 函数用于动态计算长度值,支持四则运算</p>
</blockquote>

<p>在不考虑兼容性的情况下，<code>calc()</code>可以非常好的用在移动端rem自适应布局上，比如我们拿到设计稿页面宽度是 375px，默认字体大小是 16px,那我们就可以设置根结点元素的 font-size 如下：</p>

<pre><code><span></span>
<span>html{'{'}</span>
<span>  font-size:calc((100vw / 375) * 16);</span>
<span>}</span>
<span></span>
</code></pre>

<p>这样，根节点元素会根据屏幕宽度自动计算出应该的字体大小，这样我们就可以省去媒体查询的一大堆代码！当然这样只是对于适配要求不高的页面可以取巧，如果适配要求高的话还是要酌情选择。</p>

<h4 id='自定义变量 var()'>自定义变量 var()</h4>

<blockquote>
  <p><code>var( &lt;自定义属性名&gt; [, &lt;默认值 ]? )</code>,如果我们使用的变量没有定义，则使用后面的值作为元素的属性值。</p>
</blockquote>

<pre><code><span></span>
<span>.box {'{'}</span>
<span>  --bg: #369;</span>
<span>}</span>
<span>body {'{'}</span>
<span>  background-color: var(--bg, #cd0000);</span>
<span>}</span>
<span></span>
</code></pre>

<h3 id='3.💎实现条纹效果'>3.💎实现条纹效果</h3>

<p><img src="http://wx4.sinaimg.cn/mw690/a73bc6a1ly1g5t725g9vcj20l40eoaao.jpg" alt="image" title="" /></p>

<pre><code><span></span>
<span>&lt;!-- 方法1 --&gt;</span>
<span>.stripe{'{'}</span>
<span>    width: 100%;</span>
<span>    height: 20px;</span>
<span>    background: linear-gradient(90deg,red,red 50%,black 50%,black);</span>
<span>    background-size: 5%;</span>
<span>}</span>
<span>&lt;!-- 方法2 --&gt;</span>
<span>.stripe2{'{'}</span>
<span>    width: 100%;</span>
<span>    height: 20px;</span>
<span>    background: repeating-linear-gradient(90deg,red,red 5%,black 5%,black 10%);</span>
<span>}</span>
<span></span>
</code></pre>

<h3 id='4.💎配合 outline 实现双层描边'>4.💎配合 outline 实现双层描边</h3>

<p><img src="http://wx1.sinaimg.cn/mw690/a73bc6a1ly1g5t724z3hjj20kv0ejgm4.jpg" alt="image" title="" /></p>

<pre><code><span></span>
<span>.box{'{'}</span>
<span>    width: 100px;</span>
<span>    height: 100px;</span>
<span>    border: 10px solid red;</span>
<span>    outline: 10px solid green;</span>
<span>}</span>
<span>.box2{'{'}</span>
<span>    width: 100px;</span>
<span>    height: 100px;</span>
<span>    border: 10px solid red;</span>
<span>    outline: 10px dashed green;</span>
<span>    /* 设置 outline-offset 属性 设置位移*/</span>
<span>    outline-offset: -10px; </span>
<span>}</span>
<span></span>
</code></pre>

<h3 id='5.💎单行文本与多行文本超出部分省略'>5.💎单行文本与多行文本超出部分省略</h3>

<p><img src="http://wx2.sinaimg.cn/large/a73bc6a1ly1g5t8h6p9cnj20nb0fewg5.jpg" alt="image" title="" /></p>

<pre><code><span></span>
<span>.overTextHidden {'{'}</span>
<span>    width: 200px;</span>
<span>    overflow: hidden;</span>
<span>    text-overflow: ellipsis;</span>
<span>    /*文字隐藏后添加省略号*/</span>
<span>    white-space: nowrap;</span>
<span>    /*强制不换行*/</span>
<span>}</span>
<span></span>
<span>.overRowsTextHidden {'{'}</span>
<span>    width: 200px;</span>
<span>    display: -webkit-box;</span>
<span>    /* autoprefixer: off */</span>
<span>    -webkit-box-orient: vertical;</span>
<span>    /* autoprefixer: on */</span>
<span>    -webkit-line-clamp: 3;</span>
<span>    overflow: hidden;</span>
<span>    word-break: break-all;</span>
<span>    line-height: 20px;</span>
<span>}</span>
<span></span>
</code></pre>

<p>注意：多行文本超出省略的方案存在兼容性问题，只适用于 webkit 内核浏览器。</p>

<h3 id='6.💎object-fit 设置图片何种比例显示'>6.💎object-fit 设置图片何种比例显示</h3>

<p><img src="http://wx3.sinaimg.cn/mw690/a73bc6a1ly1g5t724garjj20p20gudlc.jpg" alt="image" title="" /></p>

<pre><code><span></span>
<span>img {'{'}width: 200px;height: 100px;}</span>
<span>.img-1 {'{'}height: auto;}</span>
<span>.img-2 {'{'}object-fit: fill;}</span>
<span>.img-3 {'{'}object-fit: unset;}</span>
<span>.img-4 {'{'}object-fit: contain;}</span>
<span>.img-5 {'{'}object-fit: scale-down;}</span>
<span>.img-6 {'{'}object-fit: cover;}</span>
<span>.img-7 {'{'}object-fit: none;}</span>
<span></span>
</code></pre>

<h3 id='参考'>参考</h3>

<p><a href="https://mp.weixin.qq.com/s/iD8rinWJ_PEI3UZu4-PcMg">你未必知道的49个CSS知识点</a></p>
</div>
            </div>

        )
    }
}