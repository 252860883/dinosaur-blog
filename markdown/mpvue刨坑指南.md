---
title: mpvue刨坑指南
date: 2018-03-20 15:24:20
tags: [小程序,VUE]
---

#### 注意

- 调试时，请先将微信调试工具，详情按钮下面“ 不校验安全域名、web-view 域名、TLS 版本以及 HTTPS 证书 ” 勾选
![image](http://wx3.sinaimg.cn/mw690/a73bc6a1ly1fqi3851szuj20la0hydha.jpg)
- 新增页面时，需要重新 npm run dev
- 添加的页面 子文件要按照文件夹同样说明 比如 page2/page2 , index/index
![image](http://wx3.sinaimg.cn/mw690/a73bc6a1ly1fqi3as13iaj214c0ew0v8.jpg)
- 在双花括号内不要进行复杂的运算
- this.$root.$mp.query直接获取到query参数，需要在onLoad之后的生命周期获取，因为小程序是通过 onLoad 获取的。
- 嵌套循环请必须制定不同的索引
- 事件修饰符，在小程序里面只有 .stop有用，而且会导致 该元素的 catchEventName 失效
- 表单建议直接使用小程序的表单组件，避免不明确的坑,比如 picker、radio-group等等，但是绑定事件还是用 @clik 形式
- 建议合理使用双向绑定 v-model.lazy
- 触发事件取值时，在小程序是，e.detail={value:value} ，在mpvue中需要写成： e.mp.detail={value:value}
- 目前，路由切换会闪现一下之前的数据，目前的解决方式可以在 onHide 的时候重置数据或者加载 loading 动画，在 onShow 的时候加载数和或者取消 loading 动画。
- style中的 css属性不要写成驼峰式，比如 margin-top 不要写成 marginTop

### mpvue暂不支持的问题

- 不支持能在选项属性或者回调上使用箭头函数，比如 created:()=>console.log(123);因为箭头函数和父级的上下文绑定在一起的，this并不是vue实例
- 不支持 v-html 语法 
- 不支持 过滤器，因为wxml本身就不支持
- 暂时不支持 自定义组件上 class 和 style 的绑定、事件绑定、v-show
- bind 和 catch 事件同时绑定的时候，只会触发 bind 而不会触发 catch 上的事件
- 不支持 vue-router，因为小程序无法动态插入和控制节点
- 小程序不支持window 和 document 所以不能使用 zppto/jquery等一系列和dom有关的库（T-T）
- 小程序不支持 wxss 中引入本地资源，所以 background-image 行不通的
- 
 
### 疑问
- touchstart, touchmove, touchend, touchcancel, longpress 这几个事件绑定在 canvas 元素上不生效，click, tap 等是可以的，上述 canvas 不支持的事件其他元素是支持的