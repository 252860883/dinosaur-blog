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
import { IsPC } from "../utils/screen";
// import createHistory from 'history/createBrowserHistory';

// import Loading from '../components/UI/loading'

const routes = (
    <HashRouter>
        <Route
            render={({ location }) => (
                <Fragment>
                    <Header key={location.pathname} />
                    <TransitionGroup>
                        <CSSTransition
                            key={location.pathname}
                            classNames="fade"
                            timeout={800}
                        >
                            <div className={IsPC() ? 'app' : 'app mobile-app'}>
                                {/* 公共组件写在这里 */}
                                <RouterMap />
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                    <Foot />
                </Fragment>
            )} />
    </HashRouter>
)

export default class Root extends React.Component {
    state = {
        loading: true
    }
    componentWillMount() {
        let ImgFolder = picArr.map(item => require('../assets/' + item))
        downloadAllIMG(ImgFolder).then(res => {
            this.setState({
                loading: false
            })
        })
    }

    componentDidMount() {
        if (IsPC()) {
            document.getElementsByTagName('html')[0].style.fontSize = '100px'
        }
    }
    render() {
        // return this.state.loading ? <Loading></Loading> : routes;
        return routes;
    }
}