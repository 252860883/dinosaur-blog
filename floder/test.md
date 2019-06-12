同时，ES2018为对象解构提供了和数组一样的Rest参数和展开操作符：

```
const obj = {a:1,b:2,c:3}
    const {a,...x} = obj
        console.log(x)  // {b:2,c:3}
    const obj1 = { a: 1, b: 2, c: 3 };
    const a =   `ab`
const obj2 = { ...obj1, d: 4 }; // { a: 1, b: 2, c: 3, d: 4 };
```

----

`这是一个行内代码`

换行
换不换啊！！！


| 方法 |  结果|
|--|--|
| Promise.all |  返回一个promise对象，有一个reject就返回reject|
| Promise.race |  返回一个promise对象，回调最先解析出的结果|
| Promise.reject |  返回一个带有拒绝原因reason参数的Promise对象|
| Promise.resolve |  返回一个以给定值解析后的Promise对象|