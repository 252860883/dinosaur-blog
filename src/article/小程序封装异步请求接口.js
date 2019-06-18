import React from 'react'
import '../style/main.scss'
import MainPic3D from '../components/pic3D'
import { IsPC } from "../utils/screen";
export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        if(!IsPC()){
            const dom = document.getElementsByClassName('article')[0]
            dom.classList.add('article-mobile');
        }
    }
    render() {
        return (
            <div className="article">
<div className="title">小程序封装异步请求接口</div>
<p>开发过小程序应该知道小程序的异步http请求都是通过小程序自己的api wx.request 实现的。</p>

<pre><code><span></span>
<span>function fetch(url, method, header, data, loading) {'{'}</span>
<span>  let fetchP = new Promise(function (resolve, reject) {'{'}</span>
<span>    if (loading) {'{'}</span>
<span>      wx.showLoading({'{'}</span>
<span>        title: '加载中',</span>
<span>        icon: 'loading'</span>
<span>      })</span>
<span>    }</span>
<span>    wx.request({'{'}</span>
<span>      url: url_host + url,</span>
<span>      method: method ? method : 'GET',</span>
<span>      header: {'{'}</span>
<span>          //这里填写默认header</span>
<span>      },</span>
<span>      data: data,</span>
<span>      success: function (res) {'{'}</span>
<span>        res.statusCode == 200 ? resolve(res.data) : reject(res.data)</span>
<span>      },</span>
<span>      fail: function (err) {'{'}</span>
<span>        reject(err)</span>
<span>      },</span>
<span>      complete: function (comp) {'{'}</span>
<span>        if (loading) {'{'}</span>
<span>          wx.hideLoading()</span>
<span>        }</span>
<span>      }</span>
<span>    })</span>
<span>  })</span>
<span>  return fetchP</span>
<span>}</span>
<span></span>
</code></pre>
</div>
        )
    }
}