import React from 'react';
import '../style/footer.scss'

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '这是一个footer'
        }
    }
    componentDidMount() {
        let footer = document.getElementById('foot');
        console.log(footer)
        footer.onresize = function(){
            console.log('变化')
        }
        // console.log(this.props)
    }


    render() {
        return (
            <footer id="foot" className="foot">
                <span>@{this.props.name} </span>
                <span>{this.state.content}</span>
            </footer>
        )
    }
}

