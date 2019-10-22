var exec = require('child_process').exec;
exec('cd ..', (err, stdout, stderr) => console.log(err, stdout, stderr))
exec('cd build',(err, stdout, stderr) => console.log(err, stdout, stderr))
exec('git add .',(err, stdout, stderr) => console.log(err, stdout, stderr))

console.log('完事')