let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 10);
        startStopBtn.textContent = "Pause";
        running = true;
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.textContent = "Start";
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startStopBtn.textContent = "Start";
    minutesDisplay.textContent = "00";
    secondsDisplay.textContent = "00";
    millisecondsDisplay.textContent = "00";
    laps = [];
    updateLaps();
}

function lap() {
    if (running) {
        laps.push(minutesDisplay.textContent + ":" + secondsDisplay.textContent + ":" + millisecondsDisplay.textContent);
        updateLaps();
    }
}

function updateLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(lapItem);
    });
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    minutesDisplay.textContent = (minutes < 10) ? "0" + minutes : minutes;
    secondsDisplay.textContent = (seconds < 10) ? "0" + seconds : seconds;
    millisecondsDisplay.textContent = (milliseconds < 10) ? "0" + milliseconds : milliseconds;
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
