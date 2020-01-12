---
title: BFC、IFC、FFC、GFC
date: 2020-01-25 16:35:43
tags: 'css'
top: 
---

> 看到标题有些恍惚，怎么这么多 FC ？是的，我在一次面试的笔试题中看到这多 FC的时候，也有些懵逼了，甚至有点想想吃 KFC 哈哈。可能平时大家最熟悉的是 BFC ，其他的这些牛鬼蛇神都是什么，我们这篇文章就来探讨探讨。

## BFC
我们先来会会老大哥 `BFC`块格式化上下文（Block Formatting Context，BFC）,简单来说就是CSS渲染布局中的一部分，块盒子所在的区域。

1.创建 BFC 方式（常用）：

* 根元素(`<html>`)
* 浮动元素（元素的 float 不是 none）
* 绝对定位元素（元素的 position 为 absolute 或 fixed）
* display 为 inline-block、table相关值、flex、grid 等
* overflow 值不为 visible 的块元素
* contain 值为 layout、content或 paint 的元素

2.BFC 特点：

* 同一个 BFC 内的两个相邻元素会发生 margin 坍塌，两个 BFC 之间则不会发生坍塌
* BFC 区域不会与浮动元素重叠
* BFC 会包含区域内的浮动元素高度
* BFC 在文档流中是一个独立的容器，内外元素不会影响

3.BFC 主要应用场景

* 清除浮动（因为BFC区域计算浮动元素高度）
* 避免 margin 坍塌（因为两个BFC之间不存在margin）

>科普：margin 坍塌（外边距重叠），当块级元素上边距和下边距同时都有设定时只会保留最大的边距。有三种情况会发生外边距重叠：同一层相邻元素之间、没有内容将父元素和后代元素分开（如没有boder、padding、BFC或清除浮动时）、空的块级元素。


## IFC 
`IFC`内联格式化上下文(Inline formatting context)

IFC 特点：

* 元素会在行内从左到右进行排列
* 所有元素会在区域内形成一个线框
* 高度由其包含的行内元素最高的来计算
* 区域内的浮动元素不在行框中并且会压缩行框宽度
* 行框宽度容不下元素时会另起一个行框并继续进行排列、
* 行框元素遵循`text-align`和`vertical-align`

IFC 应用：

* 常用于 水平/垂直居中

## GFC
`GFC` 网格布局格式化上下文(GridLayout Formatting Contexts),通常通过设置`display:grid；`来实现一个GFC区域，可以在该区域内定义行和列。和 table 相比，有更多的属性来控制行行为。

## FFC
`FFC` 自适应格式化上下文(Flex Formatting Contexts),通过设置`display:flex;`或者`display:inline-flex`来生成。其实也就是我们常说的 flex布局，这个就不用多说了。


>参考：
[小科普：到底什么是 BFC、IFC、GFC 和 FFC](https://juejin.im/entry/5938daf7a0bb9f006b2295db)
[Inline formatting context](https://developer.mozilla.org/en-US/docs/Web/CSS/Inline_formatting_context)
[Block formatting context](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context)