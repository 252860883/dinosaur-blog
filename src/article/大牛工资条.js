import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h2","title":"v1.0上线版 2017/10/13-2017/11/2"},{"level":"h2","title":"1.默认电话号码字段点击会触发系统拨号"},{"level":"h2","title":"2.safari浏览器移动端兼容问题"},{"level":"h4","title":"safari浏览器对于input标签设定有默认的事件"},{"level":"h4","title":"safari 默认点击 a，button，input时会有一层灰色的遮罩"},{"level":"h2","title":"3.移动端click点击事件会有延迟"},{"level":"h2","title":"4. vue 异步请求之 axios"},{"level":"h4","title":"axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，它本身具有以下特征:"},{"level":"h4","title":"axios的配置"},{"level":"h2","title":"5.移动端ios下触发input再点击其他区域无法失去焦点"},{"level":"h2","title":"6.移动端 ios下绑定企业微信开发接口无效"},{"level":"h2","title":"7.子组件和父组件"},{"level":"h2","title":"8.弹框模糊以及出现莫名其妙的黑线"},{"level":"h2","title":"9.实现文本双行超出显示省略号"},{"level":"h2","title":"10.工资表详情页面双击跳到放大页面再返回不强制刷新"},{"level":"h2","title":"11.路由跳转时设置过渡效果，以及过渡时间的设置"},{"level":"h2","title":"12.路由绑定query的值时只能接受基本数据类型 Number、String、Boolean等"},{"level":"h2","title":"13.input在IE下回车会默认执行提交事件"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">[项目总结]大牛工资条</h1></div>
<h2 id='v1.0上线版 2017/10/13-2017/11/2'>v1.0上线版 2017/10/13-2017/11/2</h2>

<h2 id='1.默认电话号码字段点击会触发系统拨号'>1.默认电话号码字段点击会触发系统拨号</h2>

<p>从网上查到可以通过添加meta头部标签来取消默认的识别电话号、邮箱等事件</p>

<pre><code><span></span>
<span>    &lt;meta name="format-detection" content="telephone=no" /&gt;  </span>
<span>    &lt;meta http-equiv="x-rim-auto-match" content="none"&gt;</span>
<span></span>
</code></pre>

<h2 id='2.safari浏览器移动端兼容问题'>2.safari浏览器移动端兼容问题</h2>

<h4 id='safari浏览器对于input标签设定有默认的事件'>safari浏览器对于input标签设定有默认的事件</h4>

<p>该浏览器实质上使用的是 webkit 内核，所以在 input标签的css样式里面添加语句</p>

<pre><code><span></span>
<span>  -webkit-appearance:none; </span>
<span></span>
</code></pre>

<p>这样就可以取消默认的事件了，不过如果只是用来 button 作用时，可以通过设置 a 标签来实现相同效果  </p>

<h4 id='safari 默认点击 a，button，input时会有一层灰色的遮罩'>safari 默认点击 a，button，input时会有一层灰色的遮罩</h4>

<pre><code><span></span>
<span>a,button,input,textarea{'{'}-webkit-tap-highlight-color: rgba(0,0,0,0;)}</span>
<span></span>
</code></pre>

<h2 id='3.移动端click点击事件会有延迟'>3.移动端click点击事件会有延迟</h2>

<p>从点击屏幕上的元素到触发元素的 click 事件，移动浏览器会有大约 300 毫秒的等待时间。为什么这么设计呢？ 因为它想看看你是不是要进行双击（double tap）操作。所以引入<b>fastclick.js</b></p>

<h2 id='4. vue 异步请求之 axios'>4. vue 异步请求之 axios</h2>

<h4 id='axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，它本身具有以下特征:'>axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，它本身具有以下特征:</h4>

<blockquote>
  <p>从浏览器中创建 XMLHttpRequest<br></br>从 node.js 发出 http 请求<br></br>支持 Promise API<br></br>拦截请求和响应<br></br>转换请求和响应数据<br></br>取消请求<br></br>自动转换JSON数据<br></br>客户端支持防止 CSRF/XSRF</p>
</blockquote>

<h4 id='axios的配置'>axios的配置</h4>

<p><a target="_blank" href="http://blog.csdn.net/sinat_17775997/article/details/69367204">http://blog.csdn.net/sinat_17775997/article/details/69367204</a></p>

<pre><code><span></span>
<span>import axios from 'axios'</span>
<span>import qs from 'qs'</span>
<span>import * as _ from '../util/tool'</span>
<span>axios.defaults.timeout = 5000; //响应时间</span>
<span>axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头</span>
<span>axios.defaults.baseURL = '你的接口地址'; //配置接口地址</span>
<span>//POST传参序列化(添加请求拦截器)</span>
<span>axios.interceptors.request.use((config) =&gt; {'{'}</span>
<span>    //在发送请求之前做某件事</span>
<span>    if(config.method  === 'post'){'{'}</span>
<span>        config.data = qs.stringify(config.data);</span>
<span>    }</span>
<span>    return config;</span>
<span>},(error) =&gt;{'{'}</span>
<span>     _.toast("错误的传参", 'fail');</span>
<span>    return Promise.reject(error);</span>
<span>});</span>
<span>//返回状态判断(添加响应拦截器)</span>
<span>axios.interceptors.response.use((res) =&gt;{'{'}</span>
<span>    //对响应数据做些事</span>
<span>    if(!res.data.success){'{'}</span>
<span>        // _.toast(res.data.msg);</span>
<span>        return Promise.reject(res);</span>
<span>    }</span>
<span>    return res;</span>
<span>}, (error) =&gt; {'{'}</span>
<span>    _.toast("网络异常", 'fail');</span>
<span>    return Promise.reject(error);</span>
<span>});</span>
<span>//返回一个Promise(发送post请求)</span>
<span>export function fetch(url, params) {'{'}</span>
<span>    return new Promise((resolve, reject) =&gt; {'{'}</span>
<span>        axios.post(url, params)</span>
<span>            .then(response =&gt; {'{'}</span>
<span>                resolve(response.data);</span>
<span>            }, err =&gt; {'{'}</span>
<span>                reject(err);</span>
<span>            })</span>
<span>            .catch((error) =&gt; {'{'}</span>
<span>               reject(error)</span>
<span>            })</span>
<span>    })</span>
<span>}</span>
<span></span>
</code></pre>

<h2 id='5.移动端ios下触发input再点击其他区域无法失去焦点'>5.移动端ios下触发input再点击其他区域无法失去焦点</h2>

<p>在移动端的情况下，点击input时输入文字再点击确定按钮无法失去焦点，键盘依然存在.解决办法：</p>

<pre><code><span></span>
<span>//修复ios下点击其他区域 input不会失去焦点问题</span>
<span>    window.onload = function() {'{'}  </span>
<span>        document.querySelector('body').addEventListener('touchend', function(e) {'{'}  </span>
<span>            if(e.target.tagName.toLowerCase() != 'input') {'{'}  </span>
<span>              var inputLists=document.getElementsByTagName('input');</span>
<span>              for(var i=0;i&amp;ltinputLists.length;i++){'{'}</span>
<span>                inputLists[i].blur();</span>
<span>              }  </span>
<span>            }  </span>
<span>        });  </span>
<span>    }</span>
<span></span>
</code></pre>

<h2 id='6.移动端 ios下绑定企业微信开发接口无效'>6.移动端 ios下绑定企业微信开发接口无效</h2>

<p>挖坑了好久，因为业务逻辑里面有一个302跳转，所以点击返回就会跳转回来，所以这里需要调取企业微信的接口写事件，逻辑写通以后，安卓端调通，ios无效。找了好久，兼容性研究许久无果。结果大佬来了一看是引入的文件错了。  <br></br>原引入文件：</p>

<pre><code><span></span>
<span>&lt;script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"&gt;&lt;/script&gt;</span>
<span></span>
</code></pre>

<p> <br></br>大佬一说引入文件错了，恍然大悟，错就错在了这个 http协议啊。因为ios的安全拦截只支持https的安全链接，so... <br/><br></br>更正以后：</p>

<pre><code><span></span>
<span>&lt;script src="//res.wx.qq.com/open/js/jweixin-1.2.0.js"&gt;&lt;/script&gt;</span>
<span></span>
</code></pre>

<h2 id='7.子组件和父组件'>7.子组件和父组件</h2>

<pre><code><span></span>
<span>//子组件中</span>
<span>//$emit自定义input事件，传递给父组件</span>
<span>this.$emit("input", this.realYear + "年" + this.realMonth + "月");</span>
<span></span>
<span>//父组件中</span>
<span>&lt;din-date v-model="date"&gt;&lt;/din-date&gt;</span>
<span></span>
</code></pre>

<h2 id='8.弹框模糊以及出现莫名其妙的黑线'>8.弹框模糊以及出现莫名其妙的黑线</h2>

<p>部分居中的弹窗显示模糊，分析原因是在居中对齐时，使用了transform:translate(-50%,-50%);如果碰到计算50%的结果刚好是.5像素的时候（即像素值为单数），会导致Dom内的内容模糊。由于项目是兼容ie11+,所以这里可以使用flex布局实现居中对齐。</p>

<h2 id='9.实现文本双行超出显示省略号'>9.实现文本双行超出显示省略号</h2>

<p>项目里有这样一个需求，用户上传的文本过长时超出部分未做判断，导致显示错乱。接到这样的bug我是崩溃的，因为前期并没有涉及这个需求，后期再改css时真的酸爽极了，因为用户自定义的数据实在太多了，所以就要狂加css来做限制了...  </p>

<p>首先查询到，单行隐藏的实现很简单</p>

<pre><code><span></span>
<span>.more-text-cut {'{'}</span>
<span>  overflow: hidden; /*自动隐藏文字*/</span>
<span>  text-overflow: ellipsis; /*文字隐藏后添加省略号*/</span>
<span>  white-space: nowrap; /*强制不换行*/</span>
<span>}</span>
<span></span>
</code></pre>

<p>但是双行超出显示省略号真的是很少见啊，不着急，网上一查解决了,因为用的webpack打包，还涉及到了-webkit-box-orient消失的问题：</p>

<pre><code><span></span>
<span>.double-row {'{'}</span>
<span>  display: -webkit-box;</span>
<span>  /* autoprefixer: off */</span>
<span>  -webkit-box-orient: vertical; //如果直接写，webpack编译后此属性消失，需要上下两个注释包裹</span>
<span>  /* autoprefixer: on */</span>
<span>  -webkit-line-clamp: 2; //显示两行</span>
<span>  overflow: hidden;</span>
<span>  word-break: break-all; //单词折断</span>
<span>  line-height: 50px;</span>
<span>}</span>
<span></span>
</code></pre>

<p>因为移动端是在企业微信，本身是webkit内核，兼容性完好，可这到了PC端就不行了。另外想到了另一种办法，直接通过after伪类来实现</p>

<pre><code><span></span>
<span>.double-row {'{'}</span>
<span>  overflow: hidden;</span>
<span>  word-break: break-all; //单词折断</span>
<span>  line-height: 20px;</span>
<span>  max-height: 40px;</span>
<span>  position: relative;</span>
<span>  &amp;::after {'{'}</span>
<span>    content: "...";</span>
<span>    position: absolute;</span>
<span>    z-index: 2;</span>
<span>    background: #fff;</span>
<span>    top: 0;</span>
<span>    right: 0;</span>
<span>    padding-left: 0.5em;</span>
<span>    margin-top: 20px;</span>
<span>  }</span>
<span>}</span>
<span></span>
</code></pre>

<p>但是这种情况仅限于长度大于三行的情况，否则两行时都会显示“...”。 <br/><br></br>同时想到了另一种情况，添加 filter 进行字节判断，当长度大于某个值时，显示...，但是这种情况还需要判断汉字字母数字的个数，同时可能会对原始数据的显示造成问题。最后重新改需求，达成IE情况下统一单行显示。</p>

<h2 id='10.工资表详情页面双击跳到放大页面再返回不强制刷新'>10.工资表详情页面双击跳到放大页面再返回不强制刷新</h2>

<p>因为从放大页面返回到详情页面是不会有变化的所以不必须要created这些生命周期重新渲染。  <br></br>首先是如何判断当前是在放大页面跳回到详情页而不是其他页面跳转到详情页呢？  </p>

<pre><code><span></span>
<span>//app.vue</span>
<span>watch: {'{'}</span>
<span>    $route(to, from) {'{'}</span>
<span>      // from 对象中要 router 来源信息</span>
<span>      sessionStorage.setItem("fromRouter", from.path);</span>
<span>    }</span>
<span>  },</span>
<span></span>
</code></pre>

<p>如上，在app.vue中对$route进行watch监听,然后将from.path写入缓存或者直接存入一个全局的变量供其它组件使用。  <br></br>接下来解决强制不刷新问题，用到了 vue中的 keep-alive，上代码</p>

<pre><code><span></span>
<span>//app.vue</span>
<span>&lt;keep-alive&gt;</span>
<span>     &lt;router-view v-if="$route.meta.keepAlive"&gt;&lt;/router-view&gt;</span>
<span>&lt;/keep-alive&gt;</span>
<span>     &lt;router-view v-if="!$route.meta.keepAlive"&gt;&lt;/router-view&gt;</span>
<span></span>
<span>//路由中的配置 </span>
<span> {'{'}</span>
<span>    path: '/salarydetail',</span>
<span>    name: 'salaryDetail',</span>
<span>    component: resolve =&gt; require(['@/page/salaryDetail'], resolve),</span>
<span>    meta: {'{'} keepAlive: true }//添加meta，keepAlive属性</span>
<span>  }</span>
<span></span>
</code></pre>

<p>注意：keep-alive下是activated和deactivated了</p>

<h2 id='11.路由跳转时设置过渡效果，以及过渡时间的设置'>11.路由跳转时设置过渡效果，以及过渡时间的设置</h2>

<p>直接在 router-view 外写入transition过渡标签，然后添加mode属性设置，避免过渡时的样式重叠（比如透明度切换时会造成重影）。</p>

<pre><code><span></span>
<span>   //mode: out-in 旧元素执行完过渡再执行新元素过渡 in-out则相反</span>
<span>   &lt;transition name="jump" mode="out-in"&gt;</span>
<span>     &lt;router-view&gt;&lt;/router-view&gt;</span>
<span>   &lt;/transition&gt;</span>
<span></span>
</code></pre>

<h2 id='12.路由绑定query的值时只能接受基本数据类型 Number、String、Boolean等'>12.路由绑定query的值时只能接受基本数据类型 Number、String、Boolean等</h2>

<p>因为过去时要传递一个对象Object格式的，所以造成了传递过去的内容只是[object]，所以在传递的时候需要进行字符串的转化 JSON.stringfy（...）</p>

<h2 id='13.input在IE下回车会默认执行提交事件'>13.input在IE下回车会默认执行提交事件</h2>

<p>给 input 外层添加一个 form标签 添加onkeydown事件，当摁下回车键时，返回 false；</p>

<pre><code><span></span>
<span>&lt;form name="myform" action="" onkeydown="if(event.keyCode==13){'{'}return false;}"&gt;</span>
<span>  &lt;input type='text' name='user' /&gt;</span>
<span>&lt;/form&gt;</span>
<span></span>
</code></pre>
</div>
            </div>

        )
    }
}