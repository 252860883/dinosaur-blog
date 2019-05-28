import React from 'react'
import Loadable from 'react-loadable';
import { Route, Switch } from 'react-router-dom';
import RouterLoad from "./loading";


const RouterMenu = [
    {
        key: '首页',
        url: import('../pages/main'),
        link: '/main'
    },
    {
        key: 'Page1',
        url: import('../pages/page1'),
        link: '/page1'
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