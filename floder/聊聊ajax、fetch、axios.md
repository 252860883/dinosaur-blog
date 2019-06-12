---
title: 聊聊ajax、fetch、axios
date: 2019-03-16 19:40:09
tags: javascript
top:
---

> 关于接口请求方法，近几年来有些变化，从一开始原生JS `AJAX` 到 JQuery 的 `$.ajax()`,再到 `Fetch` 和 vue 推荐的 `Axios`，但是否真正了解到每一个方法的优劣与使用场景了吗？

### AJAX
在前几年的时候，AJAX 可谓是前端一大考点啊，各路关于前端招聘的简介里，怎么也得让 AJAX 拥有姓名。AJAX（Asynchronous JavaScript and XML）异步的 Javascript 和 XML，核心就是使用 XMLHttpRequest 对象（对于旧版本浏览器例如 IE5、IE6则使用 ActiveXObject 对象）。
AJAX进行后端数据请求主要分一下几步：
1.创建 XMLHttpRequest 对象
2.进行 get 请求
3.利用 readyState 对象的 onreadystatechange 事件进行后续DOM或其他操作

具体实现见以下代码：
```
// 1.创建 XMLHttpRequest 对象

var xmlhttp;
if(window.XMLHttpRequest){
	//IE7+,Firefox,Chrome,Opera,Safari浏览器执行代码
	xmlhttp=new XMLHttpRequest();
}else{
	//IE6,IE5浏览器执行代码
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}

// 2.进行 get 请求

xmlhttp.open("GET","/ajax/demo_get?t="+Math.random(),true);
xmlhttp.send();

// 3.readyState 
// XMLHttpRequest 对象通过 readyState 对象存储状态信息
// 当 readyState 状态改变时触发 onreadystatechange 事件。

xmlhttp.onreadystatechange=function(){
    if(xmlhttp.readyState==4 && xmlhttp.status==200){
        var responseData = xmlhttp.responseText;
    }
}
```

像上面这样使用 XMLHttpRequest 是来进行 ajax 请求是非常痛苦的，每做一个请求都要写这么长的代码！所以后来有许多的库都对其进行的封装，比如我们最常见的 JQuery。

### $.ajax()
JQuery ajax 是对原生XHR的封装，除此以外还增添了对JSONP的支持，相较于直接使用ajax的“长篇大论”，直接一个方法就可以搞定请求了:
```
$.ajax({
   type: 'POST',
   url: url,
   data: data,
   dataType: dataType,
   success: function () {},
   error: function () {}
});
```
虽然JQuery便捷了开发，但依旧受限于 XHR 的缺点。同时对基于事件的异步做的不好，而且如果我们只是使用 `$.ajax()` 这个方法还需要将整个 Jquery 文件引入。总之，如果不是在 JQuery 项目，建议还是不要使用此方法。

### Axios
自从尤大开始停止维护 vue-resource 并推荐大家使用 axios 之后，axios 逐渐被大家所认识。axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，其实本质上底层也是通过 XHR 来实现的。尤大推荐自然有他的原因，axios 使用 Promise 封装，满足了现在的 ES6 的规范，同时还增加了很多的方法和功能，具体如下：
1.拦截请求和响应
2.转换请求和响应数据
3.支持 Promise API
4.提供了一些并发操作的方法
5.自动转换JSON数据
6.客户端支持防范XSRF
7.支持取消请求
8.从node.js发出http请求

```
<!-- 基础示例 -->

const axios = require('axios');

axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

<!-- 拦截器 在请求或响应被 then 或 catch 处理前拦截它们-->

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

<!-- 并发处理 -->

axios.all([getRequest1(), getRequest2()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
  }));

```

更多关于 axios 的使用方法，直接访问 [github](https://github.com/axios/axios) 查阅吧。

### Fetch
Fetch API 已经作为现代浏览器中异步网络请求的标准方法，其使用 Promise 作为基本构造要素。Fetch 提供了对 Request 和 Response （以及其他与网络请求有关的）对象的通用定义。发送请求或者获取资源，需要使用 WindowOrWorkerGlobalScope.fetch 方法，它在Window 和 WorkerGlobalScope接口上，因此在几乎所有环境中都可以用这个方法获取到资源。无论是service workers、Cache API、又或者是其他处理请求和响应的方式。

```
fetch(url, {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json"
  },
  credentials: "same-origin"
}).then(function(response) {
  response.status     //=> number 100–599
  response.statusText //=> String
  response.headers    //=> Headers
  response.url        //=> String
  return response.text() // .text() 或者 .json() 可以获得响应体，并返回一个 promise 对象。
}, function(error) {
  error.message //=> String
})
```
Fetch 用途这么广泛，既可以在 window 又可以在 service worker ，但是 Fetch 现在**没有办法终止一个请求，并且不能监测上传进度**。如果我们需要这些功能可以选择 axios。不过已经有些方案来解决这些问题了。

我们在使用 Fetch 时可以引入 `AbortController` 和 `AbortSignal`，这个通用的API来通知中止事件:

```
const controller = new AbortController()
const signal = controller.signal
fetch('./file.json', { signal })

// 5s后终止请求
setTimeout(() => controller.abort(), 5 * 1000)

```

### 总结
1. ajax 是通过 XHR 实现与服务器的异步请求
2. $.ajax() 是对原生的 ajax 进行的封装，简化了代码编写
3. aixos 也是对 XHR 的进一步封装，支持 Promise API, 同时还增加了并发请求、拦截请求和响应、转换请求响应数据、取消请求等功能。
4. fetch 是 ES规范中的语法，与 XHR无关，几乎所有环境中都可以用，但原生的 Fetch 不能终止请求也不能检测上传进度。


>参考:
>[ajax和axios、fetch的区别](https://www.jianshu.com/p/8bc48f8fde75)
>[认识 Fetch API](https://mp.weixin.qq.com/s/qM_tvb2-A__hdjjgnS1y6w)