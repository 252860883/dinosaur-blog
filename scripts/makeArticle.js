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


        let newAtricle = template.replace(/\<div\sclassName\=\"article\"\>\<\/div\>/g, function () {
            return _handleMDData(mdData);
        });
        newAtricle = _hadleHeaderLink(newAtricle, mdData);

        fs.writeFileSync(String(newPath), newAtricle, 'utf8')
        // 添加路由配置
        routers = routers.concat('\t' + _handleRouter(mdData, newName))
    })

    // 修改路由定向
    const newRouterConfig = fs.readFileSync(routerPath + '/routerMap.js', 'utf8').replace(/ArticleMenu\s*\=\s*\[[\s\S]*\]\/\/end/, "ArticleMenu = [\n" + routers + ']//end')
    fs.writeFileSync(routerPath + '/routerMap.js', newRouterConfig)

    //  处理标题等信息
    function _handleMDData(mdData) {
        let text = mdData.text
        let info = mdData.article
        // 添加标题
        let newDom = `<div className="title">${info.title}</div>\n${text}`

        return `<div className="article">\n${newDom}\n</div>`
    }

    // 处理路由信息
    function _handleRouter(mdData, newName) {
        let info = mdData.article;
        info.title = info.title;
        info.link = '/' + newName;
        info.article = true;
        return JSON.stringify(info).replace(/}$/g, '') + `,url: import('../article/${newName}')},\n`
    }

    // 处理header信息
    function _hadleHeaderLink(newAtricle, mdData) {
        let text = mdData.text
        let linkArr = []
        text.replace(/\<(h[1234567])\sid\=\'([^\n\t]*)\'\>/gm, function (all, m1, m2) {
            // text.replace(/\<h[\s\S]*"([\s\S]*)"\>/, function (all, m1, m2) {
            // console.log(m1, m2)
            linkArr.push({
                level: m1,
                title: m2
            })
        })
        return newAtricle.replace(/headerLink\:\s\[[^\[\]]*\]/gm, 'headerLink: ' + JSON.stringify(linkArr))
    }
    console.log('new Article is done')
})()
