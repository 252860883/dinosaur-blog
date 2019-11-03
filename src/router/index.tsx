import React, { Fragment } from 'react'
import { HashRouter, withRouter } from 'react-router-dom'
import { downloadAllIMG } from '../utils/util'
import { Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import picArr from '../assets/assets'

// 引入公共组件
import Foot from '../components/footer';
import Header from '../components/header';

import { RouterMap } from './routerMap'

interface IState {
    loading: boolean
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
        loading: true
    }
    componentWillMount() {
        let ImgFolder: Array<any> = picArr.map(item => require('../assets/' + item))
        downloadAllIMG(ImgFolder).then(() => {
            this.setState({
                loading: false
            })
        })
    }
    render() {
        return routes;
    }
}

