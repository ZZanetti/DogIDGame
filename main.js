const difficulties = ["Super Easy", "Easy", "Medium", "Hard", "Very Hard", "Extreme", "Insane Mode"];
const goalHints = ["***use all lower case letters and make sure to spell correctly!",
  "golden r______r",
  "___matian",
  "_______ retriever",
  "american ____dog",
  "oh please, you know this!",
  "combination of two previous breeds",
  "Yo Quiero Taco Bell!",
  "__shch___",
  "[country-identifier] ___ ____ terrier",
  "______ hound",
  "not shit",
  "[country-indentifier] [sounds-like-new-waaahhh]"]
const goalStringdog = ["golden retriever",
  "dalmatian",
  "labrador retriever",
  "american bulldog",
  "poodle",
  "labradoodle",
  "chihuahua",
  "dachshund",
  "american pit bull terrier",
  "basset hound",
  "shih tzu",
  "belgian malinois"];
const goalImage = ["images/golden.jpeg",
  "images/dalmatian.jpeg",
  "images/labrador.jpeg",
  "images/bulldog.jpeg",
  "images/poodle.jpeg",
  "images/labradoodle.jpeg",
  "images/chihuahua.jpeg",
  "images/dachshund.jpeg",
  "images/pit.jpeg",
  "images/bassethound.jpeg",
  "images/shihtzu.jpeg",
  "images/belgianmalinois.jpeg"];


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
var timerfuncset;


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

function readHighScores(){
  return document.getElementById("highscore").textContent;
}

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
  document.getElementById("hint").textContent = goalHints[0];
  const result = document.getElementById("result");
  result.textContent = "Identify the following dog breed:"
  lvl = document.getElementById("level");
  lvl.textContent = difficulties[j];
  goal = document.getElementById("goal");
  goal.src=goalImage[i]
  start = Date.now();
  score = 0;
  document.getElementById("score").textContent = 0;
  startTimer()
}

function hint(){
  console.log("hint");
  score = score - 15;
  document.getElementById("score").textContent = score;
  document.getElementById("hint").textContent = goalHints[i+1];
  /**show hint */
}

window.addEventListener("keydown", function (e) { 
  if (e.key == "Backspace"){
    const textbox = document.getElementById("userinput");
    textbox.textContent = textbox.textContent.substring(0, textbox.textContent.length - 1);
  }
})

window.addEventListener("keypress", function (event) {
  const textbox = document.getElementById("userinput");
  textbox.textContent = textbox.textContent + event.key;
  if (textbox.textContent == goalStringdog[i] || textbox.textContent == "$") {
    stopTimer();
    i = i+1;
    if (i % 2 == 0){
      ++j;
    } 
    const result = document.getElementById("result");
    result.style.textAlign = "center";
    result.textContent = "Good Job!";
    var mytime = document.getElementById("timer").textContent;
    score = score + 30 - Number(mytime);
    document.getElementById("score").textContent = score;
    next = document.createElement('button');
    document.getElementById("next").appendChild(next);
    next.textContent = "Next Question";
    next.addEventListener('click', nextChallenge);
    function nextChallenge() {
      textbox.textContent = "";
      if (i == goalStringdog.length) {
        result.textContent = "You Win! Click Restart to try again!";
        next.remove();
        writeHighScores();
        i = 0;
        j = 0;
      } else {
        lvl = document.getElementById("level");
        lvl.textContent = difficulties[j];
        goal = document.getElementById("goal");
        goal.src=goalImage[i]
        result.textContent = "Identify the following dog breed:";
        next.remove();
        start = Date.now();
        document.getElementById("timer").textContent = 0;
        startTimer();
      }
    }
  }
})

window.onload = function(){
  timerfuncset = setInterval(timerfunction, 1000);
  document.getElementById("restartButton").addEventListener('click', restart);
  document.getElementById("hintButton").addEventListener('click', hint);
  timing = document.createElement('span');
  timing.id = "timer"
  document.getElementById("buttoncontainer").appendChild(timing);
  document.getElementById("timer").textContent = 0;
}


