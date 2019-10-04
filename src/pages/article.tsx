import React from 'react'
import Pagination from '../components/pagination'
import ArticleList from '../components/article'
import '../style/article.scss'
export default class Article extends React.Component<any, any> {
    componentDidMount() { }
    render() {
        return (
            <div className='article-page'>
                <ArticleList></ArticleList>
                {/* <Pagination total={this.state.total} onCurrentChange={this.pageCurrentChange.bind(this)}></Pagination> */}
            </div>
        )
    }
}
