import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"箭头函数"},{"level":"h3","title":"rest参数和拓展运算符"},{"level":"h3","title":"对象属性简写"},{"level":"h3","title":"解构赋值"},{"level":"h3","title":"字符串拓展"},{"level":"h3","title":"Symbol类型"},{"level":"h3","title":"数组拓展"},{"level":"h3","title":"正则拓展"},{"level":"h3","title":"函数默认值"},{"level":"h3","title":"Set 和 WeakSet"},{"level":"h3","title":"Map 和 WeakMap"},{"level":"h3","title":"Promise函数"},{"level":"h3","title":"Generators生成器"},{"level":"h3","title":"Iterator遍历器"},{"level":"h3","title":"for...in 与 for...of"},{"level":"h3","title":"Async Await"},{"level":"h3","title":"Class 类"},{"level":"h3","title":"模块"},{"level":"h3","title":"Proxy"},{"level":"h3","title":"Reflect"},{"level":"h3","title":"数学运算符"},{"level":"h3","title":"Object相关API"},{"level":"h4","title":"Objec.values()"},{"level":"h4","title":"Objec.entries()"},{"level":"h4","title":"Objec.getOwnPropertyDescriptors()"}]
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
<div className="title-content"><h1 className="title">ES6+ 新特性大汇总</h1></div>
<blockquote>
  <p>平时写业务涉及到ES6/7/8常用的可能就常见的那几个，其他的不常用就忘记了，所以来专门记录一篇博客，以供经常翻阅之用。</p>
</blockquote>

<h3 id='箭头函数'>箭头函数</h3>

<ol>
<li>匿名函数，不能作为构造函数，不能<code>new</code>,也没有<code>prototype</code>属性</li>
<li>没有<code>arguments</code>,可以使用<code>rest参数</code>作为替代方案</li>
</ol>

<pre><code><span></span>
<span>let a=(...arr)=&gt;{'{'}</span>
<span>    console.log(arr)  // [1,2,3,4]</span>
<span>}</span>
<span>a(1,2,3,4)</span>
<span></span>
</code></pre>

<ol>
<li>箭头函数不会创建自己的<code>this</code>,它只会从自己的作用域链的上一层继承<code>this</code></li>
</ol>

<pre><code><span></span>
<span>this.a=222</span>
<span>var obj = {'{'}</span>
<span>    a: 6,</span>
<span>    b: function () {'{'}</span>
<span>        console.log(this);  //obj</span>
<span>        console.log(this.a);//6</span>
<span>    },</span>
<span>    c: () =&gt; {'{'}</span>
<span>        console.log(this);  //{'{'}}</span>
<span>        console.log(this.a);//222</span>
<span>    },</span>
<span>    d: function () {'{'}</span>
<span>        setTimeout(() =&gt; {'{'}</span>
<span>            console.log(this);  //window</span>
<span>            console.log(this.a);//6</span>
<span>        }, 100);</span>
<span>    },</span>
<span>    e: function () {'{'}</span>
<span>        setTimeout(function () {'{'}</span>
<span>            console.log(this);  //timeout</span>
<span>            console.log(this.a);//undefined</span>
<span>        }, 100);</span>
<span>    }</span>
<span>}</span>
<span></span>
</code></pre>

<ol>
<li>箭头函数不能当做<code>Generator函数</code>,不能使用<code>yield</code>关键字</li>
<li>通过<code>call()</code>、<code>apply()</code>调用箭头函数时，只能传递参数，第一个参数会被忽略</li>
</ol>

<hr />

<h3 id='rest参数和拓展运算符'>rest参数和拓展运算符</h3>

<p>rest参数和拓展运算符虽然都是“...”的形态，但是两者的作用范围却截然不同</p>

<p><strong>rest参数</strong>：Rest就是为解决传入的参数数量不一定,数组的相关的方法都可以用</p>

<pre><code><span></span>
<span>function realSort(...rest) {'{'}</span>
<span>    console.log(rest.sort((a,b)=&gt;a-b))</span>
<span>}</span>
<span>realSort(1,10,3) // [ 1, 3, 10 ]</span>
<span></span>
</code></pre>

<p><strong>拓展运算符</strong>：可以看作是rest参数的逆运算（展开数组操作），将数组转为字符串</p>

<pre><code><span></span>
<span>console.log(1,2,...[4,5,6],7,8)  // 1 2 4 5 6 7 8</span>
<span></span>
</code></pre>

<p>同时，ES2018为对象解构提供了和数组一样的Rest参数和展开操作符：</p>

<pre><code><span></span>
<span>const obj = {'{'}a:1,b:2,c:3}</span>
<span>const {'{'}a,...x} = obj</span>
<span>console.log(x)  // {'{'}b:2,c:3}</span>
<span></span>
<span>const obj1 = {'{'} a: 1, b: 2, c: 3 };</span>
<span>const obj2 = {'{'} ...obj1, d: 4 }; // {'{'} a: 1, b: 2, c: 3, d: 4 };</span>
<span></span>
</code></pre>

<hr />

<h3 id='对象属性简写'>对象属性简写</h3>

<p>在ES6中允许我们在设置一个对象的属性的时候不指定属性名。</p>

<pre><code><span></span>
<span>const name='Ming',age='18',city='Shanghai';</span>
<span>&lt;!-- 旧方法 --&gt;</span>
<span>const student = {'{'}</span>
<span>    name:name,</span>
<span>    age:age,</span>
<span>    city:city</span>
<span>};</span>
<span></span>
<span>&lt;!-- ES6写法 --&gt;</span>
<span>const student = {'{'}</span>
<span>    name,</span>
<span>    age,</span>
<span>    city</span>
<span>};</span>
<span></span>
<span></span>
</code></pre>

<hr />

<h3 id='解构赋值'>解构赋值</h3>

<p><strong>数组的解构赋值</strong></p>

<pre><code><span></span>
<span>let [b, c, d] = [1, 2, 3]</span>
<span>console.log(b, c, d)  //1,2,3</span>
<span></span>
<span></span>
</code></pre>

<p><strong>对象的解构赋值</strong>，对象的解构赋值是根据key值进行匹配，如下代码所示，真正被创建的变量是<code>Name</code>和<code>Age</code></p>

<pre><code><span></span>
<span>let {'{'} name: Name,age: Age } = {'{'} name:'swr',age:28 }</span>
<span>console.log(Name) // 'swr'</span>
<span>console.log(Age) // 28</span>
<span>console.log(name) // ReferenceError: name is not defined</span>
<span>console.log(age) // ReferenceError: age is not defined</span>
<span></span>
</code></pre>

<p>ES6以后，允许对对象属性简写，所以我们通常直接对变量和key值进行统一，而直接进行简写操作：</p>

<pre><code><span></span>
<span>let {'{'} name ,age } = {'{'} name:'swr',age:28 }</span>
<span>console.log(name) // swr</span>
<span>console.log(age) // 28</span>
<span>&lt;!-- 等价于 --&gt;</span>
<span>let {'{'} name: name ,age: age } = {'{'} name:'swr',age:28 }</span>
<span></span>
</code></pre>

<p>结构赋值在函数中的应用：</p>

<pre><code><span></span>
<span>function body({'{'} eye, mouse } = {'{'} eye: 16, mouse: 20 }) {'{'}</span>
<span>    console.log(eye, mouse);</span>
<span>}</span>
<span>body({'{'}eye:10,mouse:10}) //10 10</span>
<span>body()  //16 20</span>
<span>body({'{'}eye:10})  //10 undefined</span>
<span></span>
</code></pre>

<hr />

<h3 id='字符串拓展'>字符串拓展</h3>

<p><strong>includes</strong><br></br>判断字符串是否有某值</p>

<pre><code><span></span>
<span>console.log("abcd".includes('a'))   //true</span>
<span>console.log("abcd".includes('z'))   //false</span>
<span></span>
</code></pre>

<p><strong>repeat</strong><br></br>复制字符串</p>

<pre><code><span></span>
<span>console.log("abcd".repeat(3))   //abcdabcdabcd</span>
<span></span>
</code></pre>

<p><strong>padStart() 与 padEnd()</strong></p>

<blockquote>
  <p><code>String.padStart(targetLength,[padString])</code><br></br><code>String.padEnd(targetLength,padString])</code><br></br><strong>targetLength</strong>:当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。<br></br><strong>padString</strong>:(可选) 填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断，此参数的缺省值为 " "；</p>
</blockquote>

<pre><code><span></span>
<span>'abc'.padStart(6,'1')   //  "111abc"</span>
<span>'abc'.padStart(3,'1')   //  "abc"</span>
<span>'abc'.padStart(5)       //  "  abc"</span>
<span></span>
<span>'abc'.padEnd(6,'1')   //  "abc111"</span>
<span>'abc'.padEnd(3,'1')   //  "abc"</span>
<span>'abc'.padEnd(5)       //  "abc  "</span>
<span></span>
<span></span>
</code></pre>

<p><strong>trimStart() 和 trimEnd()</strong><br></br>顾名思义，该方法就是去除字符串首/尾空白符。</p>

<pre><code><span></span>
<span>" sss ".trim()      // "sss"</span>
<span>" sss ".trimStart() // "sss "</span>
<span>" sss ".trimEnd()   // " sss"</span>
<span></span>
</code></pre>

<hr />

<h3 id='Symbol类型'>Symbol类型</h3>

<p>数据类型<code>symbol</code>是 ES6 新增的一种原始数据类型，一个<code>symbol</code>实例可以被赋值到一个左值变量，还可以通过标识符检查类型，这就是它的全部特性。</p>

<pre><code><span></span>
<span>var  myPrivateMethod  = Symbol();</span>
<span>this[myPrivateMethod] = function() {'{'}...};</span>
<span></span>
</code></pre>

<p>如果用<code>Symbor.for</code>创建了一个<code>symbol</code>, 下次再用相同的参数来访问，是返回相同的<code>symbol</code>。<code>Symbol.keyFor(sym)</code>方法用来获取<code>symbol</code>注册表中与某个<code>symbol</code>关联的键：</p>

<pre><code><span></span>
<span>let s1 = Symbol.for("111");</span>
<span>Symbol.keyFor(s1); // "111"</span>
<span>let s2 = Symbol("222");</span>
<span>Symbol.keyFor(s2); // undefined</span>
<span></span>
</code></pre>

<p>下面来看看如何将<code>Symbol</code>应用于实际业务中：</p>

<ol>
<li><strong>私有属性</strong>，由于<code>Symbol</code>类型的数据不可枚举，可以在类里模拟私有属性：</li>
</ol>

<pre><code><span></span>
<span>var  myPrivateProp  = Symbol();</span>
<span>class People{'{'}</span>
<span>    constructor(){'{'}</span>
<span>        this[myPrivateProp] = 'Secret' // 实例无法读取到该变量，仅可在类里使用</span>
<span>    }</span>
<span>    getValue() {'{'}</span>
<span>        return this[myPrivateProp]</span>
<span>    }</span>
<span>    setValue(val) {'{'}</span>
<span>        return this[myPrivateProp] = val</span>
<span>    }</span>
<span>}</span>
<span></span>
</code></pre>

<ol>
<li><p><strong>避免属性污染</strong>，有时候我们进行 mixin 操作，或对某个对象进行属性添加等情况下，尤其是在协作开发时很有可能会出现属性命名相同而被覆盖的情况，所以将属性名定义为<code>Symbol</code>类型可以有效避免这些情况的发生</p></li>
<li><p><strong>防止<code>XSS</code></strong>，原理是<code>JSON</code>中不能存储<code>Symbol</code>对象</p></li>
</ol>

<h3 id='数组拓展'>数组拓展</h3>

<p><strong>includes</strong><br></br>判断数组中是否有某值,功能和 indexOf() 类似。</p>

<pre><code><span></span>
<span>let arr = ['react', 'angular', 'vue'];</span>
<span>arr.includes('react') // true</span>
<span>arr.includes('jquery') // false</span>
<span></span>
<span>arr.indexOf('react') // 0</span>
<span>arr.indexOf('jquery') // -1</span>
<span></span>
</code></pre>

<p><strong>flat</strong><br></br><code>flat()</code> 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。<br></br>主要用途：数组降维、去除空项</p>

<pre><code><span></span>
<span>var arr1 = [1, 2, [3, [4, 5]];</span>
<span>arr1.flat();    // [1, 2, 3, [4, 5]]</span>
<span>arr1.flat(2);    // [1, 2, 3, 4, 5]</span>
<span></span>
<span>var arr2 = [1,,3,4,5]</span>
<span>arr2.flat();    // [1,3,4,5]</span>
<span></span>
<span></span>
</code></pre>

<hr />

<h3 id='正则拓展'>正则拓展</h3>

<p><strong>命名捕获</strong><br></br>ES2018允许命名捕获组使用符号<code>?&lt;name&gt;</code>，在打开捕获括号(后立即命名</p>

<pre><code><span></span>
<span>var reDate = /(?&lt;year&gt;[0-9]{'{'}4})-(?&lt;month&gt;[0-9]{'{'}2})-(?&lt;day&gt;[0-9]{'{'}2})/</span>
<span>var match = reDate.exec(reDate)</span>
<span>console.log(match.groups)  // {'{'}year: "2018", month: "04", day: "30"}</span>
<span></span>
</code></pre>

<p><strong>dotAll模式</strong><br></br>正则表达式中点.匹配除回车外的任何单字符，标记s改变这种行为，允许行终止符的出现</p>

<pre><code><span></span>
<span>/hello.world/.test('hello\nworld');  // false</span>
<span>/hello.world/s.test('hello\nworld'); // true</span>
<span></span>
</code></pre>

<hr />

<h3 id='函数默认值'>函数默认值</h3>

<p>函数可以在定义的时候为参数设置默认值</p>

<pre><code><span></span>
<span>function foo(height = 50, color = 'red'){'{'}</span>
<span>    // ...</span>
<span>}</span>
<span></span>
</code></pre>

<p>过去我们实现类似的功能需要如下的办法：</p>

<pre><code><span></span>
<span>function foo(height, color){'{'}</span>
<span>    var height = height || 50;</span>
<span>    var color = color || 'red';</span>
<span>    //...</span>
<span>}</span>
<span></span>
</code></pre>

<h3 id='Set 和 WeakSet'>Set 和 WeakSet</h3>

<p>Set(集合) ES6 新增的一种新的数据结构，类似于数组，但成员是唯一且无序的，没有重复的值。Set 本身是一种构造函数，用来生成 Set 数据结构。<br></br>举个例子，用 Set 来实现数组去重：</p>

<pre><code><span></span>
<span>// 去重数组的重复对象</span>
<span>let arr = [1, 2, 3, 2, 1, 1]</span>
<span>[... new Set(arr)]  // [1, 2, 3]</span>
<span></span>
</code></pre>

<p>Set 对象允许你储存任何类型的唯一值，无论是原始值或者是对象引用,但是 WeakSet 对象允许你将弱引用对象储存在一个集合中。WeakSet 对象中储存的对象值都是被弱引用的，即垃圾回收机制不考虑 WeakSet 对该对象的应用，如果没有其他的变量或属性引用这个对象值，则这个对象将会被垃圾回收掉</p>

<h3 id='Map 和 WeakMap'>Map 和 WeakMap</h3>

<p>Map(字典) 在 JavaScript 中是一个非常必须的数据结构。和set结构的区别是：集合 是以 [value, value]的形式储存元素，字典 是以 [key, value] 的形式储存。</p>

<p>Objects 和 Maps 类似的是，它们都允许你按键存取一个值、删除键、检测一个键是否绑定了值。因此（并且也没有其他内建的替代方式了）过去我们一直都把对象当成 Maps 使用。不过 Maps 和 Objects 有一些重要的区别，在下列情况里使用 Map 会是更好的选择：</p>

<ul>
<li>一个Object的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值，包括函数、对象、基本类型。</li>
<li>Map 中的键值是有序的，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按插入的顺序返回键值。</li>
<li>你可以通过 size 属性直接获取一个 Map 的键值对个数，而 Object 的键值对个数只能手动计算。</li>
<li>Map 可直接进行迭代，而 Object 的迭代需要先获取它的键数组，然后再进行迭代。</li>
<li>Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。</li>
<li>Map 在涉及频繁增删键值对的场景下会有些性能优势。</li>
</ul>

<pre><code><span></span>
<span>let map2=new Map([['name','danny'],[true,false]])</span>
<span>map2.set('key','666')</span>
<span>console.log(map2.size)  //3</span>
<span></span>
</code></pre>

<p>WeakMap 的 key 只能是 Object 类型。原始类型不能作为key值,在原生的WeakMap中,每个键对自己所引用对象的引用是 "弱引用",这意味着,如果没有其他引用和该键引用同一个对象,这个对象将会被当作垃圾回收，即不会发生内存泄漏问题。</p>

<pre><code><span></span>
<span>var wm1 = new WeakMap();</span>
<span>wm1.set({'{'}}, 37);</span>
<span></span>
</code></pre>

<hr />

<h3 id='Promise函数'>Promise函数</h3>

<table><tbody><tr><th> 方法 </th><th>  结果</th></tr><tr><td> Promise.all </td><td>  返回一个promise对象，有一个reject就返回reject</td></tr><tr><td> Promise.race </td><td>  返回一个promise对象，回调最先解析出的结果 </td></tr><tr><td> Promise.reject </td><td>  返回一个带有拒绝原因reason参数的Promise对象</td></tr><tr><td> Promise.resolve </td><td>  返回一个以给定值解析后的Promise对象</td></tr></tbody></table>

<p><strong>finally</strong> <br></br>在某些情况，不管成功还是失败都要执行相同的代码，则可以把逻辑写进 <code>.finally()</code> 中。</p>

<pre><code><span></span>
<span>function doSomething() {'{'}</span>
<span>  doSomething1()</span>
<span>  .then(doSomething2)</span>
<span>  .then(doSomething3)</span>
<span>  .catch(err =&gt; {'{'}</span>
<span>    console.log(err);</span>
<span>  })</span>
<span>  .finally(() =&gt; {'{'}</span>
<span>    // finish here!</span>
<span>  });</span>
<span>}</span>
<span></span>
</code></pre>

<blockquote>
  <p><strong>Tips</strong><br></br>promise有三种状态: fulfilled(操作成功完成), rejected(操作失败), pending(初始状态)<br></br>Promise解决了层层回调函数的问题</p>
</blockquote>

<hr />

<h3 id='Generators生成器'>Generators生成器</h3>

<p>就像 Promises 可以帮我们避免回调地狱，Generators 可以帮助我们让代码风格更整洁－－用同步的代码风格来写异步代码，它本质上是一个可以暂停计算并且可以随后返回表达式的值的函数。</p>

<pre><code><span></span>
<span>function* gen(){'{'}</span>
<span>    yield 1</span>
<span>    yield 2</span>
<span>    yield 3 </span>
<span>    return 4</span>
<span>}</span>
<span></span>
<span>let g=gen()</span>
<span></span>
<span>console.log(g.next())  // {'{'}value: 1, done: false}</span>
<span>console.log(g.next())  // {'{'}value: 2, done: false}</span>
<span>console.log(g.next())  // {'{'}value: 3, done: false}</span>
<span>console.log(g.next())  // {'{'}value: 4, done: true}</span>
<span></span>
</code></pre>

<p>Generator 提供的 API：<br></br>Generator.prototype.next()  // 返回一个由 yield表达式生成的值，例如: {'{'}value: 0, done: false}<br></br>Generator.prototype.return()  // 返回给定的生成器，并结束生成器<br></br>Generator.prototype.throw() //  向生成器抛出一个错误</p>

<p>除此之外，Generator 函数的next()方法还接受参数，这是向 Generator 函数体内输入数据：</p>

<pre><code><span></span>
<span>function* gen(x) {'{'}</span>
<span>    yield yield x ? x : 0 + 2;</span>
<span>}</span>
<span>var g = gen();</span>
<span>console.log(g.next())  // {'{'} value: 2, done: false }</span>
<span>console.log(g.next(1))  // {'{'} value: 1, done: false }</span>
<span></span>
</code></pre>

<p>上面的第二次方法中,第二次 <code>g.next(1)</code>,将 1 作为结果返回。</p>

<hr />

<h3 id='Iterator遍历器'>Iterator遍历器</h3>

<blockquote>
  <p>iterator 为每一个对象定义了默认的迭代器。该迭代器可以被 for...of 循环使用。一些内置类型 Array、String、 Map、 Set 、 TypedArray 拥有默认的迭代器行为，其他类型则没有。</p>
</blockquote>

<p>凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。</p>

<p>有一些场合会默认调用Iterator接口（即Symbol.iterator方法），除了<code>for...of循环</code>，还有几个别的场合:<code>解构赋值</code>,<code>扩展运算符(...)</code>,<code>yield*_yield*</code>后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口,由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合都会调用。</p>

<pre><code><span></span>
<span>var arr = ['w', 'y', 'k', 'o', 'p'];</span>
<span>var eArr = arr[Symbol.iterator]();</span>
<span>// 您的浏览器必须支持for...of循环</span>
<span>// 以及let —— 将变量作用域限定在 for 循环中</span>
<span>for (let letter of eArr) {'{'}</span>
<span>  console.log(letter); </span>
<span>}</span>
<span>// 或者这样调用：</span>
<span>console.log(eArr.next().value); // w</span>
<span></span>
</code></pre>

<pre><code><span></span>
<span>var myIterable = {'{'}}</span>
<span>myIterable[Symbol.iterator] = function* () {'{'}</span>
<span>    yield 1;</span>
<span>    yield 2;</span>
<span>    yield 3;</span>
<span>};</span>
<span>[...myIterable] // [1, 2, 3]</span>
<span></span>
<span></span>
</code></pre>

<h3 id='for...in 与 for...of'>for...in 与 for...of</h3>

<p>无论是 <code>for...in</code> 还是 <code>for...of</code> 语句都是迭代一些东西。它们之间的主要区别在于它们的迭代方式:</p>

<ul>
<li><code>for...in</code> 语句以原始插入顺序迭代对象的可枚举属性，注意它也会遍历原型链的可枚举属性，如果只想遍历对象本身需要配合 <code>hasOwnProperty</code> 使用</li>
<li><code>for...of</code> 遍历可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）定义要迭代的数据，如果其他类型数据想变成可迭代对象需要在其自身或原型链上定义<code>Symbol.iterator</code>属性</li>
</ul>

<pre><code><span></span>
<span>let obj = {'{'}</span>
<span>    name: 'Dinosaur',</span>
<span>    age: 23</span>
<span>}</span>
<span>// 将 obj 变成可迭代对象</span>
<span>obj[Symbol.iterator] = function () {'{'}</span>
<span>    let keys = Object.keys(this);</span>
<span>    let index = 0;</span>
<span>    return {'{'}</span>
<span>        next: () =&gt; {'{'}</span>
<span>            return {'{'} value: this[keys[index++]], done: index &gt; keys.length };</span>
<span>        }</span>
<span>    }</span>
<span>}</span>
<span>for (let value of obj) {'{'}</span>
<span>    console.log(value) // Dinosaur 23</span>
<span>}</span>
<span></span>
</code></pre>

<h3 id='Async Await'>Async Await</h3>

<pre><code><span></span>
<span>function getJSON(url) {'{'}</span>
<span>  return new Promise(function(resolve, reject) {'{'}</span>
<span>    request(url, function(error, response, body) {'{'}</span>
<span>      resolve(body);</span>
<span>    });</span>
<span>  });</span>
<span>}</span>
<span></span>
<span>async function main() {'{'}</span>
<span>  var data = await getJSON();</span>
<span>  console.log(data); // NOT undefined!</span>
<span>}</span>
<span></span>
</code></pre>

<p>ES2018引入异步迭代器（asynchronous iterators），这就像常规迭代器，除了next()方法返回一个Promise。因此await可以和for...of循环一起使用，以串行的方式运行异步操作。</p>

<pre><code><span></span>
<span>async function process(array) {'{'}</span>
<span>  for await (let i of array) {'{'}</span>
<span>    doSomething(i);</span>
<span>  }</span>
<span>}</span>
<span></span>
</code></pre>

<hr />

<h3 id='Class 类'>Class 类</h3>

<p>JavaScript是没有类的概念的，ES6的类只不过是在原先的基础上坐了一层语法糖，看起来更像Java等语言的class</p>

<pre><code><span></span>
<span>class Personal extends Person {'{'}</span>
<span>    constructor(name, age, gender, occupation, hobby) {'{'}</span>
<span>        super(name, age, gender);</span>
<span>        this.occupation = occupation;</span>
<span>        this.hobby = hobby;</span>
<span>    }</span>
<span></span>
<span>    incrementAge() {'{'}</span>
<span>        super.incrementAge();</span>
<span>        this.age += 20;</span>
<span>        console.log(this.age);</span>
<span>    }</span>
<span>}</span>
<span></span>
</code></pre>

<p>ES6Class 特性：<br></br>1. 内部所有属性都是不可枚举的;<br></br>2. 必须通过 new 操作来调用;<br></br>3. 不存在变量提升;<br></br>4. 默认为严格模式;<br></br>5. 子类必须在父类的构造函数中调用 super(),这样才能有 this 对象;</p>

<hr />

<h3 id='模块'>模块</h3>

<p>经常谈起模块化主要几种：AMD、CMD、CommonJS以及ES6模块，AMD具体实现是require.js，CMD是sea.js,但是随着前端的工程化发展，这两款在业务开发上已经渐渐退去热度。CommonJS在nodejs服务器段开发下经常被用到，至于ES6模块化也在ES6的普及下渐渐有了起色。</p>

<p><strong>CommonJS规范</strong>：使用require引入模块，使用exports导出模块</p>

<pre><code><span></span>
<span>//导出</span>
<span>exports.getInfo=function(){'{'}</span>
<span>    console.log('Hello World!')</span>
<span>}</span>
<span></span>
<span>//引入</span>
<span>var getInfo=require('./getInfo.js').getInfo</span>
<span></span>
</code></pre>

<p><strong>ES6 module</strong>:使用import引入模块,使用export导出模块</p>

<pre><code><span></span>
<span>//导出</span>
<span>function getInfo(){'{'}</span>
<span>    console.log('Hello World!')</span>
<span>}</span>
<span>var name = '666';</span>
<span></span>
<span>export getInfo;</span>
<span>export default getInfo;</span>
<span>export {'{'}getInfo,name};</span>
<span></span>
<span>//引入</span>
<span>import a from './getInfo.js'</span>
<span>import * as a from './getInfo.js' </span>
<span>import {'{'} a } from './getInfo.js'</span>
<span></span>
</code></pre>

<p>两者区别：require使用非常简单，它相当于module.exports的传送门，module.exports后面的内容是什么，require的结果就是什么，require运行的结果可以直接赋值给变量，但是import则非常严格，必须是放在文件的开头，而且格式确定，并且不会运行引入的模块，只是将其进行编译。</p>

<hr />

<h3 id='Proxy'>Proxy</h3>

<p>基本用法：</p>

<pre><code><span></span>
<span>let pro = new Proxy(target,handler);</span>
<span>// target 表示所要拦截的目标对象</span>
<span>// handler 也是一个对象，用来定制拦截行为</span>
<span></span>
</code></pre>

<p>看个例子：</p>

<pre><code><span></span>
<span>let person = {'{'}</span>
<span>    name: "赵云",</span>
<span>    age: 25</span>
<span>}</span>
<span></span>
<span>let handler = {'{'}</span>
<span>    // 读取对象时，进行 get 操作</span>
<span>    get: (target, propKey, receiver) =&gt; {'{'}</span>
<span>        return `我的名字叫：${'{'}target[propKey]}`</span>
<span>    },</span>
<span>    // 给对象赋值时，执行 set 操作</span>
<span>    set: (target, propKey, value, receiver) =&gt; {'{'}</span>
<span>        target[propKey] = `set(${'{'}value})`</span>
<span>        return true</span>
<span>    }</span>
<span></span>
<span>}</span>
<span>let personProxy = new Proxy(person, handler);</span>
<span></span>
<span>console.log(personProxy.name);// 我的名字叫：赵云</span>
<span>personProxy.name = "黄忠";</span>
<span>console.log(personProxy.name);// 我的名字叫：set(黄忠)</span>
<span></span>
</code></pre>

<h3 id='Reflect'>Reflect</h3>

<p>Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。Reflect 没有构造函数，不能 new 使用。</p>

<p>Reflect 提供13种静态方法:</p>

<p>Reflect.apply(target, thisArg, args)<br></br>Reflect.construct(target, args)<br></br>Reflect.get(target, name, receiver)<br></br>Reflect.set(target, name, value, receiver)<br></br>Reflect.defineProperty(target, name, desc)<br></br>Reflect.deleteProperty(target, name)<br></br>Reflect.has(target, name)<br></br>Reflect.ownKeys(target)<br></br>Reflect.isExtensible(target)<br></br>Reflect.preventExtensions(target)<br></br>Reflect.getOwnPropertyDescriptor(target, name)<br></br>Reflect.getPrototypeOf(target)<br></br>Reflect.setPrototypeOf(target, prototype)</p>

<p>下面几个例子来解释 Reflect 相较于 Object对象的优点：</p>

<p>1.Reflect 让Object操作变成函数行为</p>

<pre><code><span></span>
<span>let cat = {'{'} name: 'ketty', age: 18 }</span>
<span>console.log('name' in cat);// --&gt; true </span>
<span>console.log(Reflect.has(cat,'name'));// --&gt; true</span>
<span></span>
</code></pre>

<p>2.Reflect(target, name, property) 返回布尔类型，语义化更佳</p>

<pre><code><span></span>
<span>//Object对象方法</span>
<span>try {'{'}</span>
<span>  Object.defineProperty(target, name, property);</span>
<span>} catch (e) {'{'}</span>
<span>  console.log("error");</span>
<span>}</span>
<span>//Reflect对象方法</span>
<span>if (Reflect(target, name, property)) {'{'}</span>
<span>  console.log("success");</span>
<span>} else {'{'}</span>
<span>  console.log("error");</span>
<span>}</span>
<span></span>
</code></pre>

<p>3.Reflect对象的操作和Proxy对象的操作一一对应，在Proxy的拦截操作中，可以直接利用Reflect对象直接获取Proxy的默认值。</p>

<pre><code><span></span>
<span>let person = {'{'}</span>
<span>    name: "赵云",</span>
<span>    age: 25</span>
<span>}</span>
<span></span>
<span>let handler = {'{'}</span>
<span>  // 读取对象时，进行 get 操作</span>
<span>  get: (target, propKey, receiver) =&gt; {'{'}</span>
<span>      return Reflect.get(target, propKey, receiver)</span>
<span>  }</span>
<span>}</span>
<span></span>
</code></pre>

<hr />

<h3 id='数学运算符'>数学运算符</h3>

<p><code>a ** b</code> <strong>指数运算符</strong>，它与 <code>Math.pow(a, b)</code> 相同。</p>

<pre><code><span></span>
<span>2 ** 3 // 8</span>
<span></span>
</code></pre>

<hr />

<h3 id='Object相关API'>Object相关API</h3>

<h4 id='Objec.values()'>Objec.values()</h4>

<p><code>Object.values()</code>是一个与<code>Object.keys()</code>类似的新函数，返回的是Object自身属性的所有值而不是键值，不包括继承的值。</p>

<pre><code><span></span>
<span>let arr3 = {'{'}1:'a',2:'b',3:'c'}</span>
<span>Object.values(arr3)    // ["a", "b", "c"]</span>
<span>Object.keys(arr3)   // ["1", "2", "3"]</span>
<span></span>
</code></pre>

<h4 id='Objec.entries()'>Objec.entries()</h4>

<p><code>Object.entries()</code>函数返回一个给定对象自身可枚举属性的键值对的数组。</p>

<pre><code><span></span>
<span>let arr3 = {'{'}1:'a',2:'b',3:'c'}</span>
<span>Object.entries(arrs);  // [["1", "a"],["2", "b"],["3", "c"]]</span>
<span></span>
</code></pre>

<h4 id='Objec.getOwnPropertyDescriptors()'>Objec.getOwnPropertyDescriptors()</h4>

<p><code>Object.getOwnPropertyDescriptors()</code>函数用来获取一个对象的所有自身属性的描述符,如果没有任何自身属性，则返回空对象。</p>

<pre><code><span></span>
<span>const obj = {'{'}</span>
<span>    name: 'Dinosaur',</span>
<span>    get age() {'{'} return '23' }</span>
<span>};</span>
<span>Object.getOwnPropertyDescriptors(obj)</span>
<span>// {'{'}</span>
<span>//   age: {'{'}</span>
<span>//     configurable: true,</span>
<span>//     enumerable: true,</span>
<span>//     get: function age(){'{'}}, //the getter function</span>
<span>//     set: undefined</span>
<span>//   },</span>
<span>//   name: {'{'}</span>
<span>//     configurable: true,</span>
<span>//     enumerable: true,</span>
<span>//      value:"Jine",</span>
<span>//      writable:true</span>
<span>//   }</span>
<span>// }</span>
<span></span>
</code></pre>

<hr />
</div>
            </Fragment>
        )
    }
}