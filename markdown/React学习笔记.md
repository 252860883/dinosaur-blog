---
title: React 笔记
date: 2019-09-24 23:45:58
tags: React
---

### create-react-app
create-react-app是github上面开源star最多的react脚手架,也是官方比较推荐的，所以打算用这个架子上手了。后续可以再学习用webpack自己去搭一套。

- 安装以及启动项目
```
npm install -g create-react-app
create-react-app my-app
cd my-app
npm start
```
- api开发请求代理
开发环境时的域名重定向，只需要在`package.json`中加入 
```
“proxy”:”http://localhost:3031/”
```
- 打包文件路径不对问题,在`package.json`中加入`“homepage”：“.”`

- 找到webpack配置文件
默认情况下，为了便于开发，该脚手架直接隐藏掉了webpack配置文件，如果想要自己手动修改一些配置文件怎么办呢？直接：
```
指令 npm run eject
```

- 添加 ant-design
```
npm install antd babel-plugin-import --save-dev

// 配置ant-design的按需加载
plugins: [
      ['import', [{ libraryName: "antd", style: 'css' }]],
],
```


### JSX
JSX是react特有的一个语法扩展。在react中通常用JSX来描述界面，它是写在JavaScript里的。这也是react倡导的 “all in js”，它和vue的单文件组件是不一样的。
```
const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
```

JSX就相当于一个语法糖文件，Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用，所以我们在每一个JSX文件中都需要`import React from 'react'`这样引入`React`。

```
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
<!-- babel 转译如下 -->
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```


### 组件 
```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
<Welcome name=‘Du Honghui’   />

State

class Welcome extends React.Component {

constructor(props){
	super(props);
	// 初始化 state
	this.state={
		name:’Du Honghui’
	}
}

//当绑定到dom时执行
componentDidMount() {
	this.setState({
		name:’Du now’
	})    
}

render() {
    return <h1>Hello, {this.state.name}</h1>;
 }
}
```
#### 组件生命周期钩子
- `componentDidMount()` 组件插入到dom中的时候执行
- `componentWillUnmount()`	组件被移除的时候执行

#### setState

**为什么要用setState进行赋值?**
在React中，修改state中的属性需要调用`setState`进行修改。如果习惯写vue的开发人员一上来肯定是不习惯的，为何我不能直接`this.state.xx=xxx`的方法来进行修改呢？这是因为`setState`操作不只是赋值这么简单，他还会触发React的更新机制，也就是进行`diff`和`patch`以及`更新dom`的操作。直接对`state`的属性进行赋值，虽然值能被修改但不会触发视图更新。vue之所以可以直接通过修改data中的值即可触发视图更新，是因为在实例创建的时候会进行响应式以及依赖的收集。

**setState是同步还是异步操作?**
首先，代码是同步执行的。之所以有时候让我们产生异步的错觉，是合成事件和钩子函数的调用顺序有可能在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值。

`setState`操作只在合成事件和钩子函数中是“异步”的，在原生事件和`setTimeout`/`setInterval`等原生API中都是同步的。这是因为React出于性能的考虑，如果频繁的`setState`操作会造成频繁渲染dom，这个开销是非常大的。所以会把多个 setState() 调用合并成一个调用。为了解决这个问题,可以让`setState()`接收一个函数而不是一个对象：
```
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

### 事件

```
function handleClick(e) {
  e.preventDefault();
  console.log('The link was clicked.');
}

return (
  <a href="" onClick={handleClick}>
    Click me
  </a>
);
```

>注意：在组件中需要为事件处理函数绑定`this`,这是因为class的方法默认不会绑定`this`。因为 render 多次调用每次都要 bind 会影响性能，所以官方就没有进行处理，而要我们需要绑定的地方手动去绑定，以达到性能优化的目的。

目前我们一般有四种方法去绑定this:

- **直接在事件里进行bind操作**，这样写起来顺手，但是如果我们有多个事件绑定同一个事件函数的话，就会进行多次的bind操作，会对性能造成影响。
- **在constructor种手动bind**，相比第一种方法，在构造函数中只进行一次绑定操作即可，节省多余开销
- **箭头函数**，利用箭头函数不会创建this的特性，但是每次我们都要创建一个不同的回调函数
- **public class fields**，需要安装babel插件来支持

```
class Foo extends React.Component {
  constuctor(props) {
    super(props)
    this.handleClick2 = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({ xxx: aaa })
  }

  render() {
    return (
      <div>
        <!-- 直接进行 bind this -->
        <button onClick={this.handleClick.bind(this)}>Click me</button>
        <!-- 在 constructor 中手动绑定函数 -->
        <button onClick={this.handleClick2}>Click me</button>
        <!-- 箭头函数形式 -->
        <button onClick={(e) => this.handleClick(e)}>Click me</button>
      </div>
    )
  }
}
```


### 总结
作为目前最流行的MVVM框架React和vue有很多异同点，那就在这来总结一下吧，来更深刻的对两个框架理解，并有能力知道在何种场景适合使用vue或者react来进行快速开发。
