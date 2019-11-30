import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: []
        }
    }
    componentWillMount(){
    }
    componentDidMount() {
    }
    render() {
        return (
            <Fragment>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">对于cookie存取方法的封装</h1></div>
<p>平时在前端工作中，可能会经常涉及到对于 cookie的读取和存储，写起来经常浪费不必要的时间查到想要的信息，所以在这里，我封装了两个简单的方法，来读取 cookie。</p>

<ul>
<li>获取cookie
</li>
</ul>

<pre><code><span></span>
<span>getCookie(name) {'{'}</span>
<span>    let arr = document.cookie.split('; '),arr2;</span>
<span>    for ( let i = 0; i &lt; arr.length; i++) {'{'}</span>
<span>        arr2 = arr[i].split('=');</span>
<span>        if (arr2[0] == name) {'{'}</span>
<span>            return arr2[1];</span>
<span>        }</span>
<span>    }</span>
<span>    return;</span>
<span>}</span>
<span> </span>
</code></pre>

<ul>
<li>设置cookie
</li>
</ul>

<pre><code><span></span>
<span>setCookie(name, value, iDay) {'{'}</span>
<span>    let oDate = new Date();</span>
<span>    oDate.setDate(oDate.getDate() + iDay);</span>
<span>    document.cookie = name + '=' + value + ';expires=' + oDate;</span>
<span></span>
<span>}</span>
<span> </span>
</code></pre>
</div>
            </Fragment>
        )
    }
}