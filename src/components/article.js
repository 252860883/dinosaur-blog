import React from 'react'
import { ArticleMenu } from '../router/routerMap'
import '../style/article.scss'
import { withRouter } from 'react-router-dom'
class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            topArticleMenu: [],
            normalArticleMenu: [],
            showArticleMenu: [],
            limit: 1400,
            page: 1,
            total: 0
        }
    }
    componentDidMount() {
        this.handleArticleLists()
    }

    getShowArticleMenu(normalArticleMenu) {
        const limit = this.state.limit
        const page = this.state.page
        if (!normalArticleMenu) normalArticleMenu = this.state.normalArticleMenu
        const showArticleMenu = normalArticleMenu.slice((page - 1) * limit, page * limit)
        this.setState({
            showArticleMenu
        })
    }

    handleArticleLists() {
        const topArticleMenu = ArticleMenu.filter(item => item.top);
        const normalArticleMenu = ArticleMenu.filter(item => !item.top);
        // console.log(normalArticleMenu)
        // 对文章进行时间排序
        normalArticleMenu.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
        const total = parseInt(normalArticleMenu.length / this.state.limit)
        this.setState({
            topArticleMenu,
            normalArticleMenu,
            total: normalArticleMenu.length % this.state.limit ? total + 1 : total
        })
        // console.log(normalArticleMenu.length, this.state.limit)
        this.getShowArticleMenu(normalArticleMenu)
    }

    clickToArticle(item) {
        this.props.history.push(item.link);
    }

    pageCurrentChange(e) {
        this.setState({
            page: e
        }, () => {
            this.getShowArticleMenu();
        })
    }

    render() {
        return (
            <div className="article-lists">
                {
                    this.state.page === 1 && !this.props.hideNormal && <img alt="" className="article-title" src={require('../assets/sticky-title.jpg')} ></img>
                }
                {
                    this.state.topArticleMenu.map(item => {
                        if (this.state.page !== 1) return "";
                        return (
                            <div key={item.link} className="article-item article-item-top" onClick={this.clickToArticle.bind(this, item)}>
                                <span className='time'>{item.date.split(' ')[0]} </span>
                                <span className='title'>{item.title}</span>
                            </div>
                        )
                    })
                }
                {
                    
                    !this.props.hideNormal && <img alt="" className="article-title" src={require('../assets/normal-title.jpg')} />
                }
                {
                    !this.props.hideNormal && this.state.showArticleMenu.map(item => {
                        return (
                            <div key={item.link} className="article-item" onClick={this.clickToArticle.bind(this, item)}>
                                <span className='time'>{item.date.split(' ')[0]} </span>
                                <span className='title'>{item.title}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
export default withRouter(Article);
