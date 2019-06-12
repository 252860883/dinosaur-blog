import React from 'react'
import Loadable from 'react-loadable';
import { Route, Switch } from 'react-router-dom';
import RouterLoad from "./loading";
import '../style/common.scss'
let RouterOrigin = [
    { key: 'HOME', url: import('../pages/main'), link: '/' },
    { key: 'ARTICLE', url: import('../pages/article'), link: '/article' },
    { key: 'PROJECT', url: import('../pages/about'), link: '/project' },
    { key: 'ABOUT', url: import('../pages/about'), link: '/about' },
]
let RouterMenu = [{key: 'ES678新特性',url: import('../article/ES678新特性'),link: '/ES678新特性',article:true},{key: 'JavaScript的类型检测',url: import('../article/JavaScript的类型检测'),link: '/JavaScript的类型检测',article:true},{key: 'JavaScript精度缺失咋回事？',url: import('../article/JavaScript精度缺失咋回事？'),link: '/JavaScript精度缺失咋回事？',article:true},{key: 'JavaScript设计模式系列（一）开发者模式',url: import('../article/JavaScript设计模式系列（一）开发者模式'),link: '/JavaScript设计模式系列（一）开发者模式',article:true},{key: 'JavaScript运行机制-EventLoop',url: import('../article/JavaScript运行机制-EventLoop'),link: '/JavaScript运行机制-EventLoop',article:true},{key: 'TypeScript笔记',url: import('../article/TypeScript笔记'),link: '/TypeScript笔记',article:true},{key: 'test',url: import('../article/test'),link: '/test',article:true},{key: 'threejs-开启web的3D大门',url: import('../article/threejs-开启web的3D大门'),link: '/threejs-开启web的3D大门',article:true},{key: 'web前端对于cookie存取的方法封装',url: import('../article/web前端对于cookie存取的方法封装'),link: '/web前端对于cookie存取的方法封装',article:true},{key: '关于array的几个API',url: import('../article/关于array的几个API'),link: '/关于array的几个API',article:true},{key: '函数式编程',url: import('../article/函数式编程'),link: '/函数式编程',article:true},{key: '函数节流与防抖',url: import('../article/函数节流与防抖'),link: '/函数节流与防抖',article:true},{key: '前端的两种路由',url: import('../article/前端的两种路由'),link: '/前端的两种路由',article:true},{key: '剖析JavaScript的内存机制',url: import('../article/剖析JavaScript的内存机制'),link: '/剖析JavaScript的内存机制',article:true},{key: '动手实现 websocket',url: import('../article/动手实现 websocket'),link: '/动手实现 websocket',article:true},{key: '柯里化',url: import('../article/柯里化'),link: '/柯里化',article:true},{key: '聊聊ajax、fetch、axios',url: import('../article/聊聊ajax、fetch、axios'),link: '/聊聊ajax、fetch、axios',article:true},{key: '说了多少遍的Bind-Call-Apply',url: import('../article/说了多少遍的Bind-Call-Apply'),link: '/说了多少遍的Bind-Call-Apply',article:true},]
RouterMenu = RouterMenu.concat(RouterOrigin)
const RouterMap = () => {
    return (
        <Switch>
            {
                RouterMenu.map(routeItem => {
                    return (
                        <Route exact key={routeItem.key} path={routeItem.link} component={
                            Loadable({
                                loader: () => routeItem.url,
                                loading: RouterLoad
                            })
                        }>
                        </Route>
                    )
                })
            }
        </Switch>
    )
}

export {
    RouterMenu,
    RouterMap
}