---
title: 深入webpack4.0（二）本地服务环境
date: 2018-07-19 14:44:59
tags: ["webpack","javascript"]
---
>在第一个章节我们已经对webpack的整体架构做了一个介绍。这一章，我们对开发环境的本地服务来展开分析。我们平时在vue-cli还是其他的脚手架也好都会启动一个本地服务来进行实时的调试，那么这个功能 webpack 是怎么来实现的呢？

## webpack-dev-server 

在`package.json`文件中添加如下配置,然后运行 `npm run start`就可以启动本地服务了：
```
  "scripts": {
    "start": "webpack-dev-server --mode development"
  }
```
在 webpack 配置文件中，可以通过设置 devServer 字段来配置，比如 port 、 publicPath 等配置项。 


## webpack-dev-middleware

其实我们在前面用到的 webpack-dev-server 用的 nodejs环境下的 express 框架来实现的。那我们是否可以自己利用 nodejs 来开发一个本地环境呢？这里就引入了我们在 nodejs 环境下的两个中间件 `webpack-dev-middleware`和 `webpack-hot-middleware`,前者是用来启动 webpack 本地服务的中间件，后者用来实现热加载。

首先我们在 build 目录下创建一个 dev-server.js 文件，然后在`package.json`文件中添加如下配置：
```
  "scripts": {
    “dev”: "node build/dev-server.js"
  }
```

然后引入`npm install webpack-dev-middleware webpack-hot-middleware -D`后开始编写文件。如果懂点 nodejs 的话，很方便就可以写出来，代码如下：

```

const webpack = require('webpack');
const path = require("path");
const express = require('express');

const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const configFunc = require('../webpack.config')
const CONFIG = configFunc()
const complier = webpack(CONFIG)

CONFIG.mode = 'development'     //设置为开发环境

const app = express();

app.use(devMiddleware(complier, {
    // 这里填写一些配置项
    //  向控制台显示任何内容 
    quiet: true,
    //  绑定中间件的公共路径 
    //  使用与webpack相同 
    publicPath: CONFIG.output.publicPath,

}))
// 热加载
app.use(hotMiddleware(complier))
app.listen(8085, () => console.log('8085 is running'))

```

## 开发环境和生产环境的构建
### webpack 3.x配置
在 webpack 3.x 中，我们通常通过 `process.env.NODE_ENV` 区分两种环境。在`package.json`文件中添加如下配置,

```
"scripts": {
    "build": "NODE_ENV=production webpack",
    "develop": "NODE_ENV=development webpack-dev-server"
}
```

然后引入 DefinePlugin 插件进行全局变量的写入：

```
plugins: [
    new webpack.DefinePlugin({
      // webpack 3.x 的 process.env.NODE_ENV 是通过手动在命令行中指定 NODE_ENV=... 的方式来传递的
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
]
```

### webpack 4.0配置
webpack 4.x 版本引入了 mode 的概念，在运行 webpack 时需要指定使用 production 或 development 两个 mode 其中一个。配置指令如下：

```
"scripts": {
    "build": "webpack --mode production",
    "start": "webpack-dev-server --mode development",
}
```

**production mode** 时，默认会启用各种性能优化的功能，包括构建结果优化以及 webpack 运行性能优化。
- 生产环境可能需要分离 CSS 成单独的文件，以便多个页面共享同一个 CSS 文件
- 生产环境需要压缩 HTML/CSS/JS 代码
- 生产环境需要压缩图片

**development mode** 时，会开启 debug 工具，运行时打印详细的错误信息，以及更加快速的增量编译构建。
- 开发环境需要生成 sourcemap 文件
- 开发环境需要打印 debug 信息
- 开发环境需要 live reload 或者 hot reload 的功能

同时，在webpack配置时我们需要将mode参数暴露出去，可以通过函数形式进行传递，如下代码示例：
```
module.exports = (env, argv) => ({
return{
	mode:argv.mode
  	// ... 其他配置
  })
```

