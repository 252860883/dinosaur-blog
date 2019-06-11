import React from 'react'
import { HashRouter } from 'react-router-dom'
// import { createHashHistory } from 'history';
import { Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
// 引入公共组件
import Foot from '../components/footer';
import Header from '../components/header';

import { RouterMap } from './routerMap'
// import createHistory from 'history/createBrowserHistory';

const routes = (
    <HashRouter>
        <div>
            <Header />
            <Route
                render={({ location }) => (
                    <TransitionGroup>
                        <CSSTransition
                            // 需要加一个key属性，让react认识每个组件，并进行正确的加载。
                            // 这里我改了官方demo的代码， 原来是设置成location.key， 这样的话每次点击同一个路由链接的时候都会渲染。
                            key={location.pathname}
                            // classNames 就是设置给css动画的标示，记得'classNames'带's'的。
                            classNames="fade"
                            // 动画时间设置为800ms，和css中的需要一致。
                            timeout={800}
                        >
                            <div>
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
    render() {
        return routes;
    }
}
