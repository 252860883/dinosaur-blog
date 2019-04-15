import React from 'react'
import '../../style/header.scss'
import {RouterMenu} from '../../router/routerMap'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }
    clickNav(route){
        // this.props.history.push(route.link);
    }

    render() {
        return (
            <div className="header">
                <nav>
                    {RouterMenu.map(item=>(<a key={item.key} onClick={this.clickNav(item)}>{item.key}</a>))}
                </nav>
            </div>
        )
    }
}