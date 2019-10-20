import React from 'react'
import "../style/about.scss"

export default class Article extends React.Component {
    render() {
        return (
            <div className="about">
                <div className="qq-message">
                    {/* <img src={require('../assets/message.png')} alt=""/> */}
                </div>
                <p>代号恐龙，一开始瞎起的，这么多年就一直叫下来了。</p>
                <p>你可以通过访问我的<a target="blank" href="https://github.com/252860883">github</a>了解更多，或者添加我的微信：dadada_Dinosauria，与我取得联系。</p>
                <p>建这个博客的初衷是为了练手 React，因为平时的业务开发主要集中在 vue 和 微信小程序。</p>
                <p>会逐渐的填充更多的功能优化更细节的交互。</p>
                <p>慢慢来吧...</p>
            </div>
        )
    }
}
