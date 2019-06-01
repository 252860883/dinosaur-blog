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
        console.log(box.childNodes)
    }
    onMouseLeaveHandler(e) {
        this.state.box.style.transform = this.state.box.style.webkitTransform = "";
        let boxChild = [...this.state.box.childNodes]
        boxChild.map(item => {
            console.log(item.className)
            item.style.transform = item.style.webkitTransform = "";
        })
    }
    onMouseMoveHandler(e) {
        var e = e || window.event;
        const box = this.state.box;
        const container = this.state.container;
        requestAnimationFrame(() => {
            const y = ((e.clientX - this.state._x) / container.offsetWidth / 2).toFixed(2);
            const x = ((e.clientY - this.state._y) * -1 / container.offsetHeight / 2).toFixed(2);
            var style = "rotateX(" + x + "deg) rotateY(" + y + "deg) matrix(1, 0, 0, 1,0,0) scale3d(1, 1, 1)";
            box.style.transform = box.style.webkitTransform = style;
            let boxChild = [...box.childNodes]
            let style2 =
                boxChild.map(item => {
                    let style;
                    if (item.className.match(/reverse/)) {
                        style = `matrix(1, 0, 0, 1, ${y * 20}, ${-x * 20})`
                    } else {
                        style = `matrix(1, 0, 0, 1, ${-y * 20}, ${x * 20})`
                    }
                    item.style.transform = item.style.webkitTransform = style;
                })
        })

    }

    render() {
        return (
            <div id="container">
                <div id="box">
                    <div className="word"></div>
                    <div className="circle reverse"></div>
                </div>
            </div>
        )
    }
}