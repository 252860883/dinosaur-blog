import React from 'react'
import ArticleList from '../components/article'
import '../style/article.scss'
export default class Article extends React.Component<any, any> {
    componentDidMount() { }
    render() {
        return (
            <div className='article-page'>
                <ArticleList></ArticleList>
            </div>
        )
    }
}
