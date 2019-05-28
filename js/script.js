'use strict';
//deklaracje zmiennych
var paperBtn = document.getElementById('paper');
var stoneBtn = document.getElementById('stone');
var scissorsBtn = document.getElementById('scissors');
var output = document.getElementById('itemOutput');
var resultOutput = document.getElementById('resultOutput');
var nevGame = document.getElementById('newGameBtn');
var randomNumber;
var result;
var player;
var paper = 'paper';
var stone = 'stone';
var scissors = 'scissors';
var userResult = 0;
var computerResult = 0;
var gameNumbers;

// funkcja generująca losowy nr 1-3 i przypisująca mu nazwę ruchu
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
//funkcja zwracająca rezultat rundy
function writeOutput(player) {
    output.innerHTML = result + ': Ty wybrałeś ' + player + ', komputer wybrał ' + randomNumber;
  }
//funkcja icząca  ilośc wygranych i przegranych
  function writeResultOutput() {
  if (result === 'Wygrana') {
    userResult =++ userResult;
  }
  else if(result === 'Przegrana') {
    computerResult =++ computerResult;
  }
  resultOutput.innerHTML = userResult + ' : ' + computerResult;
}
//funkcja sprawdza warunki wygranej i wywołuje pozostałe funkcje
function playerMove(player) {
  computerNumber();

  if (randomNumber === player) {
      result = 'Remis';
    }
    else if ((randomNumber === stone && player === paper) || (randomNumber === paper && player === scissors) || (randomNumber === scissors && player === stone)) {
      result = 'Wygrana';
    }
    else  {
      result = 'Przegrana';
    }
    writeOutput(player);
    writeResultOutput();
}
//obserwatory zdarzeń
paperBtn.addEventListener('click', function() {
  playerMove(paper); 
});
stoneBtn.addEventListener('click', function() {
  playerMove(stone); 
});
scissorsBtn.addEventListener('click', function() {
  playerMove(scissors); 
});

newGameBtn.addEventListener('click', function() {
  gameNumbers = window.prompt('Set the Game Numbers to Win');
  if (gameNumbers <= userResult || gameNumbers <= computerResult) {
    
  }
});