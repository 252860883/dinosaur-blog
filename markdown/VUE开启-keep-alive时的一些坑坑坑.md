---
title: 刨下VUE中keep-alive的一些坑
date: 2018-02-08 20:17:19
tags: [javascript,VUE]
---
在做大牛工资条的时候遇到一个需求是需要固定页面不进行渲染的，这时就用到了 keep-alive了。  
### keep-alive简单介绍
如下在vue项目里面配置 keep-alive：
```js
//app.vue
//只有 keepAlive 属性的路由才使用 keep-alive 
//如果全局都使用的话则去掉 v-if即可
<keep-alive>
     <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-else></router-view>
     
//路由中的配置 
 {
    path: '/salarydetail',
    name: 'salaryDetail',
    component: resolve => require(['@/page/salaryDetail'], resolve),
    meta: { keepAlive: true }//添加meta，keepAlive属性
  }
```
在 keep-alive的路由组件里面的声明周期排序：
1.页面第一次进入，钩子的触发顺序<b>created-> mounted-> activated</b>，退出时触发deactivated。
2.当再次进入（前进或者后退）时，只触发activated。

### this.$route.query报错
在项目中遇到一个bug，获取路由的query值时有时会报错，这里发现问题是，使用了keep-alive后数据需要进入页面在activated中再次获取，才能达到更新的目的。所以在点击某个事件获取 this.$route.query时就不是最新的事件，所以需要设置一个变量在 activated 周期里面进行更新赋值。

### 事件的处理
发生的问题是事件绑定了很多次，比如上传点击input监听change事件，突然显示了多张相同图片的问题。

也就是说，DOM在编译后就缓存在内容中了，如果再次进入还再进行事件绑定初始化则就会发生这个问题。

解决办法：在mounted中绑定事件，因为这个只执行一次，并且DOM已准备好。如果插件绑定后还要再执行一下事件的handler函数的话，那就提取出来，放在activated中执行。比如：根据输入内容自动增长textarea的高度，这部分需要监听textarea的input和change事件，并且页面进入后还要再次执行一次handler函数，更新textarea高度（避免上次输入的影响）。






