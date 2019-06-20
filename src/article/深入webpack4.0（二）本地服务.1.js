import React from 'react'
import '../style/main.scss'
import { IsPC } from "../utils/screen";
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h2","title":"webpack-dev-server "},{"level":"h2","title":"webpack-dev-middleware"},{"level":"h2","title":"开发环境和生产环境的构建"},{"level":"h3","title":"webpack 3.x配置"},{"level":"h3","title":"webpack 4.0配置"}]
        }
    }
    componentDidMount() {
        if (!IsPC()) {
            const dom = document.getElementsByClassName('article')[0]
            dom.classList.add('article-mobile');
        }
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title">深入webpack4.0（二）本地服务环境</div>
<blockquote>
  <p>在第一个章节我们已经对webpack的整体架构做了一个介绍。这一章，我们对开发环境的本地服务来展开分析。我们平时在vue-cli还是其他的脚手架也好都会启动一个本地服务来进行实时的调试，那么这个功能 webpack 是怎么来实现的呢？</p>
</blockquote>

<h2 id='webpack-dev-server '>webpack-dev-server </h2>

<p>在<code>package.json</code>文件中添加如下配置,然后运行 <code>npm run start</code>就可以启动本地服务了：</p>

<pre><code><span></span>
<span>  "scripts": {'{'}</span>
<span>    "start": "webpack-dev-server --mode development"</span>
<span>  }</span>
<span></span>
</code></pre>

<p>在 webpack 配置文件中，可以通过设置 devServer 字段来配置，比如 port 、 publicPath 等配置项。 </p>

<h2 id='webpack-dev-middleware'>webpack-dev-middleware</h2>

<p>其实我们在前面用到的 webpack-dev-server 用的 nodejs环境下的 express 框架来实现的。那我们是否可以自己利用 nodejs 来开发一个本地环境呢？这里就引入了我们在 nodejs 环境下的两个中间件 <code>webpack-dev-middleware</code>和 <code>webpack-hot-middleware</code>,前者是用来启动 webpack 本地服务的中间件，后者用来实现热加载。</p>

<p>首先我们在 build 目录下创建一个 dev-server.js 文件，然后在<code>package.json</code>文件中添加如下配置：</p>

<pre><code><span></span>
<span>  "scripts": {'{'}</span>
<span>    “dev”: "node build/dev-server.js"</span>
<span>  }</span>
<span></span>
</code></pre>

<p>然后引入<code>npm install webpack-dev-middleware webpack-hot-middleware -D</code>后开始编写文件。如果懂点 nodejs 的话，很方便就可以写出来，代码如下：</p>

<pre><code><span></span>
<span></span>
<span>const webpack = require('webpack');</span>
<span>const path = require("path");</span>
<span>const express = require('express');</span>
<span></span>
<span>const devMiddleware = require('webpack-dev-middleware');</span>
<span>const hotMiddleware = require('webpack-hot-middleware');</span>
<span></span>
<span>const configFunc = require('../webpack.config')</span>
<span>const CONFIG = configFunc()</span>
<span>const complier = webpack(CONFIG)</span>
<span></span>
<span>CONFIG.mode = 'development'     //设置为开发环境</span>
<span></span>
<span>const app = express();</span>
<span></span>
<span>app.use(devMiddleware(complier, {'{'}</span>
<span>    // 这里填写一些配置项</span>
<span>    //  向控制台显示任何内容 </span>
<span>    quiet: true,</span>
<span>    //  绑定中间件的公共路径 </span>
<span>    //  使用与webpack相同 </span>
<span>    publicPath: CONFIG.output.publicPath,</span>
<span></span>
<span>}))</span>
<span>// 热加载</span>
<span>app.use(hotMiddleware(complier))</span>
<span>app.listen(8085, () =&gt; console.log('8085 is running'))</span>
<span></span>
<span></span>
</code></pre>

<h2 id='开发环境和生产环境的构建'>开发环境和生产环境的构建</h2>

<h3 id='webpack 3.x配置'>webpack 3.x配置</h3>

<p>在 webpack 3.x 中，我们通常通过 <code>process.env.NODE_ENV</code> 区分两种环境。在<code>package.json</code>文件中添加如下配置,</p>

<pre><code><span></span>
<span>"scripts": {'{'}</span>
<span>    "build": "NODE_ENV=production webpack",</span>
<span>    "develop": "NODE_ENV=development webpack-dev-server"</span>
<span>}</span>
<span></span>
</code></pre>

<p>然后引入 DefinePlugin 插件进行全局变量的写入：</p>

<pre><code><span></span>
<span>plugins: [</span>
<span>    new webpack.DefinePlugin({'{'}</span>
<span>      // webpack 3.x 的 process.env.NODE_ENV 是通过手动在命令行中指定 NODE_ENV=... 的方式来传递的</span>
<span>      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),</span>
<span>    }),</span>
<span>]</span>
<span></span>
</code></pre>

<h3 id='webpack 4.0配置'>webpack 4.0配置</h3>

<p>webpack 4.x 版本引入了 mode 的概念，在运行 webpack 时需要指定使用 production 或 development 两个 mode 其中一个。配置指令如下：</p>

<pre><code><span></span>
<span>"scripts": {'{'}</span>
<span>    "build": "webpack --mode production",</span>
<span>    "start": "webpack-dev-server --mode development",</span>
<span>}</span>
<span></span>
</code></pre>

<p><strong>production mode</strong> 时，默认会启用各种性能优化的功能，包括构建结果优化以及 webpack 运行性能优化。<br></br>- 生产环境可能需要分离 CSS 成单独的文件，以便多个页面共享同一个 CSS 文件<br></br>- 生产环境需要压缩 HTML/CSS/JS 代码<br></br>- 生产环境需要压缩图片</p>

<p><strong>development mode</strong> 时，会开启 debug 工具，运行时打印详细的错误信息，以及更加快速的增量编译构建。<br></br>- 开发环境需要生成 sourcemap 文件<br></br>- 开发环境需要打印 debug 信息<br></br>- 开发环境需要 live reload 或者 hot reload 的功能</p>

<p>同时，在webpack配置时我们需要将mode参数暴露出去，可以通过函数形式进行传递，如下代码示例：</p>

<pre><code><span></span>
<span>module.exports = (env, argv) =&gt; ({'{'}</span>
<span>return{'{'}</span>
<span>    mode:argv.mode</span>
<span>    // ... 其他配置</span>
<span>  })</span>
<span></span>
</code></pre>
</div>
            </div>

        )
    }
}