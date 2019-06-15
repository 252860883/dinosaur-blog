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
<div className="title">vue的key属性加还是不加？</div>
<p>做过vue开发的程序猿大大们一定经常遇到的问题就是忘加key！忘加key！忘加key！不过好在vscode后来的vue校验对不加key的代码做出了红色波浪线警示，但是感觉很是不舒服呀，所以这个key到底有什么用途呢？官方文档中解释到：</p>

<blockquote>
  <p>key 的特殊属性主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。使用 key，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。有相同父元素的子元素必须有独特的 key。重复的 key 会造成渲染错误。</p>
</blockquote>

<p>简单来讲，如果有了key，diff算法会直接拿key值来做对比，而没有key的话，只能用其他的办法，在性能上肯定会有更多的损耗。同时注意到最后一句话，有相同父元素的子元素必须有独特的key，所以说如果相同的父元素下，引用了两次相同的子组件，那么这两个组件同样也需要加key来作区分，否则可能会造成未知的错误（如果出现未知的错误，可以加key试试）。</p>

<p>相信平时大家有一个偷懒的写法就是直接把index作为key值，但是结合key的实际用途发现，以index作为key的话，无法进行新旧比较，所以这个写法可以说是无效的，严格来讲最好使用元素的唯一id做为key值。具体我们可以看下图的例子：</p>

<pre><code><span> </span>
<span>key:0 name:LiMing     key:0 name:LiMing</span>
<span>key:1 name:HanDan     key:1 name:YeXuan</span>
<span>key:2 name:ZhangYi    key:2 name:HanDan</span>
<span>                      key:3 name:ZhangYi</span>
<span></span>
</code></pre>

<p>可以看到，我们从第二项插入了一个 dom 如果使用 index 做为 key 值时，除了第一项其余的需要全部重绘。</p>

<p>延伸个有意思的问题，<strong>v-for循环体中的input如何实现双向绑定呢？</strong></p>

<pre><code><span></span>
<span>&lt;template&gt;</span>
<span>  &lt;div id="app"&gt;</span>
<span>    &lt;div v-for="(item,index) of list" :key="item"&gt;</span>
<span>        &lt;p&gt;{'{'}{'{'}item}}&lt;/p&gt;</span>
<span>        &lt;input type="text" v-model="item"&gt; </span>
<span>    &lt;/div&gt;</span>
<span>  &lt;/div&gt;</span>
<span>&lt;/template&gt;</span>
<span>export default {'{'}</span>
<span>  name: "app",</span>
<span>  data() {'{'}</span>
<span>    return {'{'}</span>
<span>      list: [1,2,3],</span>
<span>    };</span>
<span>  }</span>
<span>};</span>
<span>&lt;/script&gt;</span>
<span></span>
</code></pre>

<p>看上面代码，很简单吗！但是跑起来发现，报错了：</p>

<p><img src="http://wx4.sinaimg.cn/mw690/a73bc6a1ly1ft5xvbdk92j214604275x.jpg" alt="image" title="" /></p>

<p>大致意思是不能把v-for的循环数据直接进行双向绑定，所以最好的办法就是把纯数组修改为对象数组格式，如下优化：</p>

<pre><code><span></span>
<span>&lt;template&gt;</span>
<span>  &lt;div id="app"&gt;</span>
<span>    &lt;div v-for="(item,index) of list" :key="item.id"&gt;</span>
<span>        &lt;p&gt;{'{'}{'{'}item.num}}&lt;/p&gt;</span>
<span>        &lt;input type="text" v-model="item.num"&gt; </span>
<span>    &lt;/div&gt;</span>
<span>  &lt;/div&gt;</span>
<span>&lt;/template&gt;</span>
<span></span>
<span>&lt;script&gt;</span>
<span>export default {'{'}</span>
<span>  name: "app",</span>
<span>  data() {'{'}</span>
<span>    return {'{'}</span>
<span>      list: [{'{'} id: 1, num: 1 }, {'{'} id: 2, num: 2 }, {'{'} id: 3, num: 3 }]</span>
<span>    };</span>
<span>  },</span>
<span>  methods: {'{'}</span>
<span>    add: function() {'{'}</span>
<span>      this.list.push("string");</span>
<span>    },</span>
<span>    remove: function(index) {'{'}</span>
<span>      this.list.splice(index, 1);</span>
<span>    }</span>
<span>  }</span>
<span>};</span>
<span>&lt;/script&gt;</span>
<span></span>
</code></pre>

<p>设想上面一种情况，如果我们把key设为item.num是不是能行呢？答案是否定的，不妨试一下，产生的问题就是我们每修改一次input的值，input框就会失焦。这是因为我们把key设置为num，而我们每次改变num，都会造成key变化，而导致虚拟dom对比认为发生元素变化而产生重绘行为。</p>

<p>不过基于这一点官网上还给了一个好玩的例子,如果我们想某个文本变化就执行transition动画，可以通过添加key值来实现：</p>

<pre><code><span></span>
<span>&lt;transition name="bomb" mode="out-in"&gt;</span>
<span>    &lt;span :key="msg"&gt;{'{'}{'{'}msg}}&lt;/span&gt;</span>
<span>&lt;/transition&gt;</span>
<span>&lt;input class="input" type="text" v-model="msg"&gt;</span>
<span></span>
</code></pre>

<p>效果如下，每当修改文本时候就会触发红色的渐变效果：<br></br><img src="http://wx1.sinaimg.cn/mw690/a73bc6a1ly1ft5xvcewk8g20gq08ch0q.gif" alt="image" title="" /></p>

<p><strong>小总结</strong>：<br></br>1. key在dom算法中作为辨识字段排列元素，加快更新的效率<br></br>2. 父元素下相同的子元素都需要加key以作区分，子组件同样适用<br></br>3. key值被修改会造成元素重绘，具有两面性，需要依据此特征采取合适的方案定key值<br></br>4. 说了这么多，那标题的疑问，加还是不加呢？</p>
</div>
        )
    }
}