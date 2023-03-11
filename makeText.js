/** Command-line tool to generate Markov text. */

const axios = require('axios')
const fs = require('fs')
const process = require('process')
const MarkovMachine = require('./markov')

function generateMarkovText(text) {
    const markovMachine = new MarkovMachine(text)
    console.log(markovMachine.makeText())
}

function processFile(path) {
    fs.readFile(path, 'utf-8', function(err, data) {
        if (err) {
            console.error(`Error reading ${path}:\n${err}`);
            process.exit(1);
        }

        generateMarkovText(data);
    })
}

async function processURL(path) {
    try {
        const res = await axios.get(path);
        generateMarkovText(res.data);
    } catch (e) {
        console.error(`Error fetching ${path}:\n${err}`);
        process.exit(1);
    }
}

const command = process.argv[2]
const path = process.argv[3]
if (command == 'file') {
    processFile(path)
} else if (command == 'url'){
    processURL(path)
} else {
    console.log(`Unknown command: ${command}`)
}