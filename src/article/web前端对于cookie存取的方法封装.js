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

<p>平时在前端工作中，可能会经常涉及到对于 cookie的读取和存储，写起来经常浪费不必要的时间查到想要的信息，所以在这里，我封装了两个简单的方法，来读取 cookie。</p>

<ul><li>获取cookie
<code>
getCookie(name) {'{'}
	let arr = document.cookie.split(&#39;; &#39;),arr2;
	for ( let i = 0; i &lt; arr.length; i++) {'{'}
		arr2 = arr[i].split(&#39;=&#39;);
		if (arr2[0] == name) {'{'}
			return arr2[1];
		}
	}
	return;
}
</code></li><li>设置cookie
<code></code>`
setCookie(name, value, iDay) {'{'}
	let oDate = new Date();
	oDate.setDate(oDate.getDate() + iDay);
	document.cookie = name + &#39;=&#39; + value + &#39;;expires=&#39; + oDate;</li></ul>

<p>}
 <code></code>`</p>
</div>
        )
    }
}