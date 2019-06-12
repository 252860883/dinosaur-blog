import React from 'react'
import '../style/main.scss'
import MainPic3D from '../components/pic3D'

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="article">
<div className="title">动手实现 websocket</div>
<hr />

<p>title: 动手实现前后端 websocket 通信<br></br>date: 2019-04-09 15:24:20</p>

<h2>tags: [html5,nodejs]</h2>

<p>毕设做的是一个校园约自习室网站，为了增强其互动性，我决定加入聊天系统来实现学生和管理员之间的联系。提到实时聊天，第一时间肯定联想到H5新加入的 WebSocket 了，WebSocket 作为一种通信协议，属于服务器推送技术的一种，其他的还有 短轮询、长轮询、Server-sent Events（SSE）等。</p>

<h3>服务器推送技术</h3>

<ol>
<li><strong>短轮询</strong> 就是隔段时间请求 ajax 请求，这样只能傻瓜式的循环不仅会占用较多的资源和请求，也不能做到实时推送，但是兼容性很好。</li>
<li><strong>长轮询</strong> 在短轮询的基础上做了升级，在没有更新的时候不会再返回空响应，而且把连接保持到有更新的时候再返回响应信息并且关闭连接。虽然对比短轮询有了进步但弊端仍然是很明显的。</li>
<li><strong>Server-sent Events（SSE）</strong> 与长轮询类似，区别是更新后不会断开连接，这样服务器可以继续单向向客户端发送消息。然鹅，IE 11 及以下的的浏览器都不支持。</li>
<li><strong>WebSocket</strong> 是HTML5开始提供的一种浏览器与服务器间进行全双工通讯的网络技术。在WebSocket API中，浏览器和服务器只需要要做一个握手(handshaking)的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送。</li>
</ol>

<blockquote>
  <p>特点：<br></br>1.建立在TCP之上，服务器容易实现<br></br>2.良好兼容性，握手采用HTTP协议不容易被屏蔽，且能通过各种代理服务器<br></br>3.支持二进制数据格式，数据轻量，性能开销小，通信高效<br></br>4.没有同源限制，客户端可以与任意服务器连接通信<br></br>5.无需频繁创建/销毁 TCP 请求，减少网络带宽资源占用，节省服务器资源<br></br>6.WebSocket由事件驱动，一旦连接建立，通过监听事件可以处理到来的数据和改变的连接状态，数据都以帧序列的形式传输。服务端发送数据后，消息和事件会异步到达。<br></br>7.没有超时处理</p>
</blockquote>

<h3>WebSocket 通信过程</h3>

<p>Websocket区别 Http 协议是一个持久化的新协议，但是为了兼容现有浏览器的握手规范而借用了HTTP的协议来完成一部分握手。WebSocket是纯事件驱动的，并遵循异步编程模型，只需要对WebSocket对象增加回调函数就可以监听事件，一旦连接建立可以通过监听事件增加回调函数来处理数据。</p>

<p>当Web应用程序调用<code>new WebSocket(url)</code>接口时，客户端就开始了与地址为url的WebServer建立握手连接的过程。<br></br>1. 客户端与服务器通过TCP三次握手建立连接，如果连接失败，客户端会收到报错信息。<br></br>2. TCP建立连接后，客户端通过HTTP协议传送WebSocket支持的版本号、协议的字版本号、原始地址、主机地址等等一些列字段给服务器端。</p>

<pre><code><span></span>
<span>    GET /chat HTTP/1.1</span>
<span>    Host: server.example.com</span>
<span>    Upgrade: websocket</span>
<span>    Connection: Upgrade</span>
<span>    Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==</span>
<span>    Sec-WebSocket-Protocol: chat, superchat</span>
<span>    Sec-WebSocket-Version: 13</span>
<span>    Origin: http://example.com</span>
<span>    </span>
</code></pre>

<blockquote>
  <p><strong>请求报文</strong><br></br>    <code>Connection: Upgrade</code> 浏览器通知服务器，如果可以，就升级到webSocket协议<br></br>    <code>Origin</code> 用于验证浏览器域名是否在服务器许可的范围内<br></br>    <code>Sec-WebSocket-Key</code> 握手时所需要的密钥<br></br>    <code>Sec-WebSocket-Protocol</code> 是一个用户定义的字符串，用来区分同URL下，不同的服务所需要的协议。<br></br>    <code>Sec-WebSocket-Version</code> 协议版本</p>
</blockquote>

<ol>
<li>服务器收到客户端发送的握手请求信息，如果数据正确匹配则接受此次握手连接，并通过HTTP协议传送回复数据包。
</li>
</ol>

<pre><code><span></span>
<span>    HTTP/1.1 101 Switching Protocols</span>
<span>    Upgrade: websocket</span>
<span>    Connection: Upgrade</span>
<span>    Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=</span>
<span>    Sec-WebSocket-Protocol: chat</span>
<span>    Sec-WebSocket-Origin: null</span>
<span>    Sec-WebSocket-Location: ws://example.com/</span>
<span>    </span>
</code></pre>

<blockquote>
  <p><strong>回复报文</strong><br></br>    <code>Connection: Upgrade</code> 通知浏览器已经切换协议<br></br>    <code>Sec-WebSocket-Accept</code> 经过服务器确认并且加密过后的密钥<br></br>    <code>Sec-WebSocket-Location</code> 进行webscoket通信的网址<br></br>    <code>Sec-WebSocket-Protocol</code> 使用的协议版本</p>
</blockquote>

<ol>
<li>客户端收到服务端回复的数据包后，如果内容、格式都没问题，就表示此次连接成功，触发<code>onopen</code>事件，此时客户端就可以通过 <code>send()</code> 来向服务器发送数据了，如果过程出错可以通过 <code>onerror</code>获取报错信息。</li>
</ol>

<h3>socket.io</h3>

<p>由于我的项目后端采用的是 nodjs 环境开发，所以这里引入 <code>socket.io</code>。<br></br>Socket.io将数据传输部分独立出来形成engine.io，engine.io对WebSocket和AJAX轮询进行了封装，形成了一套API，屏蔽了细节差异和兼容性问题，实现了跨浏览器/跨设备进行双向数据通信。Socket.io实际上是WebSocket的父集，Socket.io封装了WebSocket和轮询等方法，会根据情况选择方法来进行通讯。</p>
</div>
        )
    }
}