import React from 'react'
import Loadable from 'react-loadable';
import { Route, Switch, withRouter } from 'react-router-dom';
// import RouterLoad from "./loading";
import '../style/common.scss'
let RouterOrigin = [
	{ key: 'HOME', url: import('../pages/main'), link: '/' },
	{ key: 'ARTICLE', url: import('../pages/article'), link: '/article' },
	{ key: 'PROJECT', url: import('../pages/project'), link: '/project' },
	{ key: 'ABOUT', url: import('../pages/about'), link: '/about' },
	// { key: 'Loading', url: import('../components/UI/loading'), link: '/loading' },
]
let RouterMenu = []
let ArticleMenu = [
	{"title":"ES6+ 新特性大汇总","date":"2018-06-29 12:22:07","tags":"['javascript','ES6']","top":"true","link":"/ES678新特性","article":true},
	{"title":"JavaScript 继承","date":"2019-07-23 10:30:12","tags":"javascript","top:":"","link":"/JavaScript 继承","article":true},
	{"title":"JavaScript的类型检测","date":"2019-01-24 10:30:12","tags":"javascript","top:":"","link":"/JavaScript的类型检测","article":true},
	{"title":"聊聊JavaScript精度缺失这点事","date":"2018-09-13 11:51:37","tags":"javascript","top:":"","link":"/JavaScript精度缺失咋回事？","article":true},
	{"title":"JavaScript设计模式（一）观察者模式","date":"2018-06-26 12:55:56","tags":"javascript","link":"/JavaScript设计模式系列（一）开发者模式","article":true},
	{"title":"JavaScript运行机制 EventLoop","date":"2019-03-01 16:42:57","tags":"javascript","top:":"","link":"/JavaScript运行机制-EventLoop","article":true},
	{"title":"MongoDB 和 MongooseODM 入门","date":"2018-02-24 23:45:58","tags":"['nodejs','MongoDB']","link":"/MongoDB和Mongoose入门笔记","article":true},
	{"title":"React学习笔记 Redux","date":"2019-01-20 16:51:48","tags":"[javascript,React]","top":"","link":"/React学习笔记-Redux","article":true},
	{"title":"React 学习笔记","date":"2018-02-24 23:45:58","tags":"React","link":"/React学习笔记","article":true},
	{"title":"TypeScript笔记","date":"2018-12-03 14:52:46","tags":"['javascript','typescript']","top:":"","link":"/TypeScript笔记","article":true},
	{"title":"刨下VUE中keep-alive的一些坑","date":"2018-02-08 20:17:19","tags":"[javascript,VUE]","link":"/VUE开启-keep-alive时的一些坑坑坑","article":true},
	{"title":"VUE核心原理解析（一）依赖收集与响应式绑定","date":"2018-09-22 16:50:05","tags":"[vue,javascript]","top:":"","link":"/VUE核心原理解析","article":true},
	{"title":"WebWorkers 实践","date":"2019-07-15 17:38:44","tags":"['vue','javascript']","link":"/WebWorker实践","article":true},
	{"title":"爬一下flex布局在IE10和IE11下的坑","date":"2018-01-30 18:30:02","tags":"javascript","link":"/flex布局在IE10和IE11下的坑","article":true},
	{"title":"mpvue刨坑指南","date":"2018-03-20 15:24:20","tags":"[小程序,VUE]","link":"/mpvue刨坑指南","article":true},
	{"title":"【项目总结】大牛工资条","tags":"项目总结","date":"2017-09-19 14:17:13","link":"/payroll","article":true},
	{"title":"threejs 开启web的3D大门","date":"2018-09-19 14:17:13","tags:":"","top:":"","link":"/threejs-开启web的3D大门","article":true},
	{"title":"vue的key属性加还是不加？","date":"2018-07-10 17:38:44","tags":"['vue','javascript']","link":"/vue的key属性加还是不加","article":true},
	{"title":"对于cookie存取方法的封装","date":"2018-04-09 15:24:20","tags":"[javascript]","link":"/web前端对于cookie存取的方法封装","article":true},
	{"title":"【2019 冲鸭】年度指标计划","date":"2019-01-25 16:35:43","tags:":"","top":"","link":"/【2019-冲鸭】年度指标计划","article":true},
	{"title":"一些常用但记不住的CSS知识点","date":"2019-02-21 16:10:30","tags":"CSS","top":"true","link":"/一篇文章搞清楚CSS选择器","article":true},
	{"title":"关于array的常用的几个API","date":"2019-04-08 19:24:52","tags:":"","top:":"","link":"/关于array的几个API","article":true},
	{"title":"函数式编程","date":"2019-05-06 18:58:39","tags":"javascript","link":"/函数式编程","article":true},
	{"title":"事件节流（throttle）与防抖（debounce）","date":"2019-03-26 21:27:12","tags":"Javascript","top:":"","link":"/函数节流与防抖","article":true},
	{"title":"前端两种路由的实现原理","date":"2018-07-20 18:12:02","tags":"['javascript','router']","link":"/前端的两种路由","article":true},
	{"title":"剖析JavaScript的内存机制","date":"2018-06-12 00:12:17","tags":"javascript","link":"/剖析JavaScript的内存机制","article":true},
	{"title":"动手实现前后端 websocket 通信","date":"2019-04-09 15:24:20","tags":"[html5,nodejs]","link":"/动手实现 websocket","article":true},
	{"title":"小程序实现vue的watch和computed方法","date":"2018-04-10 12:39:33","tags":"[小程序,VUE]","link":"/原生js实现小程序中类似vue的watch和computed方法","article":true},
	{"title":"【学习整理】你不知道的Chrome调试工具技巧","date":"2019-03-07 11:16:44","tags:":"","top:":"","link":"/合理利用chrome调试工具","article":true},
	{"title":"对MVVM的一些理解","date":"2018-05-24 12:23:14","tags":"javascript","link":"/对MVVM的一些理解","article":true},
	{"title":"小程序学习笔记","date":"2018-03-19 21:24:20","tags":"小程序","link":"/小程序","article":true},
	{"title":"小程序优化总结","date":"2018-08-10 11:47:57","tags":"[小程序,VUE,javascript]","top":"","link":"/小程序优化总结","article":true},
	{"title":"小程序实现仿KeepApp的滑动图表","date":"2018-05-10 15:11:28","tags":"小程序","link":"/小程序实现仿KeepApp的滑动图表","article":true},
	{"title":"小程序实现图片懒加载的三种方式","date":"2018-09-11 14:22:11","tags":"小程序","top":"","link":"/小程序实现图片懒加载的三种方式","article":true},
	{"title":"小程序封装异步请求接口","date":"2018-05-10 15:04:47","tags":"[小程序,VUE,javascript]","link":"/小程序封装异步请求接口","article":true},
	{"title":"浏览器渲染原理","date":"2019-07-12 15:04:47","tags":"[javascript,http]","link":"/浏览器渲染原理","article":true},
	{"title":"浏览器缓存机制","date":"2019-07-12 15:04:47","tags":"[javascript,http]","link":"/浏览器缓存机制","article":true},
	{"title":"深入webpack4.0（一）整体架构","date":"2018-07-16 15:40:08","tags":"[\"webpack\",\"javascript\"]","link":"/深入webpack4.0（一）配置及部分原理","article":true},
	{"title":"深入webpack4.0（三）优化","date":"2018-08-01 14:44:59","tags":"[\"webpack\",\"javascript\"]","link":"/深入webpack4.0（三）原理","article":true},
	{"title":"深入webpack4.0（二）本地服务环境","date":"2018-07-19 14:44:59","tags":"[\"webpack\",\"javascript\"]","link":"/深入webpack4.0（二）本地服务.1","article":true},
	{"title":"深入浅出小程序原理","date":"2018-04-13 17:47:12","tags":"小程序","link":"/深入浅出小程序","article":true},
	{"title":"用Proxy实现MVVM双向绑定","date":"2018-10-18 11:23:03","tags":"['javascript']","top:":"","link":"/用Proxy实现MVVM双向绑定","article":true},
	{"title":"实现一个自动生成小程序文件模版的脚本","date":"2018-12-24 16:41:33","tags:":"","top:":"","link":"/用Shell写个自动生成小程序文件模版的脚本吧","article":true},
	{"title":"聊聊CSS设计模式","date":"2019-07-30 15:04:47","tags":"javascript","link":"/聊聊CSS设计模式","article":true},
	{"title":"聊聊ajax、fetch、axios","date":"2019-03-16 19:40:09","tags":"javascript","top:":"","link":"/聊聊ajax、fetch、axios","article":true},
	{"title":"【项目总结】艺术二维码生成器","date":"2018-02-09 18:13:35","tags":"项目总结","link":"/艺术二维码生成器问题总结","article":true},
	{"title":"说了多少遍的Bind、Call、Apply","date":"2018-08-16 17:13:52","tags":"javascript","top:":"","link":"/说了多少遍的Bind-Call-Apply","article":true},
	{"title":"迟到的2018年计划","date":"2018-04-10 12:18:07","tags":"随笔","top":"","link":"/迟到的2018年计划","article":true},
	{"title":"http的长连接与短连接","date":"2019-07-14 12:18:07","tags":"['http']","top":"","link":"/长连接与短连接","article":true},
]//end

RouterMenu = ArticleMenu.concat(RouterOrigin)

class RouterMap extends React.Component {
	constructor() {
		super()
	}
	componentWillMount() {
		this.changeThemeColor(this.props.location);
		this.props.history.listen((location) => {
			this.changeThemeColor(location);
		})
	}

	changeThemeColor(location) {
		const _html = document.getElementsByTagName('html')[0];
		const isSp = location.pathname === '/about';
		_html.style.backgroundColor = isSp ? '#000' : '#ffffff' ;
	}

	render() {
		return (<Switch>
			{
				RouterMenu.map((routeItem, index) => {
					return (
						<Route exact key={index} path={routeItem.link} component={
							Loadable({
								loader: () =>{
									if(routeItem.title){
										return import('../article'+routeItem.link)
									}else{
										return routeItem.url
									}
								},
								loading: ()=> <div></div>
							})
						}>
						</Route>
					)
				})
			}
		</Switch>)
	}
}

RouterMap = withRouter(RouterMap)

export {
	RouterMenu,
	RouterMap,
	ArticleMenu
}