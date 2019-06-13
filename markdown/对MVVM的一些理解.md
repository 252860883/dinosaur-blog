---
title: 对MVVM的一些理解
date: 2018-05-24 12:23:14
tags: javascript
---

## 为什么会出现MVVM
不管是在过去学习的java还是现在的nodejs，大部分的后端开发中都用到了所谓的MVC模式，至于MVC是什么就不再赘述。那么MVVM之所以出现是因为过去的MVC模式不能满足现在的前端开发需求。

## 前端开发中的痛点
•	在代码中大量调用相同的 DOM API, 处理繁琐 ，操作冗余，使得代码难以维护。
•	大量的DOM操作使页面渲染性能降低，加载速度变慢，影响用户体验。
•	当 Model 频繁发生变化，开发者需要主动更新到View；当用户的操作导致 Model 发生变化，开发者同样需要将变化的数据同步到Model中，这样的工作不仅繁琐，而且很难维护复杂多变的数据状态。

## 突破
在几年前出现了JQuery库，方便的api，完美的polyfill，大大的减轻了前端的开发工作。然而这仅仅是解决了痛点一，关于dom和model数据更新并没有得到解决。
后来有了MVVM的概念，实践出了 React、Vue等框架。MVVM中。V还是视图层。M模型，简单说就是data数据。VM表示 viewModel（视图模型），它作为view和model的中间者架起一座通道，利用开发者模式实现双向绑定。

## Vue双向绑定过程
1.	当执行 new Vue() 时，Vue 就进入了初始化阶段
2.	Vue 会遍历 data 选项中的属性，并用 Object.defineProperty 将它们转为 getter/setter，实现数据变化监听功能；
3.	Vue 的指令编译器Compile 对元素节点的指令进行扫描和解析，初始化视图，并订阅Watcher 来更新视图，此时Wather 会将自己添加到消息订阅器中(Dep),初始化完毕。
