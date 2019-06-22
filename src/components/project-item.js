import React from 'react'
import '../style/project-item.scss'
export default class Pagination extends React.Component {
    state = {
        current: 1
    }

    componentWillMount() {
        this.setState({
            current: this.props.current || 1
        })
    }

    render() {
        return (
            <div className="project-item">
                <img src="https://github.com/Game-Storm/TOONE_LAYA/raw/master/github/%E6%80%BB%E4%BD%93.png"></img>
                <div className="content">
                    <div className="title">独立游戏 TOONE</div>
                    <p>TO ONE 是参加公司 2018 Hackathon 比赛耗费一个月的闲暇时间完成的比赛项目。它是一款独立游戏，以小数的二进制数作为剧情主线展开。玩家从“0”关开始，将面对几十道由不大于 1 的小数组成的递增关卡。在每道关卡中，由当前关卡小数的二进制数铺满游戏宫格，玩家需要通过移动色块将所有的 0 变成 1。最终达到“1”关时既在整个 TO ONE 游戏人生中关</p>
                </div>
            </div>
        )
    }
}