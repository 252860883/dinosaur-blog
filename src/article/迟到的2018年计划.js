import React from 'react'
import '../style/main.scss'
import { IsPC } from "../utils/screen";
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"<strong>看至少一场livehouse/音乐节</strong>"},{"level":"h3","title":"<strong>看至少十本书（技术/非技术）</strong>"},{"level":"h3","title":"<strong>完成Art-QRCode组件开源</strong>"},{"level":"h3","title":"<strong>再写一个比较好的开源的项目</strong>"},{"level":"h3","title":"<strong>健身，总体重瘦到130斤，嗯，这个很重要</strong>"},{"level":"h3","title":"<strong>培养一个新的兴趣爱好</strong>"},{"level":"h3","title":"<strong>周末坚持不睡懒觉，特殊情况特殊对待，哈哈</strong>"},{"level":"h3","title":"<strong>6月份毕业之后尽量保持一个月回家一次</strong>"},{"level":"h3","title":"<strong>继续深造厨艺，过年承包年夜饭～</strong>"}]
        }
    }
    componentDidMount() {
        if (!IsPC()) {
            const dom = document.getElementsByClassName('article')[0]
            dom.classList.add('article-mobile');
        }
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title">迟到的2018年计划</div>
<h3 id='<strong>看至少一场livehouse/音乐节</strong>'><strong>看至少一场livehouse/音乐节</strong></h3>

<p>进度：<br></br><strong>9月9日</strong> 华晨宇 火星演唱会<br></br><strong>12月16日</strong> 苏运莹 《幻》新专首唱会<br></br><strong>12月23日</strong> 后海大鲨鱼 年轻朋友音乐会</p>

<hr />

<h3 id='<strong>看至少十本书（技术/非技术）</strong>'><strong>看至少十本书（技术/非技术）</strong></h3>

<p>进度：<br></br><strong>7月10日</strong>《三体》<br></br><strong>7月19日</strong>《深入浅出webpack》</p>

<hr />

<h3 id='<strong>完成Art-QRCode组件开源</strong>'><strong>完成Art-QRCode组件开源</strong></h3>

<p>进度：<br></br><strong>7月9日</strong> 可喜可贺，nodejs版本的demo尝试终于OK了！<br></br><strong>9月1日</strong> 半年不开张，开张吃半年，V2EX有人贴了我的项目，“暴增”50star，哈哈<br></br><strong>12月10日</strong> 突破100star🎉</p>

<hr />

<h3 id='<strong>再写一个比较好的开源的项目</strong>'><strong>再写一个比较好的开源的项目</strong></h3>

<p>进度：<br></br><strong>11月17日</strong> 公司Hackathon比赛参加项目 独立游戏TOONE<br></br><strong>11月29日</strong> 拿到一等奖</p>

<hr />

<h3 id='<strong>健身，总体重瘦到130斤，嗯，这个很重要</strong>'><strong>健身，总体重瘦到130斤，嗯，这个很重要</strong></h3>

<p>进度：<br></br><strong>7月1日</strong>：150斤。很不幸，在学校放纵了几个星期，体重回不来了。惩罚自己周一到周四晚上只吃黄瓜🥒or西红柿🍅<br></br><strong>8月23日</strong>：开始我的健身房生活喽～<br></br><img src="https://wx2.sinaimg.cn/mw1024/a73bc6a1ly1futx7n50rcj20qo0z1wjl.jpg" alt="image" title="" /></p>

<hr />

<h3 id='<strong>培养一个新的兴趣爱好</strong>'><strong>培养一个新的兴趣爱好</strong></h3>

<p>进度：<br></br><strong>夜跑：</strong> 嘿，夜跑算不算？<br></br><strong>健身：</strong> 嘿，去健身房算不算？</p>

<hr />

<h3 id='<strong>周末坚持不睡懒觉，特殊情况特殊对待，哈哈</strong>'><strong>周末坚持不睡懒觉，特殊情况特殊对待，哈哈</strong></h3>

<p>进度：<br></br><strong>9月份</strong> 报了私教课，周末上午去上课，强迫不睡懒觉哈哈</p>

<hr />

<h3 id='<strong>6月份毕业之后尽量保持一个月回家一次</strong>'><strong>6月份毕业之后尽量保持一个月回家一次</strong></h3>

<p>进度：<br></br><strong>8月份</strong> 回家了<br></br><strong>中秋节</strong> 买不到票也是很心塞</p>

<hr />

<h3 id='<strong>继续深造厨艺，过年承包年夜饭～</strong>'><strong>继续深造厨艺，过年承包年夜饭～</strong></h3>

<p>进度：<br></br><strong>6月29日：</strong> 跑去超市买了各种调味料和厨具，毕业之后第一次开灶喔！<br></br><img src="https://wx1.sinaimg.cn/mw1024/a73bc6a1ly1fssgmtxgj3j20qo0qo45n.jpg" alt="image" title="" /><br></br><strong>7月1日：</strong> 和乐狗从5点忙活到晚上10点，不幸还被刀划破手指<br></br><img src="https://wx1.sinaimg.cn/mw1024/a73bc6a1ly1fsusbmaiwgj224727rx6p.jpg" alt="image" title="" /></p>

<hr />
</div>
            </div>

        )
    }
}