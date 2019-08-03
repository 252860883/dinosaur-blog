import React from 'react'
import '../style/main.scss'
import MainPic3D from '../components/pic3D'
import WordLink from '../components/word-link'
import { IsPC } from "../utils/screen";
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            name: 'duhonghui',
            blockLists: [{
                title: "ARTICLE",
                icon: require('../assets/main-item1.png'),
                link: "/article"
            }, {
                icon: require('../assets/main-item2.png'),
                title: "PROJECT",
                link: "/project"
            }, {
                title: "ABOUT",
                icon: require('../assets/main-item3.png'),
                link: "/about"
            },]
        };
        // 必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的
    }

    componentWillMount() {
        // console.log(axios)
        // axios.post('https://api.github.com/user').then(res => {
        //     console.log(res)
        // })
    }

    clickBlockItem(link) {
        this.props.history.push(link);
    }

    linkReady() {

    }

    render() {
        return (
            <div className="main">
                <MainPic3D IsPC={IsPC()} />
                {/* <div className="mainBlock-title">· SHOW MORE ·</div> */}
                <div className="mainBlock">
                    {
                        this.state.blockLists.map(item => {
                            return (
                                <div className="item" key={item.link} onClick={this.clickBlockItem.bind(this, item.link)}>
                                    <img className="item-icon" src={item.icon}></img>
                                    {/* <div className="item-name">{item.title}</div> */}
                                </div>
                                // <WordLink key={item.link} id={item.title}></WordLink>
                            )
                        })
                    }
                </div>
                <div className="bottom-text">
                    <div>一切都在继续，更何不去努力</div>
                    <div>Everything is going on, let alone work hard</div>
                </div>
            </div>
        )
    }
}

export default withRouter(Main);