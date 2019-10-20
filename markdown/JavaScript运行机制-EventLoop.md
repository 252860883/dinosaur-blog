---
title: JavaScript运行机制之EventLoop
date: 2019-03-01 16:42:57
tags: javascript
top:
---
### 单线程

相信了解 JavaScript 语言的人都知道，由于 JavaScript 脚本语言的特殊性，决定了它需要单线程运行。后来H5规范推出了 Web Worker 允许 JavaScript 可以创建多个线程，但是子线程仍然是完全受主线程的控制，所以本质上还是单线程的。

既然是单线程的，那我就有疑问了，我们平时经常进行 Ajax请求 、 setTimeout 等异步操作，浏览器会一直等待事件结束才执行下一个吗？如果一个请求的时间非常长，那这肯定是不行的。所以我们下面就来引入 任务队列 和 执行栈 的概念。

### 执行栈

首先来讲下JS执行栈，既然是栈嘛，那肯定采用的是后进先出的规则,主要用于存储在代码执行期间创建的所有执行上下文。
当 JavaScript 引擎首次读取脚本时，会创建一个全局执行上下文并将其推入当前的执行栈。每当发生一个函数调用，引擎都会为该函数创建一个新的执行上下文并将其推到当前执行栈的顶端。引擎会运行执行上下文在执行栈顶端的函数，当此函数运行完成后，其对应的执行上下文将会从执行栈中弹出，上下文控制权将移到当前执行栈的下一个执行上下文。我们来举个例子：
```
var a= 1;
function father(){
    console.log('enter father function');
    child();
    console.log('father function is over')
}
function child(){
    console.log('enter child function');
}
father();
```
上述函数的执行栈操作顺序如下图所示：
![image](http://wx3.sinaimg.cn/large/a73bc6a1ly1g0nh0euy5zj219s0ce75m.jpg)

理解了执行栈，我们可以知道我们脚本中的代码都会被依次执行，可是这依然没有解决我们一开始的疑惑，异步代码该怎么办呢？

### 任务队列

前面已经知道了，同步任务会被依次放到执行栈执行。那异步任务执行得到的结果回调函数会被放到任务队列中。当我们的执行栈中的所有同步任务执行完毕，引擎就会读取任务队列的事件，放入执行栈进行执行。任务队列是一个先进先出的数据结构，排在前面的事件会被优先处理。当然涉及到定时器任务时，只会在规定时间之后被执行。

除了异步任务，一些用户产生的事件比如 click 、 scroll 等只要涉及到了回调函数，都会统一放进任务队列等待主线程处理。而任务队列也分为两种，宏任务队列与微任务队列。不同的任务会被分配进入不同的队列。
**- 宏任务 与 微任务**
**macrotask(宏任务)**：包括`整体代码script`，`setTimeout`，`setInterval`，`setImmediate`,`I/O`,`requestAnimationFrame`。
**microtask（微任务）**，每个宏任务中都可以执行微任务，当宏任务执行完成会去执行包含的所有微任务，微任务执行完毕后这一轮事件循环才算结束。**但是当 microtask 执行完之前是不会执行下一个宏任务的**。 常见的 microtask 有：`Process.nextTick（Node独有）`、`Promise`、`Object.observe(废弃)`、`MutationObserver`。同时由于 `async\await`本质上是基于 promise 的一些封装，所以也属于微任务。

所以简单来记,执行的过程一般是：一个宏任务，所有微任务，一个宏任务，所有微任务...

知道了微任务与宏任务，来做一个非常经典的面试题：
```
setTimeout(function() {
    console.log(1);
})

new Promise(function(resolve) {
    console.log(2);
}).then(function() {
    console.log(3);
})

console.log(4);
```
我们来梳理一下：
1.首先整段代码作为一个宏任务，放进执行栈执行
2.setTimout，将其回调函数放入宏任务队列
3.执行 new Promise() ,输出 2, then函数分发到微任务队列
4.执行 console.log(4),输出 4
5.第一轮的宏任务结束，开始查询微任务队列，then函数在，执行，输出 3 
6.第一轮事件循环结束，开始第二轮
7.宏任务队列查询，setTimeout在，执行，输出1

所以答案就是：`2 4 3 1`


### Event Loop
通过上面，我们已经对执行栈、宏任务、微任务队列有所了解，那事件循环是什么呢？每次宏任务结束（包含微任务结束）之后，系统会检查是否有要执行的宏任务，这个检查的过程是持续的，每完成一个任务都会进行一次检查，这样的操作被称为**事件循环**。
最后来张图表示下吧：
![image](http://wx2.sinaimg.cn/mw690/a73bc6a1ly1g1wqhooik6j20h90cfaak.jpg)


### Nodejs环境的 Event Loop



#### 事件循环六个阶段
在node中事件每一轮循环按照顺序分为6个阶段：

1. timers：执行满足条件的setTimeout、setInterval回调。
2. I/O callbacks：是否有已完成的I/O操作的回调函数，来自上一轮的poll残留。
3. idle，prepare：仅系统内部使用。
4. poll：等待还没完成的I/O事件，会因timers和超时时间等结束等待。
5. check：执行setImmediate的回调。
6. close callbacks：关闭所有的closing handles，例如socket.on('close'[,fn])、http.server.on('close, fn)等。

与浏览器不同的是，nodejs环境下每个阶段结束后都会执行完所有的微任务。

#### process.nextTick 与 setImmediate
与浏览器相比，Nodejs 拥有两个特殊的异步操作API `process.nextTick` 与 `setImmediate`。

`process.nextTick` ,Nodejs执行完所有同步任务，接下来就会执行process.nextTick的任务队列，它会优先于其他微任务执行，如果希望异步的任务尽快执行完毕，那就可以使用它，但是我们也不能过度使用，如果使用不当可能会造成I/O饥饿。

```
 Promise.resolve().then(() => console.log(4)); 
 process.nextTick(() => console.log(3)); 
 //output: 3 4
```



`setImmediate` 的回调函数是被放在check阶段执行，即相当于事件循环的最后阶段，它的执行顺序会比 `setTimeout` 晚。

```
setImmediate(()=>{console.log(4)});
setTimeout(()=>{console.log(3)})
//output: 3 4 
```
但是需要注意，如果在timers阶段执行时创建了setImmediate则会在此轮循环的check阶段执行，如果在timers阶段创建了setTimeout，由于timers已取出完毕，则会进入下轮循环，check阶段创建timers任务同理。

```
setTimeout(()=>{
    setImmediate(() => { console.log(1) });
    setTimeout(() => { console.log(2) });
})
//output: 1 2 
 
setImmediate(()=>{
    setImmediate(() => { console.log(1) });
    setTimeout(() => { console.log(2) });
})
//output: 1 2 
```

我们讨论的也只是在理想情况下，`setTimeout(fn,0)`真正延迟不可能完全为0秒，所以有可能出现先创建的setTimeout(fn,0)而比setImmediate的回调后执行的情况。


>参考:
>[这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89#comment)
>[如何理解js的执行上下文与执行栈](https://www.oecom.cn/understand-js-run-stack-and-world/)
>[一次搞懂Event loop](https://www.imooc.com/article/40020#)
>[浏览器和Node不同的事件循环](https://juejin.im/post/5aa5dcabf265da239c7afe1e)






