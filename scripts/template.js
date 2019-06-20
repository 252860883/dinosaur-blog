import React from 'react'
import '../style/main.scss'
import { IsPC } from "../utils/screen";
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: []
        }
    }
    componentDidMount() {
        if (!IsPC()) {
            const dom = document.getElementsByClassName('article')[0]
            dom.classList.add('article-mobile');
        }
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article"></div>
            </div>

        )
    }
}