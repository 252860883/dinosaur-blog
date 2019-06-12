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
<hr/>

<hr/>

<h3>实现通用curry函数</h3>

<p>继续来深入，前面提到的高阶函数只能是我们针对每一个情况具体来编写代码，那我们能不能直接封装一个公共的函数来实现柯里化呢？
扒到大神的三行解决方案：
<code>
const curry = (fn) =&gt; {'{'}
    if (fn.length &lt;= 1) return fn;
    const generator = (args, rest) =&gt; (!rest ? fn(...args) : arg =&gt; generator([...args, arg], rest - 1));
    return generator([], fn.length);
};
</code>
或者这样：
<code>
const curry = (fn, arr = []) =&gt; (...args) =&gt; (
  arg =&gt; arg.length === fn.length
    ? fn(...arg)
    : curry(fn, arg)
)([...arr, ...args])
</code></p>
</div>
        )
    }
}