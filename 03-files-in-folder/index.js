const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, 'secret-folder'), (err, data) => {
    if (err) throw err;
    data.forEach(element => {
        fs.stat(path.join(__dirname, 'secret-folder', element), (err, data) => {
            if (err) throw err;
            if (data.isFile()) console.log(`${element.split(element.split('.')[element.split('.').length-1])[0]} - ${element.split('.')[element.split('.').length-1]} - ${data.size}b`);

        })
    });
})
