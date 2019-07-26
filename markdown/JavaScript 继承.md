---
title: JavaScript 继承
date: 2019-07-23 10:30:12
tags: javascript
top:
---


### 原型链继承
原型链继承的核心就是将子类的原型对象指向父类实例，`Student.prototype = new Person()` 。
```
// 父类
function Person(age) {
    this.arr = []   
    this.age = age        
}
// 子类
function Student(name) {
    this.name = name                 
    this.score = 80                  
}
// 继承
Student.prototype = new Person()
```

原型链继承非常的简单方便，但问题也是显而易见的，父类的实例被所以子类共享，如果共享的属性是引用类型，那么其中一个子类对该值进行操作，其他子类都会被更新:

```
let student1 = new Student('std1');
let student2 = new Student('std2');
student1.arr.push('stu1')
console.log(student2.arr) // ['stu1']  父类的值被修改
```

同时原型链继承很严重的一个缺陷是，无法通过子类向父类传参。

### 借用构造函数继承
借用构造函数继承严格来讲并没有用到 prototype 继承，而是直接在子类构造函数里执行父类构造函数：

```
// 父类
function Person(name) {
    this.arr = []
    this.name = name
    this.age = 18
}
// 子类
function Student(name) {
    Person.call(this, name) // 执行 Person 的方法
}
```

构造函数继承解决了原型链继承的问题，不仅可以对父类进行传参，而且子类实例也不会共享父类实例了（因为每个实例都像拷贝了一份父类而不是引用）：

```
let student3 = new Student('stu3');
let student4 = new Student('stu4');
console.log(student3.name)  // stu3
student3.arr.push('stu4')
console.log(student4.name)  // [] 未被修改
```

但是，新的问题出现了，每个实例都要拷贝一份新的父类，但是如果父类中有像函数这种对象，也不会进行共享了，但是我们完全没必要拷贝多份呀！

### 组合继承
为了解决上述两种继承方法的各自的问题，组合式继承出现了，它结合了两种继承的精华：普通的属性放在父类构造函数里，可以给子类共享的放到父类构造函数原型链上：

```
// 父类
function Person() {
  this.hobbies = ['music','reading']
}
// 共享属性放到原型链上
Person.prototype.say = function() {console.log('I am a person')}

// 子类
function Student(){
    Person.call(this)             
}
Student.prototype = new Person()
```


来验证一下结果：
```
// 实例化
var stu1 = new Student()
var stu2 = new Student()

stu1.hobbies.push('basketball')
console.log(stu1.hobbies)           // music,reading,basketball
console.log(stu2.hobbies)           // music,reading

console.log(stu1.say == stu2.say)   // true
```

组合继承解决了原型链继承和构造函数继承各自的缺点，是常用的继承方案。但是，我们在组合继承中 `Person.call(this)` 和 `new Person()` 时分别实例化了两次父类实例，(由于原型链的优先级 Student 原型链上的父类实例并不会被用到），造成了浪费。所以在最后针对组合继承的缺陷也有对应的解决方案。

### 原型式继承
原型式继承和原型链继承都是基于 prototype 实现继承的，所以都存在引用属性共享的缺陷。 原型式继承的核心是返回一个新对象，该对象的 `__proto__` 指向父类对象：

```
function object(o){
  function F(){}
  F.prototype = o;
  return new F();
}
```

举个例子：
```
var Person = {
  name:'abc',
  hobbies:['swimming','running']
}
var person1 = object(Person);
person1.age = 18;
person1.hobbies.push('jumping');
var person2 = object(Person);

console.log(person2.hobbies) // ["swimming", "running", "jumping"]
```

>ECMAScript 5 通过新增 Object.create()方法规范化了原型式继承。这个方法接收两个参数:一 个用作新对象原型的对象和(可选的)一个为新对象定义额外属性的对象。在传入一个参数的情况下， Object.create()与 object()方法的行为相同。——《JAVASCript高级编程》

### 寄生式继承
原型式继承有个问题，只能获取到一个对象的浅复制，但额外的属性需要再手动添加，复用性很差！所以寄生式继承就来解决这个问题：使用原型式继承获得一个目标对象的浅复制，然后增强这个浅复制的能力。

```
function object(o){
  function F(){}
  F.prototype = o;
  return new F();
}
var Animal = {
  sex:'male',
  hobbies:['swimming','running']
}

function Cat(name){
    var cat = object(Animal);
    cat.name=name;
    return cat;
}

let cat1 = Cat('Kitty');
cat1.hobbies.push('jumping')
console.log(cat1.name); // "Kitty"

let cat2 = Cat('Jenny');
console.log(cat2.hobbies);  // ["swimming", "running", "jumping"]
```
需要注意，不管是 原型链继承、原型式继承还是寄生式继承，都是基于prototype实现的，所以都会存在引用类型共享的缺陷！
### 寄生组合继承
刚才提到组合继承会实例化两次父类，所以这个继承方案就来解决这个问题。其核心就是：借用构造函数 + 相当于浅拷贝父类的原型对象。

```
function object(o){
  function F(){}
  F.prototype = o;
  return new F();
}

function inheritPrototype(subType, superType){
      let prototype = object(superType.prototype)
      prototype.constructor = subType;// 修正原型的构造函数
      subType.prototype = prototype;// 将子类的原型替换为这个原型
}

// 父类
function Person() {
  this.hobbies = ['music','reading']
}
// 共享属性放到原型链上
Person.prototype.say = function() {console.log('I am a person')}

// 子类
function Student(){
    Person.call(this)             
}
inheritPrototype(Student,Person);

// 实例化
var stu1 = new Student()
var stu2 = new Student()

stu1.hobbies.push('basketball')
console.log(stu1.hobbies)           // music,reading,basketball
console.log(stu2.hobbies)           // music,reading
console.log(stu1.say == stu2.say)   // true
```

### ES6 Class extends
ES6继承的结果和寄生组合继承相似，本质上，ES6继承是一种语法糖。但是，寄生组合继承是先创建子类实例this对象，然后再对其增强；而ES6先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。

```
class B extends A {
  constructor() {
    super();
  }
}

// 原理如下：

Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}

// B 的原型对象继承 A 的对象
Object.setPrototypeOf(B.prototype, A.prototype);

// B 继承 A 的静态属性
Object.setPrototypeOf(B, A);
```




### 参考
> [一篇文章理解JS继承](https://segmentfault.com/a/1190000015727237)
[JS中的继承(上)](https://segmentfault.com/a/1190000014476341)