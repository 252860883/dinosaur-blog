import React from 'react'
import { HashRouter } from 'react-router-dom'
// import { createHashHistory } from 'history';

// 引入公共组件
import Foot from '../components/footer';
import Header from '../components/header/header';

import { RouterMap } from './routerMap'
// import createHistory from 'history/createBrowserHistory';

console.log(<RouterMap />)
const routes = (
    <HashRouter>
        <div>
            <Header/>
            {/* 公共组件写在这里 */}
            <RouterMap />
            <Foot name="duhonghui" />
        </div>
    </HashRouter>
)

export default class Root extends React.Component {
    render() {
        return routes;
    }
}
