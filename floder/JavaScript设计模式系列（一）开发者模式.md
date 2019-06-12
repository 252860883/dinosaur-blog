---
title: JavaScript设计模式（一）观察者模式
date: 2018-06-26 12:55:56
tags: javascript
---
>观察者模式可谓是设计模式中非常经典的一个了，在众多的前端库中也能找到他的踪迹，比如JQ的on和trigger中封装的方法、VUE组件间实现通信的emit()和on()方法等等。自从某次面试被新浪dalao要求手写观察者模式代码被惨虐以后便决心好好研究一下这个东西！

### 概念
观察者模式是指一个对象（subject）维持一系列依赖于它的观察者对象（observer），将有关状态的变化同步通知给他们。

### 实现
那么具体实现开发者模式主要分三个步骤：
 1. 创建构造函数，函数内创建一个观察者缓存列表，用来存放所有的观察者对象
 2. 封装添加观察者方法，将观察者写入缓存列表
 3. 封装发布者方法，函数执行时，遍历缓存列表，执行对应观察者的操作
 4. new构造函数创建一个实例，执行后续操作

 上代码：
 ```
        // 创建构造函数
        function Observer() {
            //创建观察者数组
            this.observerList = [];
        }
        Observer.prototype.on = function (obj) {
            this.observerList.push(obj);
        }
        Observer.prototype.emit = function () {
            // 遍历数组所有的观察者并执行操作
            this.observerList.forEach(obj => {
                obj.apply(this, arguments)
            })
        }
        // 清除绑定，清楚某个绑定直接对数组进行增删操作，这里不一一列举
        Observer.prototype.clean = function (obj) {
            this.observerList = [];
        }

        var ob = new Observer();
        ob.on(function (name) {
            console.log("你的名字是" + name)
        })
        ob.on(function (year) {
            console.log("你的年纪" + year)
        })
        ob.emit('Dan')
        ob.emit(6)
        ob.clean()
        ob.emit('Danny', 23)

        /** 
         * 输出：
         * 你的名字是Dan
         * 你的年纪Dan
         * 你的名字是6
         * 你的年纪6
        */

 ```

这样一个简单的观察者模式就可以实现了，但是同时发现了一个问题 subject 和 observer是混淆的，并不会分开对应，所以下面就做进一步的升级，也就是我们常常提到的发布订阅模式了。

### 发布订阅模式
发布订阅模式的不同之处是使用了一个主题/事件通道，这个通道是介于希望接收到通知的对象和激活事件对象之间，通俗讲可以通过传递一个特定的key指来实现。其目的是使发布者和订阅者之间产生依赖关系。
修改代码如下：
```
        // 创建构造函数
        function Observer2() {
            //创建观察者数组
            this.observerList = [];
        }
        Observer2.prototype.on = function (key, obj) {
            if (!this.observerList[key]) {
                this.observerList[key] = []
            }
            //将observerpush进对应的key内存中
            this.observerList[key].push(obj);
        }
        Observer2.prototype.emit = function () {
            //获取key值
            var oKey = Array.prototype.shift.apply(arguments);
            // 遍历数组所有的观察者并执行操作
            this.observerList[oKey].forEach(obj => {
                obj.apply(this, arguments)
            })
        }

        var ob2 = new Observer2();
        
        ob2.on('buy', function (shop) {
            console.log("购买：" + shop);
        })
        ob2.on('sale', function (shop) {
            console.log('售卖：' + shop)
        })
        ob2.emit('buy', "冰激凌")
        ob2.emit('sale', "西瓜")
```

### 优点
1. 异步编程
2. 利于代码的松散耦合