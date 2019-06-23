import React from 'react'
import '../style/project-item.scss'
export default class Pagination extends React.Component {
    constructor(){
        super()
    }
    state = {
        current: 1
    }

    componentWillMount() {
        this.setState({
            current: this.props.current || 1
        })
    }

    render() {
        return (
            <div className="project-item">
                <img src={this.props.imgUrl}></img>
                <div className="content">
                    <div className="title">{this.props.title}</div>
                    <p>{this.props.content}</p>
                    <a className="more" href={this.props.link} target="blank">read more</a>
                </div>
            </div>
        )
    }
}