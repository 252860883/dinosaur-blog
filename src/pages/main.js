import React from 'react'
import '../style/main.scss'
import MainPic3D from '../components/pic3D'
import ArticleList from '../components/article'
import { IsPC } from "../utils/screen";
import { withRouter } from 'react-router-dom'

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
    }

    componentWillMount() { }

    clickBlockItem(link) {
        this.props.history.push(link);
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
                                </div>
                            )
                        })
                    }

                </div>
                <div className="article-page">
                    <ArticleList hideNormal={true}></ArticleList>
                </div>
            </div>
        )
    }
}

export default withRouter(Main);