---
title: JavaScript的类型检测
date: 2019-01-24 10:30:12
tags: javascript
top:
---
>大家都知道 JavaScript 是一个弱类型语言，所以平时对类型的判断是一个很重要的事情。当然也有很多方法可以用来区分类型：typeof、instanceof、=== 等等，那我们需要在什么场景下该用哪个方法来区分呢？

### 类型
复习一下 JavaScript 的数据类型，基本数据类型：`Number`、`String`、`Null`、`Undefined`、`Boolean`、`Symbol`。引用数据类型：`Object`、`Array`、`Function`、`Date`等。关于两者的区别这里不再做介绍，可以翻看我之前的另一篇文章：[剖析JavaScript的内存机制](https://252860883.github.io/2018/06/12/%E5%89%96%E6%9E%90JavaScript%E7%9A%84%E5%86%85%E5%AD%98%E6%9C%BA%E5%88%B6/)

### typeof
> typeof 返回一个表示数据类型的字符串。这里需要注意：它不能判断 null、array、date、RegExp等类型。

```
** 以下情况可以进行判断 **

typeof Symbol(); // symbol 
typeof ''; // string 
typeof 1; // number 
typeof true; //boolean 
typeof undefined; //undefined 
typeof new Function(); // function 
typeof {}; // object

** 以下情况无法进行判断 **

typeof null; //object 
typeof [1,2,3] ; //object 
typeof new Date(); //object 
typeof new RegExp(); //object 

```

### instanceof
> A instanceof B 是判断 A 是否为 B 的实例，即判断 A的原型链中是否存在构造函数B。所以我们可以通过这个方法来判断 array、date、RegExp等。

```
[1,2,3] instanceof Array; //true
{} instanceof Object;//true
new Date() instanceof Date;//true
new RegExp() instanceof RegExp//true
```

同时，检测 Array 类型也可以使用 ES6 的新语法  `Array.isArray()` 来进行检测。

正如上面所说，只要 A的原型链中存在构造函数B即返回 true 所以可能有多个构造函数B满足：
```
[1,2,3] instanceof Array; // true
[1,2,3] instanceof Object; // true
```

模拟实现一个 `instanceof` 方法：

```
function instanceOf(A, B) {
    while (true) {
        // 原型链到头仍未找到返回false
        if(A === null){
            return false
        }
        if (A === B.prototype) {
            console.log(A,B)
            return true
        }
        A = A.__proto__
    }
}
```

但是需要注意，对于基本数据类型来说，我们需要通过**创建实例**方法才能被 instanceof 检测出来。原因是：通过字面量方式创建的基本数据类型不是一个严谨的实例，只有通过实例创建出的对象才是标准的对象数据类型值。而由于 JS 的松散性，可以按照正常基本类型对象处理。
```
1 instanceof Number; // false
new Number(1) instanceof Number; // false

"abc" instanceof String; // false 
new String('abc') instanceof String; // true

```

对于检测 Null 和 Undefined 类型，instanceof 又鸡肋了！因为浏览器不允许在外部访问 Null 和 Undefined 类，所以会出现以下报错：

```
null instanceof Null; // Null is not defined
undefined instanceof Undefined; // Undefined is not defined
```
### isPrototypeOf()
>方法用于测试一个对象是否存在于另一个对象的原型链上,它和 instanceof 有着异曲同工的作用：

```
RegExp.prototype.isPrototypeOf(/\n/)    // true
String.prototype.isPrototypeOf(new String('1234'))  // true
String.prototype.isPrototypeOf('1234')  // true
```


### ===
> 严格等于就好说啦，他只能用来判断 null 和 undefined 类型，因为这两个类型的值都是唯一的。

```
var a = null;
a === null; // true 

var b = undefined;
b ==== undefined; // true
```

### constructor 
> constructor 和 instanceof 的作用很像，区别在于它可以处理基本数据类型，并且在检测 Object 时处理不一样。

```
** constructor只能判断是否由该构造函数创建的实例，不能判断原型链上的 **
[1,2,3].constructor == Array; // true 
[1,2,3].constructor == Object; // false

** 可以用来判断基础类型 null/undefined 除外 **
var a="aaa";
a.constructor == String; // true
var b=1;
b.constructor == Number; // true

```
当然 constructor 还是同样不能判断 `null` 和 `undefined`，同时如果对类的原型进行重写时很有可能把 constructor给覆盖，所以还是要慎用哦！

### Object.prototype.toString.call()
>嗯，最后出场的一定是大佬级了，这是最准确也是最常用的方法了。

我们平时都知道 `to String()` 是转换为字符串，但是对于Object上的 toString 并不是用来转换字符串，它的作用是返回当前方法执行的主体（方法中的 this）所属类的详细信息即"[object Object]",其中第一个 object 代表当前实例是对象数据类型的(这个是固定死的)，第二个 Object 代表的是 this 所属的类是 Object。

```
Object.prototype.toString.call('') ;   // [object String]
Object.prototype.toString.call(1) ;    // [object Number]
Object.prototype.toString.call(true) ; // [object Boolean]
Object.prototype.toString.call(undefined) ; // [object Undefined]
Object.prototype.toString.call(null) ; // [object Null]
Object.prototype.toString.call(new Function()) ; // [object Function]
Object.prototype.toString.call(new Date()) ; // [object Date]
Object.prototype.toString.call([]) ; // [object Array]
Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
Object.prototype.toString.call(new Error()) ; // [object Error]
Object.prototype.toString.call(document) ; // [object HTMLDocument]
Object.prototype.toString.call(window) ; //[object global] window是全局对象global的引用
Object.prototype.toString.call({}) ; // [object Object]
```

### 总结

| 方法 | 可判断类型 | 缺点 |
 |-- | -- | -- |
| typeof | 基本数据类型（null除外）、Object | 不能判断 null、array、date、RegExp等类型 |
| instanceof |  Array、Date、RegExp等类型 | 1.只要是在实例上的构造函数就会判断为真 2.基本数据类型必须通过实例创建方式才能被检测 3.不能检测 null 和 undefined |
| === | Null 和 Undefined| 只能检测 null 和 undefined|
| constructor| 基本数据类型、Array、Date、RegExp等| 1.不能判断 null 和 undefined 2.如果对类的原型进行重写时很有可能把 constructor给覆盖|
|Object.prototype.toString.call()|全都可以|如果非要找缺点，那就是需要多打几个字母？|








