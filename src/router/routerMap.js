import React from 'react'
import Loadable from 'react-loadable';
import { Route, Switch } from 'react-router-dom';
import RouterLoad from "./loading";


const RouterMenu = [
    {
        key: '首页',
        url: import('../pages/main'),
        link: '/'
    },
    {
        key: '文章',
        url: import('../pages/page1'),
        link: '/page1'
    },
    {
        key: '关于',
        url: import('../pages/about'),
        link: '/about'
    }
]

const RouterMap = () => {
    return (
        <Switch>
            {
                RouterMenu.map(routeItem => (<Route exact key={routeItem.key} path={routeItem.link} component={
                    Loadable({
                        loader: () => routeItem.url,
                        loading: RouterLoad
                    })
                }></Route>)
                )
            }
        </Switch>
    )
}

export {
    RouterMenu,
    RouterMap
}