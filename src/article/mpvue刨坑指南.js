import React from 'react'
import '../style/main.scss'
import MainPic3D from '../components/pic3D'

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="article">
<div className="title">mpvue刨坑指南</div>
<h4>注意</h4>

<ul>
<li>调试时，请先将微信调试工具，详情按钮下面“ 不校验安全域名、web-view 域名、TLS 版本以及 HTTPS 证书 ” 勾选
<img src="http://wx3.sinaimg.cn/mw690/a73bc6a1ly1fqi3851szuj20la0hydha.jpg" alt="image" title="" /></li>
<li>新增页面时，需要重新 npm run dev</li>
<li>添加的页面 子文件要按照文件夹同样说明 比如 page2/page2 , index/index
<img src="http://wx3.sinaimg.cn/mw690/a73bc6a1ly1fqi3as13iaj214c0ew0v8.jpg" alt="image" title="" /></li>
<li>在双花括号内不要进行复杂的运算</li>
<li>this.$root.$mp.query直接获取到query参数，需要在onLoad之后的生命周期获取，因为小程序是通过 onLoad 获取的。</li>
<li>嵌套循环请必须制定不同的索引</li>
<li>事件修饰符，在小程序里面只有 .stop有用，而且会导致 该元素的 catchEventName 失效</li>
<li>表单建议直接使用小程序的表单组件，避免不明确的坑,比如 picker、radio-group等等，但是绑定事件还是用 @clik 形式</li>
<li>建议合理使用双向绑定 v-model.lazy</li>
<li>触发事件取值时，在小程序是，e.detail={'{'}value:value} ，在mpvue中需要写成： e.mp.detail={'{'}value:value}</li>
<li>目前，路由切换会闪现一下之前的数据，目前的解决方式可以在 onHide 的时候重置数据或者加载 loading 动画，在 onShow 的时候加载数和或者取消 loading 动画。</li>
<li>style中的 css属性不要写成驼峰式，比如 margin-top 不要写成 marginTop</li>
</ul>

<h3>mpvue暂不支持的问题</h3>

<ul>
<li>不支持能在选项属性或者回调上使用箭头函数，比如 created:()=>console.log(123);因为箭头函数和父级的上下文绑定在一起的，this并不是vue实例</li>
<li>不支持 v-html 语法 </li>
<li>不支持 过滤器，因为wxml本身就不支持</li>
<li>暂时不支持 自定义组件上 class 和 style 的绑定、事件绑定、v-show</li>
<li>bind 和 catch 事件同时绑定的时候，只会触发 bind 而不会触发 catch 上的事件</li>
<li>不支持 vue-router，因为小程序无法动态插入和控制节点</li>
<li>小程序不支持window 和 document 所以不能使用 zppto/jquery等一系列和dom有关的库（T-T）
<h2>- 小程序不支持 wxss 中引入本地资源，所以 background-image 行不通的</h2></li>
</ul>

<h3>疑问</h3>

<ul>
<li>touchstart, touchmove, touchend, touchcancel, longpress 这几个事件绑定在 canvas 元素上不生效，click, tap 等是可以的，上述 canvas 不支持的事件其他元素是支持的</li>
</ul>
</div>
        )
    }
}