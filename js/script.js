'use strict';
//deklaracje zmiennych
var paperBtn = document.getElementById('paper');
var stoneBtn = document.getElementById('stone');
var scissorsBtn = document.getElementById('scissors');
//var buttonsToggle = document.getElementsByClassName('btn')
var output = document.getElementById('itemOutput');
var resultOutput = document.getElementById('resultOutput');
var newGame = document.getElementById('newGameBtn');
var rounds = document.getElementById('rounds');
var randomNumber;
var result;
var player;
var paper = 'paper';
var stone = 'stone';
var scissors = 'scissors';
var userResult = 0;
var computerResult = 0;
var gameNumbers;
//var msgError = '!!! Enter the correct value';

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
    output.innerHTML = 'YOU ' + result + ': <br>You played ' + player + ', computer played ' + randomNumber;
  }
//funkcja icząca  ilośc wygranych i przegranych
  function writeResultOutput() {
  if (result === 'WON') {
    userResult =++ userResult;
  }
  else if(result === 'LOST') {
    computerResult =++ computerResult;
  }
  resultOutput.innerHTML = userResult + ' : ' + computerResult;
}
//funkcja sprawdza warunki wygranej i wywołuje pozostałe funkcje
function playerMove(player) {
  computerNumber();

  if (randomNumber === player) {
      result = 'DRAW';
    }
    else if ((randomNumber === stone && player === paper) || (randomNumber === paper && player === scissors) || (randomNumber === scissors && player === stone)) {
      result = 'WON';
    }
    else  {
      result = 'LOST';
    }
    writeOutput(player);
	writeResultOutput();
    endGame(gameNumbers);
}
//resetowanie liczników - nowa gra
function reset() {
	userResult = 0;
	computerResult = 0;
	resultOutput.innerHTML = '0 : 0';
	output.innerHTML = "Choose your move - Click the Button above";
	enableBtn();
    output.classList.remove('green', 'red');
}
//licznik ilosci gier
function endGame(gameNumbers) {
	
	if (gameNumbers == userResult || gameNumbers == computerResult) {
		output.innerHTML = 'GAME OVER';
				
		if (userResult > computerResult) {
			output.innerHTML = 'GAME OVER<br>YOU WON THE ENTIRE GAME!!!';
            output.classList.add('green');
		}
		else if (userResult < computerResult){
			output.innerHTML = 'GAME OVER<br>COMPUTER WON THE ENTIRE GAME!!!';
            output.classList.add('red');
		}
		disableBtn();
	}
	
}

//zmiana stanu przycisków disable/enable
function disableBtn() {
	stoneBtn.disabled = true;
	paperBtn.disabled = true;
	scissorsBtn.disabled = true;
}
function enableBtn() {
	stoneBtn.disabled = false;
	paperBtn.disabled = false;
	scissorsBtn.disabled = false;
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
//wprowadzenie ilości gier
newGame.addEventListener('click', function() {
  gameNumbers = window.prompt('Set the Game Numbers to Win');
  gameNumbers = parseInt(gameNumbers);
  if (gameNumbers !== null && !isNaN(gameNumbers) && gameNumbers !== '') {
	reset();
	rounds.innerHTML = 'Rounds in the game: ' + gameNumbers;
  }
  else {
	//alert(msgError);
     modal.style.display = "block";
     modalClose(); 
      
  }	
});
// modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
function modalClose() {
  span.onclick = function() {
  modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }
}