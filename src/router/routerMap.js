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
let RouterMenu = [{key: '这是一个测试文章',url: import('../article/这是一个测试文章'),link: '/这是一个测试文章',article:true},{key: '这是一个测试文章的副本 2',url: import('../article/这是一个测试文章的副本 2'),link: '/这是一个测试文章的副本 2',article:true},{key: '这是一个测试文章的副本 3',url: import('../article/这是一个测试文章的副本 3'),link: '/这是一个测试文章的副本 3',article:true},{key: '这是一个测试文章的副本 4',url: import('../article/这是一个测试文章的副本 4'),link: '/这是一个测试文章的副本 4',article:true},{key: '这是一个测试文章的副本',url: import('../article/这是一个测试文章的副本'),link: '/这是一个测试文章的副本',article:true},]
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