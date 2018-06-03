const { execFile } = require('child_process')

let keywords = process.argv.slice(2)
let index = 0

function main() {
    console.log('Searching products for keyword: ' + keywords[index])

    execFile('node', ['./src/collector.js', keywords[index++]], (error, stdout, stderr) => {
        if (error) {
            throw error
        }

        console.log(stdout)

        if(index < keywords.length) {
            main()
        }
    })
}

main()