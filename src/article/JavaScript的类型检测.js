import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"类型"},{"level":"h3","title":"typeof"},{"level":"h3","title":"instanceof"},{"level":"h3","title":"==="},{"level":"h3","title":"constructor"},{"level":"h3","title":"Object.prototype.toString.call()"},{"level":"h3","title":"总结"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title">JavaScript的类型检测</div>
<blockquote>
  <p>大家都知道 JavaScript 是一个弱类型语言，所以平时对类型的判断是一个很重要的事情。当然也有很多方法可以用来区分类型：typeof、instanceof、=== 等等，那我们需要在什么场景下该用哪个方法来区分呢？</p>
</blockquote>

<h3 id='类型'>类型</h3>

<p>复习一下 JavaScript 的数据类型，基本数据类型：<code>Number</code>、<code>String</code>、<code>Null</code>、<code>Undefined</code>、<code>Boolean</code>、<code>Symbol</code>。引用数据类型：<code>Object</code>、<code>Array</code>、<code>Function</code>、<code>Date</code>等。关于两者的区别这里不再做介绍，可以翻看我之前的另一篇文章：<a href="https://252860883.github.io/2018/06/12/%E5%89%96%E6%9E%90JavaScript%E7%9A%84%E5%86%85%E5%AD%98%E6%9C%BA%E5%88%B6/">剖析JavaScript的内存机制</a></p>

<h3 id='typeof'>typeof</h3>

<blockquote>
  <p>typeof 返回一个表示数据类型的字符串。这里需要注意：它不能判断 null、array、date、RegExp等类型。</p>
</blockquote>

<pre><code><span></span>
<span>** 以下情况可以进行判断 **</span>
<span></span>
<span>typeof Symbol(); // symbol </span>
<span>typeof ''; // string </span>
<span>typeof 1; // number </span>
<span>typeof true; //boolean </span>
<span>typeof undefined; //undefined </span>
<span>typeof new Function(); // function </span>
<span>typeof {'{'}}; // object</span>
<span></span>
<span>** 以下情况无法进行判断 **</span>
<span></span>
<span>typeof null; //object </span>
<span>typeof [1,2,3] ; //object </span>
<span>typeof new Date(); //object </span>
<span>typeof new RegExp(); //object </span>
<span></span>
<span></span>
</code></pre>

<h3 id='instanceof'>instanceof</h3>

<blockquote>
  <p>A instanceof B 是判断 A 是否为 B 的实例，即判断 A的原型链中是否存在构造函数B。所以我们可以通过这个方法来判断 array、date、RegExp等。</p>
</blockquote>

<pre><code><span></span>
<span>[1,2,3] instanceof Array; //true</span>
<span>{'{'}} instanceof Object;//true</span>
<span>new Date() instanceof Date;//true</span>
<span>new RegExp() instanceof RegExp//true</span>
<span></span>
</code></pre>

<p>同时，检测 Array 类型也可以使用 ES6 的新语法  <code>Array.isArray()</code> 来进行检测。</p>

<p>正如上面所说，只要 A的原型链中存在构造函数B即返回 true 所以可能有多个构造函数B满足：</p>

<pre><code><span></span>
<span>[1,2,3] instanceof Array; // true</span>
<span>[1,2,3] instanceof Object; // true</span>
<span></span>
</code></pre>

<p>模拟实现一个 <code>instanceof</code> 方法：</p>

<pre><code><span></span>
<span>function instanceOf(A, B) {'{'}</span>
<span>    while (true) {'{'}</span>
<span>        // 原型链到头仍未找到返回false</span>
<span>        if(A === null){'{'}</span>
<span>            return false</span>
<span>        }</span>
<span>        if (A === B.prototype) {'{'}</span>
<span>            console.log(A,B)</span>
<span>            return true</span>
<span>        }</span>
<span>        A = A.__proto__</span>
<span>    }</span>
<span>}</span>
<span></span>
</code></pre>

<p>但是需要注意，对于基本数据类型来说，我们需要通过<strong>创建实例</strong>方法才能被 instanceof 检测出来。原因是：通过字面量方式创建的基本数据类型不是一个严谨的实例，只有通过实例创建出的对象才是标准的对象数据类型值。而由于 JS 的松散性，可以按照正常基本类型对象处理。</p>

<pre><code><span></span>
<span>1 instanceof Number; // false</span>
<span>new Number(1) instanceof Number; // false</span>
<span></span>
<span>"abc" instanceof String; // false </span>
<span>new String('abc') instanceof String; // true</span>
<span></span>
<span></span>
</code></pre>

<p>对于检测 Null 和 Undefined 类型，instanceof 又鸡肋了！因为浏览器不允许在外部访问 Null 和 Undefined 类，所以会出现以下报错：</p>

<pre><code><span></span>
<span>null instanceof Null; // Null is not defined</span>
<span>undefined instanceof Undefined; // Undefined is not defined</span>
<span></span>
</code></pre>

<p>综上看来 instanceof 慎用啊！！</p>

<h3 id='==='>===</h3>

<blockquote>
  <p>严格等于就好说啦，他只能用来判断 null 和 undefined 类型，因为这两个类型的值都是唯一的。</p>
</blockquote>

<pre><code><span></span>
<span>var a = null;</span>
<span>a === null; // true </span>
<span></span>
<span>var b = undefined;</span>
<span>b ==== undefined; // true</span>
<span></span>
</code></pre>

<h3 id='constructor'>constructor</h3>

<blockquote>
  <p>constructor 和 instanceof 的作用很像，区别在于它可以处理基本数据类型，并且在检测 Object 时处理不一样。</p>
</blockquote>

<pre><code><span></span>
<span>** constructor只能判断是否由该构造函数创建的实例，不能判断原型链上的 **</span>
<span>[1,2,3].constructor == Array; // true </span>
<span>[1,2,3].constructor == Object; // false</span>
<span></span>
<span>** 可以用来判断基础类型 null/undefined 除外 **</span>
<span>var a="aaa";</span>
<span>a.constructor == String; // true</span>
<span>var b=1;</span>
<span>b.constructor == Number; // true</span>
<span></span>
<span></span>
</code></pre>

<p>当然 constructor 还是同样不能判断 <code>null</code> 和 <code>undefined</code>，同时如果对类的原型进行重写时很有可能把 constructor给覆盖，所以还是要慎用哦！</p>

<h3 id='Object.prototype.toString.call()'>Object.prototype.toString.call()</h3>

<blockquote>
  <p>嗯，最后出场的一定是大佬级了，这是最准确也是最常用的方法了。</p>
</blockquote>

<p>我们平时都知道 <code>to String()</code> 是转换为字符串，但是对于Object上的 toString 并不是用来转换字符串，它的作用是返回当前方法执行的主体（方法中的 this）所属类的详细信息即"[object Object]",其中第一个 object 代表当前实例是对象数据类型的(这个是固定死的)，第二个 Object 代表的是 this 所属的类是 Object。</p>

<pre><code><span></span>
<span>Object.prototype.toString.call('') ;   // [object String]</span>
<span>Object.prototype.toString.call(1) ;    // [object Number]</span>
<span>Object.prototype.toString.call(true) ; // [object Boolean]</span>
<span>Object.prototype.toString.call(undefined) ; // [object Undefined]</span>
<span>Object.prototype.toString.call(null) ; // [object Null]</span>
<span>Object.prototype.toString.call(new Function()) ; // [object Function]</span>
<span>Object.prototype.toString.call(new Date()) ; // [object Date]</span>
<span>Object.prototype.toString.call([]) ; // [object Array]</span>
<span>Object.prototype.toString.call(new RegExp()) ; // [object RegExp]</span>
<span>Object.prototype.toString.call(new Error()) ; // [object Error]</span>
<span>Object.prototype.toString.call(document) ; // [object HTMLDocument]</span>
<span>Object.prototype.toString.call(window) ; //[object global] window是全局对象global的引用</span>
<span>Object.prototype.toString.call({'{'}}) ; // [object Object]</span>
<span></span>
</code></pre>

<h3 id='总结'>总结</h3>

<p><table><tr><th> 方法 </th><th> 可判断类型 </th><th> 缺点 </th></tr><tr><td> typeof </td><td> 基本数据类型（null除外）、Object </td><td> 不能判断 null、array、date、RegExp等类型 </td></tr><tr><td> instanceof </td><td>  Array、Date、RegExp等类型 </td><td> 1.只要是在实例上的构造函数就会判断为真 2.基本数据类型必须通过实例创建方式才能被检测 3.不能检测 null 和 undefined </td></tr><tr><td> === </td><td> Null 和 Undefined</td><td> 只能检测 null 和 undefined</td></tr><tr><td> constructor</td><td> 基本数据类型、Array、Date、RegExp等</td><td> 1.不能判断 null 和 undefined 2.如果对类的原型进行重写时很有可能把 constructor给覆盖</td></tr><tr><td>Object.prototype.toString.call()</td><td>全都可以</td><td>如果非要找缺点，那就是需要多打几个字母？</td></tr></table></p>
</div>
            </div>

        )
    }
}