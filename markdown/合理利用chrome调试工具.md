---
title: 【学习整理】你不知道的Chrome调试工具技巧
date: 2019-03-07 11:16:44
tags:
top:
---
> 你不知道的Chrome调试工具技巧系列文章由作者[Tomek Sułkowski](https://twitter.com/sulco)发布在 medium 上的一个系列。由[dendoink](https://juejin.im/user/585a2f52128fe10069ba1b95/activities)授权作中文翻译，这篇博客整理一些不是很了解但非常有用的 Chrome调试技巧。

### console 中使用 $

* **【 $0 $1 $2 】**在 Chrome 的 Elements 面板中，`$0` 是当前我们选中的 html 节点的引用。`$1` 是上一次选中的节点，`$2` 是上上次引用，以此类推。
* **【 $$ 】** `$$` 类似于方法 `document.QuerySelectorAll` ,它将返回一个 Node list.
* **【 $_ 】** `$_` 是对上次执行操作的取直。
* **【 $i 】** 安装插件[Console Importer](https://chrome.google.com/webstore/detail/console-importer/hgajpakhafplebkdljleajgbpdmplhie/related) 后，可以使用 `$i` 来引入一些 npm 库到 console中来使。

![image](http://wx1.sinaimg.cn/mw690/a73bc6a1ly1g0ui6lq27cj21hc0u0jzc.jpg)

