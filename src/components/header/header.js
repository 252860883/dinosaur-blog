import React from 'react'
import '../../style/header.scss'
import {RouterMenu} from '../../router/routerMap'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        }

        // console.log(this)
    }
    render() {
        return (
            <div className="header">
                <nav>
                    {RouterMenu.map(item=>(<a key={item.key} >{item.key}</a>))}
                </nav>
            </div>
        )
    }
}