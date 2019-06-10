import React from 'react'
import '../style/header.scss'
import { RouterMenu } from '../router/routerMap'
import { withRouter } from 'react-router-dom';
class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            path: "/"
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
    render() {
        return (
            <div className="header">
                <nav>
                    <img className="logo" alt="" src={require('../assets/logo.png')} />
                    {RouterMenu.map(item => {
                        if (item.article) return
                        else return (
                            <a key={item.key} className={this.state.path === item.link ? 'nav-active' : ''} onClick={this.clickNav.bind(this, item)}>{item.key}</a>
                        )
                    })
                    }
                </nav>
            </div>
        )
    }
}
export default withRouter(Header);