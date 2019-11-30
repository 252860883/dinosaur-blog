import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h4","title":"什么是 MongoDB ？有何特点？"},{"level":"h4","title":"Mongoose"},{"level":"h4","title":"启动 MongoDB"},{"level":"h5","title":"常用的查询指令"},{"level":"h4","title":"更新"},{"level":"h4","title":"删除"},{"level":"h4","title":"钩子函数"},{"level":"h4","title":"查询后处理"},{"level":"h4","title":"文档验证"},{"level":"h4","title":"MongoDB实现分页查询"}]
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
<div className="title-content"><h1 className="title">MongoDB 和 MongooseODM 入门</h1></div>
<h4 id='什么是 MongoDB ？有何特点？'>什么是 MongoDB ？有何特点？</h4>

<p>MongoDB 是由C++语言编写的，是一个基于分布式文件存储的开源数据库系统。<br></br>在高负载的情况下，添加更多的节点，可以保证服务器性能。<br></br>MongoDB 旨在为WEB应用提供可扩展的高性能数据存储解决方案。<br></br>MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。</p>

<p>特点：<br></br>面向文档操作的数据库，操作简便；<br></br>可以在记录中设置任何属性的索引，来实现更快的排序；<br></br>可以通过本地或者网络创建镜像，拓展性更强；<br></br>分片功能，减轻负载；<br></br>查询指令使用JSON形式的标记，可以轻易的查询文档中内嵌的对象以及数组；<br></br>支持各种编程语言:RUBY，PYTHON，JAVA，C++，PHP，C#等多种语言；<br></br>安装简便；<br></br>...</p>

<h4 id='Mongoose'>Mongoose</h4>

<p>mongoose 是个 odm。odm（object document mapping 对象文档映射） 的概念对应 sql 中的 orm(object relational mapping 对象关系映射)。也就是 ruby on rails 中的 activerecord 那一层。orm 全称是 Object-Relational Mapping，对象关系映射；而 odm 是 Object-Document Mapping，对象文档映射。</p>

<h4 id='启动 MongoDB'>启动 MongoDB</h4>

<p>首先在终端输入</p>

<pre><code><span></span>
<span>export PATH=/usr/local/mongodb/bin:$PATH</span>
<span>sudo mkdir -p /data/db</span>
<span>sudo mongod</span>
<span></span>
</code></pre>

<p>然后新开一个终端</p>

<pre><code><span></span>
<span>cd  /usr/local/mongodb/bin</span>
<span>./mongo</span>
<span></span>
</code></pre>

<h5 id='常用的查询指令'>常用的查询指令</h5>

<p>$or　　　　或关系<br></br>$nor　　　 或关系取反<br></br>$gt　　　　大于<br></br>$gte　　　 大于等于<br></br>$lt　　　　小于<br></br>$lte　　　 小于等于<br></br>$ne　　　　不等于<br></br>$in　　　　在多个值范围内<br></br>$nin　　　 不在多个值范围内<br></br>$all　　　 匹配数组中多个值<br></br>$regex　　 正则，用于模糊查询<br></br>$size　　　匹配数组大小<br></br>$maxDistance　范围查询，距离（基于LBS）<br></br>$mod　　　　取模运算<br></br>$near　　　 邻域查询，查询附近的位置（基于LBS）<br></br>$exists　　 字段是否存在<br></br>$elemMatch　匹配内数组内的元素<br></br>$within　　　范围查询（基于LBS）<br></br>$box　　　　 范围查询，矩形范围（基于LBS）<br></br>$center　　　范围醒询，圆形范围（基于LBS）<br></br>$centerSphere　范围查询，球形范围（基于LBS）<br></br>$slice　　　  查询字段集合中的元素（比如从第几个之后，第N到第M个元素</p>

<p>Where查询常用<br></br>$where:”this.x==this.y”</p>

<h4 id='更新'>更新</h4>

<p>update()<br></br>updateMany()    默认更新多个文档<br></br>find() + save()<br></br>updateOne()<br></br>findByIdAndUpdate()<br></br>findOneAndUpdate()</p>

<h4 id='删除'>删除</h4>

<p>remove()<br></br>findOneAndRemove()<br></br>findByIdAndRemove()</p>

<h4 id='钩子函数'>钩子函数</h4>

<p>pre()       在操作之前执行<br></br>post()  在操作之前最后执行</p>

<h4 id='查询后处理'>查询后处理</h4>

<p>sort(‘x’)       按照x从小到大排序，加-号则相反<br></br>skip(1)     跳过第一个<br></br>limit(12)       限制显示前12个<br></br>select(name -id)    选择显示name 不显示 id<br></br>count(function(err,count){'{'}})    显示文档数量<br></br>distinct(function(err, dis){'{'}})  显示集合中的x值</p>

<h4 id='文档验证'>文档验证</h4>

<p>// 文档验证<br></br>// required: 数据必须填写<br></br>// default: 默认值<br></br>// validate: 自定义匹配<br></br>// min: 最小值(只适用于数字)<br></br>// max: 最大值(只适用于数字)<br></br>// match: 正则匹配(只适用于字符串)<br></br>// enum:  枚举匹配(只适用于字符串)</p>

<p>举例：<br></br>var schema = new mongoose.Schema(<br></br>    {'{'}   name: {'{'} type: String, required: true }, <br></br>        password: {'{'} type: String, required: true } <br></br>    }<br></br>);</p>

<h4 id='MongoDB实现分页查询'>MongoDB实现分页查询</h4>

<blockquote>
  <p>db.col.find({'{'}},{'{'}"num":1,_id:0}).limit(40).skip(20)</p>
</blockquote>
</div>
            </Fragment>
        )
    }
}