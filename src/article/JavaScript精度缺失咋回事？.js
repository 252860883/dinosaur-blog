import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"二进制运算"},{"level":"h4","title":"二进制转十进制"},{"level":"h4","title":"整数转二进制运算"},{"level":"h4","title":"小数转二进制运算"},{"level":"h3","title":"IEEE754标准"},{"level":"h3","title":"找到元凶"},{"level":"h3","title":"避免精度缺失"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title">聊聊JavaScript精度缺失这点事</div>
<blockquote>
  <p>如果你是一个前端开发工程师的话，一定遇到过js语言上一些诡异的事情，比如某些运算的结果出现 1.999999999999 ，0.30000000000000004等等类似无限循环的小数，尽管和后端在接口字段上已经约束了保留以为小数。这个过程究竟发生了什么，导致出现如此丧心病狂的数字？下面来为你揭晓。</p>
</blockquote>

<p><img src="http://wx1.sinaimg.cn/mw690/a73bc6a1ly1g48lbs7gvqj20br02i0t5.jpg" alt="image" title="" /><br></br>瞧！这诡异的js运算</p>

<h3 id='二进制运算'>二进制运算</h3>

<h4 id='二进制转十进制'>二进制转十进制</h4>

<p>首先我们回顾一下二进制怎么转十进制：<br></br><img src="http://wx3.sinaimg.cn/mw690/a73bc6a1ly1g48l6teighj20b903dt8k.jpg" alt="image" title="" /></p>

<p>还记得怎么十进制转二进制吗？根据前面关于指数位和尾数位的存储方式，我们对于小数和整数位分别有不同的计算方法：</p>

<h4 id='整数转二进制运算'>整数转二进制运算</h4>

<p><img src="http://wx2.sinaimg.cn/mw690/a73bc6a1ly1g48l6qlvhfj208306pglh.jpg" alt="image" title="" /></p>

<h4 id='小数转二进制运算'>小数转二进制运算</h4>

<p><img src="http://wx2.sinaimg.cn/mw690/a73bc6a1ly1g48l6mwlvuj208605mt8k.jpg" alt="image" title="" /></p>

<h3 id='IEEE754标准'>IEEE754标准</h3>

<p>大家都知道计算机只懂二进制，所以是不是在十进制转为二进制的时候出了差错呢？Javascript不像其他语言，数字都是由浮点型来表示，采用的是IEEE754运算标准。IEEE标准下的浮点数存储规定了两种浮点格式：单精度和双精度，包括三个基本的组成：符号位、指数、尾数，IEEE754标准给了一个格式：</p>

<pre><code><span></span>
<span>(-1)^S * M * 2^E</span>
<span></span>
</code></pre>

<blockquote>
  <p>S 表示符号位，0正1负；M 表示有效位数，E 是指数位。</p>
</blockquote>

<p>具体的分配如下表格所示：</p>

<p><table></tbody><tr><th> 类型 </th><th> 符号位 </th><th> 指数位 </th><th>尾数位</th></tr><tr><td> 单精度 </td><td> 1 [31]</td><td>8 [30-23] </td><td>23 [22-00] </td></tr><tr><td> 双精度 </td><td> 1 [63]</td><td>11 [62-52] </td><td>52 [51-00] </td></tr></tbody></table></p>

<p><strong>符号位</strong>：直面意思，0表示正数，1表示负数。<br></br><strong>指数位</strong>：因为指数位既需要能够表示正指数也需要能够表示负指数，为了能够做到这一点，需要将真实的指数数值加上一个偏移值获得用来存储的指数值。单精度浮点数情况下，这个偏移值是127。指数为-127（指数位全为0）和+128（指数位全为1）会被用来存储特殊的数值。对于双精度的浮点数，指数位的长度位11比特，偏移量位1023。<br></br><strong>尾数位</strong>：尾数也被称为有效数位（significand）,决定浮点数的精确度。它由隐含的前导数位（小数点左边的部分）和小数部分（小数点右边的部分）组成。</p>

<p>举个例子以单精度浮点数为例来看下 0.15625 如何进行存储：<br></br><img src="http://wx4.sinaimg.cn/mw690/a73bc6a1ly1g48n6zdyvnj212k06q75y.jpg" alt="image" title="" /></p>

<blockquote>
  <p>首先 0.15625 用二进制表示为 0.00101 ,科学计数法表示为 <code>1.01*2^(-3)</code><br></br>理所当然，符号位是 <code>0</code><br></br>指数位不能直接存储 -3 上面我们说过了 要加上偏移值（这里是 127），所以是 124 的二进制 <code>1111100</code><br></br>所以尾数为存储 <code>01</code>，因为科学计数法表示时二进制的小数点左面必然为1，所以不用计入</p>
</blockquote>

<h3 id='找到元凶'>找到元凶</h3>

<p>所以动手来试试 0.1 转二进制是多少呢？<br></br>诶！ 经计算结果是 <code>0.0001100110011...(n个0011)</code>！无限循环的二进制！我们前面提到过，尾数位最多只能存放52位，所以误差就从这出现了！为了验证我们的猜想，分别计算出 0.1和0.2转为二进制后存储到的尾数位数据再进行二进制加法:</p>

<pre><code><span></span>
<span>   00110011001100110011001100110011001100110011001100110011</span>
<span>+  00011001100110011001100110011001100110011001100110011001</span>
<span>-----------------------------------------------------------</span>
<span>   01001100110011001100110011001100110011001100110011001100</span>
<span></span>
<span></span>
</code></pre>

<p>而这个结果正是<code>0.30000000000000004</code>转为二进制的尾数位。所以精度缺失的问题是由于浮点数存储本身固有的缺陷造成的，它只能精确的表示可用科学计数法 <code>m*2^e</code> 表示的数值,比如 0.5,0.25,0.125...</p>

<h3 id='避免精度缺失'>避免精度缺失</h3>

<p>由上可知，误差是不可避免的，但是为何只有Javascript存在这种问题呢？因为像c#的decimal和Java的BigDecimal等数字类型在其内部做了处理，而JavaScript是一种弱类型语言，并没有对计算精度做相应的处理。所有就需要我们在涉及到小数运算时做相应的处理了。</p>

<p><strong>粗暴解决法</strong><br></br>第一种就是粗暴解决法，那就是直接使用 <code>toFixed()</code> 把Number四舍五入为指定小数位数的数字。</p>

<pre><code><span></span>
<span>let a=0.2+0.1</span>
<span>console.log(a)  //0.30000000000000004</span>
<span>console.log(a.toFixed(1))   //0.3</span>
<span></span>
<span>let b = 0.7-0.5</span>
<span>console.log(b)  //0.19999999999999996</span>
<span>console.log(b.toFixed(1))   //0.2</span>
<span></span>
</code></pre>
</div>
            </div>

        )
    }
}