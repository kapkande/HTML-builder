const path = require('path');
const fs = require('fs');
process.stdin.setEncoding('utf8')
fs.stat(path.join(__dirname, '/text.txt'), err => {
    if (err) {
        fs.writeFile(
            path.join(__dirname, 'text.txt'),
            '',
            (err) => {
                if (err) throw err
            }
        )
    }
    process.stdout.write(`Введите текст: `);
})

process.on('SIGINT', () => {
    process.stdout.write(`\nВы вышли из режима ввода`);
    process.exit();
})

process.stdin.on('data', function(chunk) {
    if (chunk.trim() == 'exit') {
        process.stdout.write(`\nВы вышли из режима ввода`);
        process.exit();
    }
    fs.appendFile(
        path.join(__dirname, 'text.txt'),
        chunk,
        (err) => {
            if (err) throw err
        }
    )
    process.stdout.write(`Введите текст: `);
})