import React from 'react'
import Loadable from 'react-loadable';
import { HashRouter, Route, Switch } from 'react-router-dom';
import RouterLoad from "./loading";

// 动态引入组件
const Main = Loadable({
    loader: () => import('../pages/main'),
    loading: RouterLoad
})
const Page1 = Loadable({
    loader: () => import('../pages/page1'),
    loading: RouterLoad
})



export default () => {
    return (
        <Switch>
            <Route exact path='/page1' component={Page1}></Route>
            <Route exact path='/' component={Main}></Route>
        </Switch>

    )
}