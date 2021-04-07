
const readlineSync = require('readline-sync')

const player = {
  name: readlineSync.question('Your player name: '),
  age: Number(readlineSync.question('Your age: ')),
}

exports.player = player