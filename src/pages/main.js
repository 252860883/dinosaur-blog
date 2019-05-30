import React from 'react'
import '../style/main.scss'
// import { withRouter } from 'react-router-dom'
export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            name: 'duhonghui'
        };
        // 必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的
        this.clickNav = this.clickNav.bind(this);
    }
    // 生命周期函数
    // 输出DOM后会执行 componentDidMount
    componentDidMount() {
        this.timerID = setInterval(() => {
            this.setState({
                date: new Date()
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    clickNav() {
        // console.log("======")
        console.log(this.props)
        this.props.history.push("/reduxdemo");
    }

    render() {
        return (
            <div>
                <nav>
                    {/* <a href="#/reduxdemo">点击进入 ReduxDemo</a> */}
                    <a onClick={this.clickNav}>点击进入 ReduxDemo</a>
                </nav>
                <pre>
                    <code>
                        今天的时间是：{this.state.date.toLocaleTimeString()}
                    </code>
                </pre>
            </div>
        )
    }
}