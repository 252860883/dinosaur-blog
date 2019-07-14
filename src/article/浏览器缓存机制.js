import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h2","title":"缓存位置"},{"level":"h3","title":"Service Worker"},{"level":"h3","title":"Memory Cache"},{"level":"h3","title":"Disk Cache"},{"level":"h3","title":"Push Cache"},{"level":"h2","title":"缓存过程"},{"level":"h2","title":"缓存策略"},{"level":"h3","title":"强缓存"},{"level":"h4","title":"Cache-Control"},{"level":"h4","title":"Expires"},{"level":"h4","title":"两者对比"},{"level":"h3","title":"协商缓存"},{"level":"h4","title":"Last-Modified"},{"level":"h4","title":"ETag"},{"level":"h4","title":"两者对比"},{"level":"h3","title":"缓存机制"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title">浏览器缓存机制</div>
<h2 id='缓存位置'>缓存位置</h2>

<blockquote>
  <p>从缓存位置上来说分为四种，并且各自有优先级，当依次查找缓存且都没有命中的时候，才会去请求网络。</p>
</blockquote>

<p>Service Worker / Memory Cache / Disk Cache / Push Cache</p>

<h3 id='Service Worker'>Service Worker</h3>

<p>Service Worker 是运行在浏览器后台的独立线程，可以用来实现缓存。由于 Service Worker 中涉及到请求拦截，所以必须是 Https协议的请求。Service Worker 的缓存与浏览器其他内建的缓存机制不同，它可以让我们自由控制缓存哪些文件、如何匹配缓存、如何读取缓存，并且缓存是持续性的。</p>

<p>当 Service Worker 没有命中缓存的时候，我们需要去调用 fetch 函数获取数据。也就是说，如果我们没有在 Service Worker 命中缓存的话，会根据缓存查找优先级去查找数据。但是不管我们是从 Memory Cache 中还是从网络请求中获取的数据，<strong>浏览器都会显示我们是从 Service Worker 中获取的内容</strong>。</p>

<p>Service Worker 实现缓存一般分为三步：<br></br>首先注册 Service Worker；<br></br>监听到 install 事件后缓存需要的文件；<br></br>用户下次请求的时候查询是否存在缓存，存在直接读取缓存文件，否则就去请求数据。</p>

<h3 id='Memory Cache'>Memory Cache</h3>

<p>内存中的缓存。一般网页中已经抓取到的资源会被放入内存缓存，比如已经下载的样式、脚本、图片等等。<br></br>内存缓存虽然读取高效，可是缓存持续性很短，会随着进程的释放而释放。一般我们关闭tab页面以后缓存就会被释放。</p>

<p>内存缓存在缓存资源时并不关心返回资源的HTTP缓存头Cache-Control是什么值，同时资源的匹配也并非仅仅是对URL做匹配，还可能会对Content-Type，CORS等其他特征做校验。</p>

<p>内存缓存中有一块重要的缓存资源是preloader相关指令，例如<code>&lt;link rel="preload" href="sintel-short.mp4"&gt;</code>,<br></br>preload预加载也是前端优化的常用手段。</p>

<h3 id='Disk Cache'>Disk Cache</h3>

<p>硬盘中的缓存。相比内存缓存读取速度更慢，但是没有任何限制，容量和生命周期都更好。它会根据 HTTP Herder 中的字段判断哪些资源需要缓存，哪些资源可以不请求直接使用，哪些资源已经过期需要重新请求。</p>

<p>浏览器对 memory Cache 和 disk cache 存储优先级：<br></br>* 对于大文件来说，大概率是不存储在内存中的，反之优先<br></br>* 当前系统内存使用率高的话，文件优先存储进硬盘</p>

<h3 id='Push Cache'>Push Cache</h3>

<p>推送缓存是Http2.0才有的，当以上的缓存没有命中才会被使用。他只会在 Session 中存在，一旦会话结束就被释放，缓存时间也很短暂。在Chrome浏览器中只有5分钟左右，同时它也并非严格执行HTTP头中的缓存指令。<br></br>关于推送缓存的一特性：<br></br>* 所有的资源都能被推送，并且能够被缓存,但是 Edge 和 Safari 浏览器支持相对比较差<br></br>* 可以推送 no-cache 和 no-store 的资源<br></br>* 一旦连接被关闭，Push Cache 就被释放<br></br>* 多个页面可以使用同一个HTTP/2的连接，也就可以使用同一个Push Cache。这主要还是依赖浏览器的实现而定，出于对性能的考虑，有的浏览器会对相同域名但不同的tab标签使用同一个HTTP连接。<br></br>* Push Cache 中的缓存只能被使用一次<br></br>* 浏览器可以拒绝接受已经存在的资源推送<br></br>* 你可以给其他域名推送资源</p>

<h2 id='缓存过程'>缓存过程</h2>

<p><img src="http://wx2.sinaimg.cn/mw690/a73bc6a1ly1g4wuqkp551j215i0q60vp.jpg" alt="image" title="" /><br></br>1.浏览器每次发起请求，都会先在浏览器缓存中查找该请求的结果以及缓存标识<br></br>2.浏览器每次拿到返回的请求结果都会将该结果和缓存标识存入浏览器缓存中</p>

<p>根据是否需要向服务器重新发起HTTP请求，分为 <strong>强缓存</strong>和*<em>协商缓存</em>*两种缓存策略</p>

<h2 id='缓存策略'>缓存策略</h2>

<p>浏览器缓存策略分为两类：强缓存和协商缓存，缓存策略通过 HTTP 头部 Header 来设置。</p>

<h3 id='强缓存'>强缓存</h3>

<p>不会向服务器发送请求，直接从缓存中读取资源，在chrome控制台的Network选项中可以看到该请求返回200的状态码，并且Size显示from disk cache或from memory cache。强缓存可以通过设置两种 HTTP Header 实现：<code>Expires</code> 和<code>Cache-Control</code>。</p>

<h4 id='Cache-Control'>Cache-Control</h4>

<blockquote>
  <p>可以通过 <code>Cache-Ccontrol</code> 控制缓存的工作机制。</p>
</blockquote>

<p><table><tr><th>  --指令-- </th><th>说明</th></tr><tr><td>public</td><td>所有内容都将被缓存</td></tr><tr><td>private</td><td>所有内容只有客户端会被缓存，中间节点不允许缓存</td></tr><tr><td>no-cache</td><td>客户端缓存内容，使用缓存则需要经过协商缓存来验证决定</td></tr><tr><td>no-store</td><td>所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存</td></tr><tr><td>max-age</td><td>max-age=xxx (xxx is numeric)表示缓存内容将在xxx秒后失效</td></tr><tr><td>s-maxage</td><td>同max-age作用一样，只在代理服务器中生效（比如CDN缓存），如果存在s-maxage，则会覆盖掉max-age和Expires header</td></tr><tr><td>max-stale</td><td>能容忍的最大过期时间，如果没有指定，那么说明浏览器愿意接收任何age的响应</td></tr><tr><td>min-fresh</td><td>能够容忍的最小新鲜度，min-fresh标示了客户端不愿意接受新鲜度不多于当前的age加上min-fresh设定的时间之和的响应。</td></tr></table></p>

<p>可以结合多个指令，实现不同的缓存功能：<br></br><img src="http://wx1.sinaimg.cn/large/a73bc6a1ly1g4zao7elnxj216x0u0dk2.jpg" alt="image" title="" /></p>

<h4 id='Expires'>Expires</h4>

<blockquote>
  <p>指定缓存资源的过期时间()，<code>Expires</code> 是服务器响应实体首部字段。如果在 <code>Cache-Control</code> 响应头设置了 "max-age" 或者 "s-max-age" 指令，那么 <code>Expires</code> 头会被忽略。同时注意，如果修改本地时间打过 <code>Expires</code> 的时间会造成缓存失效。</p>
</blockquote>

<p>示例：</p>

<pre><code><span></span>
<span>Expires: Wed, 21 Oct 2015 07:28:00 GMT</span>
<span></span>
</code></pre>

<h4 id='两者对比'>两者对比</h4>

<p>两者差别不大，区别就在于 <code>Expires</code> 是http1.0的产物，<code>Cache-Control</code> 是http1.1的产物，两者同时存在的话， <code>Cache-Control</code> 优先级高于 <code>Expires</code> ，现阶段 <code>Expires</code> 更多的是用于兼容的写法。</p>

<h3 id='协商缓存'>协商缓存</h3>

<p>协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程。协商返回会有两种状态：</p>

<p>1.协商缓存生效，返回 304 Not Modified 状态码:<br></br><img src="http://wx3.sinaimg.cn/large/a73bc6a1ly1g4zbcvrp6cj21440ouadb.jpg" alt="image" title="" /></p>

<p>2.协商缓存失败，返回 200 状态码：<br></br><img src="http://wx3.sinaimg.cn/large/a73bc6a1ly1g4zbcwso58j216a0p2dj2.jpg" alt="image" title="" /></p>

<p>协商缓存可以通过设置 <code>Last-Modified</code> 和 <code>ETag</code> 实现：</p>

<h4 id='Last-Modified'>Last-Modified</h4>

<blockquote>
  <p>该字段为响应实体的头部字段，指明资源在服务器上最后的修改时间。</p>
</blockquote>

<p><strong>过程：</strong></p>

<ol>
<li>浏览器接受有 Last-Modified 字段的响应后会缓存文件和header。</li>
<li>浏览器再次请求这个资源的时候，检测到有 <code>Last-Modified</code> 这个header，然后在header中添加 <code>If-Modified-Since</code> 这个字段，值为 <code>Last-Modified</code> 的值。</li>
<li>服务器再次收到这个资源请求，会根据 <code>If-Modified-Since</code> 中的值与服务器中这个资源的最后修改时间对比，如果没有变化，返回304和空的响应体，直接从缓存读取，如果 <code>If-Modified-Since</code> 的时间小于服务器中这个资源的最后修改时间，说明文件有更新，于是返回新的资源文件和200。</li>
</ol>

<p><strong>缺点：</strong></p>

<ol>
<li>如果本地打开缓存文件，即使没有对文件进行修改，但还是会造成 <code>Last-Modified</code> 被修改，服务端不能命中缓存导致发送相同的资源。</li>
<li>因为 <code>Last-Modified</code> 只能以秒计时，如果在不可感知的时间内（毫秒级）修改完成文件，那么服务端会认为资源还是命中了，不会返回正确的资源。</li>
</ol>

<h4 id='ETag'>ETag</h4>

<blockquote>
  <p>Etag是服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成)，只要资源有变化，Etag就会重新生成。</p>
</blockquote>

<p>浏览器在下一次加载资源向服务器发送请求时，会将上一次返回的 <code>Etag</code> 值放到request header里的<code>If-None-Match</code>里，服务器只需要比较客户端传来的 <code>If-None-Match</code> 跟自己服务器上该资源的ETag是否一致，就能很好地判断资源相对客户端而言是否被修改过了。</p>

<h4 id='两者对比'>两者对比</h4>

<ol>
<li>精确度上，Etag 要优于 Last-Modified，Last-Modified 单位是秒，可能文件一秒内更新了多次而没有返回，并且负载均衡的服务器生成的 Last-Modified 也可能不一样。</li>
<li>性能上，Last-Modified 要优于 Etag，因为 Last-Modified 只需要记录时间，而 Etag 还需要计算出一个 hash值。</li>
<li>优先级上，服务器会优先考虑 Etag。</li>
</ol>

<h3 id='缓存机制'>缓存机制</h3>

<ol>
<li>强制缓存优先于协商缓存进行，若强制缓存(Expires和Cache-Control)生效则直接使用缓存；</li>
<li>若强缓存不生效则进行协商缓存(Last-Modified / If-Modified-Since和Etag / If-None-Match)；</li>
<li>协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，返回200，重新返回资源和缓存标识，再存入浏览器缓存中；生效则返回304，继续使用缓存；</li>
<li>若什么策略都没有，浏览器会采用一个启发式算法，通常会取响应头中的 Date 减去 Last-Modified 值的 10% 作为缓存时间。</li>
</ol>

<blockquote>
  <p>参考<br></br><a href="https://mp.weixin.qq.com/s/QeR5UWZLrRHtk9pD4c3MrA">https://mp.weixin.qq.com/s/QeR5UWZLrRHtk9pD4c3MrA</a></p>
</blockquote>
</div>
            </div>

        )
    }
}