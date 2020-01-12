import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"参考"}]
        }
    }
    componentWillMount(){
    }
    componentDidMount() {
    }
    render() {
        return (
            <Fragment>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">JavaScript垃圾回收机制</h1></div>
<h3 id='参考'>参考</h3>

<p><a target="_blank" href="https://juejin.im/post/5a6b3fcaf265da3e2c385375">简单了解JavaScript垃圾回收机制</a></p>
</div>
            </Fragment>
        )
    }
}