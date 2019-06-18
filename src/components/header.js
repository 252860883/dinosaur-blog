import React from 'react'
import '../style/header.scss'
import { RouterMenu } from '../router/routerMap'
import { withRouter } from 'react-router-dom';
import { IsPC } from "../utils/screen";
import { TransitionGroup, CSSTransition } from "react-transition-group";
class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            path: "/",
            showNav: false
        }
    }
    componentWillMount() {
        if (!this.props.history.location.pathname) return;
        this.setState({
            path: this.props.history.location.pathname
        })
    }
    clickNav(route) {
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

        // if (this.state.showNav || IsPC()) {
            nav = (
                <nav>
                    {RouterMenu.map(item => {
                        if (item.article) return
                        else return (
                            <a key={item.key} className={this.state.path === item.link ? 'nav-active' : ''} onClick={this.clickNav.bind(this, item)}>{item.key}</a>
                        )
                    })
                    }
                </nav>
            )
        // }

        if (IsPC()) {
            header = (<div className="header" >
                <img className="logo" alt="" src={require('../assets/logo.png')} />
                {nav}
            </div>)
        } else {
            header = (<div className="header-mobile" onClick={this.clickTop.bind(this)}>
                <div className={this.state.showNav ? 'header-top header-top-select' : 'header-top'}>
                    <img className="logo" alt="" src={require('../assets/logo.png')} />
                </div>
                {/* <TransitionGroup> */}
                    <CSSTransition
                        in={this.state.showNav}
                        classNames="slide"
                        unmountOnExit
                        timeout={500}
                    >
                        {nav}
                    </CSSTransition>
                {/* </TransitionGroup> */}

            </div>)
        }

        return (
            <div>
                {header}
            </div>
        )
    }
}
export default withRouter(Header);