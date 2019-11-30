import React, { Fragment } from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h2","title":"了解 TypeScript"},{"level":"h3","title":"对象类型"},{"level":"h4","title":"基础数据类型"},{"level":"h4","title":"任意类型"},{"level":"h4","title":"类型推论"},{"level":"h4","title":"联合类型"},{"level":"h4","title":"数组类型"},{"level":"h4","title":"函数类型"},{"level":"h4","title":"类型断言"},{"level":"h4","title":"类型别名"},{"level":"h4","title":"泛型"},{"level":"h4","title":"内置对象"},{"level":"h3","title":"接口"},{"level":"h3","title":"类"},{"level":"h3","title":"类与接口的结合"},{"level":"h3","title":"参考"}]
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
<div className="title-content"><h1 className="title">TypeScript笔记</h1></div>
<h2 id='了解 TypeScript'>了解 TypeScript</h2>

<blockquote>
  <p>TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持。TS 增强了代码的可读性和可维护性。</p>
</blockquote>

<p>在命令行中输入以下指令就可以在全局享用 TypeScript 语法啦！</p>

<pre><code><span></span>
<span>npm install -g typescript</span>
<span></span>
</code></pre>

<p>编译 TypeScript 也很简单 直接执行指令： <code>tsc 文件名</code> 。</p>

<h3 id='对象类型'>对象类型</h3>

<h4 id='基础数据类型'>基础数据类型</h4>

<p>在 TypeScript 中有六种基础数据类型，其基本的定义格式为<code>let 变量名 : 数据类型 = 变量值</code>。这六种数据类型分别是：<code>boolean</code> <code>number</code> <code>string</code> <code>void</code> <code>undefined</code> <code>null</code>  需要注意，使用基础数据类型时一定要严格按照数据类型赋值，否则编译时会报错。同时还提供了枚举类型方便使用。</p>

<pre><code><span></span>
<span>/**</span>
<span> * boolean类型</span>
<span> * new Boolean() 创造的对象不是布尔值而是一个布尔对象,下面这样写会报错</span>
<span> * let is: boolean = new Boolean(2);  </span>
<span> * boolean 是 JavaScript 中的基本类型，而 Boolean 是 JavaScript 中的构造函数。</span>
<span> */</span>
<span></span>
<span>let isDone: boolean = false</span>
<span></span>
<span>/**</span>
<span> * number类型</span>
<span> */</span>
<span></span>
<span>let num_a: number = 6</span>
<span>let num_b: number = 0xffff</span>
<span>let num_c: number = NaN</span>
<span>// 二进制和八进制都会被编译成十进制</span>
<span>let num_d: number = 0o744</span>
<span>let num_e: number = 0b111</span>
<span></span>
<span>/**</span>
<span> * 字符串</span>
<span> */</span>
<span></span>
<span>let str_a: string = "Villion"</span>
<span>let str_b = `My name is ${'{'}str_a}.`</span>
<span></span>
<span></span>
<span>/**</span>
<span> * 空值(void) Null Undefined</span>
<span> */</span>
<span></span>
<span>let void_a: void = undefined</span>
<span>let und_b: undefined = undefined  // undefined 类型只能被赋值 undefined </span>
<span>let null_c: null = null  // null 类型只能赋值 null </span>
<span></span>
<span>/**</span>
<span> * 枚举类型</span>
<span> */</span>
<span>// enum类型是对JavaScript标准数据类型的一个补充。 </span>
<span>// 使用枚举类型可以为一组数值赋予友好的名字。默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。</span>
<span>enum Color {'{'}Red,Green,Blue}</span>
<span>let c:Color = Color.Green;</span>
<span>enum Days {'{'}Sun, Mon, Tue, Wed, Thu, Fri, Sat}</span>
<span>console.log(Days["Sun"]) // 0</span>
<span>console.log(Days[0]); // 'Sun'</span>
<span></span>
</code></pre>

<h4 id='任意类型'>任意类型</h4>

<p>和基础数据类型对立，可以赋任何类型的值。在任意值上访问任何属性都是允许的，也允许调用任何方法。通常情况下可以认为 void 与 any 相反。</p>

<pre><code><span></span>
<span>let any_a: any = "Dinosaur"</span>
<span>any_a.sayHello()</span>
<span>console.log(any_a.name)</span>
<span></span>
</code></pre>

<p>变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型。</p>

<pre><code><span></span>
<span>let any_b</span>
<span>// 等价于</span>
<span>let any_b: any</span>
<span></span>
</code></pre>

<h4 id='类型推论'>类型推论</h4>

<p>如果没有明确的指定类型，那么 TypeScript 会依照<code>类型推论</code>的规则推断出一个类型,但是编译阶段依然会进行报错。</p>

<pre><code><span></span>
<span>let any_c = "string"</span>
<span>// 等价于</span>
<span>let any_c: string = "string"</span>
<span></span>
</code></pre>

<h4 id='联合类型'>联合类型</h4>

<p>联合类型就是一个对象可以是规定内的多种类型。在 TypeScript 中用 <code>|</code> 符号来分割定义的基础类型。当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，只能访问此联合类型的所有类型里共有的属性或方法。变量在被赋值的时候，会根据类型推论的规则推断出一个类型。</p>

<pre><code><span></span>
<span>let fix_a: string | number;</span>
<span>fix_a = "aaa";</span>
<span>fix_a = 1;</span>
<span></span>
</code></pre>

<p>对于联合类型，我们可以设置 <strong>类型别字</strong> 来表示。</p>

<pre><code><span></span>
<span>type isString = string;</span>
<span>type isNumber = number;</span>
<span>type fix = isString | isNumber;</span>
<span></span>
<span>let fix_b: fix = 'bbb'</span>
<span></span>
</code></pre>

<h4 id='数组类型'>数组类型</h4>

<p>在 TypeScript 中有很多定义方法，分别是<code>类型+[]</code>,<code>数组泛型</code>,<code>接口表示</code>,泛型和接口我们会在后面进行讲解，这里做简单了解即可。</p>

<pre><code><span></span>
<span>// 表示方法一： 类型+[]</span>
<span>let arr_a: number[] = [1, 2, 3];</span>
<span>let arr_b: string[] = ['a', 'b', 'c'];</span>
<span>// 表示方法二：数组泛型</span>
<span>let arr_c: Array&lt;number&gt; = [1, 2, 3];</span>
<span>// 表示方法三：接口</span>
<span>interface nArray {'{'}</span>
<span>    [index: number]: number</span>
<span>}</span>
<span>let arr_d: nArray = [1, 2, 3, 4];</span>
<span></span>
</code></pre>

<p>在赋值时，数组中的每个值都必须按照定义的类型赋值，否则会报错，如果类型不确定可以使用用 <code>any</code> 来表示。</p>

<p>我们常见的<strong>类数组</strong>，比如arguments等,在 TypeScript 都有对应的封装好的接口,如 IArguments, NodeList, HTMLCollection 等直接调用即可。</p>

<pre><code><span></span>
<span>let args: IArguments = arguments;</span>
<span></span>
</code></pre>

<p>拓展一下<strong>元组类型</strong>：允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。</p>

<pre><code><span></span>
<span>let tuple_x: [string, number];</span>
<span>tuple_x = ['10', 10];</span>
<span>// tuple_x = ['10', 10];  // error</span>
<span></span>
</code></pre>

<h4 id='函数类型'>函数类型</h4>

<p>函数定义的方式如下代码所示，需要注意传参以及函数输出都要对其进行类型定义，同时不能多输入或者少输入传参。</p>

<pre><code><span></span>
<span>// 函数声明</span>
<span>function sum(a: number, b: number): number {'{'}</span>
<span>    return a + b;</span>
<span>}</span>
<span></span>
<span>// 函数表达式</span>
<span>let aSum = function (a: number, b: number): number {'{'}</span>
<span>    return a + b;</span>
<span>}</span>
<span></span>
</code></pre>

<p>我们其实在很多情况下，实际传入的参数情况是不可控制的，那有什么办法可以解决这个问题吗？我们可以在参数的后面加一个 <code>?</code> 来表示这个参数是可选的，但是需注意，可选参数必须要在所有参数的最后位置。同时我们可以采用 ES6 的Rest参数来表示多余的传参。具体表示如下：</p>

<pre><code><span></span>
<span>// 通过在参数名后面添加 ？ 来表示可选参数</span>
<span>function lessParams(a: number, b?: number) {'{'}</span>
<span>}</span>
<span>// 在参数尾以 ...变量名 形式表示更多参数</span>
<span>function moreParams(a: number, ...more) {'{'}</span>
<span>}</span>
<span>// 传递默认参数的方式如下：</span>
<span>function sum(a: number = 0, b: number = 0){'{'}</span>
<span>}</span>
<span></span>
</code></pre>

<p>同时 函数同样可以使用 <code>|</code> 和 <code>any</code> 来定义不同的数据类型。</p>

<h4 id='类型断言'>类型断言</h4>

<p>类型断言（Type Assertion）可以用来手动指定一个值的类型。之前提到过，当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法。但是有时候我们需要在不确定类型的时候就使用其中的一个属性或者方法。所以这时候就需要使用<strong>类型断言</strong>了。但是需注意：类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的。</p>

<pre><code><span></span>
<span>function getLength(something: string | number): number {'{'}</span>
<span>    if ((&lt;string&gt;something).length) {'{'}</span>
<span>        return (&lt;string&gt;something).length;</span>
<span>    } else {'{'}</span>
<span>        return something.toString().length;</span>
<span>    }</span>
<span>}</span>
<span></span>
</code></pre>

<h4 id='类型别名'>类型别名</h4>

<p>使用type来创建类型别名，类型别名常用于联合类型。</p>

<pre><code><span></span>
<span>type StringType = string;</span>
<span>type FunctionType = () =&gt; string;</span>
<span>type NameOrResolver = StringType | FunctionType;</span>
<span>function getName(n: NameOrResolver): StringType {'{'}</span>
<span>    if (typeof n === 'string') {'{'}</span>
<span>        return n;</span>
<span>    } else {'{'}</span>
<span>        return n();</span>
<span>    }</span>
<span>}</span>
<span></span>
</code></pre>

<h4 id='泛型'>泛型</h4>

<p>有时候我们需要使返回值的类型与传入参数的类型是相同的，这里就引入了<strong>类型变量</strong>来表示：</p>

<pre><code><span></span>
<span>function identity&lt;T&gt;(arg: T): T {'{'}</span>
<span>    return arg;</span>
<span>}</span>
<span></span>
</code></pre>

<h4 id='内置对象'>内置对象</h4>

<p>我们知道 JavaScript 中有很多的内置对象可供使用，那么在 TypeScript 中呢，可以直接当做定义好了的类型。</p>

<pre><code><span></span>
<span>let in_b: Boolean = new Boolean(1);</span>
<span>let in_e: Error = new Error('Error occurred');</span>
<span>let in_d: Date = new Date();</span>
<span>let in_r: RegExp = /[a-z]/;</span>
<span></span>
</code></pre>

<p>对于 DOM 和 BOM内置对象，Typescript 中对应了 <code>Document</code>,<code>HTMLElement</code>,<code>Event</code>,<code>NodeList</code>,<code>MouseEvent</code>等。举例：</p>

<pre><code><span></span>
<span>let body: HTMLElement = document.body;</span>
<span>let allDiv: NodeList = document.querySelectorAll('div');</span>
<span>document.addEventListener('click', function(e: MouseEvent) {'{'}</span>
<span>  // Do something</span>
<span>});</span>
<span></span>
</code></pre>

<h3 id='接口'>接口</h3>

<p>在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implements）。TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。同时在接口中可以设置 可选属性、任意属性、只读属性等。<br></br>举个🌰：</p>

<pre><code><span></span>
<span>interface Person {'{'}</span>
<span>    readonly id: number, // 只读属性，只能在创建的时候被复制 </span>
<span>    name: string,</span>
<span>    age: number,</span>
<span>    height?: number, // xx? 表示属性可选</span>
<span>    [propName: string]: any // 一旦定义了任意属性，那么确定属性和可选属性都必须是它的子属性：</span>
<span>}</span>
<span></span>
<span>let tom: Person = {'{'}</span>
<span>    name: 'honghui',</span>
<span>    age: 16,</span>
<span>    height: 175,</span>
<span>    weight: 70</span>
<span>}</span>
<span></span>
<span>// tom.id = 001  // Error</span>
<span></span>
</code></pre>

<p>和类一样，接口也是可以继承的：</p>

<pre><code><span></span>
<span>// extends 类的继承</span>
<span>class Cat extends Animal {'{'}</span>
<span>    constructor(name) {'{'}</span>
<span>        super(name);</span>
<span>        // this.cat = 'meow';</span>
<span>    }</span>
<span>    sayHi() {'{'}</span>
<span>        return `Meow~ ${'{'}super.sayHi()}`</span>
<span>    }</span>
<span>}</span>
<span></span>
<span>let tomCat = new Cat('tom');</span>
<span>console.log(tomCat.sayHi()) // Meow~ My name is tom</span>
<span></span>
</code></pre>

<h3 id='类'>类</h3>

<p>下面是一个类的简易Demo：</p>

<pre><code><span></span>
<span>class Animal {'{'}</span>
<span>    name: string;</span>
<span>    constructor(name) {'{'}</span>
<span>        this.name = name;</span>
<span>    }</span>
<span>    sayHi() {'{'}</span>
<span>        return `My name is ${'{'}this.name}`</span>
<span>    }</span>
<span>}</span>
<span>let cat = new Animal('cat');</span>
<span>console.log(cat.sayHi()) // My name is cat</span>
<span></span>
</code></pre>

<p>下面讲讲几个关于类的知识点：<br></br>* <strong>继承</strong> <br></br>    基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类。使用 <code>extends</code> 关键字实现继承。 <br></br>* <strong>修饰符</strong> <br></br>    1. <strong>public</strong>： typescript 默认情况下成员都是 public 可访问的。<br></br>    2. <strong>private</strong>： 当成员被标记为 private 时，它就不能在声明它的类的外部访问。<br></br>    3. <strong>protected</strong>： protected 修饰符与 private 的区别是 protected 成员在派生类中仍然可以访问。<br></br>    4. <strong>readonly</strong>： readonly 关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。</p>

<p>具体实现可以看如下demo：</p>

<pre><code><span></span>
<span>class Animal {'{'}</span>
<span>    protected name: string;  // 派生类中可访问</span>
<span>    constructor(name) {'{'}</span>
<span>        this.name = name;</span>
<span>    }</span>
<span>}</span>
<span></span>
<span>class Cat extends Animal {'{'}</span>
<span>    public food: string;</span>
<span>    private secret:string;//私有属性，外部不能访问</span>
<span>    constructor(name) {'{'}</span>
<span>        super(name);</span>
<span>        this.food = 'fish';</span>
<span>        this.secret = 'I love dog'</span>
<span>    }</span>
<span>    sayHi() {'{'}</span>
<span>        return `Meow~ ${'{'}super.sayHi()}`</span>
<span>    }</span>
<span>}</span>
<span></span>
<span>let tomCat = new Cat('tom');</span>
<span>console.log(tomCat.sayHi()) // Meow~ My name is tom</span>
<span>console.log("cat's food is " + tomCat.food)</span>
<span>// console.log(tomCat.secret); // Error</span>
<span></span>
</code></pre>

<p>同时，TypeScript支持通过 <strong>getters/setters</strong> 来截取对对象成员的访问，可以有效的控制对对象成员的访问：</p>

<pre><code><span></span>
<span>class Employee {'{'}</span>
<span>    private _fullName: string;</span>
<span></span>
<span>    get fullName(): string {'{'}</span>
<span>        return this._fullName</span>
<span>    }</span>
<span></span>
<span>    set fullName(newName: string) {'{'}</span>
<span>        if (newName != 'admin') {'{'}</span>
<span>            this._fullName = newName</span>
<span>        } else {'{'}</span>
<span>            console.log('NewName is Invalid')</span>
<span>        }</span>
<span>    }</span>
<span>}</span>
<span></span>
<span>let employee = new Employee();</span>
<span>employee.fullName = 'danny';</span>
<span>console.log(employee.fullName) // danny</span>
<span>employee.fullName = 'admin' // NewName is Invalid</span>
<span></span>
</code></pre>

<h3 id='类与接口的结合'>类与接口的结合</h3>

<p>></p>

<h3 id='参考'>参考</h3>

<p><a target="_blank" href="https://ts.xcatliu.com/">TypeScript入门教程</a> <br></br><a target="_blank" href="https://www.tslang.cn/docs/home.html">TypeScript文档</a><br></br><a target="_blank" href="https://mp.weixin.qq.com/s/JYHme1lZHFro9S1Qd_7pGQ">一篇朴实的文章带捋完TypeScript基础</a></p>
</div>
            </Fragment>
        )
    }
}