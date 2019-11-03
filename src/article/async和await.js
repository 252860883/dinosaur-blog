import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"Async/Await 的出现"},{"level":"h3","title":"Iterator"},{"level":"h3","title":"Generator"},{"level":"h3","title":"Async/Await"},{"level":"h3","title":"参考"}]
        }
    }
    componentDidMount() {}
    render() {
        return (
            <Fragment>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">由 Async/Await 引发出来的一系列问题</h1></div>
<h3 id='Async/Await 的出现'>Async/Await 的出现</h3>

<p>在 ES6 出现之前，我们都是通过回调函数的方式来操作异步代码，如果出现大量的回调函数嵌套，代码那真的是辣眼睛，这也是我们常说的<strong>回调地狱</strong>。ES6+以后出现了<code>Promise</code>,大大的优化了异步编程的问题，也避免了回调地狱的问题，但是我们在实际开发中仍然会遇到一大堆then链的问题：</p>

<pre><code><span></span>
<span>ajax('XXX1')</span>
<span>  .then(res =&gt; {'{'}</span>
<span>      // 操作逻辑</span>
<span>      return ajax('XXX2')</span>
<span>  }).then(res =&gt; {'{'}</span>
<span>      // 操作逻辑</span>
<span>      return ajax('XXX3')</span>
<span>  }).then(res =&gt; {'{'}</span>
<span>      // 操作逻辑</span>
<span>  })</span>
<span></span>
</code></pre>

<p>这个时候，就由<code>Async/Await</code>登场了，使用 async 函数以后，使得异步操作变得更加方便：</p>

<pre><code><span></span>
<span>async function a(){'{'}</span>
<span>  await promise1()</span>
<span>  await promise2()</span>
<span>  await promise3()</span>
<span>}</span>
<span></span>
</code></pre>

<p>我们都知道js是<strong>单线程</strong>的，异步的代码原则上是不会阻塞其他代码的执行，但是怎么在<code>async function</code>里面就不是那么回事了呢？ 关于<code>Async/Await</code>究竟是何物，我们继续去探索结果。</p>

<h3 id='Iterator'>Iterator</h3>

<blockquote>
  <p>迭代器（Iterator）可以给一个对象“超能力”，包含一个 next() 方法，调用该方法返回一个对象包含两个属性：value - 当前位置的值；done - 是否迭代结束。</p>
</blockquote>

<p>在过去，我们通过for循环来遍历数组，通过<code>for...in</code>来遍历对象。ES6以后，只要一个对象包含<code>Iterator</code>,我们就可以通过<code>for...of</code>来实现遍历了！</p>

<p>如果想让一个对象是可迭代的，那么这个对象或者其原型链中必须拥有<code>Symbol.iterator</code>属性。当该对象进行迭代时，它的<code>iterator</code>方法都会在不传参情况下被调用，返回的迭代器用于获取要迭代的值。</p>

<p>当然，一些内置类型拥有默认的迭代器行为，例如 <code>Array</code>,<code>TypedArray</code>,<code>String</code>,<code>Map</code>,<code>Set</code>等。</p>

<h3 id='Generator'>Generator</h3>

<blockquote>
  <p>生成器对象是由一个<strong>generator function</strong>返回的,并且它符合我们上面所说的可迭代协议和迭代器协议。</p>
</blockquote>

<p>来，我们定义一个<code>generator function</code>:</p>

<pre><code><span></span>
<span>function* gen() {'{'} </span>
<span>  yield 1;</span>
<span>  yield 2;</span>
<span>  const a = yield 3;</span>
<span>  yield a;</span>
<span>}</span>
<span>let g = gen(); // "Generator {'{'} }"</span>
<span>console.log(g.next()); // {'{'}value:1,done:false}</span>
<span>console.log(g.next()); // {'{'}value:2,done:false}</span>
<span>console.log(g.next()); // {'{'}value:3,done:false}</span>
<span>console.log(g.next(100)); // {'{'}value:100,done:false}</span>
<span>console.log(g.next()); // {'{'}value:undefined,done:true}</span>
<span></span>
</code></pre>

<p>如上面所示的代码片段，<code>function* gen(){'{'}}</code>就是一个生成器函数，而<code>g</code>就是一个生成器对象，它可以执行<code>next()</code>方法（这里可以通过接受一个参数用以向生成器传值，作为上一条yield操作的返回值），也可以被<code>for...of</code>遍历。</p>

<p>等等？？</p>

<p>我们看到在<code>generator function</code>中，我们只有执行了<code>next()</code>方法才会跳到下一个yeild，这期间函数内部的代码一直都是处于阻塞的状态。所以我们是不是可以把 yeild 返回值换成一个promise对象，当异步代码执行完毕再从<code>then()</code>回调中去执行<code>g.next()</code>，是不是就能够把异步的操作变成“同步”的了？为了验证我们的猜想，来上代码试试：</p>

<pre><code><span></span>
<span>// 这里模拟异步事件</span>
<span>function getPromise1() {'{'}</span>
<span>  return new Promise((resole, reject) =&gt; {'{'}</span>
<span>    setTimeout(() =&gt; {'{'}</span>
<span>      resole('get promise1')</span>
<span>    }, 2000)</span>
<span>  })</span>
<span>}</span>
<span>// 这里模拟异步事件</span>
<span>function getPromise2() {'{'}</span>
<span>  return new Promise((resole, reject) =&gt; {'{'}</span>
<span>    setTimeout(() =&gt; {'{'}</span>
<span>      resole('get promise2')</span>
<span>    }, 1000)</span>
<span>  })</span>
<span>}</span>
<span></span>
<span>function* gen() {'{'}</span>
<span>  console.log('run gen function');</span>
<span>  yield getPromise1();</span>
<span>  console.log('wait primise1 done,output this');</span>
<span>  yield getPromise2();</span>
<span>}</span>
<span></span>
<span>let g = gen();</span>
<span>let g1 = g.next().value;</span>
<span>g1.then(res =&gt; {'{'}</span>
<span>  console.log(res);</span>
<span>  let g2 = g.next().value;</span>
<span>  g2.then(res2 =&gt; {'{'}</span>
<span>    console.log(res2);</span>
<span>    g.next();</span>
<span>  })</span>
<span>})</span>
<span></span>
<span></span>
</code></pre>

<p>太好了！输出结果如我们所期待的，整个执行过程大概如下：</p>

<ol>
<li>创建遍历器对象，输出<code>run gen function</code></li>
<li>第一次调用<code>g.next()</code>，并将一个promise对象赋值给<code>g1</code></li>
<li>2s后，<code>g1</code>执行回调函数，输出<code>get promise1</code></li>
<li>第二次调用<code>g.next()</code>，首先输出<code>wait primise1 done,output this</code>，然后将第二个promise2对象赋值给<code>g2</code></li>
<li>1s后，<code>g1</code>执行回调函数，输出<code>get promise2</code></li>
</ol>

<p>不过，我们这例子中只是给了两个异步操作，但凡我们的操作有若干个，这一层层的嵌套也不是个事啊！所以我们来改造一下，使得上一个异步事件执行完了自动就去执行下一个：</p>

<pre><code><span></span>
<span>function async(gen) {'{'}</span>
<span>  let g = gen();</span>
<span>  function run() {'{'}</span>
<span>    let gResult = g.next()</span>
<span>    if (gResult.done) return;</span>
<span>    let gIndex = gResult.value</span>
<span>    gIndex.then(res =&gt; {'{'}</span>
<span>      console.log(res);</span>
<span>      run()</span>
<span>    })</span>
<span>  }</span>
<span>  run()</span>
<span>}</span>
<span></span>
<span>async(function*() {'{'}</span>
<span>  console.log('run gen function');</span>
<span>  yield getPromise1();</span>
<span>  console.log('wait primise1 done,output this');</span>
<span>  yield getPromise2();</span>
<span>  console.log('wait primise2 done,output this');</span>
<span>});</span>
<span></span>
</code></pre>

<h3 id='Async/Await'>Async/Await</h3>

<p>我们已经通过使用<code>Generator</code>实现了类似<code>Async/Await</code>使异步代码执行结束后再执行后续代码的功能，对比下我们用<code>Async/Await</code>来实现的代码：</p>

<pre><code><span></span>
<span>// 使用 Generator 实现</span>
<span>async(function*() {'{'}</span>
<span>  console.log('run gen function');</span>
<span>  yield getPromise1();</span>
<span>  console.log('wait primise1 done,output this');</span>
<span>  yield getPromise2();</span>
<span>  console.log('wait primise2 done,output this');</span>
<span>});</span>
<span></span>
<span>// Async/Await 实现</span>
<span>async function func() {'{'}</span>
<span>  console.log('run gen function');</span>
<span>  await getPromise1();</span>
<span>  console.log('wait primise1 done,output this');</span>
<span>  await getPromise2();</span>
<span>  console.log('wait primise2 done,output this');</span>
<span>}</span>
<span></span>
</code></pre>

<p>可以非常直观的感受到，<code>Async/Await</code>就是一种语法糖，基于Generator 函数和自动执行器实现。不过实际上自动执行器要不我们上面的实现复杂些,下面给出spawn函数的实现，基本就是自动执行器的翻版：</p>

<pre><code><span></span>
<span>function spawn(genF) {'{'}</span>
<span>  return new Promise(function(resolve, reject) {'{'}</span>
<span>    const gen = genF();</span>
<span>    function step(nextF) {'{'}</span>
<span>      let next;</span>
<span>      try {'{'}</span>
<span>        next = nextF();</span>
<span>      } catch(e) {'{'}</span>
<span>        return reject(e);</span>
<span>      }</span>
<span>      if(next.done) {'{'}</span>
<span>        return resolve(next.value);</span>
<span>      }</span>
<span>      Promise.resolve(next.value).then(function(v) {'{'}</span>
<span>        step(function() {'{'} return gen.next(v); });</span>
<span>      }, function(e) {'{'}</span>
<span>        step(function() {'{'} return gen.throw(e); });</span>
<span>      });</span>
<span>    }</span>
<span>    step(function() {'{'} return gen.next(undefined); });</span>
<span>  });</span>
<span>}</span>
<span></span>
</code></pre>

<p>根据上面可知，await 操作之后的代码都相当于一个microtask微任务：</p>

<pre><code><span></span>
<span>async function async1() {'{'}</span>
<span>    console.log('async1 start');</span>
<span>    await async2();</span>
<span>    console.log('async1 end');</span>
<span>}</span>
<span>// 等同于</span>
<span>async function async1() {'{'}</span>
<span>    console.log('async1 start');</span>
<span>    Promise.resolve(async2()).then(() =&gt; {'{'}</span>
<span>            // microtask</span>
<span>            console.log('async1 end');</span>
<span>        })</span>
<span>}</span>
<span></span>
</code></pre>

<h3 id='参考'>参考</h3>

<blockquote>
  <p><a target="_blank" href="https://muyiy.vip/question/async/9.html">Async/Await 如何通过同步的方式实现异步</a></p>
</blockquote>
</div>
            </Fragment>
        )
    }
}