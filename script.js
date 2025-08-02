"use strict";

// --- Element Selection ---
const messageEl = document.querySelector(".message");
const scoreEl = document.querySelector(".score");
const numberEl = document.querySelector(".number");
const highscoreEl = document.querySelector(".highscore");
const guessEl = document.querySelector(".guess");
const bodyEl = document.querySelector("body");
const checkBtn = document.querySelector(".check");
const againBtn = document.querySelector(".again");

// --- Sound Effects ---
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");
const guessSound = document.getElementById("guessSound");

// --- Game State Variables ---
let secretNumber;
let score;
let highScore = 0;
let isPlaying = true;

// --- Functions ---
const init = function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  isPlaying = true;

  messageEl.textContent = "Start guessing...";
  scoreEl.textContent = score;
  numberEl.textContent = "?";
  guessEl.value = "";

  bodyEl.style.backgroundColor = "#222";
  numberEl.style.width = "15rem";
  bodyEl.classList.remove("win");
};

const displayMessage = function (message) {
  messageEl.textContent = message;
};

const handleGuess = function () {
  if (!isPlaying) return;

  const guess = Number(guessEl.value);
  guessSound.play();

  // No input
  if (!guess) {
    displayMessage("⛔ No number!");

    // Player wins
  } else if (guess === secretNumber) {
    displayMessage("🎉 Correct Number!");
    numberEl.textContent = secretNumber;
    bodyEl.style.backgroundColor = "#60b347"; // Use var(--color-primary) in real project
    numberEl.style.width = "30rem";
    bodyEl.classList.add("win");
    winSound.play();
    isPlaying = false;

    if (score > highScore) {
      highScore = score;
      highscoreEl.textContent = highScore;
    }

    // Guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
      score--;
      scoreEl.textContent = score;
      bodyEl.classList.add("shake");
      setTimeout(() => bodyEl.classList.remove("shake"), 500); // Remove class after animation
    } else {
      displayMessage("💥 You lost the game!");
      scoreEl.textContent = 0;
      bodyEl.style.backgroundColor = "#e74c3c"; // Lose color
      loseSound.play();
      isPlaying = false;
    }
  }
};

// --- Event Listeners ---
checkBtn.addEventListener("click", handleGuess);
againBtn.addEventListener("click", init);

// Allow pressing Enter key to check the guess
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    handleGuess();
  }
});

// --- Initial Game Setup ---
init();
