import React from 'react'
import '../style/main.scss'
import MainPic3D from '../components/pic3D'
import { IsPC } from "../utils/screen";
export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            name: 'duhonghui'
        };
        // 必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的
        // this.clickNav = this.clickNav.bind(this);
        // console.log(this);
    }
    // 生命周期函数
    // 输出DOM后会执行 componentDidMount
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className="main">
                <MainPic3D IsPC={IsPC()} />
                {/* <div className="black-button">more</div> */}
            </div>
        )
    }
}