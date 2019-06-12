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

<blockquote><p>平时写业务涉及到ES6/7/8常用的可能就常见的那几个，其他的不常用就忘记了，所以来专门记录一篇博客，以供经常翻阅之用。</p></blockquote>

<h3>箭头函数</h3>

<ol><li>匿名函数，不能作为构造函数，不能 new</li><li>没有arguments,可以使用rest参数</li></ol>

<p><code>
let a=(...arr)=&gt;{'{'}
    console.log(arr)  // [1,2,3,4]
}
a(1,2,3,4)
</code></p>

<ol><li>箭头函数不绑定this,会捕获上下文的this值</li></ol>

<p><code>
this.a=222
var obj = {'{'}
    a: 6,
    b: function () {'{'}
        console.log(this);  //obj
        console.log(this.a);//6
    },
    c: () =&gt; {'{'}
        console.log(this);  //{'{'}}
        console.log(this.a);//222
    },
    d: function () {'{'}
        setTimeout(() =&gt; {'{'}
            console.log(this);  //window
            console.log(this.a);//6
        }, 100);
    },
    e: function () {'{'}
        setTimeout(function () {'{'}
            console.log(this);  //timeout
            console.log(this.a);//undefined
        }, 100);
    }
}
</code>
4. 箭头函数不能当做Generator函数,不能使用yield关键字</p>

<hr/>

<h3>rest参数和拓展运算符</h3>

<p>rest参数和拓展运算符虽然都是“...”的形态，但是两者的作用范围却截然不同</p>

<p><strong>rest参数</strong>：Rest就是为解决传入的参数数量不一定,数组的相关的方法都可以用</p>

<p><code>
function realSort(...rest) {'{'}
    console.log(rest.sort((a,b)=&gt;a-b))
}
realSort(1,10,3) // [ 1, 3, 10 ]
</code></p>

<p><strong>拓展运算符</strong>：可以看作是rest参数的逆运算（展开数组操作），将数组转为字符串
<code>
console.log(1,2,...[4,5,6],7,8)  // 1 2 4 5 6 7 8
</code></p>

<p>同时，ES2018为对象解构提供了和数组一样的Rest参数和展开操作符：
<code></code>`
const obj = {'{'}a:1,b:2,c:3}
const {'{'}a,...x} = obj
console.log(x)  // {'{'}b:2,c:3}</p>

<p>const obj1 = {'{'} a: 1, b: 2, c: 3 };
const obj2 = {'{'} ...obj1, d: 4 }; // {'{'} a: 1, b: 2, c: 3, d: 4 };
<code></code>`</p>

<hr/>

<h3>字符串拓展</h3>

<p><strong>includes</strong>
判断字符串是否有某值</p>

<p><code>
console.log(&quot;abcd&quot;.includes(&#39;a&#39;))   //true
console.log(&quot;abcd&quot;.includes(&#39;z&#39;))   //false
</code>
<strong>repeat</strong>
复制字符串</p>

<p><code>
console.log(&quot;abcd&quot;.repeat(3))   //abcdabcdabcd
</code></p>

<p><strong>padStart() 与 padEnd()</strong></p>

<blockquote><p><code>String.padStart(targetLength,[padString])</code>
<code>String.padEnd(targetLength,padString])</code>
<strong>targetLength</strong>:当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
<strong>padString</strong>:(可选) 填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断，此参数的缺省值为 &quot; &quot;；</p></blockquote>

<p><code></code>`
&#39;abc&#39;.padStart(6,&#39;1&#39;)   //  &quot;111abc&quot;
&#39;abc&#39;.padStart(3,&#39;1&#39;)   //  &quot;abc&quot;
&#39;abc&#39;.padStart(5)       //  &quot;  abc&quot;</p>

<p>&#39;abc&#39;.padEnd(6,&#39;1&#39;)   //  &quot;abc111&quot;
&#39;abc&#39;.padEnd(3,&#39;1&#39;)   //  &quot;abc&quot;
&#39;abc&#39;.padEnd(5)       //  &quot;abc  &quot;</p>

<p><code></code>`</p>

<p><strong>trimStart() 和 trimEnd()</strong>
顾名思义，该方法就是去除字符串首/尾空白符。
<code>
&quot; sss &quot;.trim()      // &quot;sss&quot;
&quot; sss &quot;.trimStart() // &quot;sss &quot;
&quot; sss &quot;.trimEnd()   // &quot; sss&quot;
</code></p>

<hr/>

<h3>数组拓展</h3>

<p><strong>includes</strong>
判断数组中是否有某值,功能和 indexOf() 类似。
<code></code>`
let arr = [&#39;react&#39;, &#39;angular&#39;, &#39;vue&#39;];
arr.includes(&#39;react&#39;) // true
arr.includes(&#39;jquery&#39;) // false</p>

<p>arr.indexOf(&#39;react&#39;) // 0
arr.indexOf(&#39;jquery&#39;) // -1
<code></code>`</p>

<p><strong>flat</strong>
<code>flat()</code> 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
主要用途：数组降维、去除空项
<code></code>`
var arr1 = [1, 2, [3, [4, 5]];
arr1.flat();    // [1, 2, 3, [4, 5]]
arr1.flat(2);    // [1, 2, 3, 4, 5]</p>

<p>var arr2 = [1,,3,4,5]
arr2.flat();    // [1,3,4,5]</p>

<p><code></code>`</p>

<hr/>

<h3>正则拓展</h3>

<p><strong>命名捕获</strong>
ES2018允许命名捕获组使用符号<code>?&lt;name&gt;</code>，在打开捕获括号(后立即命名
<code>
var reDate = /(?&lt;year&gt;[0-9]{'{'}4})-(?&lt;month&gt;[0-9]{'{'}2})-(?&lt;day&gt;[0-9]{'{'}2})/
var match = reDate.exec(reDate)
console.log(match.groups)  // {'{'}year: &quot;2018&quot;, month: &quot;04&quot;, day: &quot;30&quot;}
</code></p>

<p><strong>dotAll模式</strong>
正则表达式中点.匹配除回车外的任何单字符，标记s改变这种行为，允许行终止符的出现
<code>
/hello.world/.test(&#39;hello\nworld&#39;);  // false
/hello.world/s.test(&#39;hello\nworld&#39;); // true
</code></p>

<hr/>

<h3>解构赋值</h3>

<p><code>
let [b, c, d] = [1, 2, 3]
console.log(b, c, d)  //1,2,3
let {'{'} b1, c1 } = {'{'} b1: 1, c1: 2 }
console.log(b1, c1)   // 1,2
</code>
结构赋值在函数中的应用
<code>
function body({'{'} eye, mouse } = {'{'} eye: 16, mouse: 20 }) {'{'}
    console.log(eye, mouse);
}
body({'{'}eye:10,mouse:10}) //10 10
body()  //16 20
body({'{'}eye:10})  //10 undefined
</code></p>

<hr/>

<h3>函数默认值</h3>

<p>函数可以在定义的时候为参数设置默认值
<code>
function foo(height = 50, color = &#39;red&#39;){'{'}
    // ...
}
</code>
过去我们实现类似的功能需要如下的办法：
<code>
function foo(height, color){'{'}
    var height = height || 50;
    var color = color || &#39;red&#39;;
    //...
}
</code></p>

<h3>Maps 和 WeakMaps</h3>

<p>Maps 在 JavaScript 中是一个非常必须的数据结构.在ES6之前通过object实现哈希表,但是Es6引入maps结构后有一些优点
1. map可以使用任何类型的值作为key值，允许对值进行 set、get 和 search
2. object有原型，原型链上的键名有可能和对象上的键名产生冲突，但是map不会出现这种问题
3. map可以直接通过 .size计算键值对个数</p>

<p><code>
let map2=new Map([[&#39;name&#39;,&#39;danny&#39;],[true,false]])
map2.set(&#39;key&#39;,&#39;666&#39;)
console.log(map2.size)  //3
</code></p>

<p>WeakMap 的 key 只能是 Object 类型。原始类型不能作为key值,在原生的WeakMap中,每个键对自己所引用对象的引用是 &quot;弱引用&quot;,这意味着,如果没有其他引用和该键引用同一个对象,这个对象将会被当作垃圾回收，即不会发生内存泄漏问题。</p>

<p><code>
var wm1 = new WeakMap();
wm1.set({'{'}}, 37);
</code></p>

<hr/>

<h3>Promise函数</h3>

<p>| 方法 |  结果|
|--|--|
| Promise.all |  返回一个promise对象，有一个reject就返回reject|
| Promise.race |  返回一个promise对象，回调最先解析出的结果|
| Promise.reject |  返回一个带有拒绝原因reason参数的Promise对象|
| Promise.resolve |  返回一个以给定值解析后的Promise对象|</p>

<p><strong>finally</strong> 
在某些情况，不管成功还是失败都要执行相同的代码，则可以把逻辑写进 <code>.finally()</code> 中。
<code>
function doSomething() {'{'}
  doSomething1()
  .then(doSomething2)
  .then(doSomething3)
  .catch(err =&gt; {'{'}
    console.log(err);
  })
  .finally(() =&gt; {'{'}
    // finish here!
  });
}
</code></p>

<hr/>

<h3>Generators生成器</h3>

<p>就像 Promises 可以帮我们避免回调地狱，Generators 可以帮助我们让代码风格更整洁－－用同步的代码风格来写异步代码，它本质上是一个可以暂停计算并且可以随后返回表达式的值的函数。</p>

<p><code></code>`
function* gen(){'{'}
    yield 1
    yield 2
    yield 3 
    return 4
}</p>

<p>let g=gen()</p>

<p>console.log(g.next())  // {'{'}value: 1, done: false}
console.log(g.next())  // {'{'}value: 2, done: false}
console.log(g.next())  // {'{'}value: 3, done: false}
console.log(g.next())  // {'{'}value: 4, done: true}
<code></code>`</p>

<p>Generator 提供的 API：
Generator.prototype.next()  // 返回一个由 yield表达式生成的值，例如: {'{'}value: 0, done: false}
Generator.prototype.return()  // 返回给定的生成器，并结束生成器
Generator.prototype.throw() //  向生成器抛出一个错误</p>

<p>除此之外，Generator 函数的next()方法还接受参数，这是向 Generator 函数体内输入数据：
<code>
function* gen(x) {'{'}
    yield yield x ? x : 0 + 2;
}
var g = gen();
console.log(g.next())  // {'{'} value: 2, done: false }
console.log(g.next(1))  // {'{'} value: 1, done: false }
</code></p>

<p>上面的第二次方法中,第二次 <code>g.next(1)</code>,将 1 作为结果返回。</p>

<hr/>

<h3>Iterator遍历器</h3>

<blockquote><p>iterator 为每一个对象定义了默认的迭代器。该迭代器可以被 <code>for...of</code> 循环使用。一些内置类型<code>Array String Map Set TypedArray</code>拥有默认的迭代器行为，其他类型则没有。</p></blockquote>

<p>凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。</p>

<p>有一些场合会默认调用Iterator接口（即Symbol.iterator方法），除了<code>for...of循环</code>，还有几个别的场合:<code>解构赋值</code>,<code>扩展运算符(...)</code>,<code>yield*_yield*</code>后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口,由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合都会调用。</p>

<p><code>
var arr = [&#39;w&#39;, &#39;y&#39;, &#39;k&#39;, &#39;o&#39;, &#39;p&#39;];
var eArr = arr[Symbol.iterator]();
// 您的浏览器必须支持for...of循环
// 以及let —— 将变量作用域限定在 for 循环中
for (let letter of eArr) {'{'}
  console.log(letter); 
}
// 或者这样调用：
console.log(eArr.next().value); // w
</code></p>

<p><code></code>`
var myIterable = {'{'}}
myIterable[Symbol.iterator] = function* () {'{'}
    yield 1;
    yield 2;
    yield 3;
};
[...myIterable] // [1, 2, 3]</p>

<p><code></code>`</p>

<h3>Async Await</h3>

<p><code></code>`
function getJSON(url) {'{'}
  return new Promise(function(resolve, reject) {'{'}
    request(url, function(error, response, body) {'{'}
      resolve(body);
    });
  });
}</p>

<p>async function main() {'{'}
  var data = await getJSON();
  console.log(data); // NOT undefined!
}
<code></code>`</p>

<p>ES2018引入异步迭代器（asynchronous iterators），这就像常规迭代器，除了next()方法返回一个Promise。因此await可以和for...of循环一起使用，以串行的方式运行异步操作。
<code>
async function process(array) {'{'}
  for await (let i of array) {'{'}
    doSomething(i);
  }
}
</code></p>

<hr/>

<h3>Class 类</h3>

<p>JavaScript是没有类的概念的，ES6的类只不过是在原先的基础上坐了一层语法糖，看起来更像Java等语言的class
<code></code>`
class Personal extends Person {'{'}
    constructor(name, age, gender, occupation, hobby) {'{'}
        super(name, age, gender);
        this.occupation = occupation;
        this.hobby = hobby;
    }</p>

<pre><code>incrementAge() {'{'}
    super.incrementAge();
    this.age += 20;
    console.log(this.age);
}</code></pre>

<p>}
<code></code>`
ES6Class 特性：
1. 内部所有属性都是不可枚举的;
2. 必须通过 new 操作来调用;
3. 不存在变量提升;
4. 默认为严格模式;
5. 子类必须在父类的构造函数中调用 super(),这样才能有 this 对象;</p>

<hr/>

<h3>模块</h3>

<p>经常谈起模块化主要几种：AMD、CMD、CommonJS以及ES6模块，AMD具体实现是require.js，CMD是sea.js,但是随着前端的工程化发展，这两款在业务开发上已经渐渐退去热度。CommonJS在nodejs服务器段开发下经常被用到，至于ES6模块化也在ES6的普及下渐渐有了起色。</p>

<p><strong>CommonJS规范</strong>：使用require引入模块，使用exports导出模块
<code></code>`
//导出
exports.getInfo=function(){'{'}
    console.log(&#39;Hello World!&#39;)
}</p>

<p>//引入
var getInfo=require(&#39;./getInfo.js&#39;).getInfo
<code>
**ES6 module**:使用import引入模块,使用export导出模块
</code>
//导出
function getInfo(){'{'}
    console.log(&#39;Hello World!&#39;)
}
var name = &#39;666&#39;;</p>

<p>export getInfo;
export default getInfo;
export {'{'}getInfo,name};</p>

<p>//引入
import a from &#39;./getInfo.js&#39;
import * as a from &#39;./getInfo.js&#39; 
import {'{'} a } from &#39;./getInfo.js&#39;
<code></code>`
两者区别：require使用非常简单，它相当于module.exports的传送门，module.exports后面的内容是什么，require的结果就是什么，require运行的结果可以直接赋值给变量，但是import则非常严格，必须是放在文件的开头，而且格式确定，并且不会运行引入的模块，只是将其进行编译。</p>

<hr/>

<h3>Proxy</h3>

<p>基本用法：
<code>
let pro = new Proxy(target,handler);
// target 表示所要拦截的目标对象
// handler 也是一个对象，用来定制拦截行为
</code></p>

<p>看个例子：
<code></code>`
let person = {'{'}
    name: &quot;赵云&quot;,
    age: 25
}</p>

<p>let handler = {'{'}
    // 读取对象时，进行 get 操作
    get: (target, propKey, receiver) =&gt; {'{'}
        return <code>我的名字叫：${'{'}target[propKey]}</code>
    },
    // 给对象赋值时，执行 set 操作
    set: (target, propKey, value, receiver) =&gt; {'{'}
        target[propKey] = <code>set(${'{'}value})</code>
        return true
    }</p>

<p>}
let personProxy = new Proxy(person, handler);</p>

<p>console.log(personProxy.name);// 我的名字叫：赵云
personProxy.name = &quot;黄忠&quot;;
console.log(personProxy.name);// 我的名字叫：set(黄忠)
<code></code>`</p>

<h3>Reflect</h3>

<p>Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。Reflect 没有构造函数，不能 new 使用。</p>

<p>Reflect 提供13种静态方法:</p>

<p>Reflect.apply(target, thisArg, args)
Reflect.construct(target, args)
Reflect.get(target, name, receiver)
Reflect.set(target, name, value, receiver)
Reflect.defineProperty(target, name, desc)
Reflect.deleteProperty(target, name)
Reflect.has(target, name)
Reflect.ownKeys(target)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.getOwnPropertyDescriptor(target, name)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, prototype)</p>

<p>下面几个例子来解释 Reflect 相较于 Object对象的优点：</p>

<p>1.Reflect 让Object操作变成函数行为
<code>
let cat = {'{'} name: &#39;ketty&#39;, age: 18 }
console.log(&#39;name&#39; in cat);// --&gt; true 
console.log(Reflect.has(cat,&#39;name&#39;));// --&gt; true
</code></p>

<p>2.Reflect(target, name, property) 返回布尔类型，语义化更佳
<code>
//Object对象方法
try {'{'}
  Object.defineProperty(target, name, property);
} catch (e) {'{'}
  console.log(&quot;error&quot;);
}
//Reflect对象方法
if (Reflect(target, name, property)) {'{'}
  console.log(&quot;success&quot;);
} else {'{'}
  console.log(&quot;error&quot;);
}
</code></p>

<p>3.Reflect对象的操作和Proxy对象的操作一一对应，在Proxy的拦截操作中，可以直接利用Reflect对象直接获取Proxy的默认值。
<code></code>`
let person = {'{'}
    name: &quot;赵云&quot;,
    age: 25
}</p>

<p>let handler = {'{'}
  // 读取对象时，进行 get 操作
  get: (target, propKey, receiver) =&gt; {'{'}
      return Reflect.get(target, propKey, receiver)
  }
}
<code></code>`</p>

<h3>对象属性简写</h3>

<p>在ES6中允许我们在设置一个对象的属性的时候不指定属性名。
<code></code>`
const name=&#39;Ming&#39;,age=&#39;18&#39;,city=&#39;Shanghai&#39;;
&lt;!-- 旧方法 --&gt;
const student = {'{'}
    name:name,
    age:age,
    city:city
};</p>

<p>&lt;!-- ES6写法 --&gt;
const student = {'{'}
    name,
    age,
    city
};</p>

<p><code></code>`</p>

<hr/>

<h3>数学运算符</h3>

<p><code>a ** b</code> <strong>指数运算符</strong>，它与 <code>Math.pow(a, b)</code> 相同。
<code>
2 ** 3 // 8
</code></p>

<hr/>

<h3>Object相关API</h3>

<h4>Objec.values()</h4>

<p><code>Object.values()</code>是一个与<code>Object.keys()</code>类似的新函数，返回的是Object自身属性的所有值而不是键值，不包括继承的值。
<code>
let arr3 = {'{'}1:&#39;a&#39;,2:&#39;b&#39;,3:&#39;c&#39;}
Object.values(arr3)    // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]
Object.keys(arr3)   // [&quot;1&quot;, &quot;2&quot;, &quot;3&quot;]
</code></p>

<h4>Objec.entries()</h4>

<p><code>Object.entries()</code>函数返回一个给定对象自身可枚举属性的键值对的数组。
<code>
let arr3 = {'{'}1:&#39;a&#39;,2:&#39;b&#39;,3:&#39;c&#39;}
Object.entries(arrs);  // [[&quot;1&quot;, &quot;a&quot;],[&quot;2&quot;, &quot;b&quot;],[&quot;3&quot;, &quot;c&quot;]]
</code></p>

<h4>Objec.getOwnPropertyDescriptors()</h4>

<p><code>Object.getOwnPropertyDescriptors()</code>函数用来获取一个对象的所有自身属性的描述符,如果没有任何自身属性，则返回空对象。</p>

<p><code>
const obj = {'{'}
	name: &#39;Dinosaur&#39;,
	get age() {'{'} return &#39;23&#39; }
};
Object.getOwnPropertyDescriptors(obj)
// {'{'}
//   age: {'{'}
//     configurable: true,
//     enumerable: true,
//     get: function age(){'{'}}, //the getter function
//     set: undefined
//   },
//   name: {'{'}
//     configurable: true,
//     enumerable: true,
//		value:&quot;Jine&quot;,
//		writable:true
//   }
// }
</code></p>

<hr/>
</div>
        )
    }
}