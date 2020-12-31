var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];
var started = false;
var level = 0;

// we use jQuery to detect if  a keyboard has called
$(document).keypress(() => {
  if (!started) {
    $("#level-title").text("level" + level);
    nextSequence();
    started = true;
  }
});
//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//check answer section
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game over , Press Any Key To Restart!");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    //change the H1 tittle to say that press any key to play
    startOver();
  }
}

//function of next sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level  " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
