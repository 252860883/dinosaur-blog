import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"Action"},{"level":"h3","title":"Reducer"},{"level":"h3","title":"Store"},{"level":"h3","title":"数据流"},{"level":"h3","title":"React 中使用 Redux"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">React学习笔记 Redux</h1></div>
<blockquote>
  <p>Redux 是一个状态管理器。那什么是状态呢？简单来说，状态就是数据。Redux支持 React、Angular、Ember、jQuery 甚至纯 JavaScript，不是只在 React 中才可以使用，</p>
</blockquote>

<h3 id='Action'>Action</h3>

<p>Action 是把数据从应用传到 store 的有效载荷。它是 store 数据的唯一来源。实际应用中一般通过 store.dispatch() 将 action 传到 store。举个例子：</p>

<pre><code><span></span>
<span>{'{'}</span>
<span>    type:'ADD_TODO',</span>
<span>    count:10</span>
<span>}</span>
<span></span>
</code></pre>

<p>本质上讲，Action就是一个普通的对象，Redux 约定，必须使用一个字符串类型（一般大写）的 type 字段来表示要执行的动作，同时实际项目中一般会在新建数据的时候生成唯一的 ID 作为数据的引用标识。尽量减少在 action 中传递数据。</p>

<p>在 Redux 中，Action创建函数只是一个返回action的函数，把创建函数的结果传递给 dispatch() 即可出发一次 dispath过程。</p>

<pre><code><span></span>
<span>// action 创建函数</span>
<span>function addTodo(text) {'{'}</span>
<span>  return {'{'}</span>
<span>    type: ADD_TODO,</span>
<span>    text</span>
<span>  }</span>
<span>}</span>
<span>// dispath 过程</span>
<span>dispatch(addTodo(text))</span>
<span></span>
</code></pre>

<h3 id='Reducer'>Reducer</h3>

<p>Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的(根据action响应state)，记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。reducer格式如下：</p>

<pre><code><span></span>
<span>(previousState, action) =&gt; newState</span>
<span></span>
</code></pre>

<p>Reducer是纯函数，一定要保持纯净，只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。</p>

<p>如果业务量庞大我们可能会有很多的reducer，所以为了实现拆分，可以通过 <code>combineReducers</code> 函数合并起来:</p>

<pre><code><span></span>
<span>...</span>
<span></span>
<span>const todoApp = combineReducers({'{'}</span>
<span>  visibilityFilter,</span>
<span>  todos</span>
<span>})</span>
<span>export default todoApp</span>
<span></span>
</code></pre>

<h3 id='Store'>Store</h3>

<p>我们已经知道了 action 来描述“发生了什么”，reducer来根据 action 更新 state。那 Store 就是把它们联系到一起的对象。那 store 有什么职责呢？</p>

<ul>
<li>维持应用的 state;</li>
<li>提供了 <code>getState()</code> 获取 state;</li>
<li>提供了 <code>dispath()</code> 更新 state;</li>
<li>通过 <code>subscribe(listener)</code> 方法注册监听器;</li>
<li>通过 <code>subscribe(listener)</code> 返回的函数注销监听器.</li>
</ul>

<p>需要注意 Redux 应用只有一个单一的 store。创建 store 也非常的方便：</p>

<pre><code><span></span>
<span>import {'{'} createStore } from 'redux'</span>
<span>import todoApp from './redux/reducers.js'</span>
<span></span>
<span>let store = createStore(todoApp)</span>
<span></span>
</code></pre>

<h3 id='数据流'>数据流</h3>

<p>严格的单向数据流是 Redux 的设计核心。一般情况下遵循四个步骤：<br></br>1. store.dispatch(action)<br></br>2. Store 把 state 和 acgion 两个参数传入 reducer<br></br>3. 根 reducer 把多个子 reducer 输出合并成一个单一的 state 树</p>

<h3 id='React 中使用 Redux'>React 中使用 Redux</h3>
</div>
            </div>

        )
    }
}