"use strict";
//deklaracje zmiennych
var paperBtn = document.getElementById("paper");
var stoneBtn = document.getElementById("stone");
var scissorsBtn = document.getElementById("scissors");
var gameButtons = document.getElementsByClassName("btn");
var output = document.getElementById("itemOutput");
var resultOutput = document.getElementById("resultOutput");
var newGame = document.getElementById("newGameBtn");
var rounds = document.getElementById("rounds");
//var result;
//var playerItem;
//var computerItem;
var paper = "paper";
var stone = "stone";
var scissors = "scissors";
//var userResult = 0;
//var computerResult = 0;
//var gameRounds = 0;
var enableBtn = false;
var disableBtn = true;
var WON = "WON";
var LOST = "LOST";
var DRAW = "DRAW";


var params = {
  gameRounds: 0,
  userResult: 0,
  computerResult: 0,
  playerItem: "",
  computerItem: "",
  result: "",
  progress: [],
};

// funkcja generująca losowy nr 1-3 i przypisująca mu nazwę ruchu
function computerNumber() {
  var randomNumber = Math.floor(Math.random() * 3 + 1);
  if (randomNumber === 1) {
    params.computerItem = paper;
  } else if (randomNumber === 2) {
    params.computerItem = stone;
  } else if (randomNumber === 3) {
    params.computerItem = scissors;
  }
}

//funkcja zwracająca rezultat rundy
function writeOutput(playerItem) {
  output.innerHTML =
    "YOU " + params.result + ": <br>You played<strong> " + params.playerItem + ",</strong> computer played <strong>" + params.computerItem +'</strong>';
}

//funkcja icząca  ilośc wygranych i przegranych
function writeResultOutput() {
  if (params.result === WON) {
    params.userResult = params.userResult + 1;
  } else if (params.result === LOST) {
    params.computerResult = params.computerResult + 1;
  }
  resultOutput.innerHTML = params.userResult + " : " + params.computerResult;
}

//funkcja sprawdza warunki wygranej i wywołuje pozostałe funkcje
function playerMove() {
  computerNumber();

  var clickedItem = event.target;
  params.playerItem = clickedItem.getAttribute('data-move');
  if (params.computerItem === params.playerItem) {
    params.result = DRAW;
  } else if (
    (params.computerItem === stone && params.playerItem === paper) ||
    (params.computerItem === paper && params.playerItem === scissors) ||
    (params.computerItem === scissors && params.playerItem === stone)
  ) {
    params.result = WON;
  } else {
    params.result = LOST;
  }
  writeOutput();
  writeResultOutput();
  endGame();
}

//resetowanie liczników - nowa gra
function reset() {
  params.userResult = 0;
  params.computerResult = 0;
  params.result = 0;
  writeResultOutput();
  output.innerHTML = "Choose your move - Click the Button above";
  disableEnableBtn(enableBtn);
  output.classList.remove("green", "red");
}

//licznik ilosci gier
function endGame() {
  if (params.gameRounds == params.userResult || params.gameRounds == params.computerResult) {
    output.innerHTML = "GAME OVER";

    if (params.userResult > params.computerResult) {
      output.innerHTML = "GAME OVER<br>YOU WON THE ENTIRE GAME!!!";
      output.classList.add("green");
    } else if (params.userResult < params.computerResult) {
      output.innerHTML = "GAME OVER<br>COMPUTER WON THE ENTIRE GAME!!!";
      output.classList.add("red");
    }
    disableEnableBtn(disableBtn);
  }
}

//zmiana stanu przycisków disable/enable
function disableEnableBtn(state) {
  stoneBtn.disabled = state;
  paperBtn.disabled = state;
  scissorsBtn.disabled = state;
}

//obserwatory zdarzeń
/*
paperBtn.addEventListener("click", function() {
  playerMove(paper);
});
stoneBtn.addEventListener("click", function() {
  playerMove(stone);
});
scissorsBtn.addEventListener("click", function() {
  playerMove(scissors);
});
*/
//obserwator zdarzeń z petlą
var playBtns = document.querySelectorAll('.player-move');
  for (var i = 0; i < playBtns.length; i++ ) {
    playBtns[i].addEventListener('click', playerMove);
  }

//wprowadzenie ilości gier
newGame.addEventListener("click", function() {
  params.gameRounds = window.prompt("Set the Game Numbers to Win");
  params.gameRounds = parseInt(params.gameRounds);
  if (params.gameRounds !== null && !isNaN(params.gameRounds) && params.gameRounds !== "") {
    reset();
    rounds.innerHTML = "Rounds in the game: " + params.gameRounds;
  } else {
    //alert(msgError);
    modal.style.display = "block";
    modalClose();
  }
});

// modal
var modal = document.getElementById("modal");
var span = document.getElementsByClassName("close")[0];
function modalClose() {
  span.onclick = function() {
    modal.style.display = "none";
  };
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
