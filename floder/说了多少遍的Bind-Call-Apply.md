---
title: 说了多少遍的Bind、Call、Apply
date: 2018-08-16 17:13:52
tags: javascript
top:
---
>正如标题所说，说了多少遍！多少遍！多少遍！唉，所以有了这边复习文，算是立下血志吧。
`bind`,`call`,`apply`三个方法都是用来将一个指定的 this 来调用或者创建一个函数。

## Bind方法

#### bind() 允许我们非常简单的在函数或者方法被调用时绑定 this 到指定对象上
eg:
```
var user = {
  data: 666,
  showData: function (other) {
    console.log(this.data + other)
  }
}

var user2 = user.showData
user2() // undefined,指向全局函数
var user3 = user.showData.bind(user)
user3('777') // 666777

```

#### 模拟实现柯里化
>tip:柯里化：函数允许将一个函数作为返回值进行返回

```
var user = {
  data: 666,
  currying: function (x, y) {
    console.log(x + '+' + y + '=' + (x + y))
  }
}
var curry = user.currying.bind(user, 5)
curry(6) // 5+6=11
```

### Apply 和 Call方法

#### apply 和 call 两者只是在传参形式上不一样

```
var person = {
  name: "LiMing",
  callName: function (a, b) {
    console.log(this.name + " is " + a + " and " + b)
  }
}
var callName = person.callName
callName('people', "goodman") // undefined is people and goodman
callName.call(person, 'dog', 'boy')  // LiMing is dog and boy
callName.apply(person, ['cat', 'girl']) // LiMing is cat and girl
```

#### 配合 argument 场景
> 因为 argument 是一个近似数组的结构，但是并不是数组，无法使用array方法，这就引入了我们的 apply方法

```
// argument场景
function newArray(){
  console.log(Array.prototype.slice.call(arguments,0,2))
}
newArray(1,2,3,4,5,6) //0,2
```

#### 参数可变场景
```
// max 参数可变
var allNumbers=[22,11,0,23,15]
console.log(Math.max.apply(null,allNumbers) )
// ES6拓展运算符也可以实现
console.log(Math.max(...allNumbers) )
```

## 总结
1. Bind()方法只是将绑定后的函数进行返回，而后两者是立即执行
2. apply 和 call 只是穿参形式不一样，前者是接受一个数组参数，后者是多个参数
3. 箭头函数中，call和apply失效
