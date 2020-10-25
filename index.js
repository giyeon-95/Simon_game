let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [] ; 

let userClickedPattern = [];

let started = false; 
let level = 0 ; 

$(document).keypress(function() { 
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true; 
    }
});

// 사용자가 클릭한 요소의 id값을 userClickedPattern 배열에 저장한다. 
$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    //클릭한 요소의 id값을 변수에 저장하는 방법

    userClickedPattern.push(userChosenColour); 
    //id값을 userClickedPattern배열에 추가한다. 

    playSound(userChosenColour);
    //사용자가 선택한 요소의 Sound를 play 한다. 

    animatePress(userChosenColour);
    //사용자가 선택한 요소에 animation 효과를 추가한다.

    checkAnswer(userClickedPattern.length-1); 
    //userClickedPattern의 length값의 -1을 인자로 전달 (숫자)
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence(); 
            }, 1000);
        }
    } else {
        let audio = new Audio("sounds/wrong.mp3");
        audio.play(); 

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
};

function startOver() {
    level = 0 ; 
    gamePattern = [] ; 
    started = false; 
};

function nextSequence(){
    userClickedPattern =[]; 

    level++
    $("#level-title").text("Level "+ level);

    let randomNunber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNunber];
    // 난수를 생성하여 배열에 있는 값 하나를 임의로 선택한다.
    gamePattern.push(randomChosenColour); 
    // gamePattern 배열에 그 값을 저장한다. 
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    // $("#") id값 변수로 사용하려면 위와 같이 한다.
    // fadeIn() 의 인자는 시간이다. 

    playSound(randomChosenColour); 
    //random으로 선택된 요소의 sound를 재생한다. 
};


//animation function 
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed") ;
    //class추가, 제거할 때 class이름에 ""붙이기!

    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed") ;
    }, 100);
    //setTimeout으로 class제거 
};

//playSound function
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play(); 
    // switch문 따위 안써도 된다. 
};


