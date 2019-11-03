import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"第一次尝试，利用echarts实现"},{"level":"h3","title":"第二次尝试，原生view标签实现"},{"level":"h3","title":"第三次尝试，小程序组件 scroll-view"}]
        }
    }
    componentDidMount() {}
    render() {
        return (
            <Fragment>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">小程序实现仿KeepApp的滑动图表</h1></div>
<p>最近写小程序令人很头大的一个问题就是画图表，甚至和同事抱怨一通“我很热爱前端开发（如果不画图表）”。小程序的图表echarts-for-weixin，是echarts对于微信小程序的一个兼容方案，由于开源不久，坑用手指头加脚趾头都数不过来的，也是很心累。<br></br>最近产品新增需求，又要加图表了，一听到图表众程序员心一提。这次新增的图表是类似KEEP软件的滑动柱状图，不仅展示还要动态的展示数据，不了解KEEP可以看看下面的截图。<br></br><img src="http://wx4.sinaimg.cn/mw690/a73bc6a1ly9frarqxwf8lj20bb0ii3zs.jpg" alt="image" title="" /><br></br>主要就是通过拖动图表来定位展示数据。拿到了原型图就开始来尝试实现了。</p>

<h3 id='第一次尝试，利用echarts实现'>第一次尝试，利用echarts实现</h3>

<p>首先利用echarts来实现滑动图表组件，官方配置项提供了dataZoom配置项可以设置x轴滑动展示。实现起来非常方便，官方也给出了例子来进行展示，但是，但是，不知道echarts官网怎么设计的这个坐标轴滚动的交互，这效果有点一言难尽（见下图）。不仅坐标轴会随着可是区域数轴的值变化，而且这过渡效果太bug了，完全不是产品get的效果呀。同时在小程序中还需要获取到当前可视区域中心的坐标值，这些也是非常难拿到的，echarts也没有对外开发类似的接口（可实现的方案是通过formatter遍历获取），所以，这个方案淘汰。<br></br><img src="http://wx2.sinaimg.cn/mw690/a73bc6a1ly1frauwp0f23g209005ygp4.gif" alt="image" title="" /></p>

<h3 id='第二次尝试，原生view标签实现'>第二次尝试，原生view标签实现</h3>

<p>既然echarts不行，那咱们试试原生view标签自己造吧，构建好结构，结合data也能正常显示图表。万事俱备，只欠滑动。这里需要涉及到三个事件监听 touchstart、touchmove、touchend。在touchstart时记录手指触碰的x坐标记作startX，在touchmove时期记录当前手指触碰的x坐标，和startX作差得出移动举例moveX，这是给图表区设置transform的translateX为moveX的单位，使得图表可以跟随手指实时滑动。当touchend时，清除startX等数据，滑动结束，再记录当前中心点的索引，进行对应请求显示。<br></br>在开发者工具中功能基本实现，且没有明显bug，开始上机测试。这一调试就出大问题了，由于move时不断进行修改css的操作，小程序变得非常卡，非常影响用户体验，虽然加了节流函数还是不流畅，所以，第二种方案做废。</p>

<h3 id='第三次尝试，小程序组件 scroll-view'>第三次尝试，小程序组件 scroll-view</h3>

<p>了解小程序的开发人员肯定用到过小程序组件 scroll-view。翻看文档scroll-view有一个 scroll-left 属性，设置横向滚动条的位置。这样通过滚动条的位置岂不是很方便的就能捕获到当前中心位置的索引值了？<br></br>如下代码片段：</p>

<pre><code><span></span>
<span> &lt;scroll-view bindscroll="chartScroll" scroll-x scroll-left="{'{'}{'{'}moveScroll}}" scroll-with-animation bindtouchstart='clickStart'&gt;</span>
<span>...</span>
<span>&lt;/scroll-view&gt;</span>
<span></span>
</code></pre>

<p>bindscroll事件在组件滑动过程中执行，scroll-left设置/监听滑动轴记录左端的距离，scroll-with-animation 设置滑动过程展示动画，bindtouchstart绑定滑动初始状态。</p>

<p>第一步，在onLoad生命周期，对图表视图进行渲染，获取实际渲染尺寸，对图表区添加适合的左右padding值，使得第一个和最后一个柱都能恰好卡在正中间。<br></br>第二步，滑动开始时，执行事件，设置isTouch为true，这里是防止伪触摸：</p>

<pre><code><span></span>
<span>// 滑动开始</span>
<span>clickStart(e) {'{'}</span>
<span>    this.setData({'{'}</span>
<span>      isTouch: true</span>
<span>    })</span>
<span>},</span>
<span></span>
</code></pre>

<p>第三步，滑动监听，涉及到节流函数的运用，当滑动停止的100ms以后执行结束事件：</p>

<pre><code><span></span>
<span>  chartScroll(e) {'{'}</span>
<span>    // console.log("滑动" + e.detail.scrollLeft)</span>
<span>    let that = this</span>
<span>    clearTimeout(this.data.scrollTimeout)</span>
<span>    if (this.data.isTouch) {'{'}</span>
<span>      this.setData({'{'}</span>
<span>        scrollX: e.detail.scrollLeft</span>
<span>      })</span>
<span>      // 节流函数，当滑动停止的100毫秒后执行结束事件</span>
<span>      // 因为ios下有惯性滑动，这里不能直接touchend事件</span>
<span>      this.setData({'{'}</span>
<span>        scrollTimeout: setTimeout(() =&gt; {'{'}</span>
<span>          that.clickEnd()</span>
<span>        }, 100)</span>
<span>      })</span>
<span>    }</span>
<span>  },</span>
<span>// 滑动结束，判断当前的索引值，再修正滑动轴的位移距离</span>
<span>  clickEnd() {'{'}</span>
<span>    console.log('滑动结束')</span>
<span>    let nowIndex = Math.round(this.data.scrollX / this.data.barWidth + 1)</span>
<span>    this.setData({'{'}</span>
<span>      nowIndex: nowIndex,</span>
<span>      moveScroll: this.data.barWidth * (nowIndex - 1),</span>
<span>      isTouch: false</span>
<span>    })</span>
<span>  }</span>
<span></span>
</code></pre>

<p>至此，大致的过程完毕，效果图如下：<br></br><img src="http://wx2.sinaimg.cn/mw690/a73bc6a1ly1frirt7juqeg20900fu4lh.gif" alt="image" title="" /></p>

<p>总结：小程序的图表机制到目前为止仍然很不理想，所。这几种里面没有涉及canvas的办法实现，最后使用的大量view标签实现在性能上肯定是不及canvas的方法，在ip5等性能差的手机上仍然存在卡顿的问题。所以对于小程序图表的实现，仍然需要大量的调研和方法实现。</p>

<p>代码地址：https://github.com/252860883/wechat-slideBarChart</p>
</div>
            </Fragment>
        )
    }
}