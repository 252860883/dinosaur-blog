import React from 'react'
import { Button, Table } from 'antd'
import { RouterMenu } from '../router/routerMap'
import '../style/article.scss'
export default class Article extends React.Component {
    state = {
    }

    clickToArticle(item) {
        this.props.history.push(item.link);
    }

    render() {
        return (
            <div className="article-lists">
                {
                    RouterMenu.map(item => {
                        if (!item.article) return
                        else return (
                            <div key={item.key} className="article-item" onClick={this.clickToArticle.bind(this, item)}>{item.key}</div>
                        )
                    })
                }
            </div>
        )
    }
}
