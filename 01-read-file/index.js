const path = require('path');
const fs = require('fs');
const linckStream = new fs.ReadStream(path.join(__dirname, 'text.txt'), 'utf-8')

function readable() {
  const data = linckStream.read()
  if (data) {
    console.log(data)
  }
}
linckStream.addListener('error', (err) => console.error(err))
linckStream.addListener('readable', readable)
