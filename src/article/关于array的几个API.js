import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"Array.prototype.forEach"},{"level":"h3","title":"Array.prototype.map"},{"level":"h3","title":"Array.prototype.Filter"},{"level":"h3","title":"Array.prototype.Sort"},{"level":"h3","title":"Array.prototype.Some"},{"level":"h3","title":"Array.prototype.Every"},{"level":"h3","title":"Array.prototype.FindIndex"},{"level":"h3","title":"Array.prototype.Find"},{"level":"h3","title":"Array.prototype.Reduce"},{"level":"h3","title":"Array.prototype.reduceRight"},{"level":"h3","title":"Array.prototype.includes(ES6新增)"},{"level":"h3","title":"Array.isArray(ES6新增)"},{"level":"h3","title":"Array.prototype.fill(ES6新增)"},{"level":"h3","title":"Array.prototype.entries/keys/values(ES6新增)"},{"level":"h3","title":"Array.of(ES6新增)"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"> <h1 className="title">关于array的常用的几个API</h1></div>
<h3 id='Array.prototype.forEach'>Array.prototype.forEach</h3>

<ol>
<li>可以改变数组自身，没有返回值；</li>
<li>中途不能用常规操作跳出循环，可以用抛出异常（try/catch）的方式，但不推荐这样做</li>
</ol>

<h3 id='Array.prototype.map'>Array.prototype.map</h3>

<ol>
<li>新建一个数组，需要有承载对象,原始数组在调用它后不会发生变化</li>
<li>该数组中的每个元素都调用一个提供的函数后返回结果,否则返回 undefined]</li>
</ol>

<h3 id='Array.prototype.Filter'>Array.prototype.Filter</h3>

<ol>
<li>和 map 很像，也是创建一个新数组，新数组中的元素是筛选出来的符合条件的所有对象。</li>
</ol>

<h3 id='Array.prototype.Sort'>Array.prototype.Sort</h3>

<ol>
<li>与其他方法不同，他直接改变原始数组</li>
<li>sort()用于对数组的元素进行排序。排序顺序可以是字母或数字，并按升序或降序。</li>
<li>默认按照字母升序排列</li>
<li>如果想按照其他标准进行排序，就需提供比较函数compareFunction(a,b)</li>
</ol>

<h3 id='Array.prototype.Some'>Array.prototype.Some</h3>

<ol>
<li>用于检查数组中是否有某些符合条件</li>
<li>只要有一个满足即返回true，之后的不再执行</li>
<li>只是返回一个布尔类型的值</li>
</ol>

<h3 id='Array.prototype.Every'>Array.prototype.Every</h3>

<ol>
<li>和 some 类似，只返回布尔类型</li>
<li>判断数组中所有的值是否都满足</li>
</ol>

<h3 id='Array.prototype.FindIndex'>Array.prototype.FindIndex</h3>

<ol>
<li>结构和map类似，获取到满足条件的索引值</li>
<li>IE 11 及更早版本不支持findIndex() 方法，如果对浏览器兼容有要求，那就用Lodash的 _.findIndex()</li>
</ol>

<h3 id='Array.prototype.Find'>Array.prototype.Find</h3>

<ol>
<li>和some类似，有一个满足的元素就会返回</li>
<li>IE 11 及更早版本不支持</li>
</ol>

<h3 id='Array.prototype.Reduce'>Array.prototype.Reduce</h3>

<p>该方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。reducer函数对应四个传参，依次是：<code>accumulator 累计器</code>, <code>currentValue 当前值</code>, <code>currentIndex 当前索引</code>, <code>array 数组</code>.</p>

<pre><code><span></span>
<span></span>
<span>const array1 = [1, 2, 3, 4];</span>
<span>const reducer = (accumulator, currentValue) =&gt; accumulator + currentValue;</span>
<span></span>
<span>// 1 + 2 + 3 + 4</span>
<span>console.log(array1.reduce(reducer));</span>
<span>// expected output: 10</span>
<span></span>
</code></pre>

<p>⚠️需要注意，第一次循环时 accumulator 为数组第一个值，currentValue 为数组第二个值。</p>

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
</div>
            </div>

        )
    }
}