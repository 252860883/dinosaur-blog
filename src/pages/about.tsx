import React from 'react'
import "../style/about.scss"

export default class Article extends React.Component {
    render() {
        return (
            <div className="about">
                <div className="qq-message">
                    {/* <img src={require('../assets/message.png')} alt=""/> */}
                </div>
                <p>代号恐龙。入行两年多的前端小码农。</p>
                <p>热爱技术，想法多，努力向大神们看齐。</p>
                <p>建这个博客的初衷是为了实验一些想法和学习未知的技术栈。</p>
                <p>会逐渐的填充更多的功能优化更细节的交互。</p>
                <p>可以通过访问我的<a target="blank" href="https://github.com/252860883">github</a>了解更多，或者添加我的微信<a href="javascript:void(0)">dadada_Dinosauria</a>，与我取得联系。</p>
                <p>慢慢来吧...</p>
            </div>
        )
    }
}
