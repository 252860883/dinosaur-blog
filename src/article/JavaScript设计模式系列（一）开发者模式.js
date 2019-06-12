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

<blockquote><p>观察者模式可谓是设计模式中非常经典的一个了，在众多的前端库中也能找到他的踪迹，比如JQ的on和trigger中封装的方法、VUE组件间实现通信的emit()和on()方法等等。自从某次面试被新浪dalao要求手写观察者模式代码被惨虐以后便决心好好研究一下这个东西！</p></blockquote>

<h3>概念</h3>

<p>观察者模式是指一个对象（subject）维持一系列依赖于它的观察者对象（observer），将有关状态的变化同步通知给他们。</p>

<h3>实现</h3>

<p>那么具体实现开发者模式主要分三个步骤：
 1. 创建构造函数，函数内创建一个观察者缓存列表，用来存放所有的观察者对象
 2. 封装添加观察者方法，将观察者写入缓存列表
 3. 封装发布者方法，函数执行时，遍历缓存列表，执行对应观察者的操作
 4. new构造函数创建一个实例，执行后续操作</p>

<p> 上代码：
 <code></code>`
        // 创建构造函数
        function Observer() {'{'}
            //创建观察者数组
            this.observerList = [];
        }
        Observer.prototype.on = function (obj) {'{'}
            this.observerList.push(obj);
        }
        Observer.prototype.emit = function () {'{'}
            // 遍历数组所有的观察者并执行操作
            this.observerList.forEach(obj =&gt; {'{'}
                obj.apply(this, arguments)
            })
        }
        // 清除绑定，清楚某个绑定直接对数组进行增删操作，这里不一一列举
        Observer.prototype.clean = function (obj) {'{'}
            this.observerList = [];
        }</p>

<pre><code>    var ob = new Observer();
    ob.on(function (name) {'{'}
        console.log(&quot;你的名字是&quot; + name)
    })
    ob.on(function (year) {'{'}
        console.log(&quot;你的年纪&quot; + year)
    })
    ob.emit(&#39;Dan&#39;)
    ob.emit(6)
    ob.clean()
    ob.emit(&#39;Danny&#39;, 23)

    /** 
     * 输出：
     * 你的名字是Dan
     * 你的年纪Dan
     * 你的名字是6
     * 你的年纪6
    */</code></pre>

<p> <code></code>`</p>

<p>这样一个简单的观察者模式就可以实现了，但是同时发现了一个问题 subject 和 observer是混淆的，并不会分开对应，所以下面就做进一步的升级，也就是我们常常提到的发布订阅模式了。</p>

<h3>发布订阅模式</h3>

<p>发布订阅模式的不同之处是使用了一个主题/事件通道，这个通道是介于希望接收到通知的对象和激活事件对象之间，通俗讲可以通过传递一个特定的key指来实现。其目的是使发布者和订阅者之间产生依赖关系。
修改代码如下：
<code></code>`
        // 创建构造函数
        function Observer2() {'{'}
            //创建观察者数组
            this.observerList = [];
        }
        Observer2.prototype.on = function (key, obj) {'{'}
            if (!this.observerList[key]) {'{'}
                this.observerList[key] = []
            }
            //将observerpush进对应的key内存中
            this.observerList[key].push(obj);
        }
        Observer2.prototype.emit = function () {'{'}
            //获取key值
            var oKey = Array.prototype.shift.apply(arguments);
            // 遍历数组所有的观察者并执行操作
            this.observerList[oKey].forEach(obj =&gt; {'{'}
                obj.apply(this, arguments)
            })
        }</p>

<pre><code>    var ob2 = new Observer2();

    ob2.on(&#39;buy&#39;, function (shop) {'{'}
        console.log(&quot;购买：&quot; + shop);
    })
    ob2.on(&#39;sale&#39;, function (shop) {'{'}
        console.log(&#39;售卖：&#39; + shop)
    })
    ob2.emit(&#39;buy&#39;, &quot;冰激凌&quot;)
    ob2.emit(&#39;sale&#39;, &quot;西瓜&quot;)</code></pre>

<p><code></code>`</p>

<h3>优点</h3>

<ol><li>异步编程</li><li>利于代码的松散耦合</li></ol>
</div>
        )
    }
}