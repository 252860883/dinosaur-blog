import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h2","title":"Bind方法"},{"level":"h4","title":"bind() 允许我们非常简单的在函数或者方法被调用时绑定 this 到指定对象上"},{"level":"h4","title":"模拟实现柯里化"},{"level":"h3","title":"Apply 和 Call方法"},{"level":"h4","title":"apply 和 call 两者只是在传参形式上不一样"},{"level":"h4","title":"配合 argument 场景"},{"level":"h4","title":"参数可变场景"},{"level":"h2","title":"总结"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"> <h1 className="title">说了多少遍的Bind、Call、Apply</h1></div>
<blockquote>
  <p>正如标题所说，说了多少遍！多少遍！多少遍！唉，所以有了这边复习文，算是立下血志吧。</p>
</blockquote>

<p><code>bind</code>,<code>call</code>,<code>apply</code>三个方法都是用来将一个指定的 this 来调用或者创建一个函数。</p>

<h2 id='Bind方法'>Bind方法</h2>

<h4 id='bind() 允许我们非常简单的在函数或者方法被调用时绑定 this 到指定对象上'>bind() 允许我们非常简单的在函数或者方法被调用时绑定 this 到指定对象上</h4>

<p>eg:</p>

<pre><code><span></span>
<span>var user = {'{'}</span>
<span>  data: 666,</span>
<span>  showData: function (other) {'{'}</span>
<span>    console.log(this.data + other)</span>
<span>  }</span>
<span>}</span>
<span></span>
<span>var user2 = user.showData</span>
<span>user2() // undefined,指向全局函数</span>
<span>var user3 = user.showData.bind(user)</span>
<span>user3('777') // 666777</span>
<span></span>
<span></span>
</code></pre>

<h4 id='模拟实现柯里化'>模拟实现柯里化</h4>

<blockquote>
  <p>tip:柯里化：函数允许将一个函数作为返回值进行返回</p>
</blockquote>

<pre><code><span></span>
<span>var user = {'{'}</span>
<span>  data: 666,</span>
<span>  currying: function (x, y) {'{'}</span>
<span>    console.log(x + '+' + y + '=' + (x + y))</span>
<span>  }</span>
<span>}</span>
<span>var curry = user.currying.bind(user, 5)</span>
<span>curry(6) // 5+6=11</span>
<span></span>
</code></pre>

<h3 id='Apply 和 Call方法'>Apply 和 Call方法</h3>

<h4 id='apply 和 call 两者只是在传参形式上不一样'>apply 和 call 两者只是在传参形式上不一样</h4>

<pre><code><span></span>
<span>var person = {'{'}</span>
<span>  name: "LiMing",</span>
<span>  callName: function (a, b) {'{'}</span>
<span>    console.log(this.name + " is " + a + " and " + b)</span>
<span>  }</span>
<span>}</span>
<span>var callName = person.callName</span>
<span>callName('people', "goodman") // undefined is people and goodman</span>
<span>callName.call(person, 'dog', 'boy')  // LiMing is dog and boy</span>
<span>callName.apply(person, ['cat', 'girl']) // LiMing is cat and girl</span>
<span></span>
</code></pre>

<h4 id='配合 argument 场景'>配合 argument 场景</h4>

<blockquote>
  <p>因为 argument 是一个近似数组的结构，但是并不是数组，无法使用array方法，这就引入了我们的 apply方法</p>
</blockquote>

<pre><code><span></span>
<span>// argument场景</span>
<span>function newArray(){'{'}</span>
<span>  console.log(Array.prototype.slice.call(arguments,0,2))</span>
<span>}</span>
<span>newArray(1,2,3,4,5,6) //0,2</span>
<span></span>
</code></pre>

<h4 id='参数可变场景'>参数可变场景</h4>

<pre><code><span></span>
<span>// max 参数可变</span>
<span>var allNumbers=[22,11,0,23,15]</span>
<span>console.log(Math.max.apply(null,allNumbers) )</span>
<span>// ES6拓展运算符也可以实现</span>
<span>console.log(Math.max(...allNumbers) )</span>
<span></span>
</code></pre>

<h2 id='总结'>总结</h2>

<ol>
<li>Bind()方法只是将绑定后的函数进行返回，而后两者是立即执行</li>
<li>apply 和 call 只是穿参形式不一样，前者是接受一个数组参数，后者是多个参数</li>
<li>箭头函数中，call和apply失效</li>
</ol>
</div>
            </div>

        )
    }
}