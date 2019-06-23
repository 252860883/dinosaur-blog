import React from 'react'
import ProjectItem from '../components/project-item'
import "../style/project.scss"
export default class Project extends React.Component {
    state = {
        projectArr: [{
            title: "",
            img: require('../assets/project-toone.jpg'),
            link:"https://github.com/252860883/TOONE",
            content: "TO ONE 是参加公司 2018 Hackathon 比赛耗费一个月的闲暇时间完成的比赛项目。它是一款独立游戏，以小数的二进制数作为剧情主线展开。"
        }, {
            title: "",
            img: require('../assets/project-qrcode.jpg'),
            link:"https://github.com/252860883/Art-QRCode-min",
            content: "艺术二维码生成器，与传统二维码生成器不同，输入文字或者链接可以生成漂亮的艺术二维码，可放在公众号或手机屏保等多种用途，此项目实现了前端和nodejs版本。"
        }]
    }
    componentDidMount() {
        // console.log('ok');
    }

    // delete(name) {
    //     console.log(`确定要删除${name}嘛？`)
    // }

    render() {
        return (
            <div className="project">
                <div className="project-title-content">
                    <div className="project-title">· DINOSAUR PROJECT ·</div>
                </div>

                <div className="project-content">
                    {
                        this.state.projectArr.map((item, index) => {
                            return <ProjectItem content={item.content} imgUrl={item.img} link={item.link}></ProjectItem>
                        })
                    }
                </div>
            </div>
        )
    }
}
