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
<div className="title">'柯里化'</div>
<h3>实现通用curry函数</h3>

<p>继续来深入，前面提到的高阶函数只能是我们针对每一个情况具体来编写代码，那我们能不能直接封装一个公共的函数来实现柯里化呢？<br></br>扒到大神的三行解决方案：</p>

<pre><code><span></span>
<span>const curry = (fn) =&gt; {'{'}</span>
<span>    if (fn.length &lt;= 1) return fn;</span>
<span>    const generator = (args, rest) =&gt; (!rest ? fn(...args) : arg =&gt; generator([...args, arg], rest - 1));</span>
<span>    return generator([], fn.length);</span>
<span>};</span>
<span></span>
</code></pre>

<p>或者这样：</p>

<pre><code><span></span>
<span>const curry = (fn, arr = []) =&gt; (...args) =&gt; (</span>
<span>  arg =&gt; arg.length === fn.length</span>
<span>    ? fn(...arg)</span>
<span>    : curry(fn, arg)</span>
<span>)([...arr, ...args])</span>
<span></span>
</code></pre>
</div>
        )
    }
}