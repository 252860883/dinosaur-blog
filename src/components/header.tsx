import React, { Fragment } from 'react'
import '../style/components/header.scss'
import { RouterMenu } from '../router/routerMap'
import { withRouter } from 'react-router-dom';
import { IsPC } from "../utils/screen";
import { CSSTransition } from "react-transition-group";

interface IsState {
    path: string,
    showNav: boolean
}

class Header extends React.Component<any, IsState> {
    // constructor() {
    // super()
    state = {
        path: "/",
        showNav: false
    }
    // }
    componentWillMount() {
        if (!this.props.history.location.pathname) return;
        this.setState({
            path: this.props.history.location.pathname
        })
    }
    clickNav(route: any) {
        this.props.history.push(route.link);
        this.setState({
            path: route.link
        });
    }
    clickTop() {
        this.setState({
            showNav: !this.state.showNav
        });
    }

    render() {
        let header = null;
        let nav = (<nav></nav>);
        let headerSp = this.state.path === '/about';
        nav = (
            <nav>
                {RouterMenu.map(item => {
                    if (item.article) return ""
                    else return (
                        <span key={item.key} className={this.state.path === item.link ? 'nav-active' : ''} onClick={this.clickNav.bind(this, item)}>{item.key}</span>
                    )
                })
                }
            </nav>
        )

        if (IsPC()) {
            header = (<div className={headerSp ? 'header header-sp' : 'header'} >
                <img className="logo" alt="" src={require('../assets/logo.png')} />
                {nav}
            </div>)
        } else {
            header = (<div className={headerSp ? 'header-mobile header-sp' : 'header-mobile'} onClick={this.clickTop.bind(this)}>
                <div className={this.state.showNav ? 'header-top header-top-select' : 'header-top'}>
                    <img className="logo" alt="" src={require('../assets/logo.png')} />
                </div>
                <CSSTransition
                    in={this.state.showNav}
                    classNames="slide"
                    unmountOnExit
                    timeout={500}
                >
                    {nav}
                </CSSTransition>
            </div>)
        }

        return (
            <Fragment>
                {header}
            </Fragment>
        )
    }
}
export default withRouter(Header);