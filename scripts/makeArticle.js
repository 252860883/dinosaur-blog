(function () {
    const path = require('path');
    const fs = require('fs');
    // const MD = require("markdown").markdown;
    const MD = require("./md2html");
    const mdPath = path.resolve(__dirname, '../markdown/'); // markdown 文件夹
    const outPath = path.resolve(__dirname, '../src/article/'); // markdown 文件夹
    const routerPath = path.resolve(__dirname, '../src/router/')
    const template = fs.readFileSync(path.resolve(__dirname, './template.js'), 'utf8');//模版page
    let routers = "";
    // 生成html文章页面
    fs.readdirSync(mdPath).forEach((val, index) => {
        if (path.extname(val) != '.md') return;
        const mdText = fs.readFileSync(mdPath + '/' + val, 'utf8');
        const newName = path.basename(val, '.md');
        // if (newName != 'test') return;
        const newPath = outPath + '/' + newName + '.js'
        let mdData = MD.Markdown2HTML(mdText);
        let newAtricle = template.replace(/\<div[\s\S]*\/div\>/g, function () {
            return _handleMDData(mdData);
        });
        fs.writeFileSync(String(newPath), newAtricle, 'utf8')
        // 添加路由配置
        routers = routers.concat('\t'+_handleRouter(mdData,newName))
    })


    // 修改路由定向
    const newRouterConfig = fs.readFileSync(routerPath + '/routerMap.js', 'utf8').replace(/ArticleMenu\s*\=\s*\[[\s\S]*\]/, "ArticleMenu = [\n" + routers + ']')
    fs.writeFileSync(routerPath + '/routerMap.js', newRouterConfig)


    function _handleMDData(mdData) {
        let text = mdData.text
        let info = mdData.article
        // 添加标题
        let newDom = `<div className="title">${info.title}</div>\n${text}`

        return `<div className="article">\n${newDom}\n</div>`
    }

    function _handleRouter(mdData, newName) {
        let info = mdData.article;
        info.title = info.title;
        info.link = '/' + newName;
        info.article = true;
        return JSON.stringify(info).replace(/}$/g,'') + `,url: import('../article/${newName}')},\n` 
    }

    console.log('new Article is done')
})()
