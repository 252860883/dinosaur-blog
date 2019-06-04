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
            y: 50,

        }
        this.container = null
        this.box = null
        this.count = 0
        this.timeout = null
    }

    componentDidMount() {
        this.container = document.getElementById("container");
        this.box = document.getElementById("box");
        this.container.onmouseenter = this.onMouseEnterHandler.bind(this);
        this.container.onmouseleave = this.onMouseLeaveHandler.bind(this);
        this.container.onmousemove = this.onMouseMoveHandler.bind(this);
        this.setState({
            _x: this.container.getBoundingClientRect().left + Math.floor(this.container.offsetWidth / 2),
            _y: this.container.getBoundingClientRect().top + Math.floor(this.container.offsetHeight / 2),
        })
        this.autoMouseMove();
    }
    onMouseEnterHandler() {
        clearInterval(this.timeout)
    }
    onMouseLeaveHandler(e) {
        this.box.style.transform = this.box.style.webkitTransform = "";
        let boxChild = [...this.box.childNodes]
        boxChild.map(item => {
            item.style.transform = item.style.webkitTransform = "";
        })
        this.autoMouseMove()
    }
    onMouseMoveHandler(e) {
        var e = e || window.event;
        requestAnimationFrame(() => {
            this.moveBox(e.clientX, e.clientY);
        })
    }
    moveBox(mouseX, mouseY, auto) {
        console.log(mouseX, mouseY)
        const box = this.box;
        const container = this.container;
        const y = ((mouseX - this.state._x) / container.offsetWidth / 2).toFixed(2);
        const x = ((mouseY - this.state._y) * -1 / container.offsetHeight / 2).toFixed(2);
        var style = "rotateX(" + x + "deg) rotateY(" + y + "deg) matrix(1, 0, 0, 1,0,0) scale3d(1, 1, 1)";
        box.style.transform = box.style.webkitTransform = style;
        box.style.transition = auto ? 'all 4s' : 'all 0.2s'
        let boxChild = [...box.childNodes]
        boxChild.map(item => {
            let style;
            if (item.className.match(/reverse/)) {
                style = `matrix(1, 0, 0, 1, ${y * 20}, ${-x * 20})`
            } else if (item.className.match(/left/)){
                style = `matrix(1, 0, 0, 1, ${-y * 20}, ${x * 20})`
            }else{
                style = `matrix(1, 0, 0, 1, ${y * 20}, ${x * 20})`
            }
            item.style.transform = item.style.webkitTransform = style;
            item.style.transition = auto ? 'all 4s' : 'all 0.2s'
        })
    }
    // 自动旋转
    autoMouseMove() {
        const box = this.box.getBoundingClientRect()
        const coordinate = [[box.x, box.y], [box.right, box.y], [box.right, box.bottom], [box.x, box.bottom]]
        console.log(coordinate)
        this.timeout = setInterval(() => {
            this.count = this.count == 3 ? 0 : ++this.count
            this.moveBox(coordinate[this.count][0], coordinate[this.count][1], true)
        }, 3000)

    }

    render() {
        return (
            <div id="container">
                <div id="box">
                    <div className="word"></div>
                    <div className="circle left"></div>
                </div>
            </div>
        )
    }
}