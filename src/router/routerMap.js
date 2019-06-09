import React from 'react'
import Loadable from 'react-loadable';
import { Route, Switch } from 'react-router-dom';
import RouterLoad from "./loading";

let RouterMenu = [{key: 'HOME',url: import('../pages/main'),link: '/'},{key: 'ABOUT',url: import('../pages/about'),link: '/about'},{key: 'abc',url: import('../article/abc'),link: '/abc'},{key: '邢增兴',url: import('../article/邢增兴'),link: '/邢增兴'}]
const RouterMap = () => {
    return (
        <Switch>
            {
                RouterMenu.map(routeItem => {
                    const a = '../pages/main';
                    // console.log(a);
                    // routeItem.url = import("../pages/main") 
                    // routeItem.url = `import(${a})`
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