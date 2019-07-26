---
title: WebWorkers 实践
date: 2019-07-15 17:38:44
tags: ['vue','javascript']
---
>在讨论到前端该如何优化时，我们都知道可以将复杂的、耗时的任务放到 webWorker 里来处理，这样就不会去阻塞JS其余的任务处理了。那这篇文章就来进行实践一下 webWorker。

### Web Workers
Web Workers 可以使得一个Web应用程序在与主执行线程分离的后台线程中运行一个脚本。这样的做法使得我们可以将一些复杂耗时的任务单独开发一个线程进行处理而不会导致主线程阻塞。但是这并不意味着JS语言本身支持了多线程能力，而是浏览器作为宿主环境提供了JS一个多线程运行的环境。

#### 兼容性

|IE|Edge|FireFox|Chrome|Safari|
|--|--|--|--|--|
|10+|12+|3.5+|4+|4+|

#### 限制

1. **同源限制**，worker线程必须和主线程同源
2. **文件限制**，不能读取本地文件，并且加载的脚本必须与主线程同源
3. **DOM操作限制**，worker线程不能读取`DOM对象`,`document`,`window`等对象，但是可以使用 `navigator`,`location`(只读),`XMLHttpRequest`,`setTimeout`等浏览器对象
4. **脚本限制**，worker线程不能执行 `alert` 和 `confirm`
5. **外部引用限制**，必须使用 `importScripts` 来引用外部脚本


### 实践
首先，我们在主线程创建 worker线程：

```
// 创建 worker线程
let worker = new Worker('./webworker.js');
// 向 worker线程 发送数据
worker.postMessage('main message');
// worker线程 发送数据时的监听回调
worker.onmessage = ((res) => {
    console.log(res.data)
    alert(res.data)
})
// worker线程 错误时的回调
worker.onerror = ((error) => {
    console.log(error);
})
// 关闭 worker线程
worker.terminate();
```
根据以上代码可知，对于主线程分别有如下几个API：

1. **worker.postMessage：**主线程给worker线程发送消息
2. **worker.onmessage：**接受worker线程的消息
3. **worker.onerror：**worker线程报错时的回调
4. **worker.terminate：**从主线程关闭worker线程


我们构建worker线程文件 `worker.js` :
```
// 监听主线程
self.onmessage = ((res) => {
    console.log(res.data)
})
// 向主线程发送数据
self.postMessage = "worker message"
// 错误时的回调
self.onerror = ((error) => {
    console.log(error)
})
// worker线程关闭
self.close()
```
因为主线程和worker线程不在一个线程，所以上下文也不能共用，worker线程的全局对象为 self（worker线程自身），在这里 this 指向 self，默认也可以不写self

1. **self.postMessage：**给主线程发送消息
2. **self.onmessage：**接受主线程的消息
3. **self.onerror：**worker线程报错时的回调
4. **self.close：**从主线程关闭worker线程

### webpack环境下使用
上面的例子是用原生js来搞的，那我们实际生产环境呢大部分都已经用 Vue、React等等框架来写业务了，由于模块化+webpack环境，直接像原生这样用可就不行了。

首先，我们通过指令 `npm install -D worker-loader` 来安装 `worker-loader`。然后在 webpack配置文件中进行配置：

```
...
  module: {
    rules: [
        ...
        {
        test: /\.worker\.js$/,
        loader: 'worker-loader',
        options: {
          name: '[name]:[hash:8].js',
          // inline: true,
          // fallback: false
          // publicPath: '/scripts/workers/'
        }
      }
    ]
  }
```
上面的options还有几个配置项：`inline` 可以解除同源限制，把 worker 文件内联成 blob 数据格式，而不再是通过下载脚本文件的方式来使用 worker；`publicPath` 可以重写掉 worker 脚本的下载 url，当然脚本也要放到对应的位置。
这样我们对于 woker线程命名为 `xxx.worker.js` 就可以被lodar识别了，woker线程的用法和原生一样，但是在主线程的调用稍有区别：

```
import Worker from "./utils/file.worker.js";
let webWork = new Worker();
```

**坑** ：在devServer模式下会报 `window is not defined` 的错，这里我们需要对 webpack配置文件进行一下修改，将 output 下添加 `globalObject: 'this'`：

```
output: {
  path: DIST_PATH,
  publicPath: '/dist/',
  filename: '[name].bundle.[hash:8].js',
  chunkFilename: "[name].chunk.[chunkhash:8].js",
  globalObject: 'this',
}
```



### 使用场景
1. 加密数据，有些加密算法会非常复杂，耗费资源与时间
2. 复杂数据，一些复杂的算法比如排序、过滤、分析等等
3. 预取数据，有时候为了提升数据加载速度，可以提前使用Worker线程获取数据，因为Worker线程是可以是用 XMLHttpRequest 的
4. 预渲染，在一些渲染场景需要复杂的计算，比如反射、折射、材料等，这些可以使用 worker线程来做
5. 预加载图片，如果一个页面有很多图片并且业务不需要懒加载则可以使用worker线程来加载



### 参考
>[怎么在 ES6+Webpack 下使用 Web Worker](https://juejin.im/post/5acf348151882579ef4f5a77)
[前端 Web Workers 到底是什么？](https://mp.weixin.qq.com/s/i1xBLUtVRPhWnl_1EuJVkA)
