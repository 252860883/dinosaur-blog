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
                    <div className="logo"></div>
                    {RouterMenu.map(item => (<a key={item.key} className={this.state.path == item.link ? 'nav-active' : ''} onClick={this.clickNav.bind(this, item)}>{item.key}</a>))}
                </nav>
            </div>
        )
    }
}
export default withRouter(Header);