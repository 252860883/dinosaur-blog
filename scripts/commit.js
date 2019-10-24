const exec = require('child_process').exec;
const paths = require('../config/paths');
const options = { cwd: paths.appBuild };

module.exports.commit = function () {
    runExec("git add .").then(() => {
        runExec("git commit -m 'update new files'").then(() => {
            runExec("git push")
        })
    })
    // exec('', options, (error, stdout, stderr) => {
    // console.log(error, stdout, stderr)
    // exec("git commit -m 'update new files'", options, (error, stdout, stderr) => {
    //     if (error) {
    //         console.log(stdout);
    //     } else {
    //         exec("", options, (error, stdout, stderr) => {
    //             if (error) {
    //                 console.log(stdout);
    //             } else {
    //                 console.log('all work is done!')
    //             }
    //         });
    //     }
    // })
    // })
}

function runExec(command) {
    return new Promise((resolve, reject) => {
        exec(command, options, (error, stdout, stderr) => {
            if (error) {
                reject(error)
                console.log(chalk.red(error + '\n'))
            } else {
                console.log('all work is done!')
            }
        });
    })
}