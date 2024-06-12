// script.js
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function startStopwatch() {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    startStopBtn.innerHTML = "Pause";
    running = true;
}

function pauseStopwatch() {
    clearInterval(tInterval);
    startStopBtn.innerHTML = "Start";
    running = false;
}

function resetStopwatch() {
    clearInterval(tInterval);
    display.innerHTML = "00:00:00.000";
    startStopBtn.innerHTML = "Start";
    running = false;
    lapCounter = 0;
    lapsContainer.innerHTML = "";
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('div');
        lapTime.innerText = `Lap ${lapCounter}: ${display.innerText}`;
        lapsContainer.appendChild(lapTime);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = difference % 1000;

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "00" + milliseconds : (milliseconds < 100) ? "0" + milliseconds : milliseconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

startStopBtn.addEventListener('click', () => {
    if (!running) {
        startStopwatch();
    } else {
        pauseStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
