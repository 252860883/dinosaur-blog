import React from 'react'

export default class pic3D extends React.Component {
    constructor() {
        super()
        this.state = {
            container: null,
            box: null,
            _x: 0,
            _y: 0,
            x: 350,
            y: 50

        }
        this.container = null
        this.box = null
        this.count = 0
        this.timeout = null
    }

    componentDidMount() { }

    render() {
        return (
            <div id="container" className={this.props.IsPC ? 'container' : 'container mobile-container'}>
                <div className="word-1"></div>
                <div className="word-2"></div>
                <div className="circle"></div>
                <img className="dinosaur" src={require('../assets/dinosaur.png')}></img>
            </div>
        )
    }
}