import React from 'react'

export default class pic3D extends React.Component {
    constructor() {
        super()
        this.state = {
            container: null,
            _x: 0,
            _y: 0,
            timeout: null,
            count: 0
        }

    }

    componentDidMount() {
        let container = document.getElementById("container");
        let box = document.getElementById("box");
        container.onmouseleave = this.onMouseLeaveHandler.bind(this);
        container.onmousemove = this.onMouseMoveHandler.bind(this);
        this.setState({
            _x: container.getBoundingClientRect().left + Math.floor(container.offsetWidth / 2),
            _y: container.getBoundingClientRect().top + Math.floor(container.offsetHeight / 2),
            container: container,
            box: box
        })
    }
    onMouseLeaveHandler(e) {
        this.state.box.style.transform = this.state.box.style.webkitTransform = "";
    }
    onMouseMoveHandler(e) {
        var e = e || window.event;
        const box = this.state.box;
        const container = this.state.container;
        requestAnimationFrame(() => {
            const y = ((e.clientX - this.state._x) / container.offsetWidth / 2).toFixed(2);
            const x = ((e.clientY - this.state._y)* -1  / container.offsetHeight / 2).toFixed(2);
            var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
            box.style.transform = box.style.webkitTransform = style;
        })

    }

    render() {
        return (
            <div id="container">
                <div id="box"></div>
            </div>
        )
    }
}