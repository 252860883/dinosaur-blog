/** 
 * @description 下载传入的所有图片
 * @param {Array} imgArr 图片资源地址数组
 * @return {Object} 返回一个prmose对象
 */
export function downloadAllIMG(imgArr: Array<any>) {
    let promiseArr: Array<any> = []
    imgArr.forEach(element => {
        promiseArr.push(new Promise((resolve, reject) => {
            let img: any = new Image();
            img.src = element;
            img.onload = () => { resolve(img) };
        }))
    });
    return Promise.all(promiseArr)
}

