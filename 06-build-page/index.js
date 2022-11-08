const path = require('path');
const fs = require('fs');
createProjectDist()

function createProjectDist() {
    let projectDist = new Promise(function(resolve, reject) {
        fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
            if (err) throw err
            resolve();
        })
    })

    projectDist.then(() => {
            let assets = new Promise(function(resolve, reject) {
                fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
                    if (err) throw err
                    resolve();
                })
            })
        })
        .then(copyFile1(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets')))
}

function copyFile1(src, dest) {
    fs.readdir(src, { withFileTypes: true }, (err, data) => {
        if (err) throw err
        data.forEach(element => {
            if (element.isDirectory()) {
                let copyFiles = new Promise(function(resolve, reject) {
                        createFolders(path.join(dest), element.name)
                        resolve();
                    }).then(
                        copyFile1(path.join(src, element.name), path.join(dest, element.name)))
                    .then(createHtml())
            }
            if (element.isFile()) {
                fs.copyFile(path.join(src, element.name), path.join(dest, element.name), (err) => {
                    if (err) throw err;
                });
            }
        })
    })
}

function createFolders(src, nameFolder) {
    fs.mkdir(path.join(src, nameFolder), { recursive: true }, (err) => {
        if (err) throw err
    })
}


// index.html
function createHtml(callBack) {
    if (!callBack) {
        callBack = ''
        readFile()
    }
    let copyFiles = new Promise(function(resolve, reject) {
        fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'),
            callBack, (err) => {
                if (err) throw err
            })
        resolve()
    }).then(() => {
        fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, (err, data) => {
            if (err) throw err
            data.forEach(element => {
                fs.readFile(path.join(__dirname, 'project-dist', 'index.html'),
                    'utf-8',
                    (err, indexhtml) => {
                        if (err) throw err



                        fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'),
                            indexhtml.replace(`{{${element.name.split('.')[0]}}}`, 'asd'), (err) => {
                                if (err) throw err

                            })
                    })
            });


            // createHtml(callBack)
        })

    })

}


function readFile() {
    fs.readFile(path.join(__dirname, 'template.html'), (err, data) => {
        if (err) throw err
        createHtml(data);
    })
}