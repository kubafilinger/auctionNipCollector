const { execFile } = require('child_process');

let keywords = process.argv.slice(2);

execFile('node', ['./src/collector.js', keywords[0]], (error, stdout, stderr) => {
    if (error) {
        throw error;
    }
    console.log(stdout);
});