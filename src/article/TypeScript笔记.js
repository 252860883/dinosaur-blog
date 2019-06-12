import React from 'react'
import '../style/main.scss'
import MainPic3D from '../components/pic3D'

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="article">
<hr/>

<hr/>

<h2>了解 TypeScript</h2>

<blockquote><p>TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持。TS 增强了代码的可读性和可维护性。</p></blockquote>

<p>在命令行中输入以下指令就可以在全局享用 TypeScript 语法啦！</p>

<p><code>
npm install -g typescript
</code></p>

<p>编译 TypeScript 也很简单 直接执行指令： <code>tsc 文件名</code> 。</p>

<h3>对象类型</h3>

<h4>基础数据类型</h4>

<p>在 TypeScript 中有六种基础数据类型，其基本的定义格式为<code>let 变量名 : 数据类型 = 变量值</code>。这六种数据类型分别是：<code>boolean</code> <code>number</code> <code>string</code> <code>void</code> <code>undefined</code> <code>null</code>  需要注意，使用基础数据类型时一定要严格按照数据类型赋值，否则编译时会报错。同时还提供了枚举类型方便使用。</p>

<p><code></code>`
/**
 <em> boolean类型
 </em> new Boolean() 创造的对象不是布尔值而是一个布尔对象,下面这样写会报错
 <em> let is: boolean = new Boolean(2);<br/> </em> boolean 是 JavaScript 中的基本类型，而 Boolean 是 JavaScript 中的构造函数。
 */</p>

<p>let isDone: boolean = false</p>

<p>/**
 <em> number类型
 </em>/</p>

<p>let num<em>a: number = 6
let num</em>b: number = 0xffff
let num<em>c: number = NaN
// 二进制和八进制都会被编译成十进制
let num</em>d: number = 0o744
let num_e: number = 0b111</p>

<p>/**
 <em> 字符串
 </em>/</p>

<p>let str<em>a: string = &quot;Villion&quot;
let str</em>b = <code>My name is ${'{'}str_a}.</code></p>

<p>/**
 <em> 空值(void) Null Undefined
 </em>/</p>

<p>let void<em>a: void = undefined
let und</em>b: undefined = undefined  // undefined 类型只能被赋值 undefined 
let null_c: null = null  // null 类型只能赋值 null </p>

<p>/**
 <em> 枚举类型
 </em>/
// enum类型是对JavaScript标准数据类型的一个补充。 
// 使用枚举类型可以为一组数值赋予友好的名字。默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。
enum Color {'{'}Red,Green,Blue}
let c:Color =Color.Green;
<code></code>`</p>

<h4>任意类型</h4>

<p>和基础数据类型对立，可以赋任何类型的值。在任意值上访问任何属性都是允许的，也允许调用任何方法。通常情况下可以认为 void 与 any 相反。
<code>
let any_a: any = &quot;Dinosaur&quot;
any_a.sayHello()
console.log(any_a.name)
</code></p>

<p>变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型。
<code>
let any_b
// 等价于
let any_b: any
</code></p>

<h4>类型推论</h4>

<p>如果没有明确的指定类型，那么 TypeScript 会依照<code>类型推论</code>的规则推断出一个类型,但是编译阶段依然会进行报错。
<code>
let any_c = &quot;string&quot;
// 等价于
let any_c: string = &quot;string&quot;
</code></p>

<h4>联合类型</h4>

<p>联合类型就是一个对象可以是规定内的多种类型。在 TypeScript 中用 <code>|</code> 符号来分割定义的基础类型。当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，只能访问此联合类型的所有类型里共有的属性或方法。变量在被赋值的时候，会根据类型推论的规则推断出一个类型。
<code>
let fix_a: string | number;
fix_a = &quot;aaa&quot;;
fix_a = 1;
</code>
对于联合类型，我们可以设置 <strong>类型别字</strong> 来表示。
<code></code>`
type isString = string;
type isNumber = number;
type fix = isString | isNumber;</p>

<p>let fix_b: fix = &#39;bbb&#39;
<code></code>`</p>

<h4>数组类型</h4>

<p>在 TypeScript 中有很多定义方法，分别是<code>类型+[]</code>,<code>数组泛型</code>,<code>接口表示</code>,泛型和接口我们会在后面进行讲解，这里做简单了解即可。
<code>
// 表示方法一： 类型+[]
let arr_a: number[] = [1, 2, 3];
let arr_b: string[] = [&#39;a&#39;, &#39;b&#39;, &#39;c&#39;];
// 表示方法二：数组泛型
let arr_c: Array&lt;number&gt; = [1, 2, 3];
// 表示方法三：接口
interface nArray {'{'}
    [index: number]: number
}
let arr_d: nArray = [1, 2, 3, 4];
</code>
在赋值时，数组中的每个值都必须按照定义的类型赋值，否则会报错，如果类型不确定可以使用用 <code>any</code> 来表示。</p>

<p>我们常见的<strong>类数组</strong>，比如arguments等,在 TypeScript 都有对应的封装好的接口,如 IArguments, NodeList, HTMLCollection 等直接调用即可。
<code>
let args: IArguments = arguments;
</code></p>

<p>拓展一下<strong>元组类型</strong>：允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
<code>
let tuple_x: [string, number];
tuple_x = [&#39;10&#39;, 10];
// tuple_x = [&#39;10&#39;, 10];  // error
</code></p>

<h4>函数类型</h4>

<p>函数定义的方式如下代码所示，需要注意传参以及函数输出都要对其进行类型定义，同时不能多输入或者少输入传参。
<code></code>`
// 函数声明
function sum(a: number, b: number): number {'{'}
    return a + b;
}</p>

<p>// 函数表达式
let aSum = function (a: number, b: number): number {'{'}
    return a + b;
}
<code></code>`</p>

<p>我们其实在很多情况下，实际传入的参数情况是不可控制的，那有什么办法可以解决这个问题吗？我们可以在参数的后面加一个 <code>?</code> 来表示这个参数是可选的，但是需注意，可选参数必须要在所有参数的最后位置。同时我们可以采用 ES6 的Rest参数来表示多余的传参。具体表示如下：
<code>
// 通过在参数名后面添加 ？ 来表示可选参数
function lessParams(a: number, b?: number) {'{'}
}
// 在参数尾以 ...变量名 形式表示更多参数
function moreParams(a: number, ...more) {'{'}
}
// 传递默认参数的方式如下：
function sum(a: number = 0, b: number = 0){'{'}
}
</code>
同时 函数同样可以使用 <code>|</code> 和 <code>any</code> 来定义不同的数据类型。</p>

<h4>类型断言</h4>

<p>类型断言（Type Assertion）可以用来手动指定一个值的类型。之前提到过，当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法。但是有时候我们需要在不确定类型的时候就使用其中的一个属性或者方法。所以这时候就需要使用<strong>类型断言</strong>了。但是需注意：类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的。
<code>
function getLength(something: string | number): number {'{'}
    if ((&lt;string&gt;something).length) {'{'}
        return (&lt;string&gt;something).length;
    } else {'{'}
        return something.toString().length;
    }
}
</code></p>

<h4>泛型</h4>

<p>有时候我们需要使返回值的类型与传入参数的类型是相同的，这里就引入了<strong>类型变量</strong>来表示：
<code>
function identity&lt;T&gt;(arg: T): T {'{'}
    return arg;
}
</code></p>

<h4>内置对象</h4>

<p>我们知道 JavaScript 中有很多的内置对象可供使用，那么在 TypeScript 中呢，可以直接当做定义好了的类型。
<code>
let in_b: Boolean = new Boolean(1);
let in_e: Error = new Error(&#39;Error occurred&#39;);
let in_d: Date = new Date();
let in_r: RegExp = /[a-z]/;
</code>
对于 DOM 和 BOM内置对象，Typescript 中对应了 <code>Document</code>,<code>HTMLElement</code>,<code>Event</code>,<code>NodeList</code>,<code>MouseEvent</code>等。举例：
<code>
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll(&#39;div&#39;);
document.addEventListener(&#39;click&#39;, function(e: MouseEvent) {'{'}
  // Do something
});
</code></p>

<h3>接口</h3>

<p>在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implements）。TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。同时在接口中可以设置 可选属性、任意属性、只读属性等。
举个🌰：
<code></code>`
interface Person {'{'}
    readonly id: number, // 只读属性，只能在创建的时候被复制 
    name: string,
    age: number,
    height?: number, // xx? 表示属性可选
    [propName: string]: any // 一旦定义了任意属性，那么确定属性和可选属性都必须是它的子属性：
}</p>

<p>let tom: Person = {'{'}
    name: &#39;honghui&#39;,
    age: 16,
    height: 175,
    weight: 70
}</p>

<p>// tom.id = 001  // Error
<code>
和类一样，接口也是可以继承的：
</code>
// extends 类的继承
class Cat extends Animal {'{'}
    constructor(name) {'{'}
        super(name);
        // this.cat = &#39;meow&#39;;
    }
    sayHi() {'{'}
        return <code>Meow~ ${'{'}super.sayHi()}</code>
    }
}</p>

<p>let tomCat = new Cat(&#39;tom&#39;);
console.log(tomCat.sayHi()) // Meow~ My name is tom
<code></code>`</p>

<h3>类</h3>

<p>下面是一个类的简易Demo：
<code>
class Animal {'{'}
    name: string;
    constructor(name) {'{'}
        this.name = name;
    }
    sayHi() {'{'}
        return `My name is ${'{'}this.name}`
    }
}
let cat = new Animal(&#39;cat&#39;);
console.log(cat.sayHi()) // My name is cat
</code>
下面讲讲几个关于类的知识点：
<em> <strong>继承</strong> 
    基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类。使用 <code>extends</code> 关键字实现继承。 
</em> <strong>修饰符</strong> 
    1. <strong>public</strong>： typescript 默认情况下成员都是 public 可访问的。
    2. <strong>private</strong>： 当成员被标记为 private 时，它就不能在声明它的类的外部访问。
    3. <strong>protected</strong>： protected 修饰符与 private 的区别是 protected 成员在派生类中仍然可以访问。
    4. <strong>readonly</strong>： readonly 关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。</p>

<p>具体实现可以看如下demo：
<code></code>`
class Animal {'{'}
    protected name: string;  // 派生类中可访问
    constructor(name) {'{'}
        this.name = name;
    }
}</p>

<p>class Cat extends Animal {'{'}
    public food: string;
    private secret:string;//私有属性，外部不能访问
    constructor(name) {'{'}
        super(name);
        this.food = &#39;fish&#39;;
        this.secret = &#39;I love dog&#39;
    }
    sayHi() {'{'}
        return <code>Meow~ ${'{'}super.sayHi()}</code>
    }
}</p>

<p>let tomCat = new Cat(&#39;tom&#39;);
console.log(tomCat.sayHi()) // Meow~ My name is tom
console.log(&quot;cat&#39;s food is &quot; + tomCat.food)
// console.log(tomCat.secret); // Error
<code></code>`</p>

<p>同时，TypeScript支持通过 <strong>getters/setters</strong> 来截取对对象成员的访问，可以有效的控制对对象成员的访问：
<code></code>`
class Employee {'{'}
    private _fullName: string;</p>

<pre><code>get fullName(): string {'{'}
    return this._fullName
}

set fullName(newName: string) {'{'}
    if (newName != &#39;admin&#39;) {'{'}
        this._fullName = newName
    } else {'{'}
        console.log(&#39;NewName is Invalid&#39;)
    }
}</code></pre>

<p>}</p>

<p>let employee = new Employee();
employee.fullName = &#39;danny&#39;;
console.log(employee.fullName) // danny
employee.fullName = &#39;admin&#39; // NewName is Invalid
<code></code>`</p>

<h3>类与接口的结合</h3>

<blockquote><p>学习整理自：
https://ts.xcatliu.com/
https://www.tslang.cn/docs/home.html</p></blockquote>
</div>
        )
    }
}