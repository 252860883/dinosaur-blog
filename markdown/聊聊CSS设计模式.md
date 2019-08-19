---
title: 聊聊CSS设计模式
date: 2019-07-30 15:04:47
tags: javascript
---

> 日常开发业务的时候很令人头疼的一件事就是给CSS命名，瞎起名乱起名，等到版本迭代修改样式的时候可就痛苦了，无从下手。所以能写出一套可被维护的CSS也至关重要呀。

### OOCSS
**OOCSS(Object Oriented CSS)** 面向对象的CSS，主要有两个原则：

1. Separate structure and skin（分离结构和主题）
2. Separate container and content（分离容器和内容）

我们来看个例子：

```
//- html
<div class="box box-shadow">
  <div class="box-title">这是标题</div>
  <div class="box-content">
    <span class="box-text text-red">这是红色</span>
    <span class="box-text text-green">这是绿色</span>
  </div>
</div>


//- css

.box{
  width:150px;
  height:150px;
  padding:20px;
}
.box-shadow{
  box-shadow: 0 0 10px #aaa;
}
.box-title{
  font-weight:bold;
}
.box-content{
  margin: 10px auto;
}
.box-text{
  font-size:12px;
}
.text-red{
  color:red;
}
.text-green{
  color:green;
}

```
**分离结构和主题**是将一个特定的主题样式分离出来，比如我们代码中的`box-shadow`，它没有直接将样式写到 `box`下，这样它就是可选择可拆分的了。
**分离容器和内容**使得我们不在采用类似 `.box div span{ }`的写法，既不使用继承选择符，这样是为了避免样式过度依赖标签的结构，可以在任何地方使用。


### SMACSS
**SMACSS(Scalable and Modular Architecture for CSS)**,具体更详细的规范定义可以[戳这里](http://smacss.com/)。SMACSS将css分为5类：Base(基础样式)、Layout(布局样式)、Module(模块样式)、State(状态样式)、Theme(主题样式)。

#### Base
>Base 就是设定标签元素的预设值，这里只会对标签本身做限制，不会出现id 或者 class 选择器。

```
body, form {
    margin: 0;
    padding: 0;
}
a {
    color: #039;
}
a:hover {
    color: #03F;    
}
```

#### Layout
>Layout 是对网站的整体架构，而不是一些细微的UI处理。

```
#header, #article, #footer {
    width: 960px;
    margin: auto;
}

#article {
    border: solid #CCC;
    border-width: 1px 0 0;
}
```

#### Module
> Module 是页面中更离散的组件，每个模块都应该设计为独立的组件。这样，页面将更加灵活。

```
.module > h2 {
    padding: 5px;
}

.module span {
    padding: 5px;
}
```

#### State
>State通常定义元素不同状态下的样式，主要应用于与布局规则相同的元素，或者应用于与基本模块类相同的元素。
```
<div>
    <div class="tab"></div>
    <div class="tab"></div>
    <div class="tab is-tab-active"></div>
    <div class="tab"></div>
</div>

.tab {
    background-color: purple;
    color: white;
}

.is-tab-active {
    background-color: white;
    color: black;
}
```

#### Theme
> Theme 是页面主视觉的定义。

```
.mod {
    border-color: blue;
    color:red;
}
```


### BEM命名法
BEM 即 Block、Element、Modifier 的缩写，这是一种 class 的命名技巧。使用 BEM命名法可以有效的提升CSS可读性，同时在多人协作开发下也可以避免命名冲突的问题。

**Block**是页面中独立存在的区块，可以在不同场合下被重用。每个页面都可以看做是多个Block组成。

**Element**是构成Block的元素，只有在对应Block内部才具有意义，是依赖于Block的存在。

**Modifier**是描述Block或Element的属性或状态。同一Block或Element可以有多个Modifier。

不同 Block 和 Element 用`__`两个底线区隔开来，不同的 Modifier 则用`--`两个 dash 区隔。至于`-`一个 dash 则表示这个 class 不依赖任何 Block 或 Element，是个独立的存在。举个例子：

```
.box{}
.box__title{}
.box__title--active{}
.box__content{}

```

### 总结
任一种理论都只是对解决css编写、维护问题的一种尝试，具体使用时，还需结合业务多加思考。

### 参考
>[CSS设计模式：OOCSS 和 SMACSS](https://segmentfault.com/a/1190000000389838)
[编写可维护的CSS](https://segmentfault.com/a/1190000000388784)