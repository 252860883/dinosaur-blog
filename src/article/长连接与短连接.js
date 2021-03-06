import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"长连接与短连接"},{"level":"h4","title":"短连接"},{"level":"h4","title":"长连接"},{"level":"h3","title":"TCP连接"},{"level":"h3","title":"优缺点比较"},{"level":"h3","title":"适用场景"},{"level":"h3","title":"HTTP2.0 多路复用"}]
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
<div className="title-content"><h1 className="title">HTTP的长连接与短连接</h1></div>
<h3 id='长连接与短连接'>长连接与短连接</h3>

<blockquote>
  <p>Http的长连接（持久连接）与短连接（非持久连接）本质上是TCP的长连接与短连接。因为Http是应用层协议，传输层是TCP协议，网络层是IP协议。</p>
</blockquote>

<p><img src="http://wx2.sinaimg.cn/large/a73bc6a1ly1g4zr82f57bj20q40ivabo.jpg" alt="image" title="" /></p>

<h4 id='短连接'>短连接</h4>

<p>浏览器每发起一次Http操作就建立一次连接，收到服务器响应就会立即中断此次连接。这样 <code>连接-&gt;数据传输-&gt;连接关闭</code> 的过程就是<strong>短连接</strong>。</p>

<h4 id='长连接'>长连接</h4>

<p>我们都知道 Http 是无状态的，但是无状态并不代表就不能保持TCP连接，在  Http1.0 通过设置 <code>Connection:keep-alive</code> 可以进行长连接，在Http1.1默认连接都是长连接，客户端会在长连接上持久发送请求而无需再进行额外的TCP连接，如果想断开此次连接则设置 <code>Connection:close</code>。</p>

<p><strong>长连接过程：</strong></p>

<ol>
<li>客户端发出带有包含一个header：<code>Connection:keep-alive</code> 的请求，或者是http1.1请求；</li>
<li>服务端接收到这个请求后,根据http1.1或者 <code>Connection:keep-alive</code> 判断出这是一个长连接,就会在response的header中也增加 <code>Connection:keep-alive</code> ,同是不会关闭已建立的tcp连接；</li>
<li>客户端收到服务端的response后,发现其中包含 <code>Connection:keep-alive</code>，就认为是一个长连接，不关闭这个连接，并用该连接再发送request。</li>
</ol>

<p>Keep-Alive不会永久保持连接，它有一个保持时间，可以在不同的服务器软件（如Apache）中设定这个时间。如果在设定时间内没有任何动作，则服务器会向客服端发送一个探测报文段。</p>

<h3 id='TCP连接'>TCP连接</h3>

<p>既然提到了TCP，那就再来回顾下三次握手策略，TCP传输和四次挥手策略。</p>

<p>为了准确无误的将数据送达目标，TCP会进行三次握手策略：<br></br><img src="http://wx3.sinaimg.cn/large/a73bc6a1ly1g4zorlpeylj20gr0bpgmf.jpg" alt="image" title="" /></p>

<p>TCP传输数据阶段,为了准确传输，发送方传输数据后，接收方会返回一个ack：<br></br><img src="http://wx4.sinaimg.cn/large/a73bc6a1ly1g4zorm62w3j20gk0b6dh1.jpg" alt="image" title="" /></p>

<p>建立一个连接需要三次握手，而终止一个连接要经过四次握手，由于TCP连接是全双工的，因此每个方向都必须单独进行关闭。这原则是当一方完成它的数据发送任务后就能发送一个FIN来终止这个方向的连接。收到一个 FIN只意味着这一方向上没有数据流动，一个TCP连接在收到一个FIN后仍能发送数据。</p>

<p><img src="http://wx1.sinaimg.cn/large/a73bc6a1ly1g4zorn86aij20gq0dm402.jpg" alt="image" title="" /><br></br>上面一个特殊的状态 <code>time-wait</code> 它是主动关闭的一方在回复完对方的挥手后进入的一个长期状态,这个状态持续 <strong>2MSL</strong>。</p>

<blockquote>
  <p>Maximum Segment Lifetime，译为“报文最大生存时间”。RFC 793中规定MSL为2分钟，实际应用中常用的是30秒，1分钟和2分钟等</p>
</blockquote>

<p>为什么时间是 2MSL 呢？ 等待2MSL时间主要目的是怕最后一个ACK包对方没收到，那么对方在超时后将重发第三次握手的FIN包，主动关闭端接到重发的FIN包后可以再发一个ACK应答包。在TIME_WAIT状态时两端的端口不能使用，要等到2MSL时间结束才可继续使用。</p>

<h3 id='优缺点比较'>优缺点比较</h3>

<p><strong>长连接</strong>可以省去较多的TCP建立和关闭的操作，减少浪费，节约时间。但是其存活功能的探测周期太长，一般情况下 client不会主动关闭长连接，随着客户端数量增加，服务器压力会增大，这时候需要采取一定措施，比如关闭一些没有动作的长连接，限制最大连接数等等。</p>

<p><strong>短连接</strong>对于服务器来说管理较为简单，存在的连接都是有用的连接，不需要额外的控制手段。但如果客户请求频繁，将在TCP的建立和关闭操作上浪费时间和带宽。</p>

<h3 id='适用场景'>适用场景</h3>

<ol>
<li>长连接多用于操作频繁，点对点的通讯，而且连接数不能太多情况，比如：数据库的连接。</li>
<li>而像WEB网站的http服务一般都用短链接，因为长连接对于服务端来说会耗费一定的资源。并发量大，但每个用户无需频繁操作情况下需用短连好。</li>
</ol>

<h3 id='HTTP2.0 多路复用'>HTTP2.0 多路复用</h3>

<p>当我们使用长连接以后，在TCP连接和断开的开销上有所改善，但是仍然不可避免一些效率上的问题：<br></br><strong>串行的文件传输</strong>，当请求a文件时，b文件只能等待，等待a连接到服务器、服务器处理文件、服务器返回文件，这三个步骤。所有如果我们有很多文件要处理，只能一个个的排队，这称为"队头堵塞"（Head-of-line blocking）。<br></br><strong>连接过多</strong>，我们假设Apache设置了最大并发数为300，因为浏览器限制，浏览器发起的最大请求数为6，也就是服务器能承载的最高并发为50，当第51个人访问的时候只能等待前者请求处理结束。</p>

<p>HTTP2.0的<strong>多路复用</strong>就是解决了以上的问题。在 HTTP2.0 中，有两个非常重要的概念，分别是帧（frame）和流（stream）。 帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。 多路复用，就是在一个 TCP 连接中可以存在多条流。 简单的说就是，在一个连接里，客户端和浏览器都可以同时发送多个请求或回应（通过帧中的标识知道属于哪个请求），而且不用按照顺序一一对应。</p>
</div>
            </Fragment>
        )
    }
}