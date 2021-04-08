
const fs = require('fs')
const chalk = require('chalk')
const readlineSync = require('readline-sync')
const { randomInt } = require('crypto')
const words = fs.readFileSync('./dict.txt', 'utf-8').toLowerCase().split('\n')
const n = randomInt(0, words.length)


// donnée du joeur:

const player = {
  name: readlineSync.question('Your player name: '),
  age: Number(readlineSync.question('Your age: ')),
  life: 10,
}

let objScore = []
try {
  objScore = fs.readFileSync('./highScore.json', 'utf-8')
} catch (e) {
  console.error(e.message)
  process.exit(1)
}
objScore = JSON.parse(objScore)

// donnée du jeu:

let lettre = words[n].split('');
let letterUsed = []
let wf = []
console.log(chalk.green('rechercher le mot mystere en rentrant une lettre à la fois.\n Si une lettre est plusieur fois dans le mots, seul une seul entrée suffit. \n Vous disposez de 10 essaye. A chaque erreur vos vie sont décrementer de 1 et un message apparait.'))
console.log(chalk.red('Une fois toutes les lettres trouvé présser entrer pour valider le mot'))
for (let i = 0; i < lettre.length; i++) {
  wf.push('_')
}

while (player.life !== 0 || /*lettre.length !== 0*/ wf.includes('_')) {
  let score = player.life * 10
  let tabscore = [`name: ${player.name}`, `age: ${player.age}`, `Score: ${score}`]
  let enterLetter = readlineSync.question('Indiquez moi une lettre :');
  letterUsed.push(enterLetter)

  for (let i = 0; i < lettre.length; i++) {
    lettre[i] === enterLetter ? wf[i] = enterLetter : ''
  }

  if (lettre.includes(enterLetter)) {
    console.log(chalk.cyan('Bien joué, Continue...'))
  } else if (wf.join('') === words[n]) {
    console.log(chalk.black.bgGreen(`Bravo ${player.name} ! le mot est`), chalk.underline.black.bgGreen(`${words[n]}`));
    console.log(tabscore);
    return false
  } else if (player.life === 0) {
    console.log(chalk.black.bgRed('Perdu!'))
    return false
  } else {
    player.life -= 1;
    console.log(chalk.red(`Mauvaise lettre ! il vous reste ${player.life} essaye`));
  }
  console.log(chalk.yellow(`the world :`), chalk.underline(`${wf.join(' ')} `))
  console.log(chalk.magenta(`letter utilisée : ${letterUsed}`))
  objScore.score.push([player.name, score])
  objScore = JSON.stringify(objScore)
  fs.writeFileSync('./highScore.json', objScore)
}


//let tabscore = [player.name, player.age, player.life]

//console.log(tabscore)