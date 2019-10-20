---
title: VUE核心原理解析
date: 2018-09-22 16:50:05
tags: [vue,javascript]
top:
---
> 众所周知，VUE 是目前一款很流行专注于视图层、用于构建用户交互界面的响应式渐进框架。在使用 VUE 框架大力缩减了开发成本的同时，是否有想过VUE是如何实现双向绑定的？计算属性、监听器等方法又是如何实现的？带着一系列的疑问，就开始这篇解析吧。

## 运行机制
![image](http://p70gzm2sm.bkt.clouddn.com/1606e7eaa2a664e8.jpg)

如上面流程图所示，大致流程：

1. new Vue() 创建 vue实例的过程，会调用 _init() 进行初始化操作，它会初始化生命周期、事件、 props、 methods、 data、 computed 与 watch 等。通过 Object.defineProperty 的 setter、getter 实现**响应式**以及**依赖**的收集。初始化后调用 $mount 挂载组件

2. 然后开始 complie 编译，分为三个阶段：parse、optimize、generate。**parse** 会用正则等方式解析 template 模板中的指令、class、style等数据，形成AST。**optimize** 的主要作用是标记 static 静态节点，在后续diff算法计算时会直接跳过静态节点，节省的比较时间，起到优化作用。**generate** 是将 AST 转化成 render function 字符串的过程，最终拿到 render function。

3. 接下来，由于之前在初始化的时候对 getter 和 setter 进行了设置，所以我们在读取对象的时候就会执行 getter 函数进行依赖收集，目的是将观察者 Watcher 对象放到当前的订阅者 Dep 的 subs 中。当给对象赋值的时候执行 setter 函数，setter 会通知之前设定的 Watcher 值发生变化需要更新视图。

4. 前面的 renderFunction 会转化为 VNode节点，在修改一个对象值的时候，会通过 setter -> Watcher -> update 的流程生成一个新的VNode。将新的 VNode 与旧的 VNode 一起传入 patch 进行比较，经过 diff 算法得出它们的「差异」。最后我们只需要将这些「差异」的对应 DOM 进行修改即可。

## 响应式绑定
我们都熟知 Vue.js 是一个 MVVM 的库，响应式系统可以说是它的一大特色了，下面就来了解vue是如何实现响应式的。

#### Object.defineProperty
vue之所以能实现响应式的绑定，主要靠的就是 `Object.defineProperty` 了。其实在之前的博文里，已经用到过很多次这个神奇的方法了，这里再了解一下：
```
// obj 要在其上定义属性的对象
// prop 要定义或修改的属性的名称
// descriptor 将被定义或修改的属性描述符

Object.defineProperty(obj, prop, descriptor)

```
其中，descriptor有如下几个属性：
- **configurable**：当该值为true时,该属性描述符才能被改变
- **enumerable**：当值为true时，该属性才能够出现在对象的枚举属性中（比如 for...in、Object.keys等）
- **value**：该属性对应的值
- **writable**：值为true时，value才能被赋值运算符改变
- **get**：给属性提供 getter 方法，当访问该属性时执行方法
- **set**：给属性提供 setter 方法，当属性值修改时执行方法

下面就来模拟一下用 `Object.defineProperty` 实现一个响应式的 demo，首先通过 `defineReactive` 函数封装 `Object.defineProperty` 方法，通过设置 `set` 方法实现当属性值变化时执行 `cb` 函数;然后封装 `observer`函数对 `data` 对象的所以属性进行绑定，当 `data` 对象中的属性值被修改时，则执行回调函数。具体代码如下：

```
// 创建一个 data 对象
var data = {
    num: 2
}

// 对一个对象的其中一个属性进行响应式绑定
function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            // 在 vue 中，通过get会进行依赖
            return val
        },
        set: function (newval) {
            if (newval == val) return;
            // 这里直接模拟一个简单的回调函数，当属性值被修改时执行
            cb(key, newval);
        }
    })
}

// 对 data 对象的所有属性进行响应式绑定
function observer(data) {
    Object.keys(data).forEach((key) => {
        defineReactive(vale, key, data[key])
    })
}

// 数据更新时的回调数据
function cb(key, val) {
    /* 渲染视图 */
    console.log("属性：" + key + "更新为：" + val);
}

// 创建一个Vue类
class Vue {
    constructor(options) {
        this._data = options.data
        observer(this._data)
    }
}

// 实例化
var vue = new Vue({
    data: {
        num: 2
    }
})
vue._data.num = 3;
vue._data.num = 8;

```

上面的 demo 最终会输出，:
```
属性：num更新为：3
属性：num更新为：8
```

Emmm，神奇～

### 依赖收集
上面我们已经实现了一个简单的响应式系统，那么接下来就就聊聊依赖收集。

上一节讲响应式绑定的时候是否有些漏洞呢？如果我们多个vue实例绑定同一个data对象，当data对象更新时该如何通知这些vue实例呢？所以这里就引入了 **依赖收集** 的概念。
demo如下：
```
// 对一个对象的其中一个属性进行响应式绑定
function defineReactive(obj, key, val) {
    // 创建一个Dep实例
    var dep = new Dep()

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            if (Dep.target) {
                // 将当前watcher实例加入subs数组进行依赖收集
                dep.add(Dep.target)
            }
            // console.log(dep)
            return val
        },
        set: function (newval) {
            if (newval == val) return;
            // cb(key, newval);
            dep.notify();
        }
    })
}

// 对 data 对象的所有属性进行响应式绑定
function observer(data) {
    Object.keys(data).forEach((key) => {
        defineReactive(data, key, data[key])
    })
}

// 依赖收集，当数据更新时通知所有Watcher更新
class Dep {
    constructor() {
        // 存放所有的Watcher对象
        this.subs = [];
    }
    // 添加一个watcher对象
    add(sub) {
        this.subs.push(sub)
    }
    // 通知所有的视图更新
    notify() {
        this.subs.map((sub) => {
            sub.update();
        })
    }
}

// 观察者，当数据更新时需要收到通知
class Watcher {
    constructor(vm, expOrFn, cb, options) {
        // Dep.target指向创建当前的watcher实例
        Dep.target=this;
    }
    update() {
        console.log('视图更新啦！')
    }
}

class Vue {
    constructor(options) {
        this._data = options.data;
        // 实例化 watcher
        new Watcher();
        // 响应式绑定数据
        observer(this._data)
        // 这里为了触发 get 函数，读取一下num
        this._data.num
    }
}

var vue = new Vue({
    data: {
        num:2
    }
})
vue._data.num = 10

```

通过上面的demo我们了解几个概念：
`Dep` 类可以理解为依赖收集器，主要用来收集当前响应式对象的依赖关系，当数据改变时，依赖的wahcer会被通知。可以看出来这是一个很典型的观察者模式。
`Watcher` 类是一个观察者，当数据更新时会触发 Watcher 进行更新。其分为 渲染 watcher、计算属性 watcher 和 监听器 watcher。

只要会被其他的观察者 (watchers) 依赖，比如data、data的属性、计算属性、props等，就会在闭包里生成一个 Dep 的实例 dep 并在被调用 getter 的时候 dep.depend 收集它被谁依赖了，并把被依赖的watcher存放到自己的subs中 this.subs.push(sub)，以便在自身改变的时候通知 notify 存放在 dep.subs 数组中依赖自己的 watchers 自己改变了，及时 update。

只要依赖别的响应式的对象，就会生成一个 watcher，来统计这个 watcher 依赖了哪些响应式对象，在这个 watcher 求值前把当前 watcher 设置到全局 Dep.target，并在自己依赖的响应式对象发生改变的时候及时 update。





