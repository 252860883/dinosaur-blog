import React from 'react'
import '../style/main.scss'
import { IsPC } from "../utils/screen";
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"传统懒加载方案"},{"level":"h3","title":"方案一：image组件的lazy-load属性"},{"level":"h3","title":"方案二：利用WXML节点信息API实现"},{"level":"h3","title":"方案三：利用WXML节点布局相交状态实现"}]
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
<div className="title">小程序实现图片懒加载的三种方式</div>
<blockquote>
  <p>懒加载，emm大概是每个前端工程师在面试时被问到如何进行前端优化的第一个想到的方法吧哈哈。比如我们的图片瀑布流布局等等，一次性加载这么多的图片资源那速度肯定是相当的“辣眼睛”呀～，所以图片懒加载在前端优化中可以发挥到很大的作用，所以这一篇就来聊聊小程序该如何实现图片懒加载～</p>
</blockquote>

<h3 id='传统懒加载方案'>传统懒加载方案</h3>

<p>熟悉H5开发的话可能已经很熟悉该如何进行图片懒加载，简单来说，其原理就是当图片DOM进入到窗口可视区的时候设置真实的图片路径。通过节流函数设置一定时间滑动内执行判断函数即可。主要思路如下：</p>

<pre><code><span></span>
<span>//获取图片当前位置距离顶部的距离</span>
<span>let top=document.getElementById('xxx').getBondingClientRect().top; </span>
<span>//如果top小于窗口高度，将图片链接插入到img中，加载</span>
<span>if(top&lt;window.innerheight){'{'}</span>
<span>   document.getElementById('xxx').getBondingClientRect().src=xxx</span>
<span>}</span>
<span></span>
</code></pre>

<p>但是，尴尬的事情发生了，小程序渲染层和逻辑层是分开的，一个在 webview 一个是 JSCore，没有 BOM、DOM 既不能设置节点，也获取不到窗口对象，这可咋整？<br></br>嘿，别着急，往下看。</p>

<h3 id='方案一：image组件的lazy-load属性'>方案一：image组件的lazy-load属性</h3>

<p>小程序在设计的时候就想到了图片懒加载，所以在官方文档中也给出了 <code>lazy-load</code> 属性，加上之后就可以实现懒加载啦！是不是很方便！</p>

<pre><code><span></span>
<span>&lt;scroll-view scroll-y="true" class='lazyload'&gt;</span>
<span>  &lt;image lazy-load="true" src="{'{'}{'{'}item.url}}" wx:for="{'{'}{'{'}imgUrls}}" wx:key="{'{'}{'{'}index}}"&gt;&lt;/image&gt;</span>
<span>&lt;/scroll-view&gt; </span>
<span></span>
</code></pre>

<p>优点：<br></br>-方便，简单<br></br>缺点：<br></br>-只针对page与scroll-view下的image有效，同时版本限制在 <code>1.5.0</code> 以上<br></br>-懒加载无回调函数，图片加载后不能进行其他操作<br></br>-加载之前不能设置默认显示图片</p>

<h3 id='方案二：利用WXML节点信息API实现'>方案二：利用WXML节点信息API实现</h3>

<p>第二个办法呢就是通过小程序获取节点信息的api <code>createSelectorQuery</code> 来完成。<br></br>首先，通过 <code>wx.getSystemInfo</code> 获取可视区的高度，并写入 data。</p>

<pre><code><span></span>
<span>secondMethod: function() {'{'}</span>
<span>    let that = this;</span>
<span>    if (this.data.screenHeight) {'{'}</span>
<span>      this.judgeShow()</span>
<span>    } else {'{'}</span>
<span>      wx.getSystemInfo({'{'}</span>
<span>        success: function(res) {'{'}</span>
<span>          console.log('屏幕高度：' + res.screenHeight)</span>
<span>          that.setData({'{'}</span>
<span>            screenHeight: res.screenHeight</span>
<span>          })</span>
<span>          that.judgeShow()</span>
<span>        }</span>
<span>      })</span>
<span>    }</span>
<span>}</span>
<span></span>
</code></pre>

<p>然后获取到 screenHeight 后，执行懒加载的核心代码。</p>

<pre><code><span></span>
<span>judgeShow: function() {'{'}</span>
<span>    let that = this</span>
<span>    wx.createSelectorQuery().selectAll('.item').boundingClientRect(function(rects) {'{'}</span>
<span>      rects.forEach(function(rect, index) {'{'}</span>
<span>        // 如果当前的元素距离顶部的高度小于可视区域的高度，则设置为显示</span>
<span>        if (rect.top &lt;= that.data.screenHeight) {'{'}</span>
<span>          that.setData({'{'}</span>
<span>            [`imgUrls[${'{'}index}].show`]: true,</span>
<span>          })</span>
<span>        }</span>
<span>      })</span>
<span>    }).exec()</span>
<span>},</span>
<span></span>
</code></pre>

<p>小程序有默认的滑动监听事件 <code>onPageScroll</code></p>

<pre><code><span></span>
<span>onPageScroll: function() {'{'}</span>
<span>    this.secondMethod()</span>
<span>}</span>
<span></span>
</code></pre>

<p>但是，由于滑动监听是一个高频操作，会导致持续的执行懒加载函数，这里我们采用 <strong>throttle函数</strong> 进行优化。</p>

<pre><code><span></span>
<span>onReady: function() {'{'}</span>
<span>    this.runThrottle = this.throttle()</span>
<span>},</span>
<span>throttle: function() {'{'}</span>
<span>    console.log('throttle')</span>
<span>    let that = this;</span>
<span>    var starTime = 0</span>
<span>    return function() {'{'}</span>
<span>      var nowTime = new Date().getTime()</span>
<span>      if (nowTime - starTime &gt; 100) {'{'}</span>
<span>        that.secondMethod()</span>
<span>        starTime = nowTime</span>
<span>      }</span>
<span>    }</span>
<span>},</span>
<span>onPageScroll: function() {'{'}</span>
<span>    this.runThrottle()</span>
<span>},</span>
<span></span>
</code></pre>

<p>优点：<br></br>-无版本限制<br></br>-图片载入时可以自定义回调，配置一些自定义的操作<br></br>缺点：<br></br>-代码比较多，流程比较复杂</p>

<h3 id='方案三：利用WXML节点布局相交状态实现'>方案三：利用WXML节点布局相交状态实现</h3>

<p>小程序开放了一组WXML节点布局相交状态实现的api，可以用于推断某些节点是否可以被用户看见、有多大比例可以被用户看见。示例如下,当目标元素在页面显示区域内相交或相离，且相交或相离程度达到目标节点布局区域的20%和50%时触发回调函数：</p>

<pre><code><span></span>
<span>Page({'{'}</span>
<span>  onLoad: function(){'{'}</span>
<span>    wx.createIntersectionObserver(this, {'{'}</span>
<span>      thresholds: [0.2, 0.5]</span>
<span>    }).relativeToViewport().observe('.target-class', (res) =&gt; {'{'}</span>
<span>      res.id // 目标节点 id</span>
<span>      res.dataset // 目标节点 dataset</span>
<span>      res.intersectionRatio // 相交区域占目标节点的布局区域的比例</span>
<span>      res.intersectionRect // 相交区域</span>
<span>      res.intersectionRect.left // 相交区域的左边界坐标</span>
<span>      res.intersectionRect.top // 相交区域的上边界坐标</span>
<span>      res.intersectionRect.width // 相交区域的宽度</span>
<span>      res.intersectionRect.height // 相交区域的高度</span>
<span>    })</span>
<span>  }</span>
<span>})</span>
<span></span>
<span></span>
</code></pre>

<p>利用这个特性我们就可以很轻松的实现图片懒加载了：</p>

<pre><code><span></span>
<span>// WXML 文件</span>
<span>&lt;view class='lazyload'&gt;</span>
<span>  &lt;view class='left'&gt;</span>
<span>    &lt;image class='img{'{'}{'{'}index}}' src="{'{'}{'{'}item.show?item.url: '' }}" wx:for="{'{'}{'{'}imgUrls}}" wx:key="{'{'}{'{'}index}}" wx:if="{'{'}{'{'}index%2}}" &gt;&lt;/image&gt;</span>
<span>  &lt;/view&gt;</span>
<span>  &lt;view class='right'&gt;</span>
<span>    &lt;image class='img{'{'}{'{'}index}}' src="{'{'}{'{'}item.show?item.url: '' }}" wx:for="{'{'}{'{'}imgUrls}}" wx:key="{'{'}{'{'}index}}" wx:if="{'{'}{'{'}!(index%2)}}"&gt;&lt;/image&gt;</span>
<span>  &lt;/view&gt;</span>
<span>&lt;/view&gt;</span>
<span></span>
<span>// JS 文件</span>
<span>judge: function() {'{'}</span>
<span>    for (let index in this.data.imgUrls) {'{'}</span>
<span>        wx.createIntersectionObserver().relativeToViewport().observe(`.img${'{'}index}`, (res) =&gt; {'{'}</span>
<span>        console.log(res)</span>
<span>        if (res.intersectionRatio){'{'}</span>
<span>            //如果图片进入可视区，将其设置为 show</span>
<span>            this.setData({'{'}</span>
<span>            [`imgUrls[${'{'}index}].show`]: true,</span>
<span>            })</span>
<span>        }</span>
<span>        })</span>
<span>    }</span>
<span>}</span>
<span></span>
</code></pre>

<p>优点：<br></br>-方便配置，几行代码即可<br></br>-无版本限制<br></br>-图片载入时可以自定义回调，配置一些自定义的操作</p>
</div>
            </div>

        )
    }
}