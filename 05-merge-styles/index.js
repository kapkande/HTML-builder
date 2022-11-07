const path = require('path');
const fs = require('fs');
process.stdin.setEncoding('utf8')
fs.writeFile(
    path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
        if (err) throw err
    }
)
fs.readdir(path.join(__dirname, 'styles'), (err, data) => {
    if (err) throw err;
    data.forEach(element => {
        if (element.split('.')[1] == 'css') {
            fs.readFile(path.join(__dirname, 'styles', element), 'utf8', (err, data) => {
                if (err) throw err;
                fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, err => {
                    if (err) throw err;
                })
            });
        }
    })
})