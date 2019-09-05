---
title: 每天一点CSS小技巧（不定期更新中...）
date: 2019-02-21 16:10:30
tags: CSS
top: true
---

### 1.💎易混淆的组合选择器

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


### 2.💎CSS函数

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


### 3.💎实现条纹效果

![image](http://wx4.sinaimg.cn/mw690/a73bc6a1ly1g5t725g9vcj20l40eoaao.jpg)

```
<!-- 方法1 -->
.stripe{
    width: 100%;
    height: 20px;
    background: linear-gradient(90deg,red,red 50%,black 50%,black);
    background-size: 5%;
}
<!-- 方法2 -->
.stripe2{
    width: 100%;
    height: 20px;
    background: repeating-linear-gradient(90deg,red,red 5%,black 5%,black 10%);
}
```

### 4.💎配合 outline 实现双层描边

![image](http://wx1.sinaimg.cn/mw690/a73bc6a1ly1g5t724z3hjj20kv0ejgm4.jpg)

```
.box{
    width: 100px;
    height: 100px;
    border: 10px solid red;
    outline: 10px solid green;
}
.box2{
    width: 100px;
    height: 100px;
    border: 10px solid red;
    outline: 10px dashed green;
    /* 设置 outline-offset 属性 设置位移*/
    outline-offset: -10px; 
}
```


### 5.💎单行文本与多行文本超出部分省略

![image](http://wx2.sinaimg.cn/large/a73bc6a1ly1g5t8h6p9cnj20nb0fewg5.jpg)

```
.overTextHidden {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    /*文字隐藏后添加省略号*/
    white-space: nowrap;
    /*强制不换行*/
}

.overRowsTextHidden {
    width: 200px;
    display: -webkit-box;
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp: 3;
    overflow: hidden;
    word-break: break-all;
    line-height: 20px;
}
```

>注意：多行文本超出省略的方案存在兼容性问题，只适用于 webkit 内核浏览器，并且 `-webkit-box-orient: vertical` 在使用 webpack 打包的时候这段代码会被删除掉，原因是 optimize-css-assets-webpack-plugin 这个插件的问题,所以一定要在其上下加 ` /* autoprefixer: off */` 和 `/* autoprefixer: on */`。


### 6.💎object-fit 设置图片何种比例显示
![image](http://wx3.sinaimg.cn/mw690/a73bc6a1ly1g5t724garjj20p20gudlc.jpg)


```
img {width: 200px;height: 100px;}
.img-1 {height: auto;}
.img-2 {object-fit: fill;}
.img-3 {object-fit: unset;}
.img-4 {object-fit: contain;}
.img-5 {object-fit: scale-down;}
.img-6 {object-fit: cover;}
.img-7 {object-fit: none;}
```

### 7.💎隐藏元素三种方法比较

>常见隐藏dom元素三种方法：display:none；visibility: hidden；opacity: 0；

**结构**
display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间； visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见；opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见

**事件监听**
display:none和visibility: hidden 都不能监听事件；opacity: 0: 可以监听

**继承**
display: none和opacity: 0：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。 visibility: hidden：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式。

**性能**
displaynone : 修改元素会造成文档回流,读屏器不会读取display: none元素内容，性能消耗较大 visibility:hidden: 修改元素只会造成本元素的重绘,性能消耗较少读屏器读取visibility: hidden元素内容 opacity: 0 ： 修改元素会造成重绘，性能消耗较少


### 8.💎1px问题
>移动端过去常出现1px比实际要粗的问题，不过现在大多数的移动端已经无需再解决这种问题。

**伪类 + transform**
```
.border { 
    overflow: hidden; 
    position: relative; 
    border: none!important; 
}
.border:after { 
    content: "";
    display: block;
    position: absolute; 
    left: 0; 
    bottom: 0; 
    width: 100%; 
    height: 1px; 
    background-color: #d4d6d7; 
    transform-origin: 0 0; 
    transform: scaleY(0.5);
}
```

**利用 box-shadow 实现**

```
.border {
  box-shadow: inset 0px -1px 1px -1px #d4d6d7;
}
```

### 9.💎单侧投影

![image](http://wx2.sinaimg.cn/mw690/a73bc6a1ly1g61ln4z61oj20n00evdgf.jpg)

> box-shadow : x轴偏移值 y轴偏移值 模糊半径 扩张半径

这里我们通过将扩张半径的值设置为负值即可实现单侧投影：

```
.box3{
  width: 200px;
  height: 200px;
  border: 2px solid #aaa;
  box-shadow: 0px 17px 15px -5px #aaa;
}
```

### 10.💎清除input默认样式

```
input{
	outline:none
};
input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #aab2bd;
  /* placeholder字体大小  */
  font-size: 12px;
  /* placeholder位置  */
  text-align: right;
}

      input
          border 0
          background none
          outline none
	  -webkit-appearance none
          &:focus
            outline none
            background-color transparent
          &::-webkit-input-placeholder
            color #B0B8C7
            font-weight bold
            
```


### 参考
[你未必知道的49个CSS知识点](https://mp.weixin.qq.com/s/iD8rinWJ_PEI3UZu4-PcMg)



