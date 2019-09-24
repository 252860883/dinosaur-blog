import React from 'react'

export default class pic3D extends React.Component<any, any> {
    state = {}
    componentDidMount() {}
    render() {
        return (
            <div id="container" className={this.props.IsPC ? 'container' : 'container mobile-container'}>
                <div className="word-1"></div>
                <div className="word-2"></div>
                <div className="circle"></div>
                <img className="dinosaur" alt="" src={require('../assets/dinosaur.png')}></img>
            </div>
        )
    }
}