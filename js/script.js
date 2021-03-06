"use strict";
//deklaracje zmiennych
var paperBtn = document.getElementById("paper");
var stoneBtn = document.getElementById("stone");
var scissorsBtn = document.getElementById("scissors");
var gameButtons = document.getElementsByClassName("btn");
var output = document.getElementById("itemOutput");
var resultOutput = document.getElementById("resultOutput");
var resultModalOutput = document.querySelector(".modal-scores-content-result");
var newGame = document.getElementById("newGameBtn");
var rounds = document.getElementById("rounds");
var modalRounds = document.querySelector(".modal-scores-content-round");
var modalHeader = document.querySelector(".modal-scores-header");
/*
var modalForm = document.querySelector("#modal-input-form");
var playerName = document.querySelector("#playerName");
var gameNumbers = document.querySelector("#gameNumbers");
*/
var paper = "paper";
var stone = "stone";
var scissors = "scissors";
var enableBtn = false;
var disableBtn = true;
var WON = "WON";
var LOST = "LOST";
var DRAW = "DRAW";
var playerName = '';

var params = {
  gameRounds: 0,
  userScore: 0,
  computerScore: 0,
  playerItem: "",
  computerItem: "",
  result: "",
  roundCounter: 0,
  progress: []
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
  output.innerHTML = "YOU " + params.result + ": <br>" + playerName + " played<strong> " + params.playerItem + ",</strong> computer played <strong>" + params.computerItem + "</strong>";
}

//funkcja icząca  ilośc wygranych i przegranych
function writeResultOutput() {
  if (params.result === WON) {
    params.userScore = params.userScore + 1;
  } else if (params.result === LOST) {
    params.computerScore = params.computerScore + 1;
  }
  var result = params.userScore + " : " + params.computerScore;
  resultOutput.innerHTML = result;
  document.querySelector(".modal-scores-content-score").innerHTML = params.userScore + " : " + params.computerScore;
}

//funkcja sprawdza warunki wygranej, wstawia wyniki do tablicy 'params.progress' i wywołuje pozostałe funkcje
function playerMove(move) {
  computerNumber();

  params.playerItem = move;
  params.roundCounter = params.roundCounter + 1;
  if (params.computerItem === params.playerItem) {
    params.result = DRAW;
  } else if ((params.computerItem === stone && params.playerItem === paper) || (params.computerItem === paper && params.playerItem === scissors) || (params.computerItem === scissors && params.playerItem === stone)) {
    params.result = WON;
  } else {
    params.result = LOST;
  }

  writeOutput();
  writeResultOutput();

  /*OBIEKT DO TABLICY  */
  params.progress.push({
    roundsNumber: params.roundCounter,
    playerChoice: params.playerItem,
    computerChoice: params.computerItem,
    roundScore: params.userScore + " : " + params.computerScore,
    roundResult: params.result
  });

  endGame();
}

//resetowanie liczników - nowa gra
function reset() {
  params.userScore = 0;
  params.computerScore = 0;
  params.result = "";
  params.roundCounter = 0;
  params.progress = [];
  writeResultOutput();
  output.innerHTML = "Choose your move - Click the Button above";
  disableEnableBtn(enableBtn);
  output.classList.remove("green", "red");
  
}

//licznik ilosci gier
function endGame() {
  if (params.gameRounds == params.userScore || params.gameRounds == params.computerScore) {
    modalHeader.innerHTML = "GAME OVER";
    modalRounds.innerHTML = "Rounds in the game: " + params.gameRounds;

    if (params.userScore > params.computerScore) {
      output.innerHTML = "GAME OVER<br>YOU WON THE ENTIRE GAME!!!";
      output.classList.add("green");
      resultModalOutput.innerHTML = "YOU WON THE ENTIRE GAME!!!";
      modalHeader.classList.add("greenHeader");
    } else if (params.userScore < params.computerScore) {
      output.innerHTML = "GAME OVER<br>COMPUTER WON THE ENTIRE GAME!!!";
      output.classList.add("red");
      resultModalOutput.innerHTML = "COMPUTER WON THE ENTIRE GAME!!!";
      modalHeader.classList.add("redHeader");
    }
    generateTable();
    disableEnableBtn(disableBtn);
    showModal("#modal-scores");
  }
}

//zmiana stanu przycisków disable/enable
function disableEnableBtn(state) {
  stoneBtn.disabled = state;
  paperBtn.disabled = state;
  scissorsBtn.disabled = state;
}

//obserwator zdarzeń z petlą
var playBtns = document.querySelectorAll(".player-move");
for (var i = 0; i < playBtns.length; i++) {
  playBtns[i].addEventListener("click", function(event) {
    var move = event.target.getAttribute("data-move");
    playerMove(move);
  });
}

//wprowadzenie ilości gier do okna modala
newGame.addEventListener("click", function() {
  showModal("#modal-input-form");
var form = document.querySelector('#startForm');
var number = document.getElementById('gameNumbers');
var player = document.getElementById('playerName');
form.reset();
form.addEventListener('submit', function (e) {
  e.preventDefault();
  document.querySelector("#modal-overlay").classList.remove("show");
  document.querySelector("#modal-input-form").classList.remove("show");
  params.gameRounds = number.value;
  var playerNameString = player.value;
  playerName = playerNameString.charAt(0).toUpperCase() + playerNameString.slice(1);
  if (params.gameRounds !== null && !isNaN(params.gameRounds) && params.gameRounds !== 0) {
    reset();
    rounds.innerHTML = "Rounds in the game: " + params.gameRounds;
  } else {
    showModal("#modal-error");
  }
});
});

/*__________________________ modal _________________________ */
var showModal = function(modalId) {
  document.querySelector("#modal-overlay").classList.add("show");
  document.querySelector(modalId).classList.add("show");
};

// funkcja zamykająca modal
var hideModal = function(event) {
  event.preventDefault();
  document.querySelector("#modal-overlay").classList.remove("show");
  var modals = document.querySelectorAll(".modal");
  for (i = 0; i < modals.length; i++) {
    modals[i].classList.remove("show");
  }
};

// obserwator zdarzeń na przycisku X
var closeButtons = document.querySelectorAll(".modal .close");
for (var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", hideModal);
}

//obserwator zdarzeń na overlayu
document.querySelector("#modal-overlay").addEventListener("click", hideModal);

//zatrzymanie propagacji
var modals = document.querySelectorAll(".modal");
for (var i = 0; i < modals.length; i++) {
  modals[i].addEventListener("click", function(event) {
    event.stopPropagation();
  });
}


/* ____________________________ Table ________________________________ */
var generateTable = function() {
  var html = "<table><tr><th>Round number</th><th>" + playerName + " move</th><th>Computer move</th><th>Resut</th><th>Result after round</th></tr>";
  for (var key in params.progress) {
    html =
      html +
      "<tr><td>" +
      params.progress[key].roundsNumber +
      "</td><td>" +
      params.progress[key].playerChoice +
      "</td><td>" +
      params.progress[key].computerChoice +
      "</td><td>" +
      params.progress[key].roundResult +
      "</td><td>" +
      params.progress[key].roundScore +
      "</td></tr>";
    document.querySelector(".modal-scores-content-table").innerHTML = html + "</table>";
  }
};
