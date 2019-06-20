import React from 'react'
import '../style/main.scss'
import { IsPC } from "../utils/screen";
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"abcddd"},{"level":"h3","title":"abcddd"}]
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
                <div className="article">
<div className="title">React 学习笔记 </div>
<h3 id='abcddd'>abcddd</h3>

<h3 id='abcddd'>abcddd</h3>
</div>
            </div>

        )
    }
}