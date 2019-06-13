---
title: 实现一个自动生成小程序文件模版的脚本
date: 2018-12-24 16:41:33
tags:
top:
---
## 前言
搞过小程序开发的诸位程序员们一定面临一个问题，就是编辑器好难用啊！新建页面好难用！手抖不小心建错了还要打开文件夹删了文件再去编辑器重新创建。哎呀！麻烦死了！

直到某天，同事：“咱们写个自动创建文件模版的脚本吧？”  “开搞！”

## Shell脚本 实现
Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁。Shell 既是一种命令语言，又是一种程序设计语言。我们下面的脚本也是通过 Shell语言来实现的。如果你还不了解什么是 Shell 语法的话，可以先熟悉一下语法，入门不难。[点击这里](http://www.runoob.com/linux/linux-shell.html)。

首先我们执行 `npm init` 指令，创建 `package.json` 文件。然后在该文件下添加如下代码：
```
...
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "set":"sh ./cli/clone.sh"
},
...
```

然后我们创建一个 `cli` 文件夹，在下面我们copy一下初始化的page文件夹和component文件夹。同时创建一个 `clone.sh` 文件。具体的文件夹目录可见下：
```
...
├── cli
│   ├── clone.sh
│   ├── component
│   │   ├── component.js
│   │   ├── component.json
│   │   ├── component.wxml
│   │   └── component.wxss
│   └── page
│       ├── page.js
│       ├── page.json
│       ├── page.wxml
│       └── page.wxss
...
```

下面我们就来编写shell脚本吧，语法都不是很难，所以就不一一解析了，直接见代码：
```
#!/bin/bash
num=("1" "2" "3")
pathname=("pages" "component" "packages")
template=("cli/page" "cli/component" "cli/page")

# 复制page函数
function copyFile(){
  while [ -z $pageName ]
  do 
    printf "\033[32mplease input page Name : \033[0m"
    read pageName
  done
  targetPath="${pathname[$1]}/$pageName"
  if [ -d $targetPath ]
    then
      echo "\033[31mwarn: page [$pageName] is exist!\033[0m"
  else
    # cp 复制模版到新建路径
    cp -iR ${template[$1]} $targetPath 
    for file in `ls ./${template[$1]}`
    do
      suffixName=${file#*.}
      lastName="$pageName.$suffixName"
      # mv 文件重命名
      mv  "$targetPath/$file" "$targetPath/$lastName"
    done 
  echo "page [$pageName] create complete!"
  fi
}

# 判断类型
function choiceType(){
  # 复制page
  if [ $type == ${num[0]} ]
    then 
      copyFile 0
  elif [ $type == ${num[1]} ]
    then
      copyFile 1
  elif [ $type == ${num[2]} ]
    then
      copyFile 2
  fi
}

# -z 检查字符串长度是否为0
while [ -z $type ] || [[ $type != ${num[0]} && $type != ${num[1]} && $type != ${num[2]}  ]]
do
  echo "\033[32mplease input your file type: \033[0m"
  echo "【1】page"
  echo "【2】compoment"
  echo "【3】package"
  read type
done

choiceType
```

下面，我们就可以来随意的创建啦！打开命令行，执行 `npm run set` 就可以来创建。


## nodejs环境 实现
>上面我们通过shell语法来实现了一个简单的文件克隆脚本，但是这个脚本还存在诸多不足，比如：选择某一种情况的时候必须手动输入对应值、多级分包等问题。下面我们就来试试用nodejs来实现这个脚本。

首先我们在创建的 `package.json` 文件下添加如下代码,同时创建`clone.js`文件：
```
...
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "set":"sh ./cli/clone.sh",
    "create": "node ./cli/clone.js"
},
...
```

与shell脚本不同的是我们还需要 `npm install` 安装依赖。这里需要用到以下几个依赖：
`fs`是nodejs里面很重要的文件模块，我们对于文件的增删改查、粘贴、赋值都与此相关；
`path`模块用于处理文件与目录的路径，我们都知道现在的前端项目大部分都是模块化开发，所以从中涉及到的路径问题由它来解决；
`chalk`就是一个终端样式修饰器，我们可以做出好看的终端界面。重点来了；
`inquirer`试图为NodeJs做一个可嵌入式的美观的命令行界面，我们这里也是使用这个依赖可以很便捷的进行终端输出的改造，比如上下选择，单选、多选等多种形态，具体可以移步[这里查看更多](https://www.npmjs.com/package/inquirer)。

![image](http://wx2.sinaimg.cn/mw690/a73bc6a1ly1fyzfn6lq00j20ho04ugnk.jpg)

下面我们就剖析如何用代码实现了，首先我们把 `inquirer` 架子搭起来，简单的两个异步嵌套操作。
```

// 首先选择一个类目
inquirer.prompt([{
    type: 'list',
    name: 'type',
    message: 'Select a type you will create:',
    choices: ['page', 'component', 'package'],
}]).then((answers) => {
    console.log(chalk.yellow("如果建立子目录直接加'/'分隔即可"))
    // 输入文件或目录名
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Input new page name:'
    }]).then((folder) => {
        <!-- 这里创建文件夹 -->
        mkdirs(...);
        <!-- 这里copy文件 -->
        ...
        copyRealFile(...);
    })
})

```

上面一个简单的二次输入指令就大致做好了。下面我们就来完成 `mkdirs` 和 `copyRealFile` 函数的逻辑吧。
为了方便我首先在全局定义了一个路径映射：
```
let temFolders = {
    "package": path.join(__dirname, 'page'),
    "page": path.join(__dirname, 'page'),
    "component": path.join(__dirname, 'component')
}
let targetFolderRoots = {
    "package": "packages/",
    "page": "pages/",
    "component": "component/"
}
```

上面两个映射对象分别代表 模版文件根路径 和 目标文件夹。
然后我们来完成 `mkdirs` 创建文件夹函数，这里我们需要考虑到分包可能有多层子文件夹，所有我们在输入时要求 `/` 符为文件夹分隔符，所以这里我们也要做好相应的兼容：
```
/**
 * 创建文件夹
 * @param {String} folder 终端输入的路径
 * @param {String} targetFolderRoot 输出的目标文件夹
 */
function mkdirs(folder, targetFolderRoot) {
    const folderName = folder.split('/')
    folderName.push('');
    folderName.reduce((total, folderItem) => {
        console.log(folderItem);
        const hasFolder = fs.existsSync(`${targetFolderRoot + total}`)
        !hasFolder && fs.mkdirSync(`${targetFolderRoot + total}`)
        if (!folderItem && hasFolder) console.error(chalk.red(`== sorry, folder ${folder} is exist or your input is error! ==`))
        return total + "/" + folderItem
    })
}

```

文件夹创建好，我们就需要核心的复制逻辑了：

```
/**
 * 克隆实际的底层文件列表
 * @param {String} folder 终端输入的路径
 * @param {String} type 用户选择的类型
 */

function copyRealFile(folder,type ) {
    let targetFolderRoot =  targetFolderRoots[type];
    let temFolder = temFolders[type];
    let fileName = folder.split('/').pop()
    let targetFolder = `${targetFolderRoot + folder}/${fileName}`;
    fs.readdirSync(temFolder).forEach((val, index) => {
        const extname = path.extname(val);
        let temRealFile = path.join(temFolder, `${val}`);
        let targetFile = targetFolder + extname;
        console.log(targetFolder);
        fs.writeFileSync(targetFile, fs.readFileSync(temRealFile), (err) => {
            if (err) throw err;
            console.log('文件已保存');
        });

    })
}

```
等一下，我们好像落了点东西？如果我们在小程序中创建 page 的话，app.json 的 pages会默认增加新建的page路径：
```
// app.json

{
	"pages": [
		"pages/index/index",
		"pages/page2/index",
		"pages/logs/logs" /* 这个是新增的页面路径 */
	],
	"window": {
		"backgroundTextStyle": "light",
		"navigationBarBackgroundColor": "#000",
		"navigationBarTitleText": "WeChat",
		"navigationBarTextStyle": "white"
	},
	"usingComponents": {
		"ec-canvas": "libs/ec-canvas/ec-canvas"
	}
}
```

所以我们还需要构建一个函数在page文件创建后更新app.json。这里我们创建 addPageInfoToApp 函数，将新增的page路径添加进去。
```
function addPageInfoToApp(fileName) {
    fs.readFile('./app.json', function (err, data) {
        if (err) {
            return console.error(err)
        }
        var person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
        person.pages.push(fileName);
        const outputData = JSON.stringify(person,null,"\t");//将json数据转换为字符串类型，需要保留回车符，注意格式
        fs.writeFile('./app.json',outputData,function(err){
            if(err){
                console.error(err);
            }
            console.log('文件建好啦！');
        })
        console.log(person.pages);
    })
}
```

然后在 copyRealFile 函数的最后添加逻辑 ：
```
function copyRealFile(folder,type ) {
    ...

    type == 'page' && addPageInfoToApp(targetFolder)
}
```

然后在我们的 `inquirer`回调中按如下代码传参：
```
...
.then((folder) => {
        mkdirs(folder.name, targetFolderRoots[answers.type]);
        copyRealFile(folder.name,targetFolderRoots[answers.type], temFolders[answers.type]);
    })
...
```



最后，大功告成！我们就可以执行 `npm run create` 指令来体验一下了。
>源码：
https://github.com/MagicalDinosaur/smallProgramDemo/blob/master/cli/clone.js
https://github.com/MagicalDinosaur/smallProgramDemo/blob/master/cli/clone.sh



