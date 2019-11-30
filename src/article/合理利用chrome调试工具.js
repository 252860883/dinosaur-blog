import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"console 中使用 $"}]
        }
    }
    componentWillMount(){
    }
    componentDidMount() {
    }
    render() {
        return (
            <Fragment>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">你不知道的Chrome调试工具技巧</h1></div>
<blockquote>
  <p>你不知道的Chrome调试工具技巧系列文章由作者<a target="_blank" href="https://twitter.com/sulco">Tomek Sułkowski</a>发布在 medium 上的一个系列。由<a target="_blank" href="https://juejin.im/user/585a2f52128fe10069ba1b95/activities">dendoink</a>授权作中文翻译，这篇博客整理一些不是很了解但非常有用的 Chrome调试技巧。</p>
</blockquote>

<h3 id='console 中使用 $'>console 中使用 $</h3>

<ul>
<li><strong>【 $0 $1 $2 】</strong>在 Chrome 的 Elements 面板中，<code>$0</code> 是当前我们选中的 html 节点的引用。<code>$1</code> 是上一次选中的节点，<code>$2</code> 是上上次引用，以此类推。</li>
<li><strong>【 $$ 】</strong> <code>$$</code> 类似于方法 <code>document.QuerySelectorAll</code> ,它将返回一个 Node list.</li>
<li><strong>【 $_ 】</strong> <code>$_</code> 是对上次执行操作的取直。</li>
<li><strong>【 $i 】</strong> 安装插件<a target="_blank" href="https://chrome.google.com/webstore/detail/console-importer/hgajpakhafplebkdljleajgbpdmplhie/related">Console Importer</a> 后，可以使用 <code>$i</code> 来引入一些 npm 库到 console中来使。</li>
</ul>

<p><img src="http://wx1.sinaimg.cn/mw690/a73bc6a1ly1g0ui6lq27cj21hc0u0jzc.jpg" alt="image" title="" /></p>
</div>
            </Fragment>
        )
    }
}