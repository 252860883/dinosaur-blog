import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"<strong>看十本书（技术/非技术）</strong>"},{"level":"h3","title":"** 瘦到130斤 **"},{"level":"h3","title":"<strong>提升英语阅读水平</strong>"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">【2019 冲鸭】年度指标计划</h1></div>
<h3 id='<strong>看十本书（技术/非技术）</strong>'><strong>看十本书（技术/非技术）</strong></h3>

<p>进度：<br></br><strong>1月31日</strong> 开始看《重学前端》<br></br>** ** 《JS语言精粹》</p>

<hr />

<h3 id='** 瘦到130斤 **'>** 瘦到130斤 **</h3>

<blockquote>
  <p>新的一年，不变的体重T-T</p>
</blockquote>

<p>进度：<br></br><strong>1月25日</strong> 71kg<br></br><strong>2月3日</strong>  71.7kg<br></br><strong>2月20日</strong> 70.5kg<br></br><strong>2月24日</strong> 69.9kg<br></br><strong>3月11日</strong> 69.1kg<br></br><strong>3月16日</strong> 68.7kg<br></br><strong>3月23日</strong> 68.0kg<br></br><strong>3月31日</strong> 68.8kg<br></br><strong>4月7日</strong> 67.7kg</p>

<hr />

<h3 id='<strong>提升英语阅读水平</strong>'><strong>提升英语阅读水平</strong></h3>

<p>这..</p>

<hr />
</div>
            </div>

        )
    }
}