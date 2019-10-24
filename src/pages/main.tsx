import React from 'react'
import '../style/main.scss'
import MainPic3D from '../components/pic3D'
import ArticleList from '../components/article'
import { IsPC } from "../utils/screen";
import { withRouter } from 'react-router-dom'

interface IBlockItem {
    title: string,
    icon: string,
    link: string
}
interface IState {
    date: object,
    name: string,
    blockLists: Array<IBlockItem>
}


class Main extends React.Component<any, IState> {
    state = {
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

    clickBlockItem = (link: string) => {
        this.props.history.push(link);
    }

    render() {
        return (
            <div className="main">
                <img src="https://wx-static.yangcong345.com/1570433094.png"></img>
                <MainPic3D IsPC={IsPC()} />
                <div className="mainBlock">
                    {
                        this.state.blockLists.map(item => {
                            return (
                                <div className="item" key={item.link} onClick={() => this.clickBlockItem(item.link)}>
                                    <img className="item-icon" alt="" src={item.icon}></img>
                                </div>
                            )
                        })
                    }

                </div>
                <div className="main-article">
                    <div className="article-title">TOP ARTICLE</div>
                    <ArticleList hideNormal={true}></ArticleList>
                </div>

            </div>
        )
    }
}

export default withRouter(Main);