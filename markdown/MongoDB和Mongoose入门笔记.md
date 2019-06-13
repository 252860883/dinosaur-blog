---
title: MongoDB 和 MongooseODM 入门
date: 2018-02-24 23:45:58
tags: ['nodejs','MongoDB']
---

#### 什么是 MongoDB ？有何特点？
MongoDB 是由C++语言编写的，是一个基于分布式文件存储的开源数据库系统。
在高负载的情况下，添加更多的节点，可以保证服务器性能。
MongoDB 旨在为WEB应用提供可扩展的高性能数据存储解决方案。
MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。

特点：
面向文档操作的数据库，操作简便；
可以在记录中设置任何属性的索引，来实现更快的排序；
可以通过本地或者网络创建镜像，拓展性更强；
分片功能，减轻负载；
查询指令使用JSON形式的标记，可以轻易的查询文档中内嵌的对象以及数组；
支持各种编程语言:RUBY，PYTHON，JAVA，C++，PHP，C#等多种语言；
安装简便；
...

#### Mongoose 
mongoose 是个 odm。odm（object document mapping 对象文档映射） 的概念对应 sql 中的 orm(object relational mapping 对象关系映射)。也就是 ruby on rails 中的 activerecord 那一层。orm 全称是 Object-Relational Mapping，对象关系映射；而 odm 是 Object-Document Mapping，对象文档映射。


#### 启动 MongoDB

首先在终端输入
```
export PATH=/usr/local/mongodb/bin:$PATH
sudo mkdir -p /data/db
sudo mongod
```

然后新开一个终端
```
cd  /usr/local/mongodb/bin
./mongo
```

##### 常用的查询指令

$or　　　　或关系
$nor　　　 或关系取反
$gt　　　　大于
$gte　　　 大于等于
$lt　　　　小于
$lte　　　 小于等于
$ne　　　　不等于
$in　　　　在多个值范围内
$nin　　　 不在多个值范围内
$all　　　 匹配数组中多个值
$regex　　 正则，用于模糊查询
$size　　　匹配数组大小
$maxDistance　范围查询，距离（基于LBS）
$mod　　　　取模运算
$near　　　 邻域查询，查询附近的位置（基于LBS）
$exists　　 字段是否存在
$elemMatch　匹配内数组内的元素
$within　　　范围查询（基于LBS）
$box　　　　 范围查询，矩形范围（基于LBS）
$center　　　范围醒询，圆形范围（基于LBS）
$centerSphere　范围查询，球形范围（基于LBS）
$slice　　　  查询字段集合中的元素（比如从第几个之后，第N到第M个元素

Where查询常用
$where:”this.x==this.y”

#### 更新

update()
updateMany()	默认更新多个文档
find() + save()
updateOne()
findByIdAndUpdate()
findOneAndUpdate()

#### 删除

remove()
findOneAndRemove()
findByIdAndRemove()

#### 钩子函数

pre()		在操作之前执行
post()	在操作之前最后执行

#### 查询后处理

sort(‘x’)		按照x从小到大排序，加-号则相反
skip(1)		跳过第一个
limit(12)		限制显示前12个
select(name -id)	选择显示name 不显示 id
count(function(err,count){})	显示文档数量
distinct(function(err, dis){})	显示集合中的x值

#### 文档验证

// 文档验证
// required: 数据必须填写
// default: 默认值
// validate: 自定义匹配
// min: 最小值(只适用于数字)
// max: 最大值(只适用于数字)
// match: 正则匹配(只适用于字符串)
// enum:  枚举匹配(只适用于字符串)

举例：
var schema = new mongoose.Schema(
	{ 	name: { type: String, required: true }, 
		password: { type: String, required: true } 
	}
);


####  MongoDB实现分页查询

> db.col.find({},{"num":1,_id:0}).limit(40).skip(20)
