import React from 'react'
import '../style/header.scss'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state={

        }

        console.log(this)
    }
    render() {
        return (
            <div className="header">
                <span>这是头部的信息</span>
            </div>
        )
    }

}