import React from 'react'
import '../style/main.scss'
import MainPic3D from '../components/pic3D'
import { IsPC } from "../utils/screen";
export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        if(!IsPC()){
            const dom = document.getElementsByClassName('article')[0]
            dom.classList.add('article-mobile');
        }
    }
    render() {
        return (
            <div className="article">
<div className="title">【2019 冲鸭】年度指标计划</div>
<h3><strong>看十本书（技术/非技术）</strong></h3>

<p>进度：<br></br><strong>1月31日</strong> 开始看《重学前端》<br></br>** ** 《JS语言精粹》</p>

<hr />

<h3>** 瘦到130斤 **</h3>

<blockquote>
  <p>新的一年，不变的体重T-T</p>
</blockquote>

<p>进度：<br></br><strong>1月25日</strong> 71kg<br></br><strong>2月3日</strong>  71.7kg<br></br><strong>2月20日</strong> 70.5kg<br></br><strong>2月24日</strong> 69.9kg<br></br><strong>3月11日</strong> 69.1kg<br></br><strong>3月16日</strong> 68.7kg<br></br><strong>3月23日</strong> 68.0kg<br></br><strong>3月31日</strong> 68.8kg<br></br><strong>4月7日</strong> 67.7kg</p>

<hr />

<h3><strong>提升英语阅读水平</strong></h3>

<p>这..</p>

<hr />
</div>
        )
    }
}