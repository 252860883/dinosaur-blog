---
title: 由 Async/Await 引发出来的一系列问题
date: 2019-08-20 10:30:12
tags: javascript
top:
---

### Async/Await 的出现
在 ES6 出现之前，我们都是通过回调函数的方式来操作异步代码，如果出现大量的回调函数嵌套，代码那真的是辣眼睛，这也是我们常说的**回调地狱**。ES6+以后出现了`Promise`,大大的优化了异步编程的问题，也避免了回调地狱的问题，但是我们在实际开发中仍然会遇到一大堆then链的问题：

```
ajax('XXX1')
  .then(res => {
      // 操作逻辑
      return ajax('XXX2')
  }).then(res => {
      // 操作逻辑
      return ajax('XXX3')
  }).then(res => {
      // 操作逻辑
  })
```

这个时候，就由`Async/Await`登场了，使用 async 函数以后，使得异步操作变得更加方便：

```
async function a(){
  await promise1()
  await promise2()
  await promise3()
}
```

我们都知道js是**单线程**的，异步的代码原则上是不会阻塞其他代码的执行，但是怎么在`async function`里面就不是那么回事了呢？ 关于`Async/Await`究竟是何物，我们继续去探索结果。

### Iterator
>迭代器（Iterator）可以给一个对象“超能力”，包含一个 next() 方法，调用该方法返回一个对象包含两个属性：value - 当前位置的值；done - 是否迭代结束。

在过去，我们通过for循环来遍历数组，通过`for...in`来遍历对象。ES6以后，只要一个对象包含`Iterator`,我们就可以通过`for...of`来实现遍历了！

如果想让一个对象是可迭代的，那么这个对象或者其原型链中必须拥有`Symbol.iterator`属性。当该对象进行迭代时，它的`iterator`方法都会在不传参情况下被调用，返回的迭代器用于获取要迭代的值。

当然，一些内置类型拥有默认的迭代器行为，例如 `Array`,`TypedArray`,`String`,`Map`,`Set`等。

### Generator
> 生成器对象是由一个**generator function**返回的,并且它符合我们上面所说的可迭代协议和迭代器协议。

来，我们定义一个`generator function`:

```
function* gen() { 
  yield 1;
  yield 2;
  const a = yield 3;
  yield a;
}
let g = gen(); // "Generator { }"
console.log(g.next()); // {value:1,done:false}
console.log(g.next()); // {value:2,done:false}
console.log(g.next()); // {value:3,done:false}
console.log(g.next(100)); // {value:100,done:false}
console.log(g.next()); // {value:undefined,done:true}
```

如上面所示的代码片段，`function* gen(){}`就是一个生成器函数，而`g`就是一个生成器对象，它可以执行`next()`方法（这里可以通过接受一个参数用以向生成器传值，作为上一条yield操作的返回值），也可以被`for...of`遍历。

等等？？

我们看到在`generator function`中，我们只有执行了`next()`方法才会跳到下一个yeild，这期间函数内部的代码一直都是处于阻塞的状态。所以我们是不是可以把 yeild 返回值换成一个promise对象，当异步代码执行完毕再从`then()`回调中去执行`g.next()`，是不是就能够把异步的操作变成“同步”的了？为了验证我们的猜想，来上代码试试：

```
// 这里模拟异步事件
function getPromise1() {
  return new Promise((resole, reject) => {
    setTimeout(() => {
      resole('get promise1')
    }, 2000)
  })
}
// 这里模拟异步事件
function getPromise2() {
  return new Promise((resole, reject) => {
    setTimeout(() => {
      resole('get promise2')
    }, 1000)
  })
}

function* gen() {
  console.log('run gen function');
  yield getPromise1();
  console.log('wait primise1 done,output this');
  yield getPromise2();
}

let g = gen();
let g1 = g.next().value;
g1.then(res => {
  console.log(res);
  let g2 = g.next().value;
  g2.then(res2 => {
    console.log(res2);
    g.next();
  })
})

```
太好了！输出结果如我们所期待的，整个执行过程大概如下：

1. 创建遍历器对象，输出`run gen function`
2. 第一次调用`g.next()`，并将一个promise对象赋值给`g1`
3. 2s后，`g1`执行回调函数，输出`get promise1`
4. 第二次调用`g.next()`，首先输出`wait primise1 done,output this`，然后将第二个promise2对象赋值给`g2`
5. 1s后，`g1`执行回调函数，输出`get promise2`

不过，我们这例子中只是给了两个异步操作，但凡我们的操作有若干个，这一层层的嵌套也不是个事啊！所以我们来改造一下，使得上一个异步事件执行完了自动就去执行下一个：

```
function async(gen) {
  let g = gen();
  function run() {
    let gResult = g.next()
    if (gResult.done) return;
    let gIndex = gResult.value
    gIndex.then(res => {
      console.log(res);
      run()
    })
  }
  run()
}

async(function*() {
  console.log('run gen function');
  yield getPromise1();
  console.log('wait primise1 done,output this');
  yield getPromise2();
  console.log('wait primise2 done,output this');
});
```

### Async/Await
我们已经通过使用`Generator`实现了类似`Async/Await`使异步代码执行结束后再执行后续代码的功能，对比下我们用`Async/Await`来实现的代码：

```
// 使用 Generator 实现
async(function*() {
  console.log('run gen function');
  yield getPromise1();
  console.log('wait primise1 done,output this');
  yield getPromise2();
  console.log('wait primise2 done,output this');
});

// Async/Await 实现
async function func() {
  console.log('run gen function');
  await getPromise1();
  console.log('wait primise1 done,output this');
  await getPromise2();
  console.log('wait primise2 done,output this');
}
```

可以非常直观的感受到，`Async/Await`就是一种语法糖，基于Generator 函数和自动执行器实现。不过实际上自动执行器要不我们上面的实现复杂些,下面给出spawn函数的实现，基本就是自动执行器的翻版：

```
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```

根据上面可知，await 操作之后的代码都相当于一个microtask微任务：

```
async function async1() {
	console.log('async1 start');
	await async2();
	console.log('async1 end');
}
// 等同于
async function async1() {
	console.log('async1 start');
	Promise.resolve(async2()).then(() => {
            // microtask
            console.log('async1 end');
        })
}
```


### 参考
> [Async/Await 如何通过同步的方式实现异步](https://muyiy.vip/question/async/9.html)