---
title: 关于array的常用的几个API
date: 2019-04-08 19:24:52
tags:
top:
---


### Array.prototype.forEach 

1. 可以改变数组自身，没有返回值；
2. 中途不能用常规操作跳出循环，可以用抛出异常（try/catch）的方式，但不推荐这样做

### Array.prototype.map
1. 新建一个数组，需要有承载对象,原始数组在调用它后不会发生变化
2. 该数组中的每个元素都调用一个提供的函数后返回结果,否则返回 undefined]

### Array.prototype.Filter
1. 和 map 很像，也是创建一个新数组，新数组中的元素是筛选出来的符合条件的所有对象。

### Array.prototype.Sort
1. 与其他方法不同，他直接改变原始数组
2. sort()用于对数组的元素进行排序。排序顺序可以是字母或数字，并按升序或降序。
3. 默认按照字母升序排列
4. 如果想按照其他标准进行排序，就需提供比较函数compareFunction(a,b)

### Array.prototype.Some

1. 用于检查数组中是否有某些符合条件
2. 只要有一个满足即返回true，之后的不再执行
3. 只是返回一个布尔类型的值

### Array.prototype.Every
1. 和 some 类似，只返回布尔类型
2. 判断数组中所有的值是否都满足

### Array.prototype.FindIndex
1. 结构和map类似，获取到满足条件的索引值
2. IE 11 及更早版本不支持findIndex() 方法，如果对浏览器兼容有要求，那就用Lodash的 _.findIndex()

### Array.prototype.Find
1. 和some类似，有一个满足的元素就会返回
2. IE 11 及更早版本不支持


### Array.prototype.Reduce
该方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。reducer函数对应四个传参，依次是：`accumulator 累计器`, `currentValue 当前值`, `currentIndex 当前索引`, `array 数组`.

```

const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10
```
⚠️需要注意，第一次循环时 accumulator 为数组第一个值，currentValue 为数组第二个值。


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

