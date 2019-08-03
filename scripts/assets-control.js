const path = require('path');
const fs = require('fs');
const assetsPath = path.resolve(__dirname, '../src/assets')
const assetsOutputPath = path.resolve(__dirname, '../src/assets/assets.js')
let picArr = "let picArr;\nexport default picArr = ["
fs.readdirSync(assetsPath).forEach((value,index) => {
    if (/(png|jpg|jpeg|gif)/.test(value)) {
        picArr +=  ("'" + value + "',")
    }
})
picArr+=']'
fs.writeFileSync(assetsOutputPath,picArr, 'utf8')