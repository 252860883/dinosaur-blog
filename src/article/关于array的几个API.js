import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"Array.prototype.map"},{"level":"h3","title":"Array.prototype.forEach"},{"level":"h3","title":"Array.prototype.Filter"},{"level":"h3","title":"Array.prototype.Sort"},{"level":"h3","title":"Array.prototype.Some"},{"level":"h3","title":"Array.prototype.Every"},{"level":"h3","title":"Array.prototype.FindIndex"},{"level":"h3","title":"Array.prototype.Find"},{"level":"h3","title":"Array.prototype.Reduce"},{"level":"h3","title":"Array.prototype.reduceRight"},{"level":"h3","title":"Array.prototype.includes(ES6新增)"},{"level":"h3","title":"Array.isArray(ES6新增)"},{"level":"h3","title":"Array.prototype.fill(ES6新增)"},{"level":"h3","title":"Array.prototype.entries/keys/values(ES6新增)"},{"level":"h3","title":"Array.of(ES6新增)"},{"level":"h3","title":"Array.from"},{"level":"h3","title":"参考"}]
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
<div className="title-content"><h1 className="title">关于array的常用的几个API</h1></div>
<h3 id='Array.prototype.map'>Array.prototype.map</h3>

<ul>
<li>新建一个数组，需要有承载对象,原始数组在调用它后不会发生变化</li>
<li>该数组中的每个元素都调用一个提供的函数后返回结果,否则返回 undefined</li>
</ul>

<p>对于map函数的底层实现，源码核心主要是利用<code>while</code>循环执行<code>callback</code>函数，将函数返回值放入数组即可。大概实现如下：</p>

<pre><code><span></span>
<span>Array.prototype.map = function (callbackfn, thisArg) {'{'}</span>
<span>    // 异常处理</span>
<span>    if (this == null) {'{'}</span>
<span>        throw new TypeError("Cannot read property 'map' of null or undefined");</span>
<span>    }</span>
<span>    // callbackfn 不是函数时抛出异常</span>
<span>    if (typeof callbackfn !== 'function') {'{'}</span>
<span>        throw new TypeError(callbackfn + ' is not a function')</span>
<span>    }</span>
<span>    // 调用 map 方法的原数组，以键值对形式</span>
<span>    let O = Object(this) </span>
<span>    let len = O.length</span>
<span>    // 执行 callback 时的this</span>
<span>    let T = thisArg </span>
<span>    // 要返回的数组</span>
<span>    let A = new Array(len) </span>
<span>    // 计数器</span>
<span>    let k = 0 </span>
<span>    while (k &lt; len) {'{'}</span>
<span>        let kValue = O[k]</span>
<span>        // 传入 this, 当前元素 element, 索引 index, 原数组对象 O</span>
<span>        let mappedValue = callbackfn.call(T, kValue, k, O)</span>
<span>        // 返回结果赋值给新生成数组</span>
<span>        A[k] = mappedValue</span>
<span>        k++</span>
<span>    }</span>
<span>    // 返回新数组</span>
<span>    return A</span>
<span>}</span>
<span></span>
</code></pre>

<p>通过源码我们可以发现，循环体并不是在<code>callbackfn</code>内，所以不能在<code>callbackfn</code>内设置<code>break</code>、<code>continue</code>和<code>return</code>来跳出循环。同时<code>callbackfn</code>也不能写成<code>async fuction</code>的形式，后果是会立刻执行循环而不是等待每次函数的<code>await</code>结束以后再执行下一次循环。</p>

<p>对于其他API的源码实现，下面就不一一列举了，大致上和<code>map</code>的实现很类似，只不过是在循环体里面需要做各自不同的逻辑。</p>

<h3 id='Array.prototype.forEach'>Array.prototype.forEach</h3>

<ul>
<li>可以改变数组自身，没有返回值；</li>
<li>中途不能用常规操作跳出循环，可以用抛出异常（try/catch）的方式，但不推荐这样做</li>
</ul>

<h3 id='Array.prototype.Filter'>Array.prototype.Filter</h3>

<ul>
<li>和 map 很像，也是创建一个新数组，新数组中的元素是筛选出来的符合条件的所有对象。</li>
</ul>

<h3 id='Array.prototype.Sort'>Array.prototype.Sort</h3>

<ul>
<li>默认按照字母升序排列</li>
<li>与其他方法不同，他直接改变原始数组</li>
<li>sort()用于对数组的元素进行排序。排序顺序可以是字母或数字，并按升序或降序。</li>
<li>如果想按照其他标准进行排序，就需提供比较函数compareFunction(a,b)</li>
</ul>

<h3 id='Array.prototype.Some'>Array.prototype.Some</h3>

<ul>
<li>用于检查数组中是否有某些符合条件</li>
<li>只要有一个满足即返回true，之后的不再执行</li>
<li>只是返回一个布尔类型的值</li>
</ul>

<h3 id='Array.prototype.Every'>Array.prototype.Every</h3>

<ul>
<li>和 some 类似，只返回布尔类型</li>
<li>判断数组中所有的值是否都满足</li>
</ul>

<h3 id='Array.prototype.FindIndex'>Array.prototype.FindIndex</h3>

<ul>
<li>结构和map类似，获取到满足条件的索引值</li>
<li>IE 11 及更早版本不支持findIndex() 方法，如果对浏览器兼容有要求，那就用Lodash的 _.findIndex()</li>
</ul>

<h3 id='Array.prototype.Find'>Array.prototype.Find</h3>

<ul>
<li>和some类似，有一个满足的元素就会返回该元素，而不是布尔值</li>
<li>IE 11 及更早版本不支持</li>
</ul>

<h3 id='Array.prototype.Reduce'>Array.prototype.Reduce</h3>

<p>该方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。reducer函数对应四个传参，依次是：<code>accumulator 累计器</code>, <code>currentValue 当前值</code>, <code>currentIndex 当前索引</code>, <code>array 数组</code>。同时注意</p>

<pre><code><span></span>
<span></span>
<span>const array1 = [1, 2, 3, 4];</span>
<span>const reducer = (accumulator, currentValue) =&gt; accumulator + currentValue;</span>
<span></span>
<span>// 1 + 2 + 3 + 4</span>
<span>console.log(array*reduce(reducer));</span>
<span>// expected output: 10</span>
<span></span>
</code></pre>

<p>需要注意，reduce 可选传入第二个参数，作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。</p>

<pre><code><span></span>
<span>const arr = [1, 2, 3, 4, 5]</span>
<span>const reducer = (accumulator, currentValue, index) =&gt; {'{'}</span>
<span>    console.log(accumulator, currentValue, index)</span>
<span>    return accumulator + currentValue</span>
<span>}</span>
<span>&lt;!-- 没有传初始参数值 --&gt;</span>
<span>arr.reduce(reducer)</span>
<span>// 1 2 1</span>
<span>// 3 3 2</span>
<span>// 6 4 3</span>
<span>// 10 5 4</span>
<span></span>
<span>&lt;!-- 传入初始参数值 --&gt;</span>
<span>arr.reduce(reducer)</span>
<span>// -1 1 0</span>
<span>// 0 2 1</span>
<span>// 2 3 2</span>
<span>// 5 4 3</span>
<span>// 9 5 4</span>
<span></span>
</code></pre>

<h3 id='Array.prototype.reduceRight'>Array.prototype.reduceRight</h3>

<p>和 reduce 作用一样，区别是从数组最右开始降序执行。</p>

<h3 id='Array.prototype.includes(ES6新增)'>Array.prototype.includes(ES6新增)</h3>

<p>用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。<br></br>第二个参数表示从第几个索引值开始查找。</p>

<pre><code><span></span>
<span>[1,2,3].includes(3) </span>
<span>// true</span>
<span>[1,2,3].includes(4) </span>
<span>// false</span>
<span></span>
<span></span>
<span>[1,2,3,4].includes(1,1)</span>
<span>// false</span>
<span></span>
</code></pre>

<h3 id='Array.isArray(ES6新增)'>Array.isArray(ES6新增)</h3>

<p>用来检测值是否是一个Array，返回一个布尔类型的值。 相较于 <code>instanceof</code>, Array.isArray 可以检测 iframes。</p>

<pre><code><span></span>
<span>Array.isArray([1, 2, 3]);  </span>
<span>// true</span>
<span>Array.isArray({'{'}foo: 123}); </span>
<span>// false</span>
<span></span>
</code></pre>

<h3 id='Array.prototype.fill(ES6新增)'>Array.prototype.fill(ES6新增)</h3>

<p>用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。</p>

<pre><code><span></span>
<span>[0,1,2,3,4,5,6].fill('*',1,5)</span>
<span>// [0, "*", "*", "*", "*", 5, 6]</span>
<span></span>
<span>[0,1,2,3,4,5,6].fill('*')</span>
<span>// [0, "*", "*", "*", "*","*","*"]</span>
<span></span>
</code></pre>

<h3 id='Array.prototype.entries/keys/values(ES6新增)'>Array.prototype.entries/keys/values(ES6新增)</h3>

<pre><code><span></span>
<span>let arr=['a', 'b', 'c']</span>
<span></span>
<span>//取键</span>
<span>for(let key of arr.keys()){'{'}}  </span>
<span></span>
<span>//取值；不能直接使用，有兼容性问题，甚至谷歌</span>
<span>for(let value of arr.values()){'{'}}         </span>
<span></span>
<span>//都取</span>
<span>for(let [key, value] of arr.entries()){'{'}}      </span>
<span></span>
</code></pre>

<h3 id='Array.of(ES6新增)'>Array.of(ES6新增)</h3>

<p>创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。</p>

<pre><code><span></span>
<span>Array.of(7);       // [7] </span>
<span>Array.of(1, 2, 3); // [1, 2, 3]</span>
<span></span>
<span>Array(7);          // [ , , , , , , ]</span>
<span>Array(1, 2, 3);    // [1, 2, 3]</span>
<span></span>
</code></pre>

<h3 id='Array.from'>Array.from</h3>

<p>从一个类似数组或可迭代对象中创建一个新的，浅拷贝的数组实例</p>

<pre><code><span></span>
<span>Array.from('foo')</span>
<span>// output: Array ["f", "o", "o"]</span>
<span></span>
<span>Array.from([1, 2, 3], x =&gt; x + x)</span>
<span>// output: Array [2, 4, 6]</span>
<span></span>
<span>Array.from({'{'}length: 10}, (_, i) =&gt; i)</span>
<span>// output: Array [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]</span>
<span></span>
<span></span>
</code></pre>

<h3 id='参考'>参考</h3>

<p><a target="_blank" href="https://juejin.im/post/5d76f08ef265da03970be192">Array 原型方法源码实现大揭秘</a></p>
</div>
            </Fragment>
        )
    }
}