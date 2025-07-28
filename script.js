// 🔊 Sound setup
const sounds = {
  rain: new Audio("assets/sounds/rain.mp3"),
  waves: new Audio("assets/sounds/waves.mp3"),
  focus: new Audio("assets/sounds/focus.mp3"),
};

function playSound(type) {
  stopAllSounds();
  if (sounds[type]) {
    sounds[type].loop = true;
    sounds[type].play();
  }
}

function stopAllSounds() {
  for (let key in sounds) {
    sounds[key].pause();
    sounds[key].currentTime = 0;
  }
}

// ⏱️ Timer setup
let timer;
let timeLeft = 300; // default 5 min

function setDuration(minutes) {
  timeLeft = minutes * 60;
  updateDisplay();
  resetTimer();
}

function updateDisplay() {
  const mins = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const secs = (timeLeft % 60).toString().padStart(2, "0");
  document.getElementById("time-display").textContent = `${mins}:${secs}`;
}

function startTimer() {
  if (timer) return; // avoid multiple intervals
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      timer = null;
      alert("Break time is over! 🌟");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  updateDisplay();
}

// 🧘 Rotating Quotes
const quotes = [
  { text: "The key is in not spending time, but in investing it.", author: "Stephen R. Covey" },
  { text: "You will never find time for anything. If you want time, you must make it.", author: "Charles Buxton" },
  { text: "Time is what we want most, but what we use worst.", author: "William Penn" },
  { text: "Don’t count every hour in the day, make every hour in the day count.", author: "Anonymous" },
  { text: "Almost everything will work again if you unplug it for a few minutes. Including you.", author: "Anne Lamott" },
  { text: "Your future is created by what you do today, not tomorrow.", author: "Robert Kiyosaki" }
];

function rotateQuotes() {
  const quoteEl = document.getElementById("quote");
  const authorEl = document.getElementById("author");

  let index = 0;

  setInterval(() => {
    index = (index + 1) % quotes.length;
    quoteEl.style.opacity = 0;

    setTimeout(() => {
      quoteEl.textContent = `"${quotes[index].text}"`;
      authorEl.textContent = `— ${quotes[index].author}`;
      quoteEl.style.opacity = 1;
    }, 400);
  }, 15000); // change quote every 15 seconds
}

// ✅ Service worker for future PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").then(() => {
      console.log("Service Worker Registered");
    });
  });
}

// ✅ Run setup on page load
window.onload = () => {
  updateDisplay();
  rotateQuotes();
};
