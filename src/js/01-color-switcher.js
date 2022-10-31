const btnStart = document.querySelector("[data-start]");
const btnStop = document.querySelector("[data-stop]");

let intervalId = null;
const TIME_RELOAD_COLOR = 1000;
btnStop.disabled = true;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStart() {
    intervalId = setInterval(() => {
        document.body.style.background = getRandomHexColor();
    }, TIME_RELOAD_COLOR);
    btnStart.disabled = true;
    btnStop.disabled = false;
}
function onStop() {
    clearInterval(intervalId);
    btnStart.disabled = false;
    btnStop.disabled = true;
}
btnStart.addEventListener("click", onStart);
btnStop.addEventListener("click", onStop);
