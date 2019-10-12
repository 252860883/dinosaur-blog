import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"Error"},{"level":"h3","title":"SyntaxError（语法错误）"},{"level":"h3","title":"TypeError（类型错误）"},{"level":"h3","title":"ReferenceError（引用错误）"},{"level":"h3","title":"RangeError（范围超出错误）"},{"level":"h3","title":"URIError（地址处理错误）"},{"level":"h3","title":"参考"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">细数js的错误类型</h1></div>
<p>在平时的业务开发中，我们的代码可能会出现各种报错，这些报错看起来千奇百怪，但是总结下来无非也就是几种类型。所以在本篇文章中，就来介绍下 JavaScript 标准内置对象中的这些错误类型。</p>

<h3 id='Error'>Error</h3>

<blockquote>
  <p>Error 是一个构造函数，我们可以通过 new 操作符来创建一个实例对象。</p>
</blockquote>

<p>通常可以配合<code>throw</code>来抛出这个错误信息，通过<code>try catch</code>来捕获这个错误。</p>

<h3 id='SyntaxError（语法错误）'>SyntaxError（语法错误）</h3>

<blockquote>
  <p>通常我们的代码中出现语法错误会产生该类型报错信息，这也是我们最常见的错误类型</p>
</blockquote>

<h3 id='TypeError（类型错误）'>TypeError（类型错误）</h3>

<blockquote>
  <p>当一个值的类型并非其所预期的类型时，将抛出一个 TypeError 类型错误。</p>
</blockquote>

<p>比如我们改变<code>const</code>定义的变量值时、将一个非函数类型的值当作函数运行时、<code>new</code>一个非函数类型的值时等等，都会抛出一个 TypeError 类型的错误。</p>

<h3 id='ReferenceError（引用错误）'>ReferenceError（引用错误）</h3>

<blockquote>
  <p>当一个不存在的变量被引用时,会抛出该类型的错误。</p>
</blockquote>

<h3 id='RangeError（范围超出错误）'>RangeError（范围超出错误）</h3>

<blockquote>
  <p>试图传递一个number参数给一个范围内不包含该number的函数时则会引发RangeError</p>
</blockquote>

<h3 id='URIError（地址处理错误）'>URIError（地址处理错误）</h3>

<blockquote>
  <p>当向全局 URI 处理函数传递一个不合法的URI时，URIError 错误会被抛出。</p>
</blockquote>

<h3 id='参考'>参考</h3>

<p><a target="_blank" href="https://segmentfault.com/a/1190000011353194">javascript错误处理类型</a></p>
</div>
            </div>

        )
    }
}