var Word = require("./word.js")
var inquirer = require("inquirer")

var wordBank = ["link", "mario", "luigi", "bowser", "samus","kirby","toad","ike","pikachu",]

// var currentWord = wordBank[1];
// var wordObject = new Word(currentWord)
// wordObject.createLetters();
// wordObject.displayWord();
// wordObject.checkUserGuess("m");
// console.log(wordObject.wordArr);
// console.log(wordObject.letterArr);
// console.log(wordObject.gameArr);

function startGame() {
    var randomIndex = Math.floor(Math.random() * wordBank.length)
    var randomWord = wordBank[randomIndex]
    var wordObject = new Word(randomWord)
    wordObject.createLetters();
    wordObject.displayWord();
    // var userGuess = askForLetter()
    // wordObject.checkUserGuess(userGuess)


    function askForLetter() {
        inquirer.prompt([{
            type: "input",
            message: "Please Guess a Letter...",
            name: "userGuess"

        }]).then(answers => {
            wordObject.checkUserGuess(answers.userGuess)
            // console.log(answers.userGuess)
            // return answers.userGuess
            wordObject.checkWin();




            if (wordObject.gameOver() && wordObject.checkWin()) {
                askForLetter();
            }
        })
    }

    askForLetter();

}




// askForLetter();
startGame();