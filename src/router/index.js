import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
// import { createHashHistory } from 'history';

// 引入page
import Foot from '../components/footer';
import Header from '../components/header';
import Main from '../components/main';

import Page1 from '../pages/page1';
import ReduxDemo from '../components/reduxDemo';



 const routes= (
    <HashRouter>
        <div>
            <Header/>
            <Route exact path='/page1' component={Page1}></Route>
            <Route exact path='/' component={Main}></Route>
            <Route exact path='/reduxdemo' component={ReduxDemo}></Route>
             {/* 公共组件写在这里 */}
            <Foot name="duhonghui" />
        </div>
    </HashRouter>
)

export default class Root extends React.Component{
    render(){
        return routes;
    }
}
