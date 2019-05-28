'use strict';

var paperBtn = document.getElementById('paper');
var stoneBtn = document.getElementById('stone');
var scissorsBtn = document.getElementById('scissors');
var output = document.getElementById('itemOutput');
var randomNumber;
var result;
var player;
var paper = 'paper';
var stone = 'stone';
var scissors = 'scissors';

function computerNumber() {
  randomNumber = Math.floor(Math.random()*3 +1);
  if (randomNumber === 1) {
    randomNumber = paper;
  }
  else if (randomNumber === 2) {
    randomNumber = stone;
  }
  else if (randomNumber === 3) {
    randomNumber = scissors;
  }
}
function writeOutput() {
    output.innerHTML = result + ': Ty wybrałeś ' + player + ', komputer wybrał ' + randomNumber;
}


function playerMove(player) {
  computerNumber();

  if (randomNumber === player) {
      result = 'Remis';
    }
    else if ((randomNumber === stone && player === paper) || (randomNumber === paper && player === scissors) || (randomNumber === scissors && player === stone)){
      result = 'Wygrana';
    }
    else  {
      result = 'Przegrana';
    }
    writeOutput();
}

paperBtn.addEventListener('click', function() {
  playerMove(paper); 
});
stoneBtn.addEventListener('click', function() {
  playerMove(stone); 
});
scissorsBtn.addEventListener('click', function() {
  playerMove(scissors); 
});