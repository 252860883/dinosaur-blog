(function () {
    const path = require('path');
    const fs = require('fs');
    // const MD = require("markdown").markdown;
    const MD = require("./md2html");
    const mdPath = path.resolve(__dirname, '../floder/'); // markdown 文件夹
    const outPath = path.resolve(__dirname, '../src/article/'); // markdown 文件夹
    const routerPath = path.resolve(__dirname, '../src/router/')
    const template = fs.readFileSync(path.resolve(__dirname, './template.js'), 'utf8');//模版page
    let routers = "";
    // console.log(routers);
    // 生成html文章页面
    fs.readdirSync(mdPath).forEach((val, index) => {
        if (path.extname(val) != '.md') return;
        const mdText = fs.readFileSync(mdPath + '/' + val, 'utf8');
        const newName = path.basename(val, '.md')
        const newPath = outPath + '/' + newName + '.js'
        let newAtricle = template.replace(/\<div[\s\S]*\/div\>/g, function () {
            
            let newDom = MD.Markdown2HTML(mdText);
            // newDom = newDom.replace(/{/g,"{'{'}")
            newDom = newDom.replace('//g')
            // 添加标题
            newDom = `<div className="title">${newName}</div>\n${newDom}`
            return `<div className="article">\n${newDom}\n</div>`
        });
        // console.log(newPath)
        fs.writeFileSync(String(newPath), newAtricle, 'utf8')
        // 添加路由配置
        routers = routers.concat(`{key: '${newName}',url: import('../article/${newName}'),link: '/${newName}',article:true},`)
        // console.log("RouterMenu =" + routers)
    })
    9
    // 修改路由定向
    // console.log(routers)
    const newRouterConfig = fs.readFileSync(routerPath + '/routerMap.js', 'utf8').replace(/RouterMenu\s*\=\s*\[[\s\S]*\]/, "RouterMenu = [" + routers + ']')
    // console.log(newRouterConfig);
    fs.writeFileSync(routerPath + '/routerMap.js', newRouterConfig)

    console.log('new Article is done')
})()
