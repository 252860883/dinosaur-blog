---
title: 对于cookie存取方法的封装
date: 2018-04-09 15:24:20
tags: [javascript]
---
平时在前端工作中，可能会经常涉及到对于 cookie的读取和存储，写起来经常浪费不必要的时间查到想要的信息，所以在这里，我封装了两个简单的方法，来读取 cookie。

 - 获取cookie
 ```
getCookie(name) {
	let arr = document.cookie.split('; '),arr2;
	for ( let i = 0; i < arr.length; i++) {
		arr2 = arr[i].split('=');
		if (arr2[0] == name) {
			return arr2[1];
		}
	}
	return;
}
 ```
 - 设置cookie
 ```
setCookie(name, value, iDay) {
	let oDate = new Date();
	oDate.setDate(oDate.getDate() + iDay);
	document.cookie = name + '=' + value + ';expires=' + oDate;

}
 ```

    
