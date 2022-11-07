const path = require('path');
const fs = require('fs');
const { addAbortSignal } = require('stream');


// async function mackFolder(n) {
//     fs.mkdir(path.join(__dirname, 'project-dist'), err => {
//         if (err) {
//             fs.rm(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
//                 if (err) throw err
//                 fs.mkdir(path.join(__dirname, 'project-dist'), err => {
//                     if (err) throw err
//                         // copyFile()
//                 })
//             })
//         }
//         // copyFile()
//     });
// }
// mackFolder()


// function resolveAfter2Seconds() {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             console.log(1)
//         }, 2000);
//     });
// }

function rmFile() {

}

function mkdirFile() {


}


let asd1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve(console.log(1))
    }, 2000);
});
let asd = new Promise((resolve) => {
    setTimeout(() => {
        resolve(console.log(2))
    }, 2000);
});

asd1.then(asd)





// await fs.rm(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
//     if (err) throw err
// })

// await fs.mkdir(path.join(__dirname, 'project-dist'), err => {
//     if (err) throw err
// })

// mackFolder()