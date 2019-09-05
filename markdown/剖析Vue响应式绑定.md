---
title: 剖析Vue响应式绑定
date: 2019-8-18 11:23:03
tags: ['javascript']
top:
---

Vue的一大特色就是双向绑定，关于其原理我想大多数人都能直接说出来，使用`Object.defineProperty`对象拦截通过`setter`、`getter`监听数据变化作出相应操作。虽然原理大概如此，但是还需要再深入的进行一些了解。

### 如何实现数据双向绑定
Vue 的数据双向绑定主要是指：数据变化更新视图，视图变化更新数据。

Vue 主要通过4个步骤实现数据双向绑定：

1. **实现一个监听器 Observer：**对数据对象进行遍历，包括子属性对象的属性，利用`Object.defineProperty()`对属性都加上`setter`和`getter`。这样，给这个对象的某个值赋值，就会触发 `setter`,就能听到了数据变化。
2. **实现一个解析器 Compile：**解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。
3. **实现一个订阅者 Watcher：**Watcher 订阅者是`Observer`和`Compile`之间通信的桥梁 ，主要的任务是订阅`Observer`中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 `Compile`中对应的更新函数。
4. **实现一个订阅器 Dep：**订阅器采用 发布-订阅 设计模式，用来收集订阅者`Watcher`，对监听器`Observer`和`订阅者 Watcher`进行统一管理。

具体的实现流程可以围观[《0 到 1 掌握：Vue 核心之数据双向绑定》](https://juejin.im/post/5d421bcf6fb9a06af23853f1)这篇博客。

### 如何对数组和对象进行数据劫持
上面已经提到了 Vue 通过`Object.defineProperty()`进行数据劫持，但是`Object.defineProperty()`有个缺陷，**只能对属性进行数据劫持**，所以不能对整个对象或是数组进行劫持。对此，Vue 也对数组和对象类型进行了一些增强处理，即通过递归遍历来实现：

```
/**
 * 对数组进行遍历
 */
observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
        observe(items[i])  // observe 功能为监测数据的变化
    }
}

/**
 * 对属性进行递归遍历
 */
let childOb = !shallow && observe(val) // observe 功能为监测数据的变化
```

虽然 Vue 尽自己最大限度的解决了对象和数组的双向绑定问题，但是它还是**无法监测到对象属性的增加或者是删除**，因为 Vue 会在初始化实例的时候对属性执行`getter`/`setter`转化，所以属性必须在初始化的时候存在才会实现响应式。

对于数组，Vue对 Array 的一些原生方法进行了包裹，包括：`push()`/`pop()`/`shift()`/`unshift()`/`splice()`/`sort()`/`reverse()`，这些方法都会触发视图响应式更新。具体我们可以来参考Vue源码中[array.js](https://github.com/vuejs/vue/blob/dev/src/core/observer/array.js)文件：

```
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */
import { def } from '../util/index'
// 
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  // def 的作用是重新定义对象属性的value值
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    return result
  })
})
```

从上面源码可以看出，Vue 对 Array 几个方法进行重写，除了执行数组原始方法以外，还会额外执行`ob.dep.notify()`，在这里通知变更就是很关键的实现响应式了。但是到这一步我们**通过索引设置一个数组项或者改变数组的长度仍然无法实现响应式**：

```
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

既然 Vue 都对数组下手开刀支持响应式了，为什么对数组下标形式也处理下呢？对此问题尤大给出的解释是出于性能的考虑。所以针对上述不支持响应式的情况，Vue 也给出了解决办法,就是使用 `Vue.set`向响应式对象中新增属性。

### Vue.set 原理

> Vue.set( target, propertyName/index, value )

作用：向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性。

```
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})
Vue.set(vm.userProfile, 'age', 27); // age 是响应式属性
vm.userProfile.height = 20; // height 不是响应式属性
```

这神奇的`Vue.set`究竟是怎么实现的呢？在源码[core/observer/index.js](https://github.com/vuejs/vue/blob/dev/src/core/observer/index.js)文件中可以找到`set`方法的定义：

```
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
export function set (target: Array<any> | Object, key: any, val: any): any {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }
  // 如果是数组 执行 splice方法触发响应式
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  // 如果属性已经存在则直接进行赋值操作
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return val
  }
  if (!ob) {
    target[key] = val
    return val
  }
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```
可以看到，如果对象是数组的话直接使用`target.splice(key, 1, val)`来触发响应式，如果给对象增加新属性，会调用`defineReactive()`方法,这个方法其实就是在Vue在初始化对象时给对象属性采用`Object.defineProperty`动态添加`getter`和`setter`的功能，说白了可以理解为就给新增对象就像初始化那样做一套响应式逻辑。

### Proxy
尤大之前就说过了 Vue3.0 要把 `Object.defineProperty` 用 `Proxy` 来进行重构了。这个`Proxy`可真是个好东西，和`Object.defineProperty`比起来有诸多优点：

1. Proxy 可以直接监听对象而非属性；
2. Proxy 可以直接监听数组的变化；
3. Proxy 有多达 13 种拦截方法,不限于`apply`、`ownKeys`、`deleteProperty`、`has`等等,是`Object.defineProperty`不具备的；
4. Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而`Object.defineProperty`只能遍历对象属性直接修改；
5. Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；

最后再来回顾一下 `Proxy`如何使用吧，Proxy对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）：

```
let handler = {
    // 获取属性时执行的回调函数
    get: function(target, name){
        return name in target ? target[name] : 37;
    },
    // 设置属性时执行的回调函数
    set: function (obj, prop, value) {
        ...
    }
};

let p = new Proxy({}, handler); // 第一个参数为被包装的目标对象，第二个参数为各种操作回调函数的集合

p.a = 1; 
p.b = undefined;

console.log(p.a, p.b);    // 1, undefined
console.log('c' in p, p.c);    // false, 37
```


### 参考
>[0 到 1 掌握：Vue 核心之数据双向绑定](https://juejin.im/post/5d421bcf6fb9a06af23853f1)
[Vue响应式----数组变异方法](https://juejin.im/post/5a04231af265da431f4a84be)




