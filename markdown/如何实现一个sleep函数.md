---
title: 如何用js实现一个sleep函数
date: 2019-09-10 17:13:52
tags: javascript
top:
---

> Sleep函数可以使计算机程序（进程，任务或线程）进入休眠，使其在一段时间内处于非活动状态。当函数设定的计时器到期，或者接收到信号、程序发生中断都会导致程序继续执行。

一些语言中都实现了sleep函数，比如java中`Thread.sleep`，shell脚本中的`sleep命令`等等，但是对于JavaScript，本身并没有提供 sleep() 方法，在执行js脚本时没有直接的让线程进入休眠暂停的功能，或许我们常见的处理是把2s以后要执行的代码放到 setTimeout 中进行异步处理，但是像 sleep() 函数这样在同步的代码里去执行休眠操作的功能，有没有办法模拟实现一下呢？

### 方法一：利用死循环阻塞线程
在 timeout 时间内疯狂的执行死循环来阻塞线程，虽然后续的代码不继续执行了，但是这并不是意味着线程进入休眠，反倒CPU会飙升，这种暴力实现还是不要轻易尝试，当然更不能放到业务中去使用：
```
function sleep(timeout) {
    let startTime = new Date().getTime()
    while (new Date().getTime() - startTime <= timeout) {
        // 这里进入死循环，阻塞线程
        // 当 timeout 以后 释放线程，执行后续代码
    }
}
```

### 方法二：Async/Await
实现这个sleep函数其实就可以变相的理解为如何把一个异步任务变成同步任务执行。那显然就可以用 ES6 的 Async/Await，实现起来也很简单，sleep函数内返回一个promise对象，当timeout时间后变成fulfilled状态，sleep函数执行结束，继续执行后续代码：

```
function sleep(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout)
    })
}

(async function () {
    await sleep(1000)   
    // 'run after 1000ms'
})()
```

### 方法三：Generator 

### 最后
给 JavaScript 硬安一个 sleep() 函数着实有些“死马当活马医”的意思，JavaScript是单线程执行的脚本语言，我们在代码里面直接 sleep 让线程休眠是不是太自私了点？毕竟人家就这么一条道好多“人”都等着走呢！所以js的异步机制就很棒了，我们要等待的代码先放到队列里等着，别的不需要等待的操作呢就继续执行，多好，一派和谐！

```
function sleep (timeout) {
  return new Promise(resolve => {
      setTimeout(resolve, timeout)
  });
}

sleep(5000).then(() => {
    // run after 5000ms
})
```

所以不用纠结如何实现 sleep() 函数，选择合适的编码方式最重要了 ：）

### 参考
[js中实现sleep函数](https://www.cnblogs.com/mfryf/p/3142681.html)
[简短优雅地利用js实现 sleep 函数](https://juejin.im/post/5cc7ddaf6fb9a032106bda07)


