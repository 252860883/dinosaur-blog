import React from 'react'
import '../style/main.scss'
import HeaderLink from "../components/headerLink"
export default class Template extends React.Component {
    constructor() {
        super();
        this.state = {
            headerLink: [{"level":"h2","title":"前言"},{"level":"h2","title":"Shell脚本 实现"},{"level":"h2","title":"nodejs环境 实现"}]
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <HeaderLink headerLink={this.state.headerLink}></HeaderLink>
                <div className="article">
<div className="title-content"><h1 className="title">实现一个自动生成小程序文件模版的脚本</h1></div>
<h2 id='前言'>前言</h2>

<p>搞过小程序开发的诸位程序员们一定面临一个问题，就是编辑器好难用啊！新建页面好难用！手抖不小心建错了还要打开文件夹删了文件再去编辑器重新创建。哎呀！麻烦死了！</p>

<p>直到某天，同事：“咱们写个自动创建文件模版的脚本吧？”  “开搞！”</p>

<h2 id='Shell脚本 实现'>Shell脚本 实现</h2>

<p>Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁。Shell 既是一种命令语言，又是一种程序设计语言。我们下面的脚本也是通过 Shell语言来实现的。如果你还不了解什么是 Shell 语法的话，可以先熟悉一下语法，入门不难。<a href="http://www.runoob.com/linux/linux-shell.html">点击这里</a>。</p>

<p>首先我们执行 <code>npm init</code> 指令，创建 <code>package.json</code> 文件。然后在该文件下添加如下代码：</p>

<pre><code><span></span>
<span>...</span>
<span>"scripts": {'{'}</span>
<span>    "test": "echo \"Error: no test specified\" &amp;&amp; exit 1",</span>
<span>    "set":"sh ./cli/clone.sh"</span>
<span>},</span>
<span>...</span>
<span></span>
</code></pre>

<p>然后我们创建一个 <code>cli</code> 文件夹，在下面我们copy一下初始化的page文件夹和component文件夹。同时创建一个 <code>clone.sh</code> 文件。具体的文件夹目录可见下：</p>

<pre><code><span></span>
<span>...</span>
<span>├── cli</span>
<span>│   ├── clone.sh</span>
<span>│   ├── component</span>
<span>│   │   ├── component.js</span>
<span>│   │   ├── component.json</span>
<span>│   │   ├── component.wxml</span>
<span>│   │   └── component.wxss</span>
<span>│   └── page</span>
<span>│       ├── page.js</span>
<span>│       ├── page.json</span>
<span>│       ├── page.wxml</span>
<span>│       └── page.wxss</span>
<span>...</span>
<span></span>
</code></pre>

<p>下面我们就来编写shell脚本吧，语法都不是很难，所以就不一一解析了，直接见代码：</p>

<pre><code><span></span>
<span>#!/bin/bash</span>
<span>num=("1" "2" "3")</span>
<span>pathname=("pages" "component" "packages")</span>
<span>template=("cli/page" "cli/component" "cli/page")</span>
<span></span>
<span># 复制page函数</span>
<span>function copyFile(){'{'}</span>
<span>  while [ -z $pageName ]</span>
<span>  do </span>
<span>    printf "\033[32mplease input page Name : \033[0m"</span>
<span>    read pageName</span>
<span>  done</span>
<span>  targetPath="${'{'}pathname[$1]}/$pageName"</span>
<span>  if [ -d $targetPath ]</span>
<span>    then</span>
<span>      echo "\033[31mwarn: page [$pageName] is exist!\033[0m"</span>
<span>  else</span>
<span>    # cp 复制模版到新建路径</span>
<span>    cp -iR ${'{'}template[$1]} $targetPath </span>
<span>    for file in `ls ./${'{'}template[$1]}`</span>
<span>    do</span>
<span>      suffixName=${'{'}file#*.}</span>
<span>      lastName="$pageName.$suffixName"</span>
<span>      # mv 文件重命名</span>
<span>      mv  "$targetPath/$file" "$targetPath/$lastName"</span>
<span>    done </span>
<span>  echo "page [$pageName] create complete!"</span>
<span>  fi</span>
<span>}</span>
<span></span>
<span># 判断类型</span>
<span>function choiceType(){'{'}</span>
<span>  # 复制page</span>
<span>  if [ $type == ${'{'}num[0]} ]</span>
<span>    then </span>
<span>      copyFile 0</span>
<span>  elif [ $type == ${'{'}num[1]} ]</span>
<span>    then</span>
<span>      copyFile 1</span>
<span>  elif [ $type == ${'{'}num[2]} ]</span>
<span>    then</span>
<span>      copyFile 2</span>
<span>  fi</span>
<span>}</span>
<span></span>
<span># -z 检查字符串长度是否为0</span>
<span>while [ -z $type ] || [[ $type != ${'{'}num[0]} &amp;&amp; $type != ${'{'}num[1]} &amp;&amp; $type != ${'{'}num[2]}  ]]</span>
<span>do</span>
<span>  echo "\033[32mplease input your file type: \033[0m"</span>
<span>  echo "【1】page"</span>
<span>  echo "【2】compoment"</span>
<span>  echo "【3】package"</span>
<span>  read type</span>
<span>done</span>
<span></span>
<span>choiceType</span>
<span></span>
</code></pre>

<p>下面，我们就可以来随意的创建啦！打开命令行，执行 <code>npm run set</code> 就可以来创建。</p>

<h2 id='nodejs环境 实现'>nodejs环境 实现</h2>

<blockquote>
  <p>上面我们通过shell语法来实现了一个简单的文件克隆脚本，但是这个脚本还存在诸多不足，比如：选择某一种情况的时候必须手动输入对应值、多级分包等问题。下面我们就来试试用nodejs来实现这个脚本。</p>
</blockquote>

<p>首先我们在创建的 <code>package.json</code> 文件下添加如下代码,同时创建<code>clone.js</code>文件：</p>

<pre><code><span></span>
<span>...</span>
<span>"scripts": {'{'}</span>
<span>    "test": "echo \"Error: no test specified\" &amp;&amp; exit 1",</span>
<span>    "set":"sh ./cli/clone.sh",</span>
<span>    "create": "node ./cli/clone.js"</span>
<span>},</span>
<span>...</span>
<span></span>
</code></pre>

<p>与shell脚本不同的是我们还需要 <code>npm install</code> 安装依赖。这里需要用到以下几个依赖：<br></br><code>fs</code>是nodejs里面很重要的文件模块，我们对于文件的增删改查、粘贴、赋值都与此相关；<br></br><code>path</code>模块用于处理文件与目录的路径，我们都知道现在的前端项目大部分都是模块化开发，所以从中涉及到的路径问题由它来解决；<br></br><code>chalk</code>就是一个终端样式修饰器，我们可以做出好看的终端界面。重点来了；<br></br><code>inquirer</code>试图为NodeJs做一个可嵌入式的美观的命令行界面，我们这里也是使用这个依赖可以很便捷的进行终端输出的改造，比如上下选择，单选、多选等多种形态，具体可以移步<a href="https://www.npmjs.com/package/inquirer">这里查看更多</a>。</p>

<p><img src="http://wx2.sinaimg.cn/mw690/a73bc6a1ly1fyzfn6lq00j20ho04ugnk.jpg" alt="image" title="" /></p>

<p>下面我们就剖析如何用代码实现了，首先我们把 <code>inquirer</code> 架子搭起来，简单的两个异步嵌套操作。</p>

<pre><code><span></span>
<span></span>
<span>// 首先选择一个类目</span>
<span>inquirer.prompt([{'{'}</span>
<span>    type: 'list',</span>
<span>    name: 'type',</span>
<span>    message: 'Select a type you will create:',</span>
<span>    choices: ['page', 'component', 'package'],</span>
<span>}]).then((answers) =&gt; {'{'}</span>
<span>    console.log(chalk.yellow("如果建立子目录直接加'/'分隔即可"))</span>
<span>    // 输入文件或目录名</span>
<span>    inquirer.prompt([{'{'}</span>
<span>        type: 'input',</span>
<span>        name: 'name',</span>
<span>        message: 'Input new page name:'</span>
<span>    }]).then((folder) =&gt; {'{'}</span>
<span>        &lt;!-- 这里创建文件夹 --&gt;</span>
<span>        mkdirs(...);</span>
<span>        &lt;!-- 这里copy文件 --&gt;</span>
<span>        ...</span>
<span>        copyRealFile(...);</span>
<span>    })</span>
<span>})</span>
<span></span>
<span></span>
</code></pre>

<p>上面一个简单的二次输入指令就大致做好了。下面我们就来完成 <code>mkdirs</code> 和 <code>copyRealFile</code> 函数的逻辑吧。<br></br>为了方便我首先在全局定义了一个路径映射：</p>

<pre><code><span></span>
<span>let temFolders = {'{'}</span>
<span>    "package": path.join(__dirname, 'page'),</span>
<span>    "page": path.join(__dirname, 'page'),</span>
<span>    "component": path.join(__dirname, 'component')</span>
<span>}</span>
<span>let targetFolderRoots = {'{'}</span>
<span>    "package": "packages/",</span>
<span>    "page": "pages/",</span>
<span>    "component": "component/"</span>
<span>}</span>
<span></span>
</code></pre>

<p>上面两个映射对象分别代表 模版文件根路径 和 目标文件夹。<br></br>然后我们来完成 <code>mkdirs</code> 创建文件夹函数，这里我们需要考虑到分包可能有多层子文件夹，所有我们在输入时要求 <code>/</code> 符为文件夹分隔符，所以这里我们也要做好相应的兼容：</p>

<pre><code><span></span>
<span>/**</span>
<span> * 创建文件夹</span>
<span> * @param {'{'}String} folder 终端输入的路径</span>
<span> * @param {'{'}String} targetFolderRoot 输出的目标文件夹</span>
<span> */</span>
<span>function mkdirs(folder, targetFolderRoot) {'{'}</span>
<span>    const folderName = folder.split('/')</span>
<span>    folderName.push('');</span>
<span>    folderName.reduce((total, folderItem) =&gt; {'{'}</span>
<span>        console.log(folderItem);</span>
<span>        const hasFolder = fs.existsSync(`${'{'}targetFolderRoot + total}`)</span>
<span>        !hasFolder &amp;&amp; fs.mkdirSync(`${'{'}targetFolderRoot + total}`)</span>
<span>        if (!folderItem &amp;&amp; hasFolder) console.error(chalk.red(`== sorry, folder ${'{'}folder} is exist or your input is error! ==`))</span>
<span>        return total + "/" + folderItem</span>
<span>    })</span>
<span>}</span>
<span></span>
<span></span>
</code></pre>

<p>文件夹创建好，我们就需要核心的复制逻辑了：</p>

<pre><code><span></span>
<span>/**</span>
<span> * 克隆实际的底层文件列表</span>
<span> * @param {'{'}String} folder 终端输入的路径</span>
<span> * @param {'{'}String} type 用户选择的类型</span>
<span> */</span>
<span></span>
<span>function copyRealFile(folder,type ) {'{'}</span>
<span>    let targetFolderRoot =  targetFolderRoots[type];</span>
<span>    let temFolder = temFolders[type];</span>
<span>    let fileName = folder.split('/').pop()</span>
<span>    let targetFolder = `${'{'}targetFolderRoot + folder}/${'{'}fileName}`;</span>
<span>    fs.readdirSync(temFolder).forEach((val, index) =&gt; {'{'}</span>
<span>        const extname = path.extname(val);</span>
<span>        let temRealFile = path.join(temFolder, `${'{'}val}`);</span>
<span>        let targetFile = targetFolder + extname;</span>
<span>        console.log(targetFolder);</span>
<span>        fs.writeFileSync(targetFile, fs.readFileSync(temRealFile), (err) =&gt; {'{'}</span>
<span>            if (err) throw err;</span>
<span>            console.log('文件已保存');</span>
<span>        });</span>
<span></span>
<span>    })</span>
<span>}</span>
<span></span>
<span></span>
</code></pre>

<p>等一下，我们好像落了点东西？如果我们在小程序中创建 page 的话，app.json 的 pages会默认增加新建的page路径：</p>

<pre><code><span></span>
<span>// app.json</span>
<span></span>
<span>{'{'}</span>
<span>    "pages": [</span>
<span>        "pages/index/index",</span>
<span>        "pages/page2/index",</span>
<span>        "pages/logs/logs" /* 这个是新增的页面路径 */</span>
<span>    ],</span>
<span>    "window": {'{'}</span>
<span>        "backgroundTextStyle": "light",</span>
<span>        "navigationBarBackgroundColor": "#000",</span>
<span>        "navigationBarTitleText": "WeChat",</span>
<span>        "navigationBarTextStyle": "white"</span>
<span>    },</span>
<span>    "usingComponents": {'{'}</span>
<span>        "ec-canvas": "libs/ec-canvas/ec-canvas"</span>
<span>    }</span>
<span>}</span>
<span></span>
</code></pre>

<p>所以我们还需要构建一个函数在page文件创建后更新app.json。这里我们创建 addPageInfoToApp 函数，将新增的page路径添加进去。</p>

<pre><code><span></span>
<span>function addPageInfoToApp(fileName) {'{'}</span>
<span>    fs.readFile('./app.json', function (err, data) {'{'}</span>
<span>        if (err) {'{'}</span>
<span>            return console.error(err)</span>
<span>        }</span>
<span>        var person = data.toString();//将二进制的数据转换为字符串</span>
<span>        person = JSON.parse(person);//将字符串转换为json对象</span>
<span>        person.pages.push(fileName);</span>
<span>        const outputData = JSON.stringify(person,null,"\t");//将json数据转换为字符串类型，需要保留回车符，注意格式</span>
<span>        fs.writeFile('./app.json',outputData,function(err){'{'}</span>
<span>            if(err){'{'}</span>
<span>                console.error(err);</span>
<span>            }</span>
<span>            console.log('文件建好啦！');</span>
<span>        })</span>
<span>        console.log(person.pages);</span>
<span>    })</span>
<span>}</span>
<span></span>
</code></pre>

<p>然后在 copyRealFile 函数的最后添加逻辑 ：</p>

<pre><code><span></span>
<span>function copyRealFile(folder,type ) {'{'}</span>
<span>    ...</span>
<span></span>
<span>    type == 'page' &amp;&amp; addPageInfoToApp(targetFolder)</span>
<span>}</span>
<span></span>
</code></pre>

<p>然后在我们的 <code>inquirer</code>回调中按如下代码传参：</p>

<pre><code><span></span>
<span>...</span>
<span>.then((folder) =&gt; {'{'}</span>
<span>        mkdirs(folder.name, targetFolderRoots[answers.type]);</span>
<span>        copyRealFile(folder.name,targetFolderRoots[answers.type], temFolders[answers.type]);</span>
<span>    })</span>
<span>...</span>
<span></span>
</code></pre>

<p>最后，大功告成！我们就可以执行 <code>npm run create</code> 指令来体验一下了。</p>

<blockquote>
  <p>源码：<br></br><a href="https://github.com/MagicalDinosaur/smallProgramDemo/blob/master/cli/clone.js">https://github.com/MagicalDinosaur/smallProgramDemo/blob/master/cli/clone.js</a><br></br>https://github.com/MagicalDinosaur/smallProgramDemo/blob/master/cli/clone.sh</p>
</blockquote>
</div>
            </div>

        )
    }
}