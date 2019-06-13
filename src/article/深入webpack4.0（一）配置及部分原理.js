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
<div className="title">深入webpack4.0（一）整体架构</div>
<blockquote>
  <p>webpack 是一个 JS 代码模块化的打包工具，藉由它强大的扩展能力，随着社区的发展，逐渐成为一个功能完善的构建工具。但是平时开发业务的时候许多框架都提供了完善的脚手架，使得我们在开发业务的时候很省事，却对webpack越来越陌生，所以由此来对webpack来次深入的了解。</p>
  
  <h3>1. 为什么用webpack？</h3>
</blockquote>

<p>随着前端工程化的发展，涌现出了许多框架类库，但是这些源代码无法直接运行，需要经过工具转化才可以。除了webpack这个构建工具，还有我们了解的Grunt、Gulp等。</p>

<p><strong>Grunt</strong><br></br>Grunt 有大量现成的插件可以使用，也能管理任务之间的依赖关系，自动化执行依赖的任务，每个任务的具体执行代码和依赖关系写在配置文件 Gruntfile.js 里。grunt的好处就是灵活，只执行定义好的任务，同时也有大量的可复用的插件。但是grunt集成度不高，需要手动编写很多配置，不能上手即用。</p>

<p><strong>Gulp</strong><br></br>gulp是一个基于自动化的构建工具，除了可以管理和执行任务，还支持监听文件、读写文件。gulp引入了流的概念，流可以在插件间传递。相较于grunt，gulp的功能更完善，但是仍然存在集成度不高需要手动配置的问题。</p>

<p><strong>Webpack</strong><br></br>webpack是一个打包模块化 JavaScript 的工具，在 Webpack 里一切文件皆模块，通过 Loader 转换文件，通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。Webpack 专注于构建模块化项目。webpack具有很大的灵活性和拓展性，专注模块化开发，可以做到开箱即用，同时使用场景不仅限于Web开发，具有良好的开发体验。<br></br>现在社区里面基于webpack的脚手架大致有： react 的 create-react-app 、 vue 的 vue-cli 、 Angular 的 angular-cli等。</p>

<h3>2. 安装</h3>

<p>首先输入指令 <code>npm install webpack webpack-cli -g</code> 安装webback，指令 <code>npm init</code> 安装package.json文件。Webpack 在执行构建时默认会从项目根目录下的 webpack.config.js 文件读取配置，所以我们需要手动新建该文件。前期的准备工作结束，下面我们就开始进入神奇的webpack世界了！</p>

<h3>3. 入口与输出</h3>

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

<h3>4. Loader</h3>

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

<h3>5. Plugin</h3>

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

<h3>6. Resolve</h3>

<p>Webpack 在启动后会从配置的入口模块出发找出所有依赖的模块，Resolve 配置 Webpack 如何寻找模块所对应的文件。 Webpack 内置 JavaScript 模块化语法解析功能，默认会采用模块化标准里约定好的规则去寻找，但你也可以根据自己的需要修改默认的规则。<br></br>比如 resolve.alias可以设置路径的映射,直接使用 components 代替 ./src/components/：</p>

<pre><code><span></span>
<span>resolve:{'{'}</span>
<span>  alias:{'{'}</span>
<span>    components: './src/components/'</span>
<span>  }</span>
<span>}</span>
<span></span>
</code></pre>

<h3>总结</h3>

<ul>
<li>想让源文件加入到构建流程中去被 Webpack 控制，配置 entry。</li>
<li>想自定义输出文件的位置和名称，配置 output。</li>
<li>想自定义寻找依赖模块时的策略，配置 resolve。</li>
<li>想自定义解析和转换文件的策略，配置 module，通常是配置 module.rules 里的 Loader，其余包括 parser、noParse等等配置。</li>
<li>其它的大部分需求可能要通过 Plugin 去实现，配置 plugin。</li>
</ul>
</div>
        )
    }
}