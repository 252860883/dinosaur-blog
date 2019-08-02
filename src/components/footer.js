import React from 'react';
import { IsPC } from "../utils/screen";
import '../style/footer.scss'

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 'Copyright © 2019 冀ICP备17032286号-1'
        }
        this.footer = null
    }
    componentDidMount() {
        // console.log(IsPC())
    }

    judgeHeight() {
        // console.log(this.footer.getBoundingClientRect().top, window.innerHeight)
        // this.setState({
        //     bottom: this.footer.getBoundingClientRect().top >= window.innerHeight
        // })
    }
    render() {
        return (
            <footer id="foot" className='foot'>
                {/* <span>@{this.props.name} </span> */}
                <span>{this.state.content}</span>
                {/* <span>/</span>
                <span>联系我</span> */}
            </footer>
        )
    }
}

