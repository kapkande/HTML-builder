const path = require('path')
let linck = path.join(__dirname, 'text.txt')
    // console.log(linck);
const fs = require('fs');
fs.readFile(linck, 'utf-8', (err, data) => {
    if (err) throw err
    console.log(data);
})