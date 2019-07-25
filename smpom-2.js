const timeOnScreen = document.getElementById("time-left");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const minInput = document.getElementById("session-length");
const breakminInput = document.getElementById("break-length");
const timerLabel = document.getElementById("timer-label");

var seconds, remSeconds, minutes, breakSeconds, remBreakSeconds, breakMin;
var timer = false;

var audio = new Audio('578626main_sputnik-beep.mp3');

$(document).ready(function(){ //once doc loaded
    //Separate helper func on first click to process session length
    function submit(){
        seconds = minInput.value * 60;
        breakSeconds = breakminInput.value * 60;
        currentCount();
    }
    function breakTimer() {
        if (breakSeconds > 0) { //only counts down if positive value seconds
            if (timer == true) {
                breakSeconds--;
                remBreakSeconds = breakSeconds % 60;
                breakMin = Math.floor(breakSeconds / 60);
                if (remBreakSeconds < 10) {
                    remBreakSeconds = "0" + remBreakSeconds;
                }
                if (breakMin < 10) {
                    breakMin = "0" + breakMin;
                }
            //BREAK SESH DISPLAY
            timeOnScreen.innerHTML = breakMin + ":" + remBreakSeconds;
            timerLabel.innerHTML = "<h2>~Sailor Senshi Break~</h2>";
            }
        }
    }
    function countdown(){
        if (seconds > 0) { //only counts down if positive value seconds
            if (timer == true) {
                seconds--; //this may need to be moved?? timer "skips a beat" on start btn click from a pause
                remSeconds = seconds % 60;
                minutes = Math.floor(seconds / 60);
                if (remSeconds < 10) {
                    remSeconds = "0" + remSeconds;
                }
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
            //audio plays when session seconds hit 0
                if(seconds === 0){
                    audio.loop = false;
                    audio.play();
                }
            //COUNTDOWN DISPLAY
            timeOnScreen.innerHTML = minutes + ":" + remSeconds;
            }
        } else {
            breakTimer();
        }
    }
    function currentCount(){
        timer = true; //to allow running the countdown
        setInterval(countdown, 1000);
        }
    function stopCountdown(){
        startBtn.disabled = false; //re-enable the start btn
        timer = false; //STOP the countdown
    }
//RESTART BUTTON FUNC
    function redo(){
        if(timer == false){ //can only click restart if the timer is paused
            seconds = minInput.value * 60;
            breakSeconds = breakminInput.value * 60;
            timer = true;
            startBtn.setAttribute("disabled", "true"); //disallows clicking start button at same time
        }
    }
//first click submits input values
    let clicks = 0;
    $("#start").click(function() {
        if (clicks == 0){
        //on first click
            submit();
            startBtn.setAttribute("disabled", "true");
        } else {
        //second click +
            timer = true;
            countdown();
            startBtn.setAttribute("disabled", "true");
        }
        ++clicks;
    });

    stopBtn.addEventListener("click", stopCountdown, false);
    resetBtn.addEventListener("click", redo, false);
}); //end onload func

/* PREV IN FUNC CURRENTCOUNT
    remSeconds = seconds % 60;
    minutes = Math.floor(seconds / 60);
      if (remSeconds < 10) {
          remSeconds = "0" + remSeconds;
      }
      if (minutes < 10) {
          minutes = "0" + minutes;
      }
*/
