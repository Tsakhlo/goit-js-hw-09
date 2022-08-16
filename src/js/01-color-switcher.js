const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector("body");

const disabledButton = () => {
    startButton.disabled = true;
};

const undisabledButton = () => {
    startButton.disabled = false;
};

startButton.addEventListener("click", () => {
  timerId = setInterval(() => {
   changeColor() ;
  }, 1000);
    disabledButton();
});

let timerId = null;

stopButton.addEventListener("click", () => {
    clearInterval(timerId);
     undisabledButton();
});

function changeColor(event) {
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
