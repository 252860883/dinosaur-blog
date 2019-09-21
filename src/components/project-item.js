import React from 'react'
import '../style/project-item.scss'
export default class Pagination extends React.Component {
    state = {
        current: 1
    }

    componentWillMount() {
        // this.setState({
        //     current: this.props.current || 1
        // })
    }

    render() {
        return (
            <div className="project-item">
                <img src={this.props.item.img} alt=""></img>
                <div className="content">
                    <div className="title">{this.props.item.title}</div>
                    <p>{this.props.item.content}</p>
                    <a className="more" href={this.props.item.link} target="blank">read more >></a>
                </div>
            </div>
        )
    }
}