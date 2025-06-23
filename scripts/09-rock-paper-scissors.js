
// Declaration of score variable
const score = JSON.parse(localStorage.getItem('score')) || {
  wins  :  0,
  loses : 0,
  ties  : 0
};

updateScores();


// Reset Score
function resetScores() {
    let btnYes = false;
    let btnNo = false;

    document.querySelector('.disp-confirm-msg').innerHTML = 'Are you sure you want to reset the score? <button class="btn-yes">Yes</button><button class="btn-no">No</button>';

    document.querySelector('.btn-yes').addEventListener('click', () => {
      score.wins  =  0;
      score.loses = 0;
      score.ties  = 0;

      updateScores(score.wins, score.loses, score.ties);
      localStorage.setItem('score', JSON.stringify(score));

      document.querySelector('.disp-confirm-msg').innerHTML = '';
    });
    
    document.querySelector('.btn-no').addEventListener('click', () => {      
      document.querySelector('.disp-confirm-msg').innerHTML = '';
    });

    setTimeout(() => {
      document.querySelector('.disp-confirm-msg').innerHTML = '';
    }, 5000);  
}

// Picks Move
function pickComputerMove() {
  let randomNumber = Math.random();
  let move = '';

  if( randomNumber >= 0 && randomNumber <= 1/3) {
    move = 'rock';

  } else if( randomNumber > 1/3  && randomNumber <= 2/3) {
    move = 'paper';

  } else {
    move = 'scissors';
  }

  return move;
} 

// Game Logic
function playGame(playerMove) {
  const computersMove = pickComputerMove();
  
  if(playerMove === 'rock') {
    if(computersMove === 'rock') {
      result = 'It\'s a Tie';
    } else if(computersMove === 'scissors') {
      result = 'You Won';
    } else {
      result = 'You Lost';
    }
  }

  if(playerMove === 'paper') {
    if(computersMove === 'rock') {
      result = 'You Won';
    } else if(computersMove === 'scissors') {
      result = 'You Lost';
    } else {
      result = 'It\'s a Tie';
    }
  }

  if(playerMove === 'scissors') {
    if(computersMove === 'rock') {
      result = 'You Lost';
    } else if(computersMove === 'scissors') {
      result = 'It\'s a Tie';
    } else {
      result = 'You Won';
    }
  }
  
  if (result === 'You Won') {
    score.wins += 1;
  } else if (result === 'You Lost') {
    score.loses += 1;
  } else {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score)); 
  
  updateResult(result);
  updateMoves(playerMove, computersMove);
  updateScores(score.wins, score.loses, score.ties);
}

// Make the score, result and moves visible on webpage
function updateResult(r) {
  let results = document.querySelector('.js-results'); 
  results.innerHTML = r;
}

function updateMoves(pm, cm) {

  let choices = document.querySelector('.js-choices');
    
  choices.innerHTML = `Your choice <img src="./images/${pm}.png" class="play-img-show">, Computer choice <img src="./images/${cm}.png" class="play-img-show">`;
}

function updateScores(w=score.wins, l=score.loses, t=score.ties) {
  let scores = document.querySelector('.js-scores'); 
  scores.innerHTML = `Wins: ${w}, Losses: ${l}, Ties: ${t}`;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  const autoPlayBtn = document.querySelector(".auto-play-btn");
  if(!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000);
    isAutoPlaying = true;
    autoPlayBtn.innerHTML = "Stop Play";

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoPlayBtn.innerHTML = "Auto Play";
  }
}




function addMoveListener(className, move) {
  const moveElement = document.querySelector(className);
  moveElement.addEventListener('click',() => {
    playGame(move);
  }); 
}
addMoveListener(".js-rock-button", 'rock');
addMoveListener(".js-paper-button", 'paper');
addMoveListener(".js-scissors-button", 'scissors');


function addBtnListeners(className, fun) {
  const btnElement = document.querySelector(className);
  btnElement.addEventListener('click', () => {
    fun();
  })
}
addBtnListeners(".js-reset-btn", resetScores);
addBtnListeners(".js-auto-play-btn", autoPlay);


function handleKeydown() {
  document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r') {
      playGame('rock');
    } else if(event.key === 'p') {
      playGame('paper');
    } else if(event.key === 's') {
      playGame('scissors');
    } else if(event.key === 'a') {
      autoPlay();
    } else if(event.key === 'Backspace') {
      resetScores();
    }
  });
}

handleKeydown();