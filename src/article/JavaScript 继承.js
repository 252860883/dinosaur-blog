import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h3","title":"原型链继承"},{"level":"h3","title":"借用构造函数继承"},{"level":"h3","title":"组合继承"},{"level":"h3","title":"原型式继承"},{"level":"h3","title":"寄生式继承"},{"level":"h3","title":"寄生组合继承"},{"level":"h3","title":"ES6 Class extends"},{"level":"h3","title":"参考"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">JavaScript 继承</h1></div>
<h3 id='原型链继承'>原型链继承</h3>

<p>原型链继承的核心就是将子类的原型对象指向父类实例，<code>Student.prototype = new Person()</code> 。</p>

<pre><code><span></span>
<span>// 父类</span>
<span>function Person(age) {'{'}</span>
<span>    this.arr = []   </span>
<span>    this.age = age        </span>
<span>}</span>
<span>// 子类</span>
<span>function Student(name) {'{'}</span>
<span>    this.name = name                 </span>
<span>    this.score = 80                  </span>
<span>}</span>
<span>// 继承</span>
<span>Student.prototype = new Person()</span>
<span></span>
</code></pre>

<p>原型链继承非常的简单方便，但问题也是显而易见的，父类的实例被所以子类共享，如果共享的属性是引用类型，那么其中一个子类对该值进行操作，其他子类都会被更新:</p>

<pre><code><span></span>
<span>let student1 = new Student('std1');</span>
<span>let student2 = new Student('std2');</span>
<span>student1.arr.push('stu1')</span>
<span>console.log(student2.arr) // ['stu1']  父类的值被修改</span>
<span></span>
</code></pre>

<p>同时原型链继承很严重的一个缺陷是，无法通过子类向父类传参。</p>

<h3 id='借用构造函数继承'>借用构造函数继承</h3>

<p>借用构造函数继承严格来讲并没有用到 prototype 继承，而是直接在子类构造函数里执行父类构造函数：</p>

<pre><code><span></span>
<span>// 父类</span>
<span>function Person(name) {'{'}</span>
<span>    this.arr = []</span>
<span>    this.name = name</span>
<span>    this.age = 18</span>
<span>}</span>
<span>// 子类</span>
<span>function Student(name) {'{'}</span>
<span>    Person.call(this, name) // 执行 Person 的方法</span>
<span>}</span>
<span></span>
</code></pre>

<p>构造函数继承解决了原型链继承的问题，不仅可以对父类进行传参，而且子类实例也不会共享父类实例了（因为每个实例都像拷贝了一份父类而不是引用）：</p>

<pre><code><span></span>
<span>let student3 = new Student('stu3');</span>
<span>let student4 = new Student('stu4');</span>
<span>console.log(student3.name)  // stu3</span>
<span>student3.arr.push('stu4')</span>
<span>console.log(student4.name)  // [] 未被修改</span>
<span></span>
</code></pre>

<p>但是，新的问题出现了，每个实例都要拷贝一份新的父类，但是如果父类中有像函数这种对象，也不会进行共享了，但是我们完全没必要拷贝多份呀！</p>

<h3 id='组合继承'>组合继承</h3>

<p>为了解决上述两种继承方法的各自的问题，组合式继承出现了，它结合了两种继承的精华：普通的属性放在父类构造函数里，可以给子类共享的放到父类构造函数原型链上：</p>

<pre><code><span></span>
<span>// 父类</span>
<span>function Person() {'{'}</span>
<span>  this.hobbies = ['music','reading']</span>
<span>}</span>
<span>// 共享属性放到原型链上</span>
<span>Person.prototype.say = function() {'{'}console.log('I am a person')}</span>
<span></span>
<span>// 子类</span>
<span>function Student(){'{'}</span>
<span>    Person.call(this)             </span>
<span>}</span>
<span>Student.prototype = new Person()</span>
<span></span>
</code></pre>

<p>来验证一下结果：</p>

<pre><code><span></span>
<span>// 实例化</span>
<span>var stu1 = new Student()</span>
<span>var stu2 = new Student()</span>
<span></span>
<span>stu1.hobbies.push('basketball')</span>
<span>console.log(stu1.hobbies)           // music,reading,basketball</span>
<span>console.log(stu2.hobbies)           // music,reading</span>
<span></span>
<span>console.log(stu1.say == stu2.say)   // true</span>
<span></span>
</code></pre>

<p>组合继承解决了原型链继承和构造函数继承各自的缺点，是常用的继承方案。但是，我们在组合继承中 <code>Person.call(this)</code> 和 <code>new Person()</code> 时分别实例化了两次父类实例，(由于原型链的优先级 Student 原型链上的父类实例并不会被用到），造成了浪费。所以在最后针对组合继承的缺陷也有对应的解决方案。</p>

<h3 id='原型式继承'>原型式继承</h3>

<p>原型式继承和原型链继承都是基于 prototype 实现继承的，所以都存在引用属性共享的缺陷。 原型式继承的核心是返回一个新对象，该对象的 <code>__proto__</code> 指向父类对象：</p>

<pre><code><span></span>
<span>function object(o){'{'}</span>
<span>  function F(){'{'}}</span>
<span>  F.prototype = o;</span>
<span>  return new F();</span>
<span>}</span>
<span></span>
</code></pre>

<p>举个例子：</p>

<pre><code><span></span>
<span>var Person = {'{'}</span>
<span>  name:'abc',</span>
<span>  hobbies:['swimming','running']</span>
<span>}</span>
<span>var person1 = object(Person);</span>
<span>person1.age = 18;</span>
<span>person1.hobbies.push('jumping');</span>
<span>var person2 = object(Person);</span>
<span></span>
<span>console.log(person2.hobbies) // ["swimming", "running", "jumping"]</span>
<span></span>
</code></pre>

<blockquote>
  <p>ECMAScript 5 通过新增 Object.create()方法规范化了原型式继承。这个方法接收两个参数:一 个用作新对象原型的对象和(可选的)一个为新对象定义额外属性的对象。在传入一个参数的情况下， Object.create()与 object()方法的行为相同。——《JAVASCript高级编程》</p>
</blockquote>

<h3 id='寄生式继承'>寄生式继承</h3>

<p>原型式继承有个问题，只能获取到一个对象的浅复制，但额外的属性需要再手动添加，复用性很差！所以寄生式继承就来解决这个问题：使用原型式继承获得一个目标对象的浅复制，然后增强这个浅复制的能力。</p>

<pre><code><span></span>
<span>function object(o){'{'}</span>
<span>  function F(){'{'}}</span>
<span>  F.prototype = o;</span>
<span>  return new F();</span>
<span>}</span>
<span>var Animal = {'{'}</span>
<span>  sex:'male',</span>
<span>  hobbies:['swimming','running']</span>
<span>}</span>
<span></span>
<span>function Cat(name){'{'}</span>
<span>    var cat = object(Animal);</span>
<span>    cat.name=name;</span>
<span>    return cat;</span>
<span>}</span>
<span></span>
<span>let cat1 = Cat('Kitty');</span>
<span>cat1.hobbies.push('jumping')</span>
<span>console.log(cat1.name); // "Kitty"</span>
<span></span>
<span>let cat2 = Cat('Jenny');</span>
<span>console.log(cat2.hobbies);  // ["swimming", "running", "jumping"]</span>
<span></span>
</code></pre>

<p>需要注意，不管是 原型链继承、原型式继承还是寄生式继承，都是基于prototype实现的，所以都会存在引用类型共享的缺陷！</p>

<h3 id='寄生组合继承'>寄生组合继承</h3>

<p>刚才提到组合继承会实例化两次父类，所以这个继承方案就来解决这个问题。其核心就是：借用构造函数 + 相当于浅拷贝父类的原型对象。</p>

<pre><code><span></span>
<span>function object(o){'{'}</span>
<span>  function F(){'{'}}</span>
<span>  F.prototype = o;</span>
<span>  return new F();</span>
<span>}</span>
<span></span>
<span>function inheritPrototype(subType, superType){'{'}</span>
<span>      let prototype = object(superType.prototype)</span>
<span>      prototype.constructor = subType;// 修正原型的构造函数</span>
<span>      subType.prototype = prototype;// 将子类的原型替换为这个原型</span>
<span>}</span>
<span></span>
<span>// 父类</span>
<span>function Person() {'{'}</span>
<span>  this.hobbies = ['music','reading']</span>
<span>}</span>
<span>// 共享属性放到原型链上</span>
<span>Person.prototype.say = function() {'{'}console.log('I am a person')}</span>
<span></span>
<span>// 子类</span>
<span>function Student(){'{'}</span>
<span>    Person.call(this)             </span>
<span>}</span>
<span>inheritPrototype(Student,Person);</span>
<span></span>
<span>// 实例化</span>
<span>var stu1 = new Student()</span>
<span>var stu2 = new Student()</span>
<span></span>
<span>stu1.hobbies.push('basketball')</span>
<span>console.log(stu1.hobbies)           // music,reading,basketball</span>
<span>console.log(stu2.hobbies)           // music,reading</span>
<span>console.log(stu1.say == stu2.say)   // true</span>
<span></span>
</code></pre>

<h3 id='ES6 Class extends'>ES6 Class extends</h3>

<p>ES6继承的结果和寄生组合继承相似，本质上，ES6继承是一种语法糖。但是，寄生组合继承是先创建子类实例this对象，然后再对其增强；而ES6先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。</p>

<pre><code><span></span>
<span>class B extends A {'{'}</span>
<span>  constructor() {'{'}</span>
<span>    super();</span>
<span>  }</span>
<span>}</span>
<span></span>
<span>// 原理如下：</span>
<span></span>
<span>Object.setPrototypeOf = function (obj, proto) {'{'}</span>
<span>  obj.__proto__ = proto;</span>
<span>  return obj;</span>
<span>}</span>
<span></span>
<span>// B 的原型对象继承 A 的对象</span>
<span>Object.setPrototypeOf(B.prototype, A.prototype);</span>
<span></span>
<span>// B 继承 A 的静态属性</span>
<span>Object.setPrototypeOf(B, A);</span>
<span></span>
</code></pre>

<h3 id='参考'>参考</h3>

<blockquote>
  <p><a href="https://segmentfault.com/a/1190000015727237">一篇文章理解JS继承</a><br></br><a href="https://segmentfault.com/a/1190000014476341">JS中的继承(上)</a></p>
</blockquote>
</div>
            </div>

        )
    }
}