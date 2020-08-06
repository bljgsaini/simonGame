
$(document).ready(function(){

    var buttonColors = ["green", "yellow", "red", "blue"];
    var gamePattern = [];
    var userEnteredSequence = [];
    var level = 0;
    var gameStarted = false;

    
    $(document).keypress(function(){
        if(gameStarted == false){
            gameStarted = true;
            nextSequence();
        }
    })

    $(".btn").click(function(e){
        if(gameStarted == true){
            userEnteredSequence.push(e.target.id);
            console.log(userEnteredSequence);
            buttonAnimate(e.target.id);
            playSound(e.target.id);
            checkAnswer(e.target.id);
        }else{
            gameOver();
        }
        
    })

    function checkAnswer(clickedButton){
        if(gamePattern[userEnteredSequence.length-1] == clickedButton && gamePattern.length == userEnteredSequence.length){
            userEnteredSequence = [];
            setTimeout(function(){
                nextSequence();
            },1000);
        }else if(gamePattern[userEnteredSequence.length-1] != clickedButton){
            gameOver();
            restartGame();
        }
    }

    function nextSequence(){
        level+=1;
        $("#level-title").html("Level "+ level);
        var randomNum = Math.floor(Math.random()*4);
        var randomChoosenColor = buttonColors[randomNum];
        gamePattern.push(randomChoosenColor);
        console.log(gamePattern);
        buttonAnimate(randomChoosenColor); 
        playSound(randomChoosenColor);       
    }

    function buttonAnimate(buttonColor){
        $("#" + buttonColor).addClass("pressed");
        setTimeout(function() {
            $("#" + buttonColor).removeClass("pressed");
        }, 300);
    }

    function playSound(buttonColor){
        var audio = new Audio('sounds/' + buttonColor + ".mp3");
        audio.play();
    }

    function gameOver(){
        $("#level-title").html("Game Over, Press Any Key to Restart");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
    }

    function restartGame(){
        gameStarted = false;
        level = 0;
        userEnteredSequence = [];
        gamePattern = [];
    }

})


