import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"AJAX"},{"level":"h3","title":"$.ajax()"},{"level":"h3","title":"Axios"},{"level":"h3","title":"Fetch"},{"level":"h3","title":"总结"}]
        }
    }
    componentWillMount(){
    }
    componentDidMount() {
    }
    render() {
        return (
            <Fragment>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">聊聊ajax、fetch、axios</h1></div>
<blockquote>
  <p>关于接口请求方法，近几年来有些变化，从一开始原生JS <code>AJAX</code> 到 JQuery 的 <code>$.ajax()</code>,再到 <code>Fetch</code> 和 vue 推荐的 <code>Axios</code>，但是否真正了解到每一个方法的优劣与使用场景了吗？</p>
</blockquote>

<h3 id='AJAX'>AJAX</h3>

<p>在前几年的时候，AJAX 可谓是前端一大考点啊，各路关于前端招聘的简介里，怎么也得让 AJAX 拥有姓名。AJAX（Asynchronous JavaScript and XML）异步的 Javascript 和 XML，核心就是使用 XMLHttpRequest 对象（对于旧版本浏览器例如 IE5、IE6则使用 ActiveXObject 对象）。<br></br>AJAX进行后端数据请求主要分一下几步：<br></br>1.创建 XMLHttpRequest 对象<br></br>2.进行 get 请求<br></br>3.利用 readyState 对象的 onreadystatechange 事件进行后续DOM或其他操作</p>

<p>具体实现见以下代码：</p>

<pre><code><span></span>
<span>// 1.创建 XMLHttpRequest 对象</span>
<span></span>
<span>var xmlhttp;</span>
<span>if(window.XMLHttpRequest){'{'}</span>
<span>    //IE7+,Firefox,Chrome,Opera,Safari浏览器执行代码</span>
<span>    xmlhttp=new XMLHttpRequest();</span>
<span>}else{'{'}</span>
<span>    //IE6,IE5浏览器执行代码</span>
<span>    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");</span>
<span>}</span>
<span></span>
<span>// 2.进行 get 请求</span>
<span></span>
<span>xmlhttp.open("GET","/ajax/demo_get?t="+Math.random(),true);</span>
<span>xmlhttp.send();</span>
<span></span>
<span>// 3.readyState </span>
<span>// XMLHttpRequest 对象通过 readyState 对象存储状态信息</span>
<span>// 当 readyState 状态改变时触发 onreadystatechange 事件。</span>
<span></span>
<span>xmlhttp.onreadystatechange=function(){'{'}</span>
<span>    if(xmlhttp.readyState==4 &amp;&amp; xmlhttp.status==200){'{'}</span>
<span>        var responseData = xmlhttp.responseText;</span>
<span>    }</span>
<span>}</span>
<span></span>
</code></pre>

<p>像上面这样使用 XMLHttpRequest 是来进行 ajax 请求是非常痛苦的，每做一个请求都要写这么长的代码！所以后来有许多的库都对其进行的封装，比如我们最常见的 JQuery。</p>

<h3 id='$.ajax()'>$.ajax()</h3>

<p>JQuery ajax 是对原生XHR的封装，除此以外还增添了对JSONP的支持，相较于直接使用ajax的“长篇大论”，直接一个方法就可以搞定请求了:</p>

<pre><code><span></span>
<span>$.ajax({'{'}</span>
<span>   type: 'POST',</span>
<span>   url: url,</span>
<span>   data: data,</span>
<span>   dataType: dataType,</span>
<span>   success: function () {'{'}},</span>
<span>   error: function () {'{'}}</span>
<span>});</span>
<span></span>
</code></pre>

<p>虽然JQuery便捷了开发，但依旧受限于 XHR 的缺点。同时对基于事件的异步做的不好，而且如果我们只是使用 <code>$.ajax()</code> 这个方法还需要将整个 Jquery 文件引入。总之，如果不是在 JQuery 项目，建议还是不要使用此方法。</p>

<h3 id='Axios'>Axios</h3>

<p>自从尤大开始停止维护 vue-resource 并推荐大家使用 axios 之后，axios 逐渐被大家所认识。axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，其实本质上底层也是通过 XHR 来实现的。尤大推荐自然有他的原因，axios 使用 Promise 封装，满足了现在的 ES6 的规范，同时还增加了很多的方法和功能，具体如下：<br></br>1.拦截请求和响应<br></br>2.转换请求和响应数据<br></br>3.支持 Promise API<br></br>4.提供了一些并发操作的方法<br></br>5.自动转换JSON数据<br></br>6.客户端支持防范XSRF<br></br>7.支持取消请求<br></br>8.从node.js发出http请求</p>

<pre><code><span></span>
<span>&lt;!-- 基础示例 --&gt;</span>
<span></span>
<span>const axios = require('axios');</span>
<span></span>
<span>axios.get('/user?ID=12345')</span>
<span>  .then(function (response) {'{'}</span>
<span>    // handle success</span>
<span>    console.log(response);</span>
<span>  })</span>
<span>  .catch(function (error) {'{'}</span>
<span>    // handle error</span>
<span>    console.log(error);</span>
<span>  })</span>
<span></span>
<span>&lt;!-- 拦截器 在请求或响应被 then 或 catch 处理前拦截它们--&gt;</span>
<span></span>
<span>// 添加请求拦截器</span>
<span>axios.interceptors.request.use(function (config) {'{'}</span>
<span>    // 在发送请求之前做些什么</span>
<span>    return config;</span>
<span>  }, function (error) {'{'}</span>
<span>    // 对请求错误做些什么</span>
<span>    return Promise.reject(error);</span>
<span>  });</span>
<span></span>
<span>// 添加响应拦截器</span>
<span>axios.interceptors.response.use(function (response) {'{'}</span>
<span>    // 对响应数据做点什么</span>
<span>    return response;</span>
<span>  }, function (error) {'{'}</span>
<span>    // 对响应错误做点什么</span>
<span>    return Promise.reject(error);</span>
<span>  });</span>
<span></span>
<span>&lt;!-- 并发处理 --&gt;</span>
<span></span>
<span>axios.all([getRequest1(), getRequest2()])</span>
<span>  .then(axios.spread(function (acct, perms) {'{'}</span>
<span>    // Both requests are now complete</span>
<span>  }));</span>
<span></span>
<span></span>
</code></pre>

<p>更多关于 axios 的使用方法，直接访问 <a target="_blank" href="https://github.com/axios/axios">github</a> 查阅吧。</p>

<h3 id='Fetch'>Fetch</h3>

<p>Fetch API 已经作为现代浏览器中异步网络请求的标准方法，其使用 Promise 作为基本构造要素。Fetch 提供了对 Request 和 Response （以及其他与网络请求有关的）对象的通用定义。发送请求或者获取资源，需要使用 WindowOrWorkerGlobalScope.fetch 方法，它在Window 和 WorkerGlobalScope接口上，因此在几乎所有环境中都可以用这个方法获取到资源。无论是service workers、Cache API、又或者是其他处理请求和响应的方式。</p>

<pre><code><span></span>
<span>fetch(url, {'{'}</span>
<span>  method: "POST",</span>
<span>  body: JSON.stringify(data),</span>
<span>  headers: {'{'}</span>
<span>    "Content-Type": "application/json"</span>
<span>  },</span>
<span>  credentials: "same-origin"</span>
<span>}).then(function(response) {'{'}</span>
<span>  response.status     //=&gt; number 100–599</span>
<span>  response.statusText //=&gt; String</span>
<span>  response.headers    //=&gt; Headers</span>
<span>  response.url        //=&gt; String</span>
<span>  return response.text() // .text() 或者 .json() 可以获得响应体，并返回一个 promise 对象。</span>
<span>}, function(error) {'{'}</span>
<span>  error.message //=&gt; String</span>
<span>})</span>
<span></span>
</code></pre>

<p>Fetch 用途这么广泛，既可以在 window 又可以在 service worker ，但是 Fetch 现在<strong>没有办法终止一个请求，并且不能监测上传进度</strong>。如果我们需要这些功能可以选择 axios。不过已经有些方案来解决这些问题了。</p>

<p>我们在使用 Fetch 时可以引入 <code>AbortController</code> 和 <code>AbortSignal</code>，这个通用的API来通知中止事件:</p>

<pre><code><span></span>
<span>const controller = new AbortController()</span>
<span>const signal = controller.signal</span>
<span>fetch('./file.json', {'{'} signal })</span>
<span></span>
<span>// 5s后终止请求</span>
<span>setTimeout(() =&gt; controller.abort(), 5 * 1000)</span>
<span></span>
<span></span>
</code></pre>

<h3 id='总结'>总结</h3>

<ol>
<li>ajax 是通过 XHR 实现与服务器的异步请求</li>
<li>$.ajax() 是对原生的 ajax 进行的封装，简化了代码编写</li>
<li>aixos 也是对 XHR 的进一步封装，支持 Promise API, 同时还增加了并发请求、拦截请求和响应、转换请求响应数据、取消请求等功能。</li>
<li>fetch 是 ES规范中的语法，与 XHR无关，几乎所有环境中都可以用，但原生的 Fetch 不能终止请求也不能检测上传进度。</li>
</ol>

<blockquote>
  <p>参考:<br></br><a target="_blank" href="https://www.jianshu.com/p/8bc48f8fde75">ajax和axios、fetch的区别</a><br></br><a target="_blank" href="https://mp.weixin.qq.com/s/qM_tvb2-A__hdjjgnS1y6w">认识 Fetch API</a></p>
</blockquote>
</div>
            </Fragment>
        )
    }
}