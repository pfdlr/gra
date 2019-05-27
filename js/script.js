'use strict';

var paperBtn = document.getElementById('paper');
var stoneBtn = document.getElementById('stone');
var scissorsBtn = document.getElementById('scissors');
var output = document.getElementById('itemOutput');
var randomNumber;
var result;
var player;

function computerNumber() {
  randomNumber = Math.floor(Math.random()*3 +1);
  if (randomNumber === 1) {
    randomNumber = 'paper';
  }
  else if (randomNumber === 2) {
    randomNumber = 'stone';
  }
  else if (randomNumber === 3) {
    randomNumber = 'scissors';
  }
}
function writeOutput() {
  output.innerHTML = result + ': Ty wybrałeś ' + player + ', komputer wybrał ' + randomNumber;
}


paperBtn.addEventListener('click', function() {
  playerMove(paper); {
    player = 'paper';
    computerNumber();
    if (randomNumber === 'paper') {
      result = 'Remis';
    }
    else if (randomNumber === 'stone') {
      result = 'Wygrana';
    }
    else if (randomNumber === 'scissors') {
      result = 'Przegrana';
    }
    writeOutput()
  }
});
stoneBtn.addEventListener('click', function() {
  playerMove(stone); {
    player = 'stone';
    computerNumber();
    if (randomNumber === 'paper') {
      result = 'Przegrana';
    }
    else if (randomNumber === 'stone') {
      result = 'Remis';
    }
    else if (randomNumber === 'scissors') {
      result = 'Wygrana';
    }
    writeOutput()
  }
});
scissorsBtn.addEventListener('click', function() {
  playerMove(scissors); {
    player = 'scissors';
    computerNumber();
    if (randomNumber === 'paper') {
      result = 'Wygrana';
    }
    else if (randomNumber === 'stone') {
      result = 'Przegrana';
    }
    else if (randomNumber === 'scissors') {
      result = 'Remis';
    }
    writeOutput()
  }
});

function playerMove(player) {
	
}
