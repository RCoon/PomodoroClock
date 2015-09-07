// declare changeable DOM elements
var $mins = $("#mins");
var $breakmins = $("#breakmins");
var $secs = $("#secs");
var $breaksecs = $("#breaksecs");
var $slider = $("#timeSlider");
var $start = $("#startButt");
var $reset = $("#resetButt");
var $alarm = $("#alarm")[0];
var secondsCount;  //initialise count variable
var timerInterval; //interval must be global
var breakInterval; //global break interval
var lastValue = 25;  //save last slider value
var lastBreakValue = Math.round(lastValue * 0.2); // save last break value

// set-up jQueryUI slider
$slider.slider({
  value: 25,
  max: 60,
  min: 1,
  animate: "fast",
  slide: function(event, ui) {
    $mins.text(ui.value);
    $secs.text("00");
    lastValue = ui.value;
    lastBreakValue = Math.round(ui.value * 0.2);
    $breakmins.text(lastBreakValue);
    $breaksecs.text(setBreakSec);
/*    if (bmins > 0) {
      $breaksecs.text("00");
    } else {
      $breaksecs.text("20");
    }*/
  }
});

$(document).ready(function(){
  $reset.hide();
  
  $reset.click(function(){
    clearInterval(timerInterval);
    clearInterval(breakInterval);
    $alarm.pause();
    $alarm.currentTime = 0;
    $reset.hide();
    $start.show();
    $slider.slider({
      value: lastValue,
      disabled: false
    });
    $mins.text(lastValue);
    $secs.text("00");
    $(".timer").css("color","#00f615");
    $breakmins.text(lastBreakValue);
    $breaksecs.text(setBreakSec);
    $(".breaktimer").css("color","#E61010");
  });
  
  $start.click(function(){
    $start.hide();
    $reset.show();
    $slider.slider("option","disabled",true);
    timerInterval = setInterval(countDown,1000);
  });
});

var setBreakSec = function() {
  if (lastBreakValue === 0) {
    return "20";
  } else {
    return "00";
  }
}
var countDown = function(){
  // get total seconds remaining
  secondsCount = parseInt($mins.text())*60 + parseInt($secs.text());
  // check if any time remains
  if(secondsCount > 0){
    secondsCount--;
    var minsLeft = Math.floor(secondsCount/60);
    var secsLeft = secondsCount%60;
    if(secsLeft<10){secsLeft = "0" + secsLeft}
    $mins.text(minsLeft);
    $secs.text(secsLeft);
  }
  else {
    // start break countdown
    $(".timer").css("color","#E61010");
    $(".breaktimer").css("color","#00f615");
    breakInterval = setInterval(countDownBreak,1000);
    // stop work countdown
    clearInterval(timerInterval);
    // play sound
    $alarm.play();
  }
}

var countDownBreak = function(){
  // get total seconds remaining
  secondsCount = parseInt($breakmins.text())*60 + parseInt($breaksecs.text());
  // check if any time remains
  if(secondsCount > 0){
    secondsCount--;
    var minsLeft = Math.floor(secondsCount/60);
    var secsLeft = secondsCount%60;
    if(secsLeft<10){secsLeft = "0" + secsLeft}
    $breakmins.text(minsLeft);
    $breaksecs.text(secsLeft);
  }
  else {
    $("#resetButt").click();
    // stop countdown
    clearInterval(breakInterval);
    // play sound
    $alarm.play();
    $(".breaktimer").css("color","#E61010");
    $(".timer").css("color","#00f615");
  }
}