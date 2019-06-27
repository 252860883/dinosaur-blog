import React from 'react'
import { HashRouter, withRouter } from 'react-router-dom'
// import { createHashHistory } from 'history';
import { Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
// 引入公共组件
import Foot from '../components/footer';
import Header from '../components/header';

import { RouterMap } from './routerMap'
import { IsPC } from "../utils/screen";
// import createHistory from 'history/createBrowserHistory';

const routes = (
    <HashRouter>
        <div>
            <Header />
            <Route
                render={({ location }) => (
                    <TransitionGroup>
                        <CSSTransition
                            key={location.pathname}
                            classNames="fade"
                            timeout={800}
                        >
                            <div className='app'>
                                {/* 公共组件写在这里 */}
                                <RouterMap />
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                )} />
            <Foot name="duhonghui" />
        </div>
    </HashRouter>
)

export default class Root extends React.Component {
    componentDidMount() {
        if (IsPC()) {
            document.getElementsByTagName('html')[0].style.fontSize = '100px'
        }
        
    }
    render() {
        return routes;
    }
}