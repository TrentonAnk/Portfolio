$(document).ready(function () {


    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-secondary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(startScreen);
    }

    initialScreen();



    $("body").on("click", ".start-button", function (event) {
        event.preventDefault();
        generateHTML();

        timerWrapper();

    });

    $("body").on("click", ".answer", function (event) {


        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionCounter]) {


            clearInterval(theClock);
            generateWin();
        }
        else {

            clearInterval(theClock);
            generateLoss();
        }
    });

    $("body").on("click", ".reset-button", function (event) {

        resetGame();
    });

});

function generateLossDueToTimeOut() {
    unansweredTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000);
}

function generateWin() {
    correctTally++;
    // gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>"
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000);
}

function generateLoss() {
    incorrectTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000);
}

function generateHTML() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
    $(".mainArea").html(gameHTML);
}

function wait() {
    if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timerWrapper();
    }
    else {
        finalScreen();
    }
}

function timerWrapper() {
    theClock = setInterval(thirtySeconds, 1000);
    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(theClock);
            generateLossDueToTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function finalScreen() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".mainArea").html(gameHTML);
}

function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 30;
    generateHTML();
    timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["What is Anekin Skywalker's Home planet?", "What is the name of Obi-Wan's Master?", "On what planet did Obi-Wan,Anekin, and Padmae get taken hostage on?", "What was the order number that made the clones kill jedi?", "What was princess lea carrying when she was caught by Darth Vader?", "Who did Han Solo Win the Mellinium Falcon from?", "How old was Yoda when he died?", "What planet is Rea from?"];
var answerArray = [["Naboo", "Mustafar", "Kamino", "Tattooine",], ["Yoda", "Qui-Gon Jin", "The Emporer", "Mace Windu"], ["Kamino", "Coruscant", "Geonosis", "Hoth"], ["Order #93", "Order#33", "Order#88", "Order#66"], ["The Emporer's Lightsaber", "The DeathStar plans", "Location of Luke Skywalker", "Location of Obi-Wan"], ["Lando Callrissian", "Shak-Tii", "Princess Lea", "Anekin Skywalker"], ["100 Years Old", "500 Years Old", "700 Years Old", "900 Years Old"], ["Tattooine", "Naboo", "Endor", "Jakku"]];
var correctAnswers = ["D. Tattooine", "B. Qui-Gon Jin", "C. Geonosis", "D. Order#66", "B. The DeathStar plans", "A. Lando Callrissian", "D. 900 Years Old", "D. Jakku"]
var questionCounter = 0;
var selectedAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var imageArray = ["https://vignette.wikia.nocookie.net/starwars/images/6/62/FashionableFelonFindsFormerFettFlatFooted-ESB.jpg/revision/latest/scale-to-width-down/320?cb=20120109234540"]