import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h2","title":"第一篇章 配置"},{"level":"h3","title":"1. 为什么用webpack？"},{"level":"h3","title":"2. 安装"},{"level":"h3","title":"3. 入口与输出"},{"level":"h3","title":"4. Loader"},{"level":"h3","title":"5. Plugin"},{"level":"h3","title":"6. Resolve"},{"level":"h3","title":"总结"},{"level":"h2","title":"第二篇章 本地服务"},{"level":"h3","title":"webpack-dev-server "},{"level":"h3","title":"webpack-dev-middleware"},{"level":"h3","title":"开发环境和生产环境的构建"},{"level":"h4","title":"webpack 3.x配置"},{"level":"h4","title":"webpack 4.0配置"},{"level":"h2","title":"第三篇章 优化"},{"level":"h3","title":"image-webpack-loader 图片压缩"},{"level":"h3","title":"使用 url-loader 将文件转为 DataURL"},{"level":"h3","title":"分离代码文件"}]
        }
    }
    componentDidMount() {}
    render() {
        return (
            <Fragment>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">深入webpack4.0</h1></div>
<blockquote>
  <p>webpack 是一个 JS 代码模块化的打包工具，藉由它强大的扩展能力，随着社区的发展，逐渐成为一个功能完善的构建工具。但是平时开发业务的时候许多框架都提供了完善的脚手架，使得我们在开发业务的时候很省事，却对webpack越来越陌生，所以由此来对webpack来次深入的了解。</p>
</blockquote>

<h2 id='第一篇章 配置'>第一篇章 配置</h2>

<h3 id='1. 为什么用webpack？'>1. 为什么用webpack？</h3>

<p>随着前端工程化的发展，涌现出了许多框架类库，但是这些源代码无法直接运行，需要经过工具转化才可以。除了webpack这个构建工具，还有我们了解的Grunt、Gulp等。</p>

<p><strong>Grunt</strong><br></br>Grunt 有大量现成的插件可以使用，也能管理任务之间的依赖关系，自动化执行依赖的任务，每个任务的具体执行代码和依赖关系写在配置文件 Gruntfile.js 里。grunt的好处就是灵活，只执行定义好的任务，同时也有大量的可复用的插件。但是grunt集成度不高，需要手动编写很多配置，不能上手即用。</p>

<p><strong>Gulp</strong><br></br>gulp是一个基于自动化的构建工具，除了可以管理和执行任务，还支持监听文件、读写文件。gulp引入了流的概念，流可以在插件间传递。相较于grunt，gulp的功能更完善，但是仍然存在集成度不高需要手动配置的问题。</p>

<p><strong>Webpack</strong><br></br>webpack是一个打包模块化 JavaScript 的工具，在 Webpack 里一切文件皆模块，通过 Loader 转换文件，通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。Webpack 专注于构建模块化项目。webpack具有很大的灵活性和拓展性，专注模块化开发，可以做到开箱即用，同时使用场景不仅限于Web开发，具有良好的开发体验。<br></br>现在社区里面基于webpack的脚手架大致有： react 的 create-react-app 、 vue 的 vue-cli 、 Angular 的 angular-cli等。</p>

<h3 id='2. 安装'>2. 安装</h3>

<p>首先输入指令 <code>npm install webpack webpack-cli -g</code> 安装webback，指令 <code>npm init</code> 安装package.json文件。Webpack 在执行构建时默认会从项目根目录下的 webpack.config.js 文件读取配置，所以我们需要手动新建该文件。前期的准备工作结束，下面我们就开始进入神奇的webpack世界了！</p>

<h3 id='3. 入口与输出'>3. 入口与输出</h3>

<p>在多个代码模块中会有一个起始的 .js 文件，我们将此文件作为 webpack 构建的入口，同时webpack支持多个入口配置，如下代码配置：</p>

<pre><code><span></span>
<span>module.exports = {'{'}</span>
<span>  entry: './src/index.js' </span>
<span>}</span>
<span></span>
</code></pre>

<p>webpack的输出指的是webpack最终构建出来的静态文件。通过output字段定义,如下所示：</p>

<pre><code><span></span>
<span>module.exports = {'{'}</span>
<span>    //...</span>
<span>    output: {'{'}</span>
<span>        path: __dirname + '/dist',// __dirname指向被js文件执行的绝对路径</span>
<span>        filename: 'assets/index[hash].js',// [hash]可以保证每次文件名都不相同</span>
<span>    },</span>
<span>    //...</span>
<span>}</span>
<span></span>
</code></pre>

<h3 id='4. Loader'>4. Loader</h3>

<p>Loader 可以看作是 webpack 的转换器或者“翻译员”，把代码转换成 webpack 可以打包的模块，在 module.rules 下配置。格式如下：</p>

<pre><code><span></span>
<span>module.exports = {'{'}</span>
<span>  // ...</span>
<span>  module: {'{'}</span>
<span>    noParse: /jquery|lodash/, // 正则表达式</span>
<span>    rules: [ </span>
<span>      {'{'}</span>
<span>        test: /\.jsx?/, // 文件后缀条件</span>
<span>        include: [ </span>
<span>          path.resolve(__dirname, 'src'),</span>
<span>        ], // 文件所在路径位置条件</span>
<span>        use: 'babel-loader', // 规则应用结果</span>
<span>      },</span>
<span>      // ...</span>
<span>    ],</span>
<span>  },</span>
<span>}...</span>
<span></span>
</code></pre>

<p><strong>匹配规则</strong>（字符串、正则、函数、数组、对象）：<br></br>* {'{'} test: ... } 匹配特定条件 <br></br>* {'{'} include: ... } 匹配特定路径 <br></br>* {'{'} exclude: ... } 排除特定路径 <br></br>* {'{'} and: [...] }必须匹配数组中所有条件 <br></br>* {'{'} or: [...] } 匹配数组中任意一个条件 <br></br>* {'{'} not: [...] } 排除匹配数组中所有条件</p>

<p><strong>执行顺序</strong><br></br>执行顺序是从最后配置的 loader 开始，一步步往前执行。<br></br>rule.enforce 可以设置 loader 种类，默认为普通，可以设置 “pre”（前置）、post（后置），还有一个额外的种类"行内 loader"，被应用在 import/require 行内。<br></br>种类的执行优先级：前置>行内>普通>后置</p>

<p><strong>noPrase</strong><br></br>不需要解析依赖的第三方类库可以配置在 noParse 中，但是需注意使用 noParse 进行忽略的模块文件中不能使用 import、require、define 等导入机制。</p>

<h3 id='5. Plugin'>5. Plugin</h3>

<p>Plugin 是用来扩展 Webpack 功能的，处理其他的构建任务，模块转换的工作给 loader 做，剩下的工作由 plugin 完成。，通过在构建流程里注入钩子实现，它给 Webpack 带来了很大的灵活性。plugin安装后需要手动引入。下面以配置sass示例,注意其中用到了插件<code>extract-text-webpack-plugin</code>在webpack 4.x中没有做支持，所以需要这样引入：<code>npm install extract-text-webpack-plugin@next -D</code></p>

<pre><code><span></span>
<span>const ExtractTextPlugin = require('extract-text-webpack-plugin') //手动引入</span>
<span>module.exports = {'{'}</span>
<span>    //..</span>
<span>    module:{'{'}</span>
<span>        rules:[</span>
<span>            // 这里配置sass文件的Loader</span>
<span>            {'{'}</span>
<span>                test: /\.scss$/,</span>
<span>                use: ExtractTextPlugin.extract({'{'}</span>
<span>                    fallback: 'style-loader',//将解析结果转为js代码，动态插入style</span>
<span>                    use: [ 'sass-loader','css-loader'] //首先将sass转为css,然后处理css的依赖，比如@import、url(）等</span>
<span>                })</span>
<span>            },</span>
<span>            //..</span>
<span>        ]</span>
<span>    },</span>
<span>    plugins: [</span>
<span>        //..</span>
<span>        //该plugin作用是单独分离css文件</span>
<span>        new ExtractTextPlugin('index.css'),//分离css文件，出口index.css</span>
<span>    ]</span>
<span>    //..</span>
<span>}</span>
<span></span>
<span></span>
</code></pre>

<h3 id='6. Resolve'>6. Resolve</h3>

<p>Webpack 在启动后会从配置的入口模块出发找出所有依赖的模块，Resolve 配置 Webpack 如何寻找模块所对应的文件。 Webpack 内置 JavaScript 模块化语法解析功能，默认会采用模块化标准里约定好的规则去寻找，但你也可以根据自己的需要修改默认的规则。<br></br>比如 resolve.alias可以设置路径的映射,直接使用 components 代替 ./src/components/：</p>

<pre><code><span></span>
<span>resolve:{'{'}</span>
<span>  alias:{'{'}</span>
<span>    components: './src/components/'</span>
<span>  }</span>
<span>}</span>
<span></span>
</code></pre>

<h3 id='总结'>总结</h3>

<ul>
<li>想让源文件加入到构建流程中去被 Webpack 控制，配置 entry。</li>
<li>想自定义输出文件的位置和名称，配置 output。</li>
<li>想自定义寻找依赖模块时的策略，配置 resolve。</li>
<li>想自定义解析和转换文件的策略，配置 module，通常是配置 module.rules 里的 Loader，其余包括 parser、noParse等等配置。</li>
<li>其它的大部分需求可能要通过 Plugin 去实现，配置 plugin。</li>
</ul>

<hr />

<h2 id='第二篇章 本地服务'>第二篇章 本地服务</h2>

<blockquote>
  <p>在第一个章节我们已经对webpack的整体架构做了一个介绍。这一章，我们对开发环境的本地服务来展开分析。我们平时在vue-cli还是其他的脚手架也好都会启动一个本地服务来进行实时的调试，那么这个功能 webpack 是怎么来实现的呢？</p>
</blockquote>

<h3 id='webpack-dev-server '>webpack-dev-server </h3>

<p>在<code>package.json</code>文件中添加如下配置,然后运行 <code>npm run start</code>就可以启动本地服务了：</p>

<pre><code><span></span>
<span>  "scripts": {'{'}</span>
<span>    "start": "webpack-dev-server --mode development"</span>
<span>  }</span>
<span></span>
</code></pre>

<p>在 webpack 配置文件中，可以通过设置 devServer 字段来配置，比如 port 、 publicPath 等配置项。 </p>

<h3 id='webpack-dev-middleware'>webpack-dev-middleware</h3>

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

<h3 id='开发环境和生产环境的构建'>开发环境和生产环境的构建</h3>

<h4 id='webpack 3.x配置'>webpack 3.x配置</h4>

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

<h4 id='webpack 4.0配置'>webpack 4.0配置</h4>

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

<hr />

<h2 id='第三篇章 优化'>第三篇章 优化</h2>

<blockquote>
  <p>这一环节我们来聊一聊如何通过配置webpack来使在生产环境构建时来优化我们的项目代码。</p>
</blockquote>

<h3 id='image-webpack-loader 图片压缩'>image-webpack-loader 图片压缩</h3>

<blockquote>
  <p>之前使用 file-loader 来处理图片文件，在此基础上，再添加一个 image-webpack-loader 来压缩图片文件。配置如下：</p>
</blockquote>

<pre><code><span></span>
<span>rules:[</span>
<span>    ...</span>
<span>      {'{'}</span>
<span>        test: /\.(jpg|jpeg|png|gif)$/,</span>
<span>        use: [</span>
<span>            {'{'}</span>
<span>                loader: 'file-loader',</span>
<span>                options: {'{'}</span>
<span>                    name: '[name].[ext]',</span>
<span>                    outputPath: 'assets/img'</span>
<span>                }</span>
<span>            },</span>
<span>            // 图片压缩</span>
<span>            {'{'}</span>
<span>                loader: 'image-webpack-loader',</span>
<span>                options: {'{'}</span>
<span>                    mozjpeg: {'{'} // 压缩 jpeg 的配置</span>
<span>                        progressive: true,</span>
<span>                        quality: 65</span>
<span>                    },</span>
<span>                    optipng: {'{'} // 使用 imagemin-optipng 压缩 png，enable: false 为关闭</span>
<span>                        enabled: false,</span>
<span>                    },</span>
<span>                    pngquant: {'{'} // 使用 imagemin-pngquant 压缩 png</span>
<span>                        quality: '65-90',</span>
<span>                        speed: 4</span>
<span>                    },</span>
<span>                    gifsicle: {'{'} // 压缩 gif 的配置</span>
<span>                        interlaced: false,</span>
<span>                    },</span>
<span>                }</span>
<span>            },</span>
<span>        ]</span>
<span>]</span>
<span></span>
</code></pre>

<h3 id='使用 url-loader 将文件转为 DataURL'>使用 url-loader 将文件转为 DataURL</h3>

<blockquote>
  <p>url-loader封装了 file-loader ,拥有其基本功能所以不需要依赖 file-loader，当图片大小小于limit值时，会直接将文件资源转为 base64 编码的 DataURL。</p>
</blockquote>

<p>配置如下：</p>

<pre><code><span></span>
<span>rules:[</span>
<span>    ...</span>
<span>      {'{'}</span>
<span>        test: /\.(jpg|jpeg|png|gif)$/,</span>
<span>        use: [</span>
<span>            {'{'}</span>
<span>                loader: 'url-loader',</span>
<span>                options: {'{'}</span>
<span>                    limit: 8192, // 单位是 Byte，当文件小于 8KB 时作为 DataURL 处理</span>
<span>                }</span>
<span>            },</span>
<span>            // 图片压缩</span>
<span>            {'{'}</span>
<span>                loader: 'image-webpack-loader',</span>
<span>                options: {'{'}</span>
<span>                    mozjpeg: {'{'} // 压缩 jpeg 的配置</span>
<span>                        progressive: true,</span>
<span>                        quality: 65</span>
<span>                    },</span>
<span>                    optipng: {'{'} // 使用 imagemin-optipng 压缩 png，enable: false 为关闭</span>
<span>                        enabled: false,</span>
<span>                    },</span>
<span>                    pngquant: {'{'} // 使用 imagemin-pngquant 压缩 png</span>
<span>                        quality: '65-90',</span>
<span>                        speed: 4</span>
<span>                    },</span>
<span>                    gifsicle: {'{'} // 压缩 gif 的配置</span>
<span>                        interlaced: false,</span>
<span>                    },</span>
<span>                }</span>
<span>            },</span>
<span>        ]</span>
<span>]</span>
<span></span>
</code></pre>

<h3 id='分离代码文件'>分离代码文件</h3>

<blockquote>
  <p>假设我们原本页面的静态资源都打包成一个 JS 文件，加载页面时虽然只需要加载一个 JS 文件，但是我们的代码一旦改变了，用户访问新的页面时就需要重新加载一个新的 JS 文件。有些情况下，我们只是单独修改了样式，这样也要重新加载整个应用的 JS 文件，相当不划算。所以分离代码文件是为了更好的利用缓存，减少不必要的开支。</p>
</blockquote>

<p>Webpcak4.0 可以直接通过 optimization 来进行配置：</p>

<pre><code><span></span>
<span>module.exports = {'{'}</span>
<span>  // ... webpack 配置</span>
<span></span>
<span>  optimization: {'{'}</span>
<span>    splitChunks: {'{'}</span>
<span>      chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件</span>
<span>    },</span>
<span>  },</span>
<span>}</span>
<span></span>
</code></pre>

<p>但是，我们建议将第三方类库显式地配置为公共的部分，因为第三方类库的更新频率较低。配置如下：</p>

<pre><code><span></span>
<span>optimization: {'{'}</span>
<span>    splitChunks: {'{'}</span>
<span>        cacheGroups: {'{'}</span>
<span>            commons: {'{'}</span>
<span>                name: 'commons',</span>
<span>                chunks: 'initial',</span>
<span>                minChunks: 2</span>
<span>            }</span>
<span>        }</span>
<span>    },</span>
<span>},</span>
<span></span>
</code></pre>
</div>
            </Fragment>
        )
    }
}