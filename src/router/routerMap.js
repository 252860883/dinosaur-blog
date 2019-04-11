import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
// 引入页面
import Main from '../components/main';
import Page1 from '../pages/page1';
export default () => {
    return (
        <Switch>
            <Route exact path='/page1' component={Page1}></Route>
            <Route exact path='/' component={Main}></Route>
        </Switch>

    )
}