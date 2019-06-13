import React from 'react'
import { ArticleMenu } from '../router/routerMap'
import '../style/article.scss'
export default class Article extends React.Component {
    state = {
        topArticleMenu: [],
        normalArticleMenu: [],
        limit: 20,
        page: 1
    }

    componentWillMount() {
        this.handleArticleLists()
    }

    handleArticleLists() {
        const topArticleMenu = ArticleMenu.filter(item => item.top);
        const normalArticleMenu = ArticleMenu.filter(item => !item.top);
        console.log(normalArticleMenu)
        // 对文章进行时间排序
        normalArticleMenu.sort((a, b) => {
            console.log(new Date(a.date).getTime())
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        })

        this.setState({
            topArticleMenu,
            normalArticleMenu
        })

    }

    clickToArticle(item) {
        this.props.history.push(item.link);
    }


    render() {
        return (
            <div className="article-lists">
                {
                    this.state.topArticleMenu.map(item => {
                        return (
                            <div key={item.link} className="article-item article-item-top" >
                                <div className='article-item-content' onClick={this.clickToArticle.bind(this, item)}>
                                    <span className='time'>{item.date.split(' ')[0]} </span>
                                    <span className='title'>{item.title}</span>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    this.state.normalArticleMenu.map(item => {
                        return (
                            <div key={item.link} className="article-item" >
                                <div className='article-item-content' onClick={this.clickToArticle.bind(this, item)}>
                                    <span className='time'>{item.date.split(' ')[0]} </span>
                                    <span className='title'>{item.title}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
