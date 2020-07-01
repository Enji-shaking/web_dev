var buttonColor = ['red','blue','green', 'yellow'];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;
function flash(color) {
    $('#'+color).fadeOut(100).fadeIn(100);
}

function playSound(color){
    var audio = new Audio('sounds/' + color + '.mp3');
    audio.play();
}

function nextSequence() {

    setUpBoard();
    level += 1;
    userClickedPattern = [];
    var randomNum = Math.floor(Math.random() * 3);
    var chosenColor = buttonColor[randomNum];
    gamePattern.push(chosenColor);
    flash(chosenColor);
    playSound(chosenColor);
}

function setUpBoard(){
    console.log(level);
    $('h1')[0].innerHTML = 'Level '+level;
}

function checkAnswer(index){
    return userClickedPattern[index] === gamePattern[index];
}
function resetBoard(){
    $('h1')[0].innerHTML = 'Game Over, Press Any Key to Restart';
    gamePattern = [];
    level = 0;
    started = false;
}

$('.btn').click(function (evt) {
    var color = evt.target.id;
    activateButton(color);
});

function activateButton(color){
    flash(color);
    playSound(color);
    userClickedPattern.push(color);
    if(!checkAnswer(userClickedPattern.length-1)){
        resetBoard();

        var obj = $('body');
        obj.addClass('game-over');
        setTimeout( function (){obj.removeClass('game-over')}, 200);
        var wrong = new Audio('sounds/wrong.mp3');
        wrong.play();
    }else{
        console.log('success');
    }
    if(userClickedPattern.length === gamePattern.length){
        setTimeout(nextSequence, 1000);
        // setTimeout(alert('sss'), 1000000);
    }
}

$(document).keypress(function (evt) {
    if(!started){
        setTimeout(nextSequence, 300);
        started = true;
    }
    else{
        var key = evt.key;
        switch (key) {
            case 'w':
                activateButton('green');
                break;
            case 'i':
                activateButton('red');
                break;
            case 's':
                activateButton('yellow');
                break;
            case 'j':
                activateButton('blue');
                break;
            default:

        }
    }
});