//define variables
var quizRules = document.querySelector("#quizRules");
var startButton = document.querySelector("#startBtn");
var resetQuiz = document.querySelector("#resetQuiz");
var clearButton = document.querySelector("#clearScore");
var submitButton = document.querySelector("#submitScore");
var viewHighscores = document.querySelector("#viewHighscores");
var initialsInput = document.querySelector("#initialsInput");
var olEl = document.querySelector("#olEl");

var btnEl = document.querySelector(".btnEl");
var choice1 = document.querySelector("#choice1");
var choice2 = document.querySelector("#choice2");
var choice3 = document.querySelector("#choice3");
var choice4 = document.querySelector("#choice4");

// targetting container divs in order to hide content
var questionContainer = document.querySelector("#questionContainer");
var resultsContainer = document.querySelector("#resultsContainer");

var timerElement = document.querySelector("#timerCount");
var currentIndex = 0;
var timeLeft = 60;
var Correct = 0;
var Score;
var userScores = [];

var questions = [
  // Question
  {
    question: "What colour is Spongebob's tie? ",
    answers: ["red", "yellow", "Green", "Black"],
    correctAnswer: "red",
  },

  {
    question: "Which of these words best describes Squidward?",
    answers: ["Excited", "Grumpy", "Full of Beans", "Patient"],
    correctAnswer: "Grumpy",
  },

  {
    question: "What is Larry",
    answers: ["Human", "Silly Sea Merchant", "Shark", "Lobster"],
    correctAnswer: "Lobster",
  },

  {
    question: "What is Mr.Krabs full legal name",
    answers: [
      "Edward T Krabs",
      "Eugene H. Krabs",
      "Keith H. Krabs",
      "Eugene B. Krabs",
    ],
    correctAnswer: "Eugene H. Krabs",
  },

  {
    question: "What is Mrs.Puff's first name",
    answers: ["Penny", "Sugar", "Poppy", "Pamela"],
    correctAnswer: "Poppy",
  },

  {
    question: "What does SpongeBob live in ",
    answers: ["boat", "shoe", "pineapple", "Rock"],
    correctAnswer: "Pineapple",
  },

  {
    question:
      "How many fingers and thumbs does SpongeBob SquarePants have? In total, not on each hand!",
    answers: ["4", "9", "9.5", "8"],
    correctAnswer: "8",
  },
];

//function that loads highscores from local storage upon refreshing of the page.
function init() {
  getHighScores();
}
init();

//function that starts my game, and calls 2 functions.
function startGame() {
  console.log("Quiz Started! Good Luck");

  countdown();
  displayQuestion();
  //removing and adding a class that is defined in my css docuement
  viewHighscores.classList.add("hide");
  quizContainer.classList.remove("hide");
  quizRules.classList.add("hide");
  resultsContainer.classList.remove("hide"); // in case highScores are viewed before game start
}

function countdown() {
  console.log("Countdown started. ");
  var timeInterval = setInterval(function () {
    if (timeLeft > 1 && currentIndex == questions.length) {
      clearInterval(timeInterval);
    } else if (timeLeft === 1) {
      timerElement.textContent = timeLeft + " second remaining";
      timeLeft--;
    } else if (timeLeft > 1) {
      timerElement.textContent = timeLeft + " seconds remaining";
      timeLeft--;
    } else {
      timerElement.textContent = "";
      clearInterval(timeInterval);
      gameOver();
    }
  }, 1000);
}

function displayQuestion() {
  console.log(currentIndex);
  if (questions.length > currentIndex) {
    questionContainer.innerHTML = questions[currentIndex].question;
    console.log(questions[currentIndex].question);

    choice1.innerHTML = questions[currentIndex].answers[0];
    console.log(choice1.innerHTML);

    choice2.innerHTML = questions[currentIndex].answers[1];
    console.log(choice2.innerHTML);

    choice3.innerHTML = questions[currentIndex].answers[2];
    console.log(choice3.innerHTML);

    choice4.innerHTML = questions[currentIndex].answers[3];
    console.log(choice4.innerHTML);
  } else {
    console.log("game finished");
    gameOver();
  }
}

function verifyAnswer(event) {
  event.preventDefault();
  btnEl = event.target;
  if (btnEl.innerHTML === questions[currentIndex].correctAnswer) {
    console.log("Congrats! You got the question right");
    currentIndex++;
    Correct++;
    displayQuestion();
  } else {
    console.log("Oh no! You got the question wrong");
    timeLeft -= 3;
    currentIndex++;
    displayQuestion();
  }
}

function gameOver() {
  console.log("Number of questions correct" + Correct);
  Score = timeLeft + Correct * 5;
  console.log("This is your score:" + Score);

  quizContainer.classList.add("hide");
  viewHighscores.classList.add("hide");
  resultsContainer.classList.remove("hide");
}

function getHighScores() {
  // JSON.parse is the next step
  var localUserScores = localStorage.getItem("Scores");
  if (localUserScores) {
    //if you don't have this line, the user data that is inputted
    //will be overwritten
    userScores = JSON.parse(localUserScores);
  } else {
    userScores = [];
  }
  olEl.textContent = ""; // this is a reset so the updated value won't be replicated
  for (i = 0; i < userScores.length; i++) {
    var li = document.createElement("li");
    li.textContent = userScores[i].user + " - " + userScores[i].score;
    olEl.appendChild(li);
    // in order to make appendChild work, you need a static parent element
    // in order to show the dynamic element on the page
    //ol is a static HTML element as to li being a dynamic element
  }

  return userScores;
}

function setHighScores(event) {
  //add user and score to userScore object
  //scores.push =
  event.preventDefault();

  var userInitials = initialsInput.value;
  console.log(userInitials);
  var scoreToSave = {
    user: userInitials, //user: and score: is the key, and after the : is the value pair
    score: Score,
  };
  userScores.push(scoreToSave);
  // this line PUSHES the object inside of the array

  //"Scores" is the creation of the key and also acts as a declaration.
  localStorage.setItem("Scores", JSON.stringify(userScores));
  getHighScores();
  initialsInput.classList.add("hide");
  submitButton.classList.add("hide");
}

function displayHighscores() {
  resultsContainer.classList.remove("hide");
  initialsInput.classList.add("hide");
  submitButton.classList.add("hide");
  resetQuiz.classList.add("hide");
}

function clearScore() {
  localStorage.clear();
  location.reload();
}

function resetGame() {
  location.reload();
}

//event listeners
viewHighscores.addEventListener("click", displayHighscores);
submitButton.addEventListener("click", setHighScores);
clearButton.addEventListener("click", clearScore);
resetQuiz.addEventListener("click", resetGame);
startButton.addEventListener("click", startGame);
choice1.addEventListener("click", verifyAnswer);
choice2.addEventListener("click", verifyAnswer);
choice3.addEventListener("click", verifyAnswer);
choice4.addEventListener("click", verifyAnswer);
