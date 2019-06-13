---
title: 用Proxy实现MVVM双向绑定
date: 2018-10-18 11:23:03
tags: ['javascript']
top:
---
> 在之前我们了解到 VUE 的框架底层通过 `Object.defineProperty()` 来实现双向绑定的。那这次咱们就来玩点不一样的，用 ES6 的 Proxy 来实现 MVVM 的双向绑定。

### Proxy
首先来了解一下 `Proxy` ，该对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。看下面的基础示例：

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

### 实现一个简单的 MVVM 框架
好了，有了这个前提，我们就可以开始封装我们的“框架”了。

首先，我们创建一个`viewModel`对象,并将其赋值为一个Proxy对象，设置`set`回调函数，当属性值被修改时便可以执行对应的操作。
```
let viewModel = {
    a: "111"
}

let handler = {
    set: function (obj, prop, newValue) {
        let oldValue = obj[prop]
        if (oldValue != newValue) {
            obj[prop] = newValue
            console.log(`${prop} is changing from ${oldValue} to ${newValue}`)
        }
    }
}
viewModel = new Proxy(viewModel, handler);
```
然后我们进行单向绑定，将我们的dom中的value值和viewModel进行绑定，当value值变化时，viewModel会自动进行更新。这里我们模拟dom元素中的model属性值对应绑定viewModel中的属性值。
```
// html
<input id='input' type="text" model="a">

// js
// 获取所有需要绑定的dom元素
let modelElements = document.querySelectorAll('[model]');
// 绑定事件
function init() {
    modelElements.forEach(element => {
        let prop = element.getAttribute('model')
        if (prop in viewModel) {
            element.value = viewModel[prop];
            element.addEventListener('keyup', function () {
                viewModel[prop] = element.value
            })
        }
    })
}
init()
```

这样当我们修改 input 的值的时候，控制台就会输出日志，viewModel对应的属性值会同步更新。下面我们继续进行另一向的绑定：当修改 viewModel 的属性值，对应绑定的 dom 元素的值也会发生变化。代码如下：
```
// 当 viewModel 的某个属性被修改时，动态修改被绑定的dom值
function setValue(prop) {
    modelElements.forEach(element => {
        if (element.getAttribute('model') === prop) {
            element.value= viewModel[prop]
        }
    })
}

// 修改 handler 的set函数
let handler = {
    set: function (obj, prop, newValue) {
        let oldValue = obj[prop]
        if (oldValue != newValue) {
            console.log(`${prop} is changing from ${oldValue} to ${newValue}`)
            obj[prop] = newValue
            // 添加 setValue 函数
            setValue(prop)
        }
    }
}
```

这样，双向绑定就完成啦，我们可以添加一个 setTimeout 进行验证：

```
setTimeout(() => {
    viewModel.a = 233
}, 1000)
```

一秒中后，input中的值由 ‘111’ 变为 ‘233’。成功～

>完整代码：https://github.com/MagicalDinosaur/demos/blob/master/proxy/mvvm.html

