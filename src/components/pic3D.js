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
        let box = document.getElementById("box")
        container.onmouseenter = this.onMouseEnterHandler.bind(this);
        container.onmouseleave = this.onMouseLeaveHandler.bind(this);
        container.onmousemove = this.onMouseMoveHandler.bind(this);
        this.setState({
            _x: container.offsetLeft + Math.floor(container.offsetWidth / 2),
            _y: container.offsetTop + Math.floor(container.offsetHeight / 2),
            container: container,
            box: box
        })
    }

    onMouseEnterHandler() {
        // const e = this.state.container;
        // console.log(e.offsetLeft, e.offsetWidth, e.offsetTop, e.offsetHeight)
    }
    onMouseLeaveHandler(e) {
        this.state.box.style.transform = this.state.box.style.webkitTransform = "";
    }
    onMouseMoveHandler(e) {
        var e = e || window.event;
        const box = this.state.box;
        const container = this.state.container;
        requestAnimationFrame(() => {
            const x = ((e.clientX - this.state._x) * -1/ container.offsetWidth / 2).toFixed(2);
            const y = ((e.clientY - this.state._y)  / container.offsetHeight / 2).toFixed(2);
            // console.log(e.clientY, this.state._y, container.offsetWidth, container.offsetHeight); 
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