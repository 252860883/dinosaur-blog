import React from 'react'
import '../style/project-item.scss'

interface IProp {
    item: any
}
export default class Pagination extends React.Component<any, IProp> {
    componentWillMount() {
        console.log(this.props)
    }
    clickItem() {
        setTimeout(() => {
            window.open(this.props.item.link, '_blank')
        }, 300)
    }
    render() {
        return (
            <div className="project-item" onClick={this.clickItem.bind(this)}>
                <img src={this.props.item.img} alt=""></img>
                <div className="content">
                    <div className="title">{this.props.item.title}</div>
                    <p>{this.props.item.content}</p>
                    <p className="more" >read more >></p>
                </div>
            </div>
        )
    }
}