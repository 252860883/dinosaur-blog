import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"代码优化"},{"level":"h4","title":"v-for相关"},{"level":"h4","title":"冻结不会变化的对象"},{"level":"h4","title":"避免内存泄漏"},{"level":"h4","title":"图片懒加载"},{"level":"h4","title":"路由懒加载"},{"level":"h4","title":"第三方插件按需引入"},{"level":"h4","title":"服务器渲染 SSR"},{"level":"h4","title":"设置预渲染"},{"level":"h3","title":"Web基础优化"},{"level":"h3","title":"Webpack优化"},{"level":"h3","title":"Webpack构建优化"},{"level":"h4","title":"减少冗余代码"},{"level":"h4","title":"优化 Loader 配置"},{"level":"h4","title":"优化 resolve.noParse 配置"},{"level":"h4","title":"HappyPack 多子进程构建"},{"level":"h4","title":"ParallelUglifyPlugin 可以开启多个进程，并行使用 UglifyJS 压缩代码文件"},{"level":"h4","title":"调节自动刷新时间"},{"level":"h4","title":"模块热更新"},{"level":"h3","title":"参考"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">Vue项目优化总结</h1></div>
<h3 id='代码优化'>代码优化</h3>

<h4 id='v-for相关'>v-for相关</h4>

<ol>
<li><p>v-for遍历<strong>必须加key</strong>，为了方便新旧dom对比时可以直接通过唯一id快速处理，具体可以参考我的这篇文章：<a target="_blank" href="http://www.duhonghui.top/#/vue%E7%9A%84key%E5%B1%9E%E6%80%A7%E5%8A%A0%E8%BF%98%E6%98%AF%E4%B8%8D%E5%8A%A0">vue的key属性加还是不加？</a></p></li>
<li><p><strong>避免同时和v-if使用</strong>，因为代码会先执行for再if，这样会造成多余的循环开销，最好配合computed，把if操作放到computed里面去执行</p></li>
</ol>

<h4 id='冻结不会变化的对象'>冻结不会变化的对象</h4>

<p>当数据量大且不会修改的时候，可以使用<code>Object.freeze</code>冻结该对象，阻止Vue劫持数据</p>

<h4 id='避免内存泄漏'>避免内存泄漏</h4>

<p>Vue组件销毁时会自动清理它与实例的链接，解绑全部指令以及事件监听器，但是在js内通过<code>addEventListener</code>绑定的不会自动销毁，需要手动移除，避免内存泄漏</p>

<h4 id='图片懒加载'>图片懒加载</h4>

<p>在vue中可以使用<code>vue-lazyload</code>实现图片懒加载</p>

<h4 id='路由懒加载'>路由懒加载</h4>

<p>在<code>vue-router</code>中配置懒加载，按需载入，减少首页白屏时间：</p>

<pre><code><span></span>
<span>const Foo = () =&gt; import('./Foo.vue')</span>
<span>const router = new VueRouter({'{'}</span>
<span>  routes: [</span>
<span>    {'{'} path: '/foo', component: Foo }</span>
<span>  ]</span>
<span>})</span>
<span></span>
</code></pre>

<h4 id='第三方插件按需引入'>第三方插件按需引入</h4>

<p>借助<code>babel-plugin-component</code>，比如我们常见的按需引入 elementUI</p>

<h4 id='服务器渲染 SSR'>服务器渲染 SSR</h4>

<p>服务端渲染是指 Vue 在客户端将标签渲染成的整个 html 片段的工作在服务端完成，服务端形成的 html 片段直接返回给客户端这个过程就叫做服务端渲染。</p>

<p>优点：</p>

<ul>
<li>利于SEO，因为SPA是通过异步加载js文件动态载入内容的，但是爬虫不会等你异步载入以后再抓页面内容</li>
<li>首屏加载更快，因为SPA还要等js文件都下载完了才开始页面渲染</li>
</ul>

<p>缺点：</p>

<ul>
<li>开发限制，例如服务端渲染只支持 beforCreate 和 created 两个钩子函数，这会导致一些外部扩展库需要特殊处理，才能在服务端渲染应用程序中运行；并且与可以部署在任何静态文件服务器上的完全静态单页面应用程序 SPA 不同，服务端渲染应用程序，需要处于 Node.js server 运行环境；</li>
<li>更多的服务器负载：在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用CPU 资源，因此如果你预料在高流量环境下使用，请准备相应的服务器负载，并明智地采用缓存策略。</li>
</ul>

<h4 id='设置预渲染'>设置预渲染</h4>

<p>构建时生产针对特定路由的静态HTML文件，可以使用<code>prerender-spa-plugin</code>来实现</p>

<h3 id='Web基础优化'>Web基础优化</h3>

<ul>
<li>开启 gzip 压缩</li>
<li>浏览器缓存</li>
<li>启用 CDN</li>
<li>使用 Chrome Performance 检测代码性能</li>
</ul>

<h3 id='Webpack优化'>Webpack优化</h3>

<ul>
<li><code>url-loader</code> ,设置limit使小图片转化为base64</li>
<li><code>image-webpack-loader</code> 用来压缩图片</li>
<li><code>CommonsChunkPlugin</code>,提取第三方库合公共模块，避免相同资源重复加载和浪费</li>
<li><code>vue-template-loader</code>  模版预编译，</li>
<li><code>SourceMap</code> ，因为代码打包后经过压缩等手段不好看代码，它就是来解决不好调试代码的问题，有多种调试选择</li>
<li><code>webpack-bundle-analyzer</code>，构建结果输出分析，在vue-cli中直接通过 <code>npm run build —report</code> 指令即可</li>
</ul>

<h3 id='Webpack构建优化'>Webpack构建优化</h3>

<h4 id='减少冗余代码'>减少冗余代码</h4>

<p>Babel 提供了 <code>babel-plugin-transform-runtime</code> 插件来减少冗余代码</p>

<h4 id='优化 Loader 配置'>优化 Loader 配置</h4>

<p>尽可能让更少的文件被 Loader 处理，主要有三种办法：（1）优化正则匹配（2）通过cacheDirectory选项开启缓存（3）通过include、exclude来减少被处理的文件</p>

<h4 id='优化 resolve.noParse 配置'>优化 resolve.noParse 配置</h4>

<p>noParse配置项可以让Webpack忽略对部分没采用模块化的文件的递归解析和处理</p>

<h4 id='HappyPack 多子进程构建'>HappyPack 多子进程构建</h4>

<p><code>HappyPack</code>可以让 Webpack 构建由一个单线程分解成多个子进程去并发处理并将结果返回主进程，加快 Webpack 对文件的解析和处理</p>

<h4 id='ParallelUglifyPlugin 可以开启多个进程，并行使用 UglifyJS 压缩代码文件'>ParallelUglifyPlugin 可以开启多个进程，并行使用 UglifyJS 压缩代码文件</h4>

<p>压缩代码文件的过程需要将Object对象抽象为AST语法树，在用各种规则解析处理AST，这个过程非常耗时，当js文件很多的时候，并行压缩代码文件的处理会加快构建速度</p>

<h4 id='调节自动刷新时间'>调节自动刷新时间</h4>

<p>通过配置<code>devServer</code>下的相关属性可以控制页面自动刷新的相关规则：</p>

<pre><code><span></span>
<span>devServer: {'{'}</span>
<span>  watchOptions: {'{'}</span>
<span>    // 不监听的文件或文件夹，支持正则匹配</span>
<span>    ignored: /node_modules/,</span>
<span>    // 监听到变化后等300ms再去执行动作</span>
<span>    aggregateTimeout: 300,</span>
<span>    // 默认每秒询问1000次</span>
<span>    poll: 1000</span>
<span>  }</span>
<span>}</span>
<span></span>
</code></pre>

<h4 id='模块热更新'>模块热更新</h4>

<p>模块热替新（ Hot Module Replacement ），也可以简称 HMR，可以在一个源码发生变化时，只需重新编译发生变化的模块，再用新输出的模块替换掉浏览器中对应的老模块。</p>

<pre><code><span></span>
<span>devServer: {'{'}</span>
<span>  hot: true,</span>
<span>},</span>
<span>plugins: [</span>
<span>  new webpack.HotModuleReplacementPlugin(),</span>
<span>// 显示被替换模块的名称</span>
<span>  new webpack.NamedModulesPlugin(), // HMR shows correct file names</span>
<span>]</span>
<span></span>
</code></pre>

<h3 id='参考'>参考</h3>

<blockquote>
  <p><a target="_blank" href="https://juejin.im/post/5d548b83f265da03ab42471d">Vue 项目性能优化</a><br></br><a target="_blank" href="https://juejin.im/post/5c1fa158f265da613c09cb36">Vue项目Webpack优化实践</a></p>
</blockquote>
</div>
            </div>

        )
    }
}