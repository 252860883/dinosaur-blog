---
title: TypeScript笔记
date: 2018-12-03 14:52:46
tags: ['javascript','typescript']
top:
---
## 了解 TypeScript
>TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持。TS 增强了代码的可读性和可维护性。

在命令行中输入以下指令就可以在全局享用 TypeScript 语法啦！

```
npm install -g typescript
```

编译 TypeScript 也很简单 直接执行指令： `tsc 文件名` 。

### 对象类型
#### 基础数据类型
在 TypeScript 中有六种基础数据类型，其基本的定义格式为`let 变量名 : 数据类型 = 变量值`。这六种数据类型分别是：`boolean` `number` `string` `void` `undefined` `null`  需要注意，使用基础数据类型时一定要严格按照数据类型赋值，否则编译时会报错。同时还提供了枚举类型方便使用。

```
/**
 * boolean类型
 * new Boolean() 创造的对象不是布尔值而是一个布尔对象,下面这样写会报错
 * let is: boolean = new Boolean(2);  
 * boolean 是 JavaScript 中的基本类型，而 Boolean 是 JavaScript 中的构造函数。
 */

let isDone: boolean = false

/**
 * number类型
 */

let num_a: number = 6
let num_b: number = 0xffff
let num_c: number = NaN
// 二进制和八进制都会被编译成十进制
let num_d: number = 0o744
let num_e: number = 0b111

/**
 * 字符串
 */

let str_a: string = "Villion"
let str_b = `My name is ${str_a}.`


/**
 * 空值(void) Null Undefined
 */

let void_a: void = undefined
let und_b: undefined = undefined  // undefined 类型只能被赋值 undefined 
let null_c: null = null  // null 类型只能赋值 null 

/**
 * 枚举类型
 */
// enum类型是对JavaScript标准数据类型的一个补充。 
// 使用枚举类型可以为一组数值赋予友好的名字。默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。
enum Color {Red,Green,Blue}
let c:Color = Color.Green;
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat}
console.log(Days["Sun"]) // 0
console.log(Days[0]); // 'Sun'
```

#### 任意类型
和基础数据类型对立，可以赋任何类型的值。在任意值上访问任何属性都是允许的，也允许调用任何方法。通常情况下可以认为 void 与 any 相反。
```
let any_a: any = "Dinosaur"
any_a.sayHello()
console.log(any_a.name)
```

变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型。
```
let any_b
// 等价于
let any_b: any
```

#### 类型推论
如果没有明确的指定类型，那么 TypeScript 会依照`类型推论`的规则推断出一个类型,但是编译阶段依然会进行报错。
```
let any_c = "string"
// 等价于
let any_c: string = "string"
```

#### 联合类型
联合类型就是一个对象可以是规定内的多种类型。在 TypeScript 中用 `|` 符号来分割定义的基础类型。当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，只能访问此联合类型的所有类型里共有的属性或方法。变量在被赋值的时候，会根据类型推论的规则推断出一个类型。
```
let fix_a: string | number;
fix_a = "aaa";
fix_a = 1;
```
对于联合类型，我们可以设置 **类型别字** 来表示。
```
type isString = string;
type isNumber = number;
type fix = isString | isNumber;

let fix_b: fix = 'bbb'
```


#### 数组类型 
在 TypeScript 中有很多定义方法，分别是`类型+[]`,`数组泛型`,`接口表示`,泛型和接口我们会在后面进行讲解，这里做简单了解即可。
```
// 表示方法一： 类型+[]
let arr_a: number[] = [1, 2, 3];
let arr_b: string[] = ['a', 'b', 'c'];
// 表示方法二：数组泛型
let arr_c: Array<number> = [1, 2, 3];
// 表示方法三：接口
interface nArray {
    [index: number]: number
}
let arr_d: nArray = [1, 2, 3, 4];
```
在赋值时，数组中的每个值都必须按照定义的类型赋值，否则会报错，如果类型不确定可以使用用 `any` 来表示。

我们常见的**类数组**，比如arguments等,在 TypeScript 都有对应的封装好的接口,如 IArguments, NodeList, HTMLCollection 等直接调用即可。
```
let args: IArguments = arguments;
```

拓展一下**元组类型**：允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
```
let tuple_x: [string, number];
tuple_x = ['10', 10];
// tuple_x = ['10', 10];  // error
```

#### 函数类型
函数定义的方式如下代码所示，需要注意传参以及函数输出都要对其进行类型定义，同时不能多输入或者少输入传参。
```
// 函数声明
function sum(a: number, b: number): number {
    return a + b;
}

// 函数表达式
let aSum = function (a: number, b: number): number {
    return a + b;
}
```

我们其实在很多情况下，实际传入的参数情况是不可控制的，那有什么办法可以解决这个问题吗？我们可以在参数的后面加一个 `?` 来表示这个参数是可选的，但是需注意，可选参数必须要在所有参数的最后位置。同时我们可以采用 ES6 的Rest参数来表示多余的传参。具体表示如下：
```
// 通过在参数名后面添加 ？ 来表示可选参数
function lessParams(a: number, b?: number) {
}
// 在参数尾以 ...变量名 形式表示更多参数
function moreParams(a: number, ...more) {
}
// 传递默认参数的方式如下：
function sum(a: number = 0, b: number = 0){
}
```
同时 函数同样可以使用 `|` 和 `any` 来定义不同的数据类型。

#### 类型断言
类型断言（Type Assertion）可以用来手动指定一个值的类型。之前提到过，当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法。但是有时候我们需要在不确定类型的时候就使用其中的一个属性或者方法。所以这时候就需要使用**类型断言**了。但是需注意：类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的。
```
function getLength(something: string | number): number {
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}
```

#### 类型别名
使用type来创建类型别名，类型别名常用于联合类型。

```
type StringType = string;
type FunctionType = () => string;
type NameOrResolver = StringType | FunctionType;
function getName(n: NameOrResolver): StringType {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```

#### 泛型
有时候我们需要使返回值的类型与传入参数的类型是相同的，这里就引入了**类型变量**来表示：
```
function identity<T>(arg: T): T {
    return arg;
}
```

#### 内置对象
我们知道 JavaScript 中有很多的内置对象可供使用，那么在 TypeScript 中呢，可以直接当做定义好了的类型。
```
let in_b: Boolean = new Boolean(1);
let in_e: Error = new Error('Error occurred');
let in_d: Date = new Date();
let in_r: RegExp = /[a-z]/;
```
对于 DOM 和 BOM内置对象，Typescript 中对应了 `Document`,`HTMLElement`,`Event`,`NodeList`,`MouseEvent`等。举例：
```
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
```

### 接口
在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implements）。TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。同时在接口中可以设置 可选属性、任意属性、只读属性等。
举个🌰：
```
interface Person {
    readonly id: number, // 只读属性，只能在创建的时候被复制 
    name: string,
    age: number,
    height?: number, // xx? 表示属性可选
    [propName: string]: any // 一旦定义了任意属性，那么确定属性和可选属性都必须是它的子属性：
}

let tom: Person = {
    name: 'honghui',
    age: 16,
    height: 175,
    weight: 70
}

// tom.id = 001  // Error
```
和类一样，接口也是可以继承的：
```
// extends 类的继承
class Cat extends Animal {
    constructor(name) {
        super(name);
        // this.cat = 'meow';
    }
    sayHi() {
        return `Meow~ ${super.sayHi()}`
    }
}

let tomCat = new Cat('tom');
console.log(tomCat.sayHi()) // Meow~ My name is tom
```

### 类
下面是一个类的简易Demo：
```
class Animal {
    name: string;
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        return `My name is ${this.name}`
    }
}
let cat = new Animal('cat');
console.log(cat.sayHi()) // My name is cat
```
下面讲讲几个关于类的知识点：
* **继承** 
    基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类。使用 `extends` 关键字实现继承。 
* **修饰符** 
    1. **public**： typescript 默认情况下成员都是 public 可访问的。
    2. **private**： 当成员被标记为 private 时，它就不能在声明它的类的外部访问。
    3. **protected**： protected 修饰符与 private 的区别是 protected 成员在派生类中仍然可以访问。
    4. **readonly**： readonly 关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。
 
具体实现可以看如下demo：
```
class Animal {
    protected name: string;  // 派生类中可访问
    constructor(name) {
        this.name = name;
    }
}

class Cat extends Animal {
    public food: string;
    private secret:string;//私有属性，外部不能访问
    constructor(name) {
        super(name);
        this.food = 'fish';
        this.secret = 'I love dog'
    }
    sayHi() {
        return `Meow~ ${super.sayHi()}`
    }
}

let tomCat = new Cat('tom');
console.log(tomCat.sayHi()) // Meow~ My name is tom
console.log("cat's food is " + tomCat.food)
// console.log(tomCat.secret); // Error
```

同时，TypeScript支持通过 **getters/setters** 来截取对对象成员的访问，可以有效的控制对对象成员的访问：
```
class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName
    }

    set fullName(newName: string) {
        if (newName != 'admin') {
            this._fullName = newName
        } else {
            console.log('NewName is Invalid')
        }
    }
}

let employee = new Employee();
employee.fullName = 'danny';
console.log(employee.fullName) // danny
employee.fullName = 'admin' // NewName is Invalid
```

### 类与接口的结合
>





### 参考
[TypeScript入门教程](https://ts.xcatliu.com/) 
[TypeScript文档](https://www.tslang.cn/docs/home.html)
[一篇朴实的文章带捋完TypeScript基础](https://mp.weixin.qq.com/s/JYHme1lZHFro9S1Qd_7pGQ)

