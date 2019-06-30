import React from 'react'
import '../style/main.scss'
import MainPic3D from '../components/pic3D'
import { IsPC } from "../utils/screen";
import { withRouter } from 'react-router-dom';
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            name: 'duhonghui',
            blockLists: [{
                title: "ARTICLE",
                icon: require('../assets/icon-article.png'),
                link: "/article"
            }, {
                icon: require('../assets/icon-project.png'),
                title: "PROJECT",
                link: "/project"
            }, {
                title: "ABOUT",
                icon: require('../assets/icon-dinosaur.png'),
                link: "/about"
            },]
        };
        // 必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的
    }
    // 生命周期函数
    // 输出DOM后会执行 componentDidMount
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    clickBlockItem(link) {
        this.props.history.push(link);
    }

    render() {
        return (
            <div className="main">
                <MainPic3D IsPC={IsPC()} />
                <div className="mainBlock-title">· SHOW MORE ·</div>
                <div className="mainBlock">
                    {
                        this.state.blockLists.map(item => {
                            return (
                                <div className="item" onClick={this.clickBlockItem.bind(this, item.link)}>
                                    <img className="item-icon" src={item.icon}></img>
                                    <div className="item-name">{item.title}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="bottom-text">一切都在继续，更何不去努力</div>
            </div>
        )
    }
}

export default withRouter(Main);