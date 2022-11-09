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
                   
            }
            if (element.isFile()) {
                fs.copyFile(path.join(src, element.name), path.join(dest, element.name), (err) => {
                    if (err) {copyFile1(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'))};
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

createHtml()
// index.html
let text = ''
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
                if(element.name.split('.')[1] != 'html') return;
                fs.readFile(path.join(__dirname, 'template.html'),
                    'utf-8',
                    (err, indexhtml) => {
                        if (err) throw err
                        text = indexhtml;
                        fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'),
                        text, (err) => {
                                if (err) throw err
                                fs.readFile(path.join(__dirname, 'components', element.name),
                                (err, textCss) => {
                                        if (err) throw err
                                        text = text.replace(`{{${element.name.split('.')[0]}}}`, textCss);
                                        asd(text)
                                    })
                            })

                    })
            });
        })

    })
   
}
function asd(text) {
    fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'),text,(err) => {
        if (err) throw err
    })
}

function readFile() {
    fs.readFile(path.join(__dirname, 'template.html'), (err, data) => {
        if (err) throw err
        createHtml(data);
    })
}
createCss()
function createCss() {
     fs.readdir(path.join(__dirname, 'style'),  { withFileTypes: true },  (err, data) => {
        if (err) throw err
        fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'),'',(err) => {
            if (err) throw err
        })
        data.forEach(element => {
            fs.readFile(path.join(__dirname, 'style' , element.name), 'utf8', (err, data) => {
                if (err) throw err
                fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'),data,(err) => {
                    if (err) throw err
                })
            })
    })
  })
}