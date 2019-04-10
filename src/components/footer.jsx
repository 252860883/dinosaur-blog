import React from 'react';
import '../style/footer.scss'

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '这是一个footer'
        }
    }

    componentWillMount() {
        console.log(this.props)
    }

    render() {
        return (
            <footer className="foot">
                <span>@{this.props.name} </span>
                <span>{this.state.content}</span>
            </footer>
        )
    }
}

