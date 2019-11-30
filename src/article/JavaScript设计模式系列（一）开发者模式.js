import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"概念"},{"level":"h3","title":"实现"},{"level":"h3","title":"发布订阅模式"},{"level":"h3","title":"优点"}]
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
<div className="title-content"><h1 className="title">JavaScript设计模式（一）观察者模式</h1></div>
<blockquote>
  <p>观察者模式可谓是设计模式中非常经典的一个了，在众多的前端库中也能找到他的踪迹，比如JQ的on和trigger中封装的方法、VUE组件间实现通信的emit()和on()方法等等。自从某次面试被新浪dalao要求手写观察者模式代码被惨虐以后便决心好好研究一下这个东西！</p>
</blockquote>

<h3 id='概念'>概念</h3>

<p>观察者模式是指一个对象（subject）维持一系列依赖于它的观察者对象（observer），将有关状态的变化同步通知给他们。</p>

<h3 id='实现'>实现</h3>

<p>那么具体实现开发者模式主要分三个步骤：<br></br> 1. 创建构造函数，函数内创建一个观察者缓存列表，用来存放所有的观察者对象<br></br> 2. 封装添加观察者方法，将观察者写入缓存列表<br></br> 3. 封装发布者方法，函数执行时，遍历缓存列表，执行对应观察者的操作<br></br> 4. new构造函数创建一个实例，执行后续操作</p>

<p>上代码：<br></br> </p>

<pre><code><span></span>
<span>        // 创建构造函数</span>
<span>        function Observer() {'{'}</span>
<span>            //创建观察者数组</span>
<span>            this.observerList = [];</span>
<span>        }</span>
<span>        Observer.prototype.on = function (obj) {'{'}</span>
<span>            this.observerList.push(obj);</span>
<span>        }</span>
<span>        Observer.prototype.emit = function () {'{'}</span>
<span>            // 遍历数组所有的观察者并执行操作</span>
<span>            this.observerList.forEach(obj =&gt; {'{'}</span>
<span>                obj.apply(this, arguments)</span>
<span>            })</span>
<span>        }</span>
<span>        // 清除绑定，清楚某个绑定直接对数组进行增删操作，这里不一一列举</span>
<span>        Observer.prototype.clean = function (obj) {'{'}</span>
<span>            this.observerList = [];</span>
<span>        }</span>
<span></span>
<span>        var ob = new Observer();</span>
<span>        ob.on(function (name) {'{'}</span>
<span>            console.log("你的名字是" + name)</span>
<span>        })</span>
<span>        ob.on(function (year) {'{'}</span>
<span>            console.log("你的年纪" + year)</span>
<span>        })</span>
<span>        ob.emit('Dan')</span>
<span>        ob.emit(6)</span>
<span>        ob.clean()</span>
<span>        ob.emit('Danny', 23)</span>
<span></span>
<span>        /** </span>
<span>         * 输出：</span>
<span>         * 你的名字是Dan</span>
<span>         * 你的年纪Dan</span>
<span>         * 你的名字是6</span>
<span>         * 你的年纪6</span>
<span>        */</span>
<span></span>
<span> </span>
</code></pre>

<p>这样一个简单的观察者模式就可以实现了，但是同时发现了一个问题 subject 和 observer是混淆的，并不会分开对应，所以下面就做进一步的升级，也就是我们常常提到的发布订阅模式了。</p>

<h3 id='发布订阅模式'>发布订阅模式</h3>

<p>发布订阅模式的不同之处是使用了一个主题/事件通道，这个通道是介于希望接收到通知的对象和激活事件对象之间，通俗讲可以通过传递一个特定的key指来实现。其目的是使发布者和订阅者之间产生依赖关系。<br></br>修改代码如下：</p>

<pre><code><span></span>
<span>        // 创建构造函数</span>
<span>        function Observer2() {'{'}</span>
<span>            //创建观察者数组</span>
<span>            this.observerList = [];</span>
<span>        }</span>
<span>        Observer2.prototype.on = function (key, obj) {'{'}</span>
<span>            if (!this.observerList[key]) {'{'}</span>
<span>                this.observerList[key] = []</span>
<span>            }</span>
<span>            //将observerpush进对应的key内存中</span>
<span>            this.observerList[key].push(obj);</span>
<span>        }</span>
<span>        Observer2.prototype.emit = function () {'{'}</span>
<span>            //获取key值</span>
<span>            var oKey = Array.prototype.shift.apply(arguments);</span>
<span>            // 遍历数组所有的观察者并执行操作</span>
<span>            this.observerList[oKey].forEach(obj =&gt; {'{'}</span>
<span>                obj.apply(this, arguments)</span>
<span>            })</span>
<span>        }</span>
<span></span>
<span>        var ob2 = new Observer2();</span>
<span></span>
<span>        ob2.on('buy', function (shop) {'{'}</span>
<span>            console.log("购买：" + shop);</span>
<span>        })</span>
<span>        ob2.on('sale', function (shop) {'{'}</span>
<span>            console.log('售卖：' + shop)</span>
<span>        })</span>
<span>        ob2.emit('buy', "冰激凌")</span>
<span>        ob2.emit('sale', "西瓜")</span>
<span></span>
</code></pre>

<h3 id='优点'>优点</h3>

<ol>
<li>异步编程</li>
<li>利于代码的松散耦合</li>
</ol>
</div>
            </Fragment>
        )
    }
}