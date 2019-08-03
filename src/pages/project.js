import React from 'react'
import ProjectItem from '../components/project-item'
import "../style/project.scss"



export default class Project extends React.Component {
    state = {
        projectArr: [{
            title: "独立游戏 TOONE",
            img: require('../assets/project-toone.jpg'),
            link: "https://github.com/252860883/TOONE",
            content: "TO ONE 是参加公司 2018 Hackathon 比赛耗费一个月的闲暇时间完成的比赛项目。它是一款独立游戏，以小数的二进制数作为剧情主线展开。"
        }, {
            title: "艺术二维码生成器",
            img: require('../assets/project-qrcode.jpg'),
            link: "https://github.com/252860883/Art-QRCode-min",
            content: "艺术二维码生成器，与传统二维码生成器不同，输入文字或者链接可以生成漂亮的艺术二维码，可放在公众号或手机屏保等多种用途，此项目实现了前端和nodejs版本。"
        }, {
            title: "小程序滑动定位柱状图表组件",
            img: require('../assets/scroll-chart.gif'),
            link: "https://github.com/252860883/wechat-slideBarChart",
            content: "小程序滑动定位柱状图表组件，可用于微信小程序开发，该组件可实现左右滑动，图表进行位移，片刻自动进行位置矫正，当前展示数据更新。IOS 和 Android 端均可使用。"
        }, {
            title: "自习帮-校园约自习网站",
            img: require('../assets/project-studyRoom.jpg'),
            link: "https://github.com/252860883/StudyRoom-System",
            content: "自习帮致力于提高校园自习室利用率，学生用户可以在此平台创建、预约、申请、查询自习室，同时还有个人中心、提醒、排行榜、聊天等功能。"
        }],
    }
    componentWillMount() {
    }

    render() {
        return (
            <div className="project">
                <div className="project-title-content">
                    <div className="project-title">· DINOSAUR PROJECT ·</div>
                </div>

                <div className="project-content">
                    {
                        this.state.projectArr.map((item, index) => {
                            return <ProjectItem item={item} key={index}></ProjectItem>
                        })
                    }
                </div>
            </div>
        )
    }
}
