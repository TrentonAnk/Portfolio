var Letter = require("./letter.js")


var Word = function (word) {
    this.word = word


    this.wordArr = word.split("");
    this.underscoreArr = [];
    this.letterArr = [];
    this.gameArr = [];
    this.remainingGuesses = 7;

    this.createLetters = function () {
        for (let i = 0; i < this.wordArr.length; i++) {
            this.letterArr.push(new Letter(this.wordArr[i]))
        }
    }
    this.displayWord = function () {
        for (let i = 0; i < this.letterArr.length; i++) {
            this.gameArr.push(this.letterArr[i].displayLetter())
        }

        console.log(this.gameArr);
    }

    this.checkUserGuess = function (userGuess) {
        this.gameArr = [];


        if (this.wordArr.includes(userGuess)) {

            for (let i = 0; i < this.wordArr.length; i++) {
                if (userGuess == this.wordArr[i]) {
                    this.letterArr[i].shown = true;
                }
            }
            this.displayWord();


        } else {
            this.remainingGuesses--
                console.log("We need to take a guess away sorry!!");

            console.log("RemainingGuesses: " + this.remainingGuesses)
            this.displayWord();


        }


    }
    this.gameOver = function () {
        if (this.remainingGuesses < 1) {
            console.log("gameOver");
            return false
        } else {
            return true

        }
    }


    this.checkWin = function () {
        var index = this.wordArr.length;
        var counter = 0;
        for (var i = 0; i < index; i++) {
            if (this.wordArr[i] == this.gameArr[i]) {
                counter++
            }
        }
        if (counter == index) {
            console.log("You win!!")

            return false 

        }else{
            return true
        }
    }
    

}








module.exports = Word;