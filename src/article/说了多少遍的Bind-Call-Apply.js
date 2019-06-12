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

<blockquote><p>正如标题所说，说了多少遍！多少遍！多少遍！唉，所以有了这边复习文，算是立下血志吧。
<code>bind</code>,<code>call</code>,<code>apply</code>三个方法都是用来将一个指定的 this 来调用或者创建一个函数。</p></blockquote>

<h2>Bind方法</h2>

<h4>bind() 允许我们非常简单的在函数或者方法被调用时绑定 this 到指定对象上</h4>

<p>eg:
<code></code>`
var user = {'{'}
  data: 666,
  showData: function (other) {'{'}
    console.log(this.data + other)
  }
}</p>

<p>var user2 = user.showData
user2() // undefined,指向全局函数
var user3 = user.showData.bind(user)
user3(&#39;777&#39;) // 666777</p>

<p><code></code>`</p>

<h4>模拟实现柯里化</h4>

<blockquote><p>tip:柯里化：函数允许将一个函数作为返回值进行返回</p></blockquote>

<p><code>
var user = {'{'}
  data: 666,
  currying: function (x, y) {'{'}
    console.log(x + &#39;+&#39; + y + &#39;=&#39; + (x + y))
  }
}
var curry = user.currying.bind(user, 5)
curry(6) // 5+6=11
</code></p>

<h3>Apply 和 Call方法</h3>

<h4>apply 和 call 两者只是在传参形式上不一样</h4>

<p><code>
var person = {'{'}
  name: &quot;LiMing&quot;,
  callName: function (a, b) {'{'}
    console.log(this.name + &quot; is &quot; + a + &quot; and &quot; + b)
  }
}
var callName = person.callName
callName(&#39;people&#39;, &quot;goodman&quot;) // undefined is people and goodman
callName.call(person, &#39;dog&#39;, &#39;boy&#39;)  // LiMing is dog and boy
callName.apply(person, [&#39;cat&#39;, &#39;girl&#39;]) // LiMing is cat and girl
</code></p>

<h4>配合 argument 场景</h4>

<blockquote><p>因为 argument 是一个近似数组的结构，但是并不是数组，无法使用array方法，这就引入了我们的 apply方法</p></blockquote>

<p><code>
// argument场景
function newArray(){'{'}
  console.log(Array.prototype.slice.call(arguments,0,2))
}
newArray(1,2,3,4,5,6) //0,2
</code></p>

<h4>参数可变场景</h4>

<p><code>
// max 参数可变
var allNumbers=[22,11,0,23,15]
console.log(Math.max.apply(null,allNumbers) )
// ES6拓展运算符也可以实现
console.log(Math.max(...allNumbers) )
</code></p>

<h2>总结</h2>

<ol><li>Bind()方法只是将绑定后的函数进行返回，而后两者是立即执行</li><li>apply 和 call 只是穿参形式不一样，前者是接受一个数组参数，后者是多个参数</li><li>箭头函数中，call和apply失效</li></ol>
</div>
        )
    }
}