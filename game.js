var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// to start the game
$(document).keypress(function() {
  if(!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// to record click
$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer((userClickedPattern.length - 1));
});

// check the user answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    var bodyClass = $("body").addClass("game-over");
    setTimeout(function() {
    bodyClass.removeClass("game-over");
  }, 200);
    startOver();
  }
}

// randomly selecting next button
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(200).fadeIn(200);
  playSound(randomChosenColor);
}
function  startOver() {
  gamePattern = [];
  level = 0;
  started = false;
  $("#level-title").text("Game Over, Press Any Key to Restart");
}

// to play sound
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

// animate the buttons
function animatePress(currentColor) {
  var addedClass = $("." + currentColor).addClass("pressed");
  setTimeout(function() {
  addedClass.removeClass("pressed");
  }, 100);

}
