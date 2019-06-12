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
<div className="title">test</div>
<p>同时，ES2018为对象解构提供了和数组一样的Rest参数和展开操作符：</p>

<pre><code><span></span>
<span>const obj = {'{'}a:1,b:2,c:3}</span>
<span>    const {'{'}a,...x} = obj</span>
<span>        console.log(x)  // {'{'}b:2,c:3}</span>
<span>    const obj1 = {'{'} a: 1, b: 2, c: 3 };</span>
<span>    const a =   `ab`</span>
<span>const obj2 = {'{'} ...obj1, d: 4 }; // {'{'} a: 1, b: 2, c: 3, d: 4 };</span>
<span></span>
</code></pre>

<hr />

<p><code>这是一个行内代码</code></p>

<p>换行<br></br>换不换啊！！！</p>

<p><table><tr><th> 方法 </th><th>  结果</th></tr><tr><td> Promise.all </td><td>  返回一个promise对象，有一个reject就返回reject</td></tr><tr><td> Promise.race </td><td>  返回一个promise对象，回调最先解析出的结果</td></tr><tr><td> Promise.reject </td><td>  返回一个带有拒绝原因reason参数的Promise对象</td></tr><tr><td> Promise.resolve </td><td>  返回一个以给定值解析后的Promise对象</td></tr></table></p>
</div>
        )
    }
}