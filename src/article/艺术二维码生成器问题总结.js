import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"1.canvas如何转换为 img格式进行保存"},{"level":"h3","title":"2.所有素材图片需要加载完成再进行二维码绘制"},{"level":"h3","title":"3.在ios和chrome浏览器下设置 transition过渡会有闪烁bug"},{"level":"h3","title":"4.canvas绘制出来的图像不清晰"},{"level":"h3","title":"5.如何通过js下载canvas生成的图片到本地"},{"level":"h3","title":"6. IE下不兼容vue2.0以及vuex"}]
        }
    }
    componentDidMount() {}
    render() {
        return (
            <Fragment>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">【项目总结】艺术二维码生成器</h1></div>
<h3 id='1.canvas如何转换为 img格式进行保存'>1.canvas如何转换为 img格式进行保存</h3>

<p>利用 canvas的 toDataURL 方法可以实现转换为制定格式的图片地址，代码如下：</p>

<pre>
var image = new Image();  
image.src = canvas.toDataURL("image/png");
return image;
</pre>  

<p>注意：绘制的图片不能跨域，否则会报错</p>

<h3 id='2.所有素材图片需要加载完成再进行二维码绘制'>2.所有素材图片需要加载完成再进行二维码绘制</h3>

<p>canvas 使用 drawImg绘制图片，但是遇到一个问题就是 img的加载是异步的，所以有时图片还没有加载出来就进行绘制操作了，造成绘制出错。所以需要回掉异步执行绘制的操作。这里使用了promise.all() 来实现并列 promise对象完成时执行绘制。  <br></br>注意：all()里面的参数是包含所有promise的含有遍历器（比如数组）的对象。</p>

<h3 id='3.在ios和chrome浏览器下设置 transition过渡会有闪烁bug'>3.在ios和chrome浏览器下设置 transition过渡会有闪烁bug</h3>

<p>这是webkit内核的一个bug，需要在设置过渡的css下面再添加一句 </p>

<pre><b>-webkit-backface-visibility:hidden;</b></pre>
<h3 id='4.canvas绘制出来的图像不清晰'>4.canvas绘制出来的图像不清晰</h3>

canvas在绘制的时候，在手机上等高清屏幕下观看都比较模糊，这里引入
![hidpi-canvas-polyfill](https://github.com/jondavidjohn/hidpi-canvas-polyfill.git)
<pre>
function init() {'{'}
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');

    // polyfill 提供了这个方法用来获取设备的 pixel ratio
    var getPixelRatio = function(context) {'{'}
        var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;

        return (window.devicePixelRatio || 1) / backingStore;
    };

    var ratio = getPixelRatio(ctx);

    // 注意，这里的 width 和 height 变成了 width * ratio 和 height * ratio
    ctx.drawImage(document.querySelector('img'), 0, 0, 300 * ratio, 90 * ratio);
}
</pre>

<p>另外一种办法，设置canvas的初始长宽为实际的二倍，在dom元素设置css样式时，再设置回原来的大小。</p>

<h3 id='5.如何通过js下载canvas生成的图片到本地'>5.如何通过js下载canvas生成的图片到本地</h3>

<p>项目中有一个下载到本地的一个功能。利用的是a标签的download属性，目前只有 Firefox 和 Chrome 支持 download 属性。 download属性是h5新增属性。代码如下：</p>

<pre>
downloadImg: function() {'{'}
      //imgData为 toDataUrl('"image/png"')后生成的地址，格式为data:image/png;base64,...
      let self = this,imgData = self.imgSrc;
      //将mime-type改为image/octet-stream,强制让浏览器下载
      imgData = imgData.replace('image/png', "image/octet-stream");
      // 创建a标签
      var save_link = document.createElement("a");
      save_link.href = imgData;
      // 下载后的文件名设置，a标签的download属性可以下载文件
      save_link.download = "artQrcode_" + new Date().getTime() + "." + "png";
      //创建点击事件，让生成的a标签触发该事件
      let e=document.createEvent('MouseEvents');
      e.initMouseEvent('click');
      save_link.dispatchEvent(e);
    }
</pre>

<h3 id='6. IE下不兼容vue2.0以及vuex'>6. IE下不兼容vue2.0以及vuex</h3>

<p>Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API ，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转码。并且vuex是依赖于Promise实现的。为了解决这个问题，我们使用一种叫做<b> Polyfill</b> （代码填充，也可译作兼容性补丁） 的技术。 <br></br>首先npm安装</p>

<pre>
npm install --save-dev babel-polyfill
</pre>

<p>然后在 main.js中</p>

<pre>
import babel-polyfill
</pre>

<p>之后需要在 webpack.config.js 中配置文件</p>

<pre>
module.exports = {'{'}
  entry: {'{'}
    app: ["babel-polyfill", "./src/main.js"]
  },
  ...
}
</pre>
</div>
            </Fragment>
        )
    }
}