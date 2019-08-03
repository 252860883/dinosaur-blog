export function downloadAllIMG(imgArr) {
    let promiseArr = []
    imgArr.forEach(element => {
        promiseArr.push(new Promise((resolve, reject) => {
            let img = new Image();
            img.src = element;
            img.onload = () => { resolve(img) };
        }))
    });
    return Promise.all(promiseArr)
}

