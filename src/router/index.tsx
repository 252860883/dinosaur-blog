import React, { Fragment } from 'react'
import { HashRouter, withRouter } from 'react-router-dom'
import { Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import picArr from '../assets/assets'

// 引入公共组件
import Foot from '../components/footer';
import Header from '../components/header';

import { RouterMap } from './routerMap'

interface IState {
}

const routes = (
    <HashRouter>
        <Route
            render={({ location }) => (
                <Fragment>
                    <Header key={location.pathname} />
                    <TransitionGroup className="app">
                        <CSSTransition
                            key={location.pathname}
                            classNames="fade"
                            timeout={800}
                        >
                            <div className="app">
                                <RouterMap />
                                <Foot />
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </Fragment>
            )}
        />
    </HashRouter>
)

export default class Root extends React.Component<any, IState> {
    state = {
    }
    componentWillMount() {}
    render() {
        return routes;
    }
}

