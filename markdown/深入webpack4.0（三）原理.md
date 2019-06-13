---
title: 深入webpack4.0（三）优化
date: 2018-08-01 14:44:59
tags: ["webpack","javascript"]
---
> 这一环节我们来聊一聊如何通过配置webpack来使在生产环境构建时来优化我们的项目代码。

### image-webpack-loader 图片压缩
>之前使用 file-loader 来处理图片文件，在此基础上，再添加一个 image-webpack-loader 来压缩图片文件。配置如下：

```
rules:[
    ...
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/img'
                }
            },
            // 图片压缩
            {
                loader: 'image-webpack-loader',
                options: {
                    mozjpeg: { // 压缩 jpeg 的配置
                        progressive: true,
                        quality: 65
                    },
                    optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
                        enabled: false,
                    },
                    pngquant: { // 使用 imagemin-pngquant 压缩 png
                        quality: '65-90',
                        speed: 4
                    },
                    gifsicle: { // 压缩 gif 的配置
                        interlaced: false,
                    },
                }
            },
        ]
]
```

### 使用 url-loader 将文件转为 DataURL
>url-loader封装了 file-loader ,拥有其基本功能所以不需要依赖 file-loader，当图片大小小于limit值时，会直接将文件资源转为 base64 编码的 DataURL。

配置如下：
```
rules:[
    ...
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 8192, // 单位是 Byte，当文件小于 8KB 时作为 DataURL 处理
                }
            },
            // 图片压缩
            {
                loader: 'image-webpack-loader',
                options: {
                    mozjpeg: { // 压缩 jpeg 的配置
                        progressive: true,
                        quality: 65
                    },
                    optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
                        enabled: false,
                    },
                    pngquant: { // 使用 imagemin-pngquant 压缩 png
                        quality: '65-90',
                        speed: 4
                    },
                    gifsicle: { // 压缩 gif 的配置
                        interlaced: false,
                    },
                }
            },
        ]
]
```

### 分离代码文件
>假设我们原本页面的静态资源都打包成一个 JS 文件，加载页面时虽然只需要加载一个 JS 文件，但是我们的代码一旦改变了，用户访问新的页面时就需要重新加载一个新的 JS 文件。有些情况下，我们只是单独修改了样式，这样也要重新加载整个应用的 JS 文件，相当不划算。所以分离代码文件是为了更好的利用缓存，减少不必要的开支。

Webpcak4.0 可以直接通过 optimization 来进行配置：

```
module.exports = {
  // ... webpack 配置

  optimization: {
    splitChunks: {
      chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
    },
  },
}
```

但是，我们建议将第三方类库显式地配置为公共的部分，因为第三方类库的更新频率较低。配置如下：

```
optimization: {
    splitChunks: {
        cacheGroups: {
            commons: {
                name: 'commons',
                chunks: 'initial',
                minChunks: 2
            }
        }
    },
},
```

