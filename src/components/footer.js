import React from 'react';
import '../style/footer.scss'

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '这是一个footer'
        }
        this.footer = null
    }
    componentDidMount() {
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
                <span>@{this.props.name} </span>
                <span>{this.state.content}</span>
            </footer>
        )
    }
}

