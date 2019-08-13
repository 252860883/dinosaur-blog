import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"小程序学习笔记"},{"level":"h4","title":"目录结构"},{"level":"h4","title":"逻辑层"},{"level":"h4","title":"视图层"},{"level":"h4","title":"自定义组件"},{"level":"h4","title":"分包按需加载"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">小程序学习笔记</h1></div>
<h3 id='小程序学习笔记'>小程序学习笔记</h3>

<h4 id='目录结构'>目录结构</h4>

<ul>
<li>.js           逻辑</li>
<li>.wxml     结构</li>
<li>.wxss     样式</li>
<li>.json       配置</li>
<li>app.xx      小程序的公共设置</li>
</ul>

<h4 id='逻辑层'>逻辑层</h4>

<p>App()   用来注册一个小程序的，和new Vue() 异曲同工</p>

<ul>
<li><p>生命周期函数<br></br>onLaunch        小程序初始化执行<br></br>onShow        小程序显示时执行<br></br>onHide        小程序隐藏时执行<br></br>onEror        错误监听函数</p></li>
<li><p>Page() <br/><br></br>函数用来注册一个页面，接受一个Object参数</p></li>
<li><p>参数：<br></br>data        初始数据<br></br>onLoad  监听页面加载，可以在改周期中获取 query 参数<br></br>onReady 页面初次渲染，对于 wx. 的一些设置需要在这里配置<br></br>onShow  页面显示<br></br>onHide  页面隐藏<br></br>onUnload    页面卸载<br></br>onPullDownRefresh       监听下拉动作<br></br>onReachBottom       监听上拉触底<br></br>onShareAppMessage   点击右上角转发，可以自定义配置 title、path等等<br></br>onPageScroll            监听页面滚动<br></br>onTabltemTap            当前是tab页，点击tab时触发</p></li>
<li><p>拓展api<br></br>Page.prototype.route        获取当前页面的路径<br></br>Page.prototype.setData()    将数据从逻辑层发送到视图层，更新 this.data,第二个参数是回调函数</p></li>
</ul>

<pre><code><span></span>
<span>this.setData({'{'}</span>
<span>      text: 'change data'</span>
<span>    }, function(){'{'}</span>
<span>      // 在这次setData对界面渲染完毕后触发</span>
<span>})</span>
<span></span>
</code></pre>

<ul>
<li>模块化
倒出时，尽量通过 module.exports导出，通过 require() 引入
小程序目前不支持直接引入 node_modules , 开发者需要使用到 node_modules 时候建议拷贝出相关的代码到小程序的目录中。</li>
</ul>

<h4 id='视图层'>视图层</h4>

<ul>
<li>数据绑定</li>
</ul>

<pre><code><span></span>
<span>&lt;view&gt;{'{'}{'{'}message}}&lt;/view&gt;</span>
<span></span>
</code></pre>

<ul>
<li>列表渲染</li>
</ul>

<pre><code><span></span>
<span>&lt;view  wx:for=“{'{'}{'{'}array}}”&gt;{'{'}{'{'}item}}&lt;/view&gt;</span>
<span></span>
</code></pre>

<ul>
<li>条件渲染</li>
</ul>

<pre><code><span></span>
<span>&lt;view wx:if=“{'{'}{'{'}view==1}}”&gt; &lt;/view&gt;</span>
<span>&lt;view wx:elif &gt;&lt;/view&gt;</span>
<span>&lt;view wx:else &gt;&lt;/view&gt;</span>
<span></span>
</code></pre>

<p>如果需要显隐多个元素，则可以使用<block></block>组件</p>

<ul>
<li>模版</li>
</ul>

<pre><code><span></span>
<span>&lt;template name=“temp”&gt;</span>
<span>    &lt;div&gt;&lt;/div&gt;</span>
<span>&lt;/template&gt;</span>
<span></span>
</code></pre>

<p>也可以通过模块化引入模版，示例：</p>

<pre><code><span></span>
<span>&lt;import src=“tempalte.wxml”  /&gt;</span>
<span></span>
</code></pre>

<p>include 是将目标文件除了 <template /> <wxs />的内容导入</p>

<ul>
<li><p>事件<br></br>touchstart  手指触摸动作开始<br></br>touchmove   手指触摸后移动<br></br>touchcancel 手指触摸动作被打断，如来电提醒，弹窗<br></br>touchend    手指触摸动作结束<br></br>tap 手指触摸后马上离开<br></br>longpress   手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发<br></br>longtap 手指触摸后，超过350ms再离开（推荐使用longpress事件代替）<br></br>transitionend   会在 WXSS transition 或 wx.createAnimation 动画结束后触发<br></br>animationstart  会在一个 WXSS animation 动画开始时触发<br></br>animationiteration  会在一个 WXSS animation 一次迭代结束时触发<br></br>animationend    会在一个 WXSS animation 动画完成时触发<br></br>touchforcechange    在支持 3D Touch 的 iPhone 设备，重按时会触发</p>

<p>bind事件绑定不会阻止冒泡事件向上冒泡，catch事件绑定可以阻止冒泡事件向上冒泡。<br></br>例子：</p></li>
</ul>

<pre><code><span></span>
<span>&lt;view bindtap=“tapName”&gt;&lt;/view&gt;</span>
<span>&lt;view catchtap=“tapName”&gt;&lt;/view&gt;</span>
<span></span>
</code></pre>

<p>需要在捕获阶段监听事件时，可以采用capture-bind、capture-catch关键字，后者将中断捕获阶段和取消冒泡阶段。</p>

<ul>
<li>wxs文件
可以创建wxs文件，可以理解为 script文件的内部引入，引入到 wxml 文件</li>
</ul>

<pre><code><span></span>
<span>&lt;wxs  src=“….wxs”  module=“tools” /&gt;</span>
<span></span>
</code></pre>

<ul>
<li><p>WXSS 样式组件<br></br>Rpx：根据屏幕自适应，规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素</p>

<p>通过  @import "common.wxss";  引入文件</p></li>
</ul>

<h4 id='自定义组件'>自定义组件</h4>

<p>具体配置可以参照 小程序官方文档</p>

<p>js文件中定义</p>

<pre><code><span></span>
<span>component({'{'}</span>
<span>    …</span>
<span>//组件的对外属性，类似于vue中的 props，父组件向子组件传递信息</span>
<span>properties: {'{'}</span>
<span>    text: {'{'}</span>
<span>      type: String</span>
<span>    }</span>
<span>},</span>
<span>methods:{'{'}</span>
<span>   onTap: function () {'{'}</span>
<span>      var myEventDetail = {'{'}} // detail对象，提供给事件监听函数</span>
<span>      var myEventOption = {'{'}} // 触发事件的选项</span>
<span>      // 类似于vue中的自组件自定义事件与父组件传递信息</span>
<span>      this.triggerEvent('myevent', myEventDetail, myEventOption);</span>
<span>  }</span>
<span>}</span>
<span></span>
<span>})</span>
<span></span>
</code></pre>

<ul>
<li><p>Behaviors</p>

<p>behaviors 是用于组件间代码共享的特性，类似于一些编程语言中的“mixins”或“traits”。<br></br>每个 behavior 可以包含一组属性、数据、生命周期函数和方法，组件引用它时，它的属性、数据和方法会被合并到组件中，生命周期函数也会在对应时机被调用。每个组件可以引用多个 behavior 。 behavior 也可以引用其他 behavior 。<br></br>需要使用 Behavior() 构造器定义。<br></br>操作：通过 module.export定义导出，require 引入，在组件的 behavior属性中添加。</p></li>
<li><p>relations<br></br>定义使用组件间关系，例如两个嵌套组件之间的关系，两个组件之间必须都要添加 relations属性才生效。</p></li>
<li><p>插件</p>

<p>引入插件<br></br>在app.json中添加引入</p></li>
</ul>

<pre><code><span></span>
<span>{'{'}</span>
<span>  "plugins": {'{'}</span>
<span>    "myPlugin": {'{'}</span>
<span>      "version": "1.0.0",</span>
<span>      "provider": "wxxxxxxxxxxxxxxxxx"</span>
<span>    }</span>
<span>  }</span>
<span>}</span>
<span></span>
</code></pre>

<p>使用插件<br></br>var myPluginInterface = requirePlugin('myPlugin’)；</p>

<p>使用插件的自定义组件<br></br>使用插件提供的自定义组件，和使用普通自定义组件的方式相仿。在 json 文件定义需要引入的自定义组件时，使用 plugin:// 协议即可</p>

<h4 id='分包按需加载'>分包按需加载</h4>

<p>在app.json 中 subPackages 字段声明项目分包结构</p>

<pre><code><span></span>
<span>  "subPackages": [</span>
<span>    {'{'}</span>
<span>      "root": "packageA",</span>
<span>      "pages": [</span>
<span>        "pages/cat",</span>
<span>        "pages/dog"</span>
<span>      ]</span>
<span>    }, {'{'}</span>
<span>      "root": "packageB",</span>
<span>      "pages": [</span>
<span>        "pages/apple",</span>
<span>        "pages/banana"</span>
<span>      ]</span>
<span>    }</span>
<span>  ]</span>
<span></span>
</code></pre>
</div>
            </div>

        )
    }
}