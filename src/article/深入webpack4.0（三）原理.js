import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"image-webpack-loader 图片压缩"},{"level":"h3","title":"使用 url-loader 将文件转为 DataURL"},{"level":"h3","title":"分离代码文件"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">深入webpack4.0（三）优化</h1></div>
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
            </div>

        )
    }
}