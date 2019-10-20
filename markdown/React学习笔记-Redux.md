---
title: React学习笔记之Redux
date: 2019-01-20 16:51:48
tags: [javascript,React]
top: 
---
> Redux 是一个状态管理器。那什么是状态呢？简单来说，状态就是数据。Redux支持 React、Angular、Ember、jQuery 甚至纯 JavaScript，不是只在 React 中才可以使用，

### Action
Action 是把数据从应用传到 store 的有效载荷。它是 store 数据的唯一来源。实际应用中一般通过 store.dispatch() 将 action 传到 store。举个例子：
```
{
    type:'ADD_TODO',
    count:10
}
```

本质上讲，Action就是一个普通的对象，Redux 约定，必须使用一个字符串类型（一般大写）的 type 字段来表示要执行的动作，同时实际项目中一般会在新建数据的时候生成唯一的 ID 作为数据的引用标识。尽量减少在 action 中传递数据。

在 Redux 中，Action创建函数只是一个返回action的函数，把创建函数的结果传递给 dispatch() 即可出发一次 dispath过程。
```
// action 创建函数
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
// dispath 过程
dispatch(addTodo(text))
```

### Reducer
Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的(根据action响应state)，记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。reducer格式如下：

```
(previousState, action) => newState
```

Reducer是纯函数，一定要保持纯净，只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。

如果业务量庞大我们可能会有很多的reducer，所以为了实现拆分，可以通过 `combineReducers` 函数合并起来:
```
...

const todoApp = combineReducers({
  visibilityFilter,
  todos
})
export default todoApp
```

### Store
我们已经知道了 action 来描述“发生了什么”，reducer来根据 action 更新 state。那 Store 就是把它们联系到一起的对象。那 store 有什么职责呢？

* 维持应用的 state;
* 提供了 `getState()` 获取 state;
* 提供了 `dispath()` 更新 state;
* 通过 `subscribe(listener)` 方法注册监听器;
* 通过 `subscribe(listener)` 返回的函数注销监听器.

需要注意 Redux 应用只有一个单一的 store。创建 store 也非常的方便：
```
import { createStore } from 'redux'
import todoApp from './redux/reducers.js'

let store = createStore(todoApp)
```

### 数据流
严格的单向数据流是 Redux 的设计核心。一般情况下遵循四个步骤：
1. store.dispatch(action)
2. Store 把 state 和 acgion 两个参数传入 reducer
3. 根 reducer 把多个子 reducer 输出合并成一个单一的 state 树


### React 中使用 Redux





