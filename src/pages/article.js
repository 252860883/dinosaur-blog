import React from 'react'
import { ArticleMenu } from '../router/routerMap'
import Pagination from '../components/pagination'
import ArticleList from '../components/article'
import '../style/article.scss'
export default class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className='article-page'>
                <ArticleList></ArticleList>
                {/* <Pagination total={this.state.total} onCurrentChange={this.pageCurrentChange.bind(this)}></Pagination> */}
            </div>
        )
    }
}
