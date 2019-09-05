---
title: Vue项目优化总结
date: 2019-08-29 15:24:20
tags: [javascript,Vue]
---

### 代码优化

#### v-for相关
1. v-for遍历**必须加key**，为了方便新旧dom对比时可以直接通过唯一id快速处理，具体可以参考我的这篇文章：[vue的key属性加还是不加？](http://www.duhonghui.top/#/vue%E7%9A%84key%E5%B1%9E%E6%80%A7%E5%8A%A0%E8%BF%98%E6%98%AF%E4%B8%8D%E5%8A%A0)

2. **避免同时和v-if使用**，因为代码会先执行for再if，这样会造成多余的循环开销，最好配合computed，把if操作放到computed里面去执行

#### 冻结不会变化的对象
当数据量大且不会修改的时候，可以使用`Object.freeze`冻结该对象，阻止Vue劫持数据

#### 避免内存泄漏
Vue组件销毁时会自动清理它与实例的链接，解绑全部指令以及事件监听器，但是在js内通过`addEventListener`绑定的不会自动销毁，需要手动移除，避免内存泄漏

#### 图片懒加载
在vue中可以使用`vue-lazyload`实现图片懒加载

#### 路由懒加载
在`vue-router`中配置懒加载，按需载入，减少首页白屏时间：
```
const Foo = () => import('./Foo.vue')
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
})
```

#### 第三方插件按需引入
借助`babel-plugin-component`，比如我们常见的按需引入 elementUI

#### 服务器渲染 SSR
服务端渲染是指 Vue 在客户端将标签渲染成的整个 html 片段的工作在服务端完成，服务端形成的 html 片段直接返回给客户端这个过程就叫做服务端渲染。

优点：

* 利于SEO，因为SPA是通过异步加载js文件动态载入内容的，但是爬虫不会等你异步载入以后再抓页面内容
* 首屏加载更快，因为SPA还要等js文件都下载完了才开始页面渲染

缺点：

* 开发限制，例如服务端渲染只支持 beforCreate 和 created 两个钩子函数，这会导致一些外部扩展库需要特殊处理，才能在服务端渲染应用程序中运行；并且与可以部署在任何静态文件服务器上的完全静态单页面应用程序 SPA 不同，服务端渲染应用程序，需要处于 Node.js server 运行环境；
* 更多的服务器负载：在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用CPU 资源，因此如果你预料在高流量环境下使用，请准备相应的服务器负载，并明智地采用缓存策略。

#### 设置预渲染
构建时生产针对特定路由的静态HTML文件，可以使用`prerender-spa-plugin`来实现


### Web基础优化

* 开启 gzip 压缩
* 浏览器缓存
* 启用 CDN
* 使用 Chrome Performance 检测代码性能

### Webpack优化

* `url-loader` ,设置limit使小图片转化为base64
* `image-webpack-loader` 用来压缩图片
* `CommonsChunkPlugin`,提取第三方库合公共模块，避免相同资源重复加载和浪费
* `vue-template-loader`  模版预编译，
* `SourceMap` ，因为代码打包后经过压缩等手段不好看代码，它就是来解决不好调试代码的问题，有多种调试选择
* `webpack-bundle-analyzer`，构建结果输出分析，在vue-cli中直接通过 `npm run build —report` 指令即可


### Webpack构建优化

#### 减少冗余代码
Babel 提供了 `babel-plugin-transform-runtime` 插件来减少冗余代码

#### 优化 Loader 配置
尽可能让更少的文件被 Loader 处理，主要有三种办法：（1）优化正则匹配（2）通过cacheDirectory选项开启缓存（3）通过include、exclude来减少被处理的文件

#### 优化 resolve.noParse 配置
noParse配置项可以让Webpack忽略对部分没采用模块化的文件的递归解析和处理

#### HappyPack 多子进程构建
`HappyPack`可以让 Webpack 构建由一个单线程分解成多个子进程去并发处理并将结果返回主进程，加快 Webpack 对文件的解析和处理

#### ParallelUglifyPlugin 可以开启多个进程，并行使用 UglifyJS 压缩代码文件
压缩代码文件的过程需要将Object对象抽象为AST语法树，在用各种规则解析处理AST，这个过程非常耗时，当js文件很多的时候，并行压缩代码文件的处理会加快构建速度

#### 调节自动刷新时间
通过配置`devServer`下的相关属性可以控制页面自动刷新的相关规则：
```
devServer: {
  watchOptions: {
    // 不监听的文件或文件夹，支持正则匹配
    ignored: /node_modules/,
    // 监听到变化后等300ms再去执行动作
    aggregateTimeout: 300,
    // 默认每秒询问1000次
    poll: 1000
  }
}
```

#### 模块热更新

模块热替新（ Hot Module Replacement ），也可以简称 HMR，可以在一个源码发生变化时，只需重新编译发生变化的模块，再用新输出的模块替换掉浏览器中对应的老模块。
```
devServer: {
  hot: true,
},
plugins: [
  new webpack.HotModuleReplacementPlugin(),
// 显示被替换模块的名称
  new webpack.NamedModulesPlugin(), // HMR shows correct file names
]
```



### 参考
>[Vue 项目性能优化](https://juejin.im/post/5d548b83f265da03ab42471d)
[Vue项目Webpack优化实践](https://juejin.im/post/5c1fa158f265da613c09cb36)