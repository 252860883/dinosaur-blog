const exec = require('child_process').exec;
const paths = require('../config/paths');
const chalk = require('chalk');
const options = { cwd: paths.appBuild };

module.exports.commit = async function () {
    await runExec("git add .")
    await runExec("git commit -m 'update new files'")
    await runExec("git pull origin master")
    await runExec("git push")
    console.log(chalk.green('all work is done!\n'))
    // runExec("git add .").then(() => {
    //     runExec("git commit -m 'update new files'").then(() => {
    //         runExec("git push").then
    //         runExec("git push").then(() => {
    //             console.log(chalk.green('all work is done!\n'))
    //         })
    //     })
    // })
}

function runExec(command) {
    return new Promise((resolve, reject) => {
        exec(command, options, (error, stdout, stderr) => {
            if (error) {
                reject(error)
                console.log(chalk.red(error + '\n'))
            } else {
                resolve()
            }
        });
    })
}