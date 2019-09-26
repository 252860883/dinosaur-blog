---
title: React 笔记
date: 2019-09-24 23:45:58
tags: React
---

### 脚手架 create-react-app
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

### 渲染 DOM
```
ReactDOM.render(
  Element,
  document.getElementById('root')
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
- 组件生命周期钩子
  componentDidMount()	组件插入到dom中的时候执行
  componentWillUnmount()	组件被移除的时候执行

### 事件
书写 驼峰式
```
 function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
 }

  return (
    < a href=" " onClick={handleClick}>
      Click me
    </ a>
  );
```
在组件中的时候需要添加 this.handleClick

处理回调函数的 this：
方法1: 在constructor中添加 bind 绑定 this
```
this.handleClick = this.handleClick.bind(this);
```
方法2: 使用属性初始化器(箭头函数)绑定回调函数
```
handleClick = () => {
    console.log('this is:', this);
  }
```

### 总结
作为目前最流行的MVVM框架React和vue有很多异同点，那就在这来总结一下吧，来更深刻的对两个框架理解，并有能力知道在何种场景适合使用vue或者react来进行快速开发。
