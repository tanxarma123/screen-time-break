// sounds setup
const sounds = {
  rain: new Audio("assets/sounds/rain.mp3"),
  waves: new Audio("assets/sounds/waves.mp3"),
  focus: new Audio("assets/sounds/focus.mp3"),
};

function playSound(type) {
  stopAllSounds();
  sounds[type].loop = true;
  sounds[type].play();
}

function stopAllSounds() {
  for (let sound in sounds) {
    sounds[sound].pause();
    sounds[sound].currentTime = 0;
  }
}

// quote rotation
const quotes = [
  { text: "Time is what we want most, but what we use worst.", author: "William Penn" },
  { text: "You will never find time for anything. If you want time, you must make it.", author: "Charles Buxton" },
  { text: "The key is in not spending time, but in investing it.", author: "Stephen R. Covey" },
  { text: "Lost time is never found again.", author: "Benjamin Franklin" },
  { text: "Time stays long enough for those who use it well.", author: "Leonardo da Vinci" }
];

function rotateQuote() {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote").textContent = `"${random.text}"`;
  document.getElementById("author").textContent = `— ${random.author}`;
}

setInterval(rotateQuote, 10000); // every 10s

// timer logic
let timer;
let duration = 5 * 60; // default 5 minutes
let remaining = duration;

function updateDisplay() {
  const minutes = Math.floor(remaining / 60).toString().padStart(2, "0");
  const seconds = (remaining % 60).toString().padStart(2, "0");
  document.getElementById("time-display").textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (remaining > 0) {
      remaining--;
      updateDisplay();
    } else {
      clearInterval(timer);
      stopAllSounds();
      alert("Break finished! Time to get back.");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  remaining = duration;
  updateDisplay();
}

function setDuration(minutes) {
  clearInterval(timer);
  duration = parseInt(minutes) * 60;
  remaining = duration;
  updateDisplay();
}

// run on load
window.onload = () => {
  updateDisplay();
  rotateQuote();
};
