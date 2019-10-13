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
                <div className="word-group">
                    <span>一</span>
                    <span>个</span>
                    <span>前</span>
                    <span>端</span>
                    <span>开</span>
                    <span>发</span>
                    <span>工</span>
                    <span>程</span>
                    <span>师</span>
                    <span>■</span>
                </div>
                <img className="dinosaur" alt="" src={require('../assets/dinosaur.png')}></img>
            </div>
        )
    }
}