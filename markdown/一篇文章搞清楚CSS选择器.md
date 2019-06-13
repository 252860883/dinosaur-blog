---
title: 一些常用但记不住的CSS知识点
date: 2019-02-21 16:10:30
tags: CSS
top: true
---

### 1.易混淆的组合选择器

前提，我们先构建一个Html：

```
// html
<div>
  <span>1</span>
  <span class='second'>2</span>
  <span>
      3
      <span>3-1</span>
  </span>
  <span>4</span>
</div>
```
#### 后代选择器： 空格符 与 > 

**空格符**我们再熟悉不过了。`A B` 表示元素 A 的任意一个子元素 B 以及所有任意后代节点。
```
// css

div span {
  border:1px solid red
}
```

效果如下：
![image](http://wx4.sinaimg.cn/mw690/a73bc6a1ly1g0ezl3xpyij209m02kjra.jpg)

与空格符的区别是**>符**只作用于直系后代。即 `A B` 表示元素 A 的任一元素 B，而没有B的后代节点。
举个例子：
```
// css

div > span {
  border:1px solid red;
}
```

效果如下：
![image](http://wx2.sinaimg.cn/mw690/a73bc6a1ly1g0ezl496zvj209e02c0sn.jpg)

#### 兄弟选择器： + 与 ～

`A + B` 表示元素A的下一个兄弟元素B。
```
// css

.second + .last {
  border:1px solid red;
}
```

效果如下：
![image](http://wx2.sinaimg.cn/mw690/a73bc6a1ly1g0igw2w8foj209k02cwee.jpg)

`A ~ B`表示A元素后面的有共同父元素的兄弟元素B。与`A + B`的区别是可以作用于多个B元素。
```
// css

.second ~ .last {
  border:1px solid red;
}
```

效果如下：
![image](http://wx2.sinaimg.cn/mw690/a73bc6a1ly1g0igw37vqhj214c09swfe.jpg)


#### 总结
1. `空格`与`>`符都作用于后代节点元素，区别是`空格`符作用于所有子元素，而`>`符只作用于第一层子元素。
2. `+`与`～`符都作用于后面的兄弟节点元素，区别是`+`只作用于相邻第一个兄弟元素，而`～`作用于多个兄弟元素。


### 2. CSS函数

#### attr()
> attr()函数返回选择元素的属性值

如下操作可以使每个 item 元素的伪类中展示其对应的 value 值。
```
<style>
.item::after {
  content: attr(value);
}
</style>
<body>
  <div class="item" value="red"></div>
  <div class="item" value="green"></div>
</body>

```

#### calc()
>calc() 函数用于动态计算长度值,支持四则运算

在不考虑兼容性的情况下，`calc()`可以非常好的用在移动端rem自适应布局上，比如我们拿到设计稿页面宽度是 375px，默认字体大小是 16px,那我们就可以设置根结点元素的 font-size 如下：
```
html{
  font-size:calc((100vw / 375) * 16);
}
```
这样，根节点元素会根据屏幕宽度自动计算出应该的字体大小，这样我们就可以省去媒体查询的一大堆代码！当然这样只是对于适配要求不高的页面可以取巧，如果适配要求高的话还是要酌情选择。

#### 自定义变量 var()
>`var( <自定义属性名> [, <默认值 ]? )`,如果我们使用的变量没有定义，则使用后面的值作为元素的属性值。

```
.box {
  --bg: #369;
}
body {
  background-color: var(--bg, #cd0000);
}
```
