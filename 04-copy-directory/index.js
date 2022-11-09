const path = require('path');
const fs = require('fs');

function mackFolder(n) {
    fs.mkdir(path.join(__dirname, 'files-copy'), err => {
        if (err) {
            fs.rm(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
                if (err) throw err
                fs.mkdir(path.join(__dirname, 'files-copy'), err => {
                    if (err) throw err
                    copyFile()
                })
            })
        }
        copyFile()
    });
}
mackFolder()

function copyFile() {
    fs.readdir(path.join(__dirname, 'files'), (err, data) => {
        if (err) throw err
        data.forEach(element => {
            fs.copyFile(
                path.join(__dirname, 'files', element),
                path.join(__dirname, 'files-copy', element),
                (err) => {
                    if (err) throw err
                }
            )
        });
    })
}