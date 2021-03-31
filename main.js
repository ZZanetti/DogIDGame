const difficulties = ["Super Easy", "Easy", "Medium", "Hard", "Very Hard", "Extreme", "Insane Mode"];
const goalString = ["hi",
  "aeiou",
  "hello world!",
  "lad fad sad dad",
  "get set bet let",
  "This is not a test.",
  "Punctuation! Plus! Capitalization! WoW!",
  "Flags can be: -r -a -f, or: --test --version --help.",
  "True! --nervous --very, very dreadfully nervous I had been and am; but why will you say that I am mad?",
  "insaneAeDhfhTTT$%^uuuddd#34DFffjfjfjffs$$$$"];
/*
* I have added a feature to track the user score based on the timer. 
* Each correct answer gets you 30 points minus the time taken 
* When you finish the game, if your score is higher than the current high score, it records and displays
* I also added a reset button so you can cheat and reset the textbox
* If you reset you get -15 points 
*/

var i = 0;
var j = 0;
var start = Date.now();
/**track user score */
var score = 0;
/**global variable for timer function */
var timerfuncset = setInterval(timerfunction, 1000);

/* define tiemr functions */
function timerfunction() {
  end = Date.now();
  diff = (end - start)/1000;
  timing.textContent = diff.toFixed(0);
}
function stopTimer(){
  clearInterval(timerfuncset);
}
function startTimer(){
  timerfuncset = setInterval(timerfunction, 1000);
}

/**read scores from text file */
function readHighScores(){
  return document.getElementById("highscore").textContent;
}
/**writes high scores to text file, check the text file for scores, compare current score */
function writeHighScores(){
  if (score > Number(readHighScores())) {
    document.getElementById("highscore").textContent = score
  }
}

function restart(){
  console.log("restart");
  document.getElementById("userinput").textContent = "";
  i = 0;
  j = 0;
  const textbox = document.getElementById("userinput");
  textbox.textContent = "";
  const result = document.getElementById("result");
  result.textContent = "Type the Following text:"
  lvl = document.getElementById("level");
  lvl.textContent = difficulties[j];
  goal = document.getElementById("goal");
  goal.textContent = goalString[i];
  start = Date.now();
  score = 0;
  document.getElementById("score").textContent = 0;
}

function reset(){
  console.log("restart");
  document.getElementById("userinput").textContent = "";
  score = score - 15;
  document.getElementById("score").textContent = score;
}




window.addEventListener("keypress", function (event) {
  const textbox = document.getElementById("userinput");
  textbox.textContent = textbox.textContent + event.key;
  if (textbox.textContent == goalString[i]) {
    const result = document.getElementById("result");
    result.textContent = "Good Job!";
    stopTimer();
    var mytime = document.getElementById("timer").textContent;
    score = score + 30 - Number(mytime);
    document.getElementById("score").textContent = score;
    next = document.createElement('button');
    document.getElementById("buttons").appendChild(next);
    next.textContent = "Next Question";
    i = i+1;
    if (i % 2 == 0){
      ++j;
    } 
    next.addEventListener('click', nextChallenge);
    function nextChallenge() {
      textbox.textContent = "";
      if (i == goalString.length - 1) {
        result.textContent = "You Win!";
        next.remove();
        writeHighScores();
      } else {
        lvl = document.getElementById("level");
        lvl.textContent = difficulties[j];
        goal = document.getElementById("goal");
        goal.textContent = goalString[i];
        result.textContent = "Type the Following text:";
        next.remove();
        start = Date.now();
        document.getElementById("timer").textContent = 0;
        startTimer();
      }
    }
  }
})

window.onload = function(){
  document.getElementById("restartButton").addEventListener('click', restart);
  document.getElementById("resetButton").addEventListener('click', reset);
  timing = document.createElement('span');
  timing.id = "timer"
  document.body.appendChild(timing);
  document.getElementById("timer").textContent = 0;
}


