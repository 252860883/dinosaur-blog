---
title: 关于array的常用的几个API
date: 2019-04-08 19:24:52
tags:
top:
---

### Array.prototype.map
* 新建一个数组，需要有承载对象,原始数组在调用它后不会发生变化
* 该数组中的每个元素都调用一个提供的函数后返回结果,否则返回 undefined

对于map函数的底层实现，源码核心主要是利用`while`循环执行`callback`函数，将函数返回值放入数组即可。大概实现如下：

```
Array.prototype.map = function (callbackfn, thisArg) {
    // 异常处理
    if (this == null) {
        throw new TypeError("Cannot read property 'map' of null or undefined");
    }
    // callbackfn 不是函数时抛出异常
    if (typeof callbackfn !== 'function') {
        throw new TypeError(callbackfn + ' is not a function')
    }
    // 调用 map 方法的原数组，以键值对形式
    let O = Object(this) 
    let len = O.length
    // 执行 callback 时的this
    let T = thisArg 
    // 要返回的数组
    let A = new Array(len) 
    // 计数器
    let k = 0 
    while (k < len) {
        let kValue = O[k]
        // 传入 this, 当前元素 element, 索引 index, 原数组对象 O
        let mappedValue = callbackfn.call(T, kValue, k, O)
        // 返回结果赋值给新生成数组
        A[k] = mappedValue
        k++
    }
    // 返回新数组
    return A
}
```

通过源码我们可以发现，循环体并不是在`callbackfn`内，所以不能在`callbackfn`内设置`break`、`continue`和`return`来跳出循环。同时`callbackfn`也不能写成`async fuction`的形式，后果是会立刻执行循环而不是等待每次函数的`await`结束以后再执行下一次循环。

对于其他API的源码实现，下面就不一一列举了，大致上和`map`的实现很类似，只不过是在循环体里面需要做各自不同的逻辑。
### Array.prototype.forEach 
* 可以改变数组自身，没有返回值；
* 中途不能用常规操作跳出循环，可以用抛出异常（try/catch）的方式，但不推荐这样做

### Array.prototype.Filter
* 和 map 很像，也是创建一个新数组，新数组中的元素是筛选出来的符合条件的所有对象。

### Array.prototype.Sort
*  默认按照字母升序排列
* 与其他方法不同，他直接改变原始数组
* sort()用于对数组的元素进行排序。排序顺序可以是字母或数字，并按升序或降序。
* 如果想按照其他标准进行排序，就需提供比较函数compareFunction(a,b)

### Array.prototype.Some

* 用于检查数组中是否有某些符合条件
* 只要有一个满足即返回true，之后的不再执行
* 只是返回一个布尔类型的值

### Array.prototype.Every
* 和 some 类似，只返回布尔类型
* 判断数组中所有的值是否都满足

### Array.prototype.FindIndex
* 结构和map类似，获取到满足条件的索引值
* IE 11 及更早版本不支持findIndex() 方法，如果对浏览器兼容有要求，那就用Lodash的 _.findIndex()

### Array.prototype.Find
* 和some类似，有一个满足的元素就会返回该元素，而不是布尔值
* IE 11 及更早版本不支持


### Array.prototype.Reduce
该方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。reducer函数对应四个传参，依次是：`accumulator 累计器`, `currentValue 当前值`, `currentIndex 当前索引`, `array 数组`。同时注意

```

const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array*reduce(reducer));
// expected output: 10
```

需要注意，reduce 可选传入第二个参数，作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。

```
const arr = [1, 2, 3, 4, 5]
const reducer = (accumulator, currentValue, index) => {
    console.log(accumulator, currentValue, index)
    return accumulator + currentValue
}
<!-- 没有传初始参数值 -->
arr.reduce(reducer)
// 1 2 1
// 3 3 2
// 6 4 3
// 10 5 4

<!-- 传入初始参数值 -->
arr.reduce(reducer)
// -1 1 0
// 0 2 1
// 2 3 2
// 5 4 3
// 9 5 4
```


### Array.prototype.reduceRight
和 reduce 作用一样，区别是从数组最右开始降序执行。

### Array.prototype.includes(ES6新增)
用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
第二个参数表示从第几个索引值开始查找。

```
[1,2,3].includes(3) 
// true
[1,2,3].includes(4) 
// false


[1,2,3,4].includes(1,1)
// false
```

### Array.isArray(ES6新增)
用来检测值是否是一个Array，返回一个布尔类型的值。 相较于 `instanceof`, Array.isArray 可以检测 iframes。

```
Array.isArray([1, 2, 3]);  
// true
Array.isArray({foo: 123}); 
// false
```

### Array.prototype.fill(ES6新增)
用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。
```
[0,1,2,3,4,5,6].fill('*',1,5)
// [0, "*", "*", "*", "*", 5, 6]

[0,1,2,3,4,5,6].fill('*')
// [0, "*", "*", "*", "*","*","*"]
```

### Array.prototype.entries/keys/values(ES6新增)
```
let arr=['a', 'b', 'c']

//取键
for(let key of arr.keys()){}  

//取值；不能直接使用，有兼容性问题，甚至谷歌
for(let value of arr.values()){}         

//都取
for(let [key, value] of arr.entries()){}      
```

### Array.of(ES6新增)
创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
```
Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
```

### Array.from
从一个类似数组或可迭代对象中创建一个新的，浅拷贝的数组实例
```
Array.from('foo')
// output: Array ["f", "o", "o"]

Array.from([1, 2, 3], x => x + x)
// output: Array [2, 4, 6]

Array.from({length: 10}, (_, i) => i)
// output: Array [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

```

### 参考
[Array 原型方法源码实现大揭秘](https://juejin.im/post/5d76f08ef265da03970be192)