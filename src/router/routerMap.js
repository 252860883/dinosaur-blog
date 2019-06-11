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
let RouterMenu = [{key: 'ES678新特性',url: import('../article/ES678新特性'),link: '/ES678新特性',article:true},{key: 'text',url: import('../article/text'),link: '/text',article:true},]
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