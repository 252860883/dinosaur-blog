---
title: 小程序实现vue的watch和computed方法
date: 2018-04-10 12:39:33
tags: [小程序,VUE]
---
博主现在的工作项目是以小程序为主，所以就开始涉猎小程序这一块坑了。个人感觉，小程序有点 miniVUE 的意思，同样是MVVM框架，小程序继承了vue很多的写法，入手还是很快的。同时小程序特有的一些api在微信生态里面用起来也是很爽歪歪～ 不过，用惯了vue就发现了小程序有很多功能是不支持的，这对于刚从vue转到小程序的我是何等的不习惯啊，所以这里面就打算首先来封装一下 watch 和 computed 两个方法。

### 探底VUE
vue作为一个典型的MVVM框架，双向绑定可以说是很溜了。在 new Vue() 的时候，首先对data中的属性进行遍历，然后用 Object.defineProperty将它们转为 getter/setter，实现数据变化监听功能；Vue 的指令编译器Compile 对元素节点的指令进行扫描和解析，初始化视图，并订阅Watcher来更新视图，此时Wather 会将自己添加到消息订阅器中(Dep),初始化完毕。

### 分析
在小程序底层已经对data属性做好了双向绑定，那我需要做的呢就是在 onLoad 生命周期时，添加 wacth函数和computed函数，对其中的对象属性进行对应操作的初始化绑定。
### watch实现
watch监听的话，看过vue源码就应该知道这里要用到 Object.defineProperty 拦截判断了，具体原理就是在渲染时执行watch函数，那么watch函数的具体作用呢就是操作数据对象的对象描述符，使得我们在setData修改其值的时候，每次在set里都能获取到监听，上源码：

```
// vue watch 方法 监听值的变化
function watch(ctx, obj) {
  // obj是watch监听的一个一个对象集合 
  Object.keys(obj).forEach(key => {
    defineReactive(ctx.data, key, ctx.data[key], function (newVal, oldVal) {
      // obj[key] 对应监听值的回调函数
      obj[key].call(ctx, newVal, oldVal);
    })
  })
}

/**
 * 检测函数的变化
 * data 当前上下文的data，key 键名，val 键值，fn执行的回调函数
 */
function defineReactive(data, key, val, fn) {
  // 通过 Object.defineProperty进行set操作拦截
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get: function () {
      return val
    }, 
    set: function (newVal) {
      if (newVal === val) return
      // 如果新值和老值不相同则执行回调函数fn
      fn && fn(newVal,val)
      val = newVal;
    }
  })
}
```

实际应用：

```
onLoad: function () {
    watch(this, {
      i: function (newVal,oldVal) {
        console.log("watch监听到i的变化，现在的值：" + newVal+"原来的值："+oldVal
      }
    })
}
```

### computed实现
computed的话，原理和watch操作类似，不同的是需要在对应属性数值变化的时候同时更新该属性依赖的其他属性，（备注：这里有一些优化缺陷，每次数据有修改的时候都会重复执行computed里的所有函数，有些冗余，后续计划设计key值或者采用发布订阅模式优化）上源码：
```
// computed 函数
function computed(ctx, obj) {
  let computedKeys = Object.keys(obj)//computed 对象集合
  let computedFn = [];//computedFn存储computed计算操作
  let computedObj = computedKeys.reduce((total, next) => {
    computedFn.push(function () {
      ctx.setData({ [next]: obj[next].call(ctx) })
    })
    total[next] = obj[next].call(ctx);
    return total
  }, {})
  // 首次加载先设置一次
  ctx.setData(computedObj)
  // 绑定数据变化时，动态computed
  let dataKeys = Object.keys(ctx.data)
  dataKeys.forEach(dataKey => {
    defineReactive(ctx.data, dataKey, ctx.data[dataKey], "", computedFn)
  })
}

/**
 * 检测函数的变化
 * data 当前上下文的data，key 键名，val 键值，fn 回调函数
 * 这里要兼容 watch问题了
 */

function defineReactive(data, key, val, watchFn, computedFn) {
  // 通过 Object.defineProperty进行set操作拦截

  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get: function () {
      return val
    },
    set: function (newVal) {
      if (newVal === val) return
      // 如果新值和老值不相同则返回回调函数 fn
      watchFn && watchFn(newVal, val)

      if (computedFn && computedFn.length) {
        // 执行 computed的更新设置值
        setTimeout(() => {
          computedFn.forEach(sub => sub());
        })

      }
      val = newVal;
    },
  })
}
```
实际应用：

```
onLoad: function () {
    computed(this, {
      test2: function () {
        return 'computed封装：' + this.data.i + '次'
      }
    })
}
```

### 后续问题
如果单纯实现watch或者computed，之前的方案是可行的，可是在实际操作中发现，后执行的活覆盖掉前者的回调函数，造成的问题是只执行后者的方法。所以经过一番实验和改造，对watchFn和computedFn进行了写入ctx.data变量，同时对watch添加了字段校验。源码如下：
```
/**
 * 检测函数的变化
 * data 当前上下文的data，key 键名，val 键值，fn 回调函数
 */
function defineReactive(data, key, val, watchFn, computedFn) {
  let realWatchFn = data['watchFn'];
  let realComputedFn = data['computedFn'];
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get: function () {
      if (watchFn) {
        realWatchFn = watchFn;
        data['watchFn'] = realWatchFn;
      }
      if (computedFn) {
        realComputedFn=computedFn;
        data['computedFn']=realComputedFn;
      }
      return val
    },
    set: function (newVal) {
      if (newVal === val) return
      // 如果新值和老值不相同则返回回调函数 fn
      realWatchFn && realWatchFn(newVal, val, key);
      val = newVal;
      if (realComputedFn && realComputedFn.length) {
        // 执行 computed的更新设置值
        setTimeout(() => {
          realComputedFn.forEach(sub => sub());
        })
      }
    },
  })
}

// vue watch 方法 监听值的变化
function watch(ctx, obj) {
  // obj是watch监听的一个一个对象集合 
  Object.keys(obj).forEach(key => {
    // console.log(key);
    defineReactive(ctx.data, key, ctx.data[key], function (newVal, oldVal, realKey) {
      // obj[key] 对应监听值的回调函数,key值判断当前是否是需要watch的字段
      realKey == key && obj[key].call(ctx, newVal, oldVal);
    })
  })
}

// computed 函数
function computed(ctx, obj) {
  console.log(ctx.data)
  let computedKeys = Object.keys(obj)//computed 对象集合
  let computedFn = [];//computedFn存储computed计算操作
  let computedObj = computedKeys.reduce((total, next) => {
    computedFn.push(function () {
      ctx.setData({ [next]: obj[next].call(ctx) })
    })
    total[next] = obj[next].call(ctx);
    return total
  }, {})
  // 首次加载先设置一次
  ctx.setData(computedObj)
  // 绑定数据变化时，动态computed
  let dataKeys = Object.keys(ctx.data)
  dataKeys.forEach(dataKey => {
    defineReactive(ctx.data, dataKey, ctx.data[dataKey], false, computedFn)
  })
}

// 对外抛出 watch、computed 方法
module.exports = { watch, computed }

```