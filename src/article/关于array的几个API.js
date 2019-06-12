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

<h3>Array.prototype.forEach</h3>

<ol><li>可以改变数组自身，没有返回值；</li><li>中途不能用常规操作跳出循环，可以用抛出异常（try/catch）的方式，但不推荐这样做</li></ol>

<h3>Array.prototype.map</h3>

<ol><li>新建一个数组，需要有承载对象,原始数组在调用它后不会发生变化</li><li>该数组中的每个元素都调用一个提供的函数后返回结果,否则返回 undefined]</li></ol>

<h3>Array.prototype.Filter</h3>

<ol><li>和 map 很像，也是创建一个新数组，新数组中的元素是筛选出来的符合条件的所有对象。</li></ol>

<h3>Array.prototype.Sort</h3>

<ol><li>与其他方法不同，他直接改变原始数组</li><li>sort()用于对数组的元素进行排序。排序顺序可以是字母或数字，并按升序或降序。</li><li>默认按照字母升序排列</li><li>如果想按照其他标准进行排序，就需提供比较函数compareFunction(a,b)</li></ol>

<h3>Array.prototype.Some</h3>

<ol><li>用于检查数组中是否有某些符合条件</li><li>只要有一个满足即返回true，之后的不再执行</li><li>只是返回一个布尔类型的值</li></ol>

<h3>Array.prototype.Every</h3>

<ol><li>和 some 类似，只返回布尔类型</li><li>判断数组中所有的值是否都满足</li></ol>

<h3>Array.prototype.FindIndex</h3>

<ol><li>结构和map类似，获取到满足条件的索引值</li><li>IE 11 及更早版本不支持findIndex() 方法，如果对浏览器兼容有要求，那就用Lodash的 _.findIndex()</li></ol>

<h3>Array.prototype.Find</h3>

<ol><li>和some类似，有一个满足的元素就会返回</li><li>IE 11 及更早版本不支持</li></ol>

<h3>Array.prototype.Reduce</h3>

<p>该方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。reducer函数对应四个传参，依次是：<code>accumulator 累计器</code>, <code>currentValue 当前值</code>, <code>currentIndex 当前索引</code>, <code>array 数组</code>.</p>

<p><code></code>`</p>

<p>const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) =&gt; accumulator + currentValue;</p>

<p>// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10
<code></code>`
⚠️需要注意，第一次循环时 accumulator 为数组第一个值，currentValue 为数组第二个值。</p>

<h3>Array.prototype.reduceRight</h3>

<p>和 reduce 作用一样，区别是从数组最右开始降序执行。</p>

<h3>Array.prototype.includes(ES6新增)</h3>

<p>用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
第二个参数表示从第几个索引值开始查找。</p>

<p><code></code>`
[1,2,3].includes(3) 
// true
[1,2,3].includes(4) 
// false</p>

<p>[1,2,3,4].includes(1,1)
// false
<code></code>`</p>

<h3>Array.isArray(ES6新增)</h3>

<p>用来检测值是否是一个Array，返回一个布尔类型的值。 相较于 <code>instanceof</code>, Array.isArray 可以检测 iframes。</p>

<p><code>
Array.isArray([1, 2, 3]);  
// true
Array.isArray({'{'}foo: 123}); 
// false
</code></p>

<h3>Array.prototype.fill(ES6新增)</h3>

<p>用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。
<code>
[0,1,2,3,4,5,6].fill(&#39;*&#39;,1,5)
// [0, &quot;*&quot;, &quot;*&quot;, &quot;*&quot;, &quot;*&quot;, 5, 6]
</code></p>

<h3>Array.prototype.entries/keys/values(ES6新增)</h3>

<p><code></code>`
let arr=[&#39;a&#39;, &#39;b&#39;, &#39;c&#39;]</p>

<p>//取键
for(let key of arr.keys()){'{'}}  </p>

<p>//取值；不能直接使用，有兼容性问题，甚至谷歌
for(let value of arr.values()){'{'}}         </p>

<p>//都取
for(let [key, value] of arr.entries()){'{'}}    <br/><code></code>`</p>

<h3>Array.of(ES6新增)</h3>

<p>创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
<code></code>`
Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]</p>

<p>Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
<code></code>`</p>
</div>
        )
    }
}