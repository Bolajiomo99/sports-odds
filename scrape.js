
const { PythonShell } = require('python-shell');

// const spawn = require("child_process").spawn;
// const pythonProcess = spawn('python',["public/python/scrape.py"]);
// pythonProcess.stdout.on('data', (data) => {
//     console.log(data)
// });

let options = {
    mode: 'text',
    pythonPath: 'python',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: './public/python/scrape.py',
    args: ['arg1', 'arg2']
};

PythonShell.run('scrape.py', options, function(err, results) {
    if (err) console.log(err);
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results);
});



// PythonShell.run('python', ['scrape.py'])



// let options = {
//     pythonPath: './public/python/',
//   };

//   let {PythonShell} = require('python-shell')
//   PythonShell.run('scrape.py', options,  function  (err, results)  {
//    if  (err)  throw err;
//    console.log('test.py finished.');
//    console.log('results', results);
//   });