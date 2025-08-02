'use strict';

// --- Element Selection ---
const messageEl = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
const numberEl = document.querySelector('.number');
const highscoreEl = document.querySelector('.highscore');
const guessEl = document.querySelector('.guess');
const bodyEl = document.querySelector('body');
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');

// --- Sound Effects ---
const winSound = document.getElementById('winSound');
const loseSound = document.getElementById('loseSound');
const guessSound = document.getElementById('guessSound');

// --- Game State Variables ---
let secretNumber;
let score;
let highScore = 0;
let isPlaying = true;
// ✨ FIX 1: New flag to handle browser audio autoplay policy
let audioUnlocked = false;

// --- Functions ---

// Initializes or resets the game to its starting state
const init = function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  isPlaying = true;

  messageEl.textContent = 'Start guessing...';
  scoreEl.textContent = score;
  numberEl.textContent = '?';
  guessEl.value = '';

  bodyEl.style.backgroundColor = '#222';
  numberEl.style.width = '15rem';
  bodyEl.classList.remove('win');
};

// A helper function to display messages to the player
const displayMessage = function (message) {
  messageEl.textContent = message;
};

// Handles the core logic when the player makes a guess
const handleGuess = function () {
  // ✨ FIX 1: This block unlocks audio on the very first click
  if (!audioUnlocked) {
    // This is a common trick to get around browser autoplay policies
    winSound.play();
    winSound.pause();
    loseSound.play();
    loseSound.pause();
    guessSound.play();
    guessSound.pause();
    audioUnlocked = true;
  }

  if (!isPlaying) return;

  const guess = Number(guessEl.value);

  // Case 1: No input
  if (!guess) {
    displayMessage('⛔ No number!');

    // Case 2: Player wins
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    numberEl.textContent = secretNumber;
    bodyEl.style.backgroundColor = '#60b347';
    numberEl.style.width = '30rem';
    bodyEl.classList.add('win');
    winSound.play(); // Play only the win sound
    isPlaying = false;

    if (score > highScore) {
      highScore = score;
      highscoreEl.textContent = highScore;
    }

    // Case 3: Guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // ✨ FIX 2: Guess sound now ONLY plays on a normal wrong guess
      guessSound.play();
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      score--;
      scoreEl.textContent = score;
      bodyEl.classList.add('shake');
      setTimeout(() => bodyEl.classList.remove('shake'), 500);
    } else {
      // Only the lose sound plays on the final guess
      displayMessage('💥 You lost the game!');
      scoreEl.textContent = 0;
      bodyEl.style.backgroundColor = '#e74c3c';
      loseSound.play();
      isPlaying = false;
    }
  }
};

// --- Event Listeners ---
checkBtn.addEventListener('click', handleGuess);
againBtn.addEventListener('click', init);

// Allows pressing the 'Enter' key to check the guess
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    handleGuess();
  }
});

// --- Initial Game Setup ---
init();