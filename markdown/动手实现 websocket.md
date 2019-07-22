---
title: 动手实现前后端 websocket 通信
date: 2019-04-09 15:24:20
tags: [html5,nodejs]
---

毕设做的是一个校园约自习室网站，为了增强其互动性，我决定加入聊天系统来实现学生和管理员之间的联系。提到实时聊天，第一时间肯定联想到H5新加入的 WebSocket 了，WebSocket 作为一种通信协议，属于服务器推送技术的一种，其他的还有 短轮询、长轮询、Server-sent Events（SSE）等。
### 服务器推送技术
1. **短轮询** 就是隔段时间请求 ajax 请求，这样只能傻瓜式的循环不仅会占用较多的资源和请求，也不能做到实时推送，但是兼容性很好。
2. **长轮询** 在短轮询的基础上做了升级，在没有更新的时候不会再返回空响应，而且把连接保持到有更新的时候再返回响应信息并且关闭连接。虽然对比短轮询有了进步但弊端仍然是很明显的。
3. **Server-sent Events（SSE）** 与长轮询类似，区别是更新后不会断开连接，这样服务器可以继续单向向客户端发送消息。然鹅，IE 11 及以下的的浏览器都不支持。
4. **WebSocket** 是HTML5开始提供的一种浏览器与服务器间进行全双工通讯的网络技术。在WebSocket API中，浏览器和服务器只需要要做一个握手(handshaking)的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送。

>特点：
1.建立在TCP之上，服务器容易实现
2.良好兼容性，握手采用HTTP协议不容易被屏蔽，且能通过各种代理服务器
3.支持二进制数据格式，数据轻量，性能开销小，通信高效
4.没有同源限制，客户端可以与任意服务器连接通信
5.无需频繁创建/销毁 TCP 请求，减少网络带宽资源占用，节省服务器资源
6.WebSocket由事件驱动，一旦连接建立，通过监听事件可以处理到来的数据和改变的连接状态，数据都以帧序列的形式传输。服务端发送数据后，消息和事件会异步到达。
7.没有超时处理

### WebSocket 通信过程
Websocket区别 Http 协议是一个持久化的新协议，但是为了兼容现有浏览器的握手规范而借用了HTTP的协议来完成一部分握手。WebSocket是纯事件驱动的，并遵循异步编程模型，只需要对WebSocket对象增加回调函数就可以监听事件，一旦连接建立可以通过监听事件增加回调函数来处理数据。

为什么WebSocket连接可以实现全双工通信而HTTP连接不行呢？实际上HTTP协议是建立在TCP协议之上的，TCP协议本身就实现了全双工通信，但是HTTP协议的请求－应答机制限制了全双工通信。WebSocket连接建立以后，其实只是简单规定了一下：接下来，咱们通信就不使用HTTP协议了，直接互相发数据吧。

当Web应用程序调用`new WebSocket(url)`接口时，客户端就开始了与地址为url的WebServer建立握手连接的过程。
1. 客户端与服务器通过TCP三次握手建立连接，如果连接失败，客户端会收到报错信息。
2. TCP建立连接后，客户端通过HTTP协议传送WebSocket支持的版本号、协议的字版本号、原始地址、主机地址等等一些列字段给服务器端。

    ```
    GET ws://localhost:3000/ws/chat HTTP/1.1
    Host: server.example.com
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
    Sec-WebSocket-Protocol: chat, superchat
    Sec-WebSocket-Version: 13
    Origin: http://example.com
    ```
    >**请求报文**
    `GET` 请求的地址不是类似`/path/`格式，而是以`ws:`开头的
    `Connection: Upgrade` 浏览器通知服务器，如果可以，就升级到webSocket协议
    `Origin` 用于验证浏览器域名是否在服务器许可的范围内
    `Sec-WebSocket-Key` 握手时所需要的密钥
    `Sec-WebSocket-Protocol` 是一个用户定义的字符串，用来区分同URL下，不同的服务所需要的协议。
    `Sec-WebSocket-Version` 协议版本

3. 服务器收到客户端发送的握手请求信息，如果数据正确匹配则接受此次握手连接，并通过HTTP协议传送回复数据包。
    ```
    HTTP/1.1 101 Switching Protocols
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
    Sec-WebSocket-Protocol: chat
    Sec-WebSocket-Origin: null
    Sec-WebSocket-Location: ws://example.com/
    ```
>**回复报文**
该响应代码`101`表示本次连接的HTTP协议即将被更改，更改后的协议就是`Upgrade: websocket`指定的WebSocket协议。
`Connection: Upgrade` 通知浏览器已经切换协议
`Sec-WebSocket-Accept` 经过服务器确认并且加密过后的密钥
`Sec-WebSocket-Location` 进行webscoket通信的网址
`Sec-WebSocket-Protocol` 使用的协议版本

4. 客户端收到服务端回复的数据包后，如果内容、格式都没问题，就表示此次连接成功，触发`onopen`事件，此时客户端就可以通过 `send()` 来向服务器发送数据了，同时如果过程出错可以通过 `onerror`获取报错信息。

客户端发起一个 WebSocket连接 示例：

```
// 创建一个 WebSocket 连接
const socket = new WebSocket('ws://localhost:8080');

// 连接建立回调事件
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// 接受服务器传回的数据
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});
```

### 实践
首先我们在服务器创建 WebSocket，nodejs本身是不支持WebSocket协议的，所以这里我们通过 `npm install ws` 指令引入 `ws模块`来实现：

```
// 导入WebSocket模块:
const WebSocketServer = require('ws').Server;
// 实例化:
const wss = new WebSocketServer({ port: 3000 });
// connection 连接建立后执行回调
wss.on('connection', function (ws) {
    console.log(`[SERVER] connection()`);
    // message 接受客户端发送的消息
    ws.on('message', function (message) {
        console.log(`[SERVER] Received: ${message}`);
        // ws.send 向客户端发送消息
        ws.send(`ECHO: ${message}`, (err) => {
            if (err) {
                console.log(`[SERVER] error: ${err}`);
            }
        });
    })
});
```

客户端配置 WebSocket 如下：

```
// 打开一个WebSocket:
var ws = new WebSocket('ws://localhost:3000/test');
// 响应onmessage事件:
ws.onmessage = function(msg) { console.log(msg); };
// 给服务器发送一个字符串:
ws.send('Hello!');
```






