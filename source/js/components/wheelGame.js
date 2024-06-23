import {
  removeCustomClass,
  addCustomClass,
} from "../functions/customFunctions";

import { getValueBet } from "./gameCalc";

const wheelParent = document.querySelector("[data-parent-wheel]");

if (wheelParent) {
  const gameCalc = document.querySelector(".game-calc");
  const input = document.querySelector(".game-bet__label.bet input");
  const betBtns = document.querySelectorAll(".game-bet .bet-btn");
  const startBtn = document.querySelector("[data-start]");
  const inputs = document.querySelectorAll('input[name="wheel_currency"]');
  const historyList = document.querySelector(".wheel-history");
  const pointer = document.querySelector(".wheel-box__pointer");
  const betItems = document.querySelectorAll("[data-rate]");
  const time = document.querySelector('.wheel-app__time');

  let gameEnd = true;
  input.value = "0";
  time.textContent = "00:05";

  let selectedValue = 1;
  const defaultCheckedInput = document.querySelector('.wheel-btn input:checked');
  if (defaultCheckedInput) {
    const match = defaultCheckedInput.id.match(/\d+/);
    selectedValue = match ? parseInt(match[0], 10) : 1;
  }

  function updateSelectedValue() {
    const checkedInput = document.querySelector('.wheel-btn input:checked');
    if (checkedInput) {
      const match = checkedInput.id.match(/\d+/);
      selectedValue = match ? parseInt(match[0], 10) : 1;
    }
  }

  input.addEventListener('input', () => {
    input.value = parseFloat(input.value);
  });

  inputs.forEach(input => {
    input.addEventListener('change', () => {
      updateSelectedValue();
    });
  });

  getValueBet(input, betBtns);

  function handleInput(inputs) {
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        if (input.value === "0") input.value = "";
      });

      input.addEventListener("blur", () => {
        if (input.value === "") input.value = "0";
      });
    });
  }

  handleInput(gameCalc.querySelectorAll(".game-bet__label input"));

  function checkInputs() {
    let isError = false;

    if (input.value === "0") {
      addCustomClass(input.parentNode, "error");
      isError = true;
    } else {
      removeCustomClass(input.parentNode, "error");
    }

    return isError;
  }

  function enableInputs() {
    input.removeAttribute("disabled");
    inputs.forEach(input => input.removeAttribute('disabled'));
    startBtn.removeAttribute("disabled");
    betBtns.forEach((btn) => btn.removeAttribute("disabled"));
  }

  function disableInputs() {
    input.setAttribute("disabled", "true");
    inputs.forEach(input => input.setAttribute("disabled", "true"));
    startBtn.setAttribute("disabled", "true");
    betBtns.forEach((btn) => btn.setAttribute("disabled", "true"));
  }

  function addBallToHistory(color) {
    const item = document.createElement('li');
    item.classList.add('wheel-history__item');
    const img = document.createElement('img');
    img.width = 'clamp(16px, 1.0417vw, 20px)';
    img.height = 'clamp(16px, 1.0417vw, 20px)';
    img.src = `./img/cabinet/bet-${color}.png`;
    img.alt = "image";
    item.appendChild(img);

    historyList.insertBefore(item, historyList.firstChild);
  }

  const balls = [
    "blue", "green", "blue", "green", "blue", "orange", "blue", "green", "blue", "green",
    "blue", "green", "blue", "green", "blue", "orange", "blue", "green", "blue", "green",
    "blue", "red", "blue", "orange", "blue", "green", "blue", "green", "blue", "green",
    "blue", "orange", "blue", "green", "blue", "orange", "blue", "green", "blue", "orange",
    "blue", "green", "blue", "orange", "blue", "green", "blue", "red", "orange", "green"
  ];

  let currentRotation = 0;

  function animateWheel() {
    const totalSectors = balls.length;
    const degreePerSector = 360 / totalSectors; 
    const randomSector = Math.floor(Math.random() * totalSectors);
    const randomDegree = Math.round(randomSector * degreePerSector) + 1080; 

    currentRotation += randomDegree;

    pointer.style.transition = 'transform 3s ease-out';
    pointer.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;

    setTimeout(() => {
      const selectedBall = balls[randomSector];
      addBallToHistory(selectedBall);
      handleBetItems(selectedBall);
      gameEnd = true;
      enableInputs();
      startBtn.textContent = 'НАЧАТЬ ИГРУ';
    }, 3000);
  }

  function handleBetItems(selectedBall) {
    betItems.forEach(item => {
      removeCustomClass(item, 'mode');

      if (selectedBall) {
        if (item.getAttribute('data-rate') === selectedBall) {
          addCustomClass(item, 'mode');
          removeCustomClass(item, 'active');
        } else {
          addCustomClass(item, 'active');
        }
      } else {
        removeCustomClass(item, 'active');
      }
    });
  }

  function startTimer(duration, valueDisplay, callback) {
    let timer = duration;
    valueDisplay.textContent = `00:0${timer}`;

    const interval = setInterval(() => {
      timer -= 1;
   
      if (timer <= 0) {
        clearInterval(interval);
        valueDisplay.textContent = "00:00";
        callback();
      } else {
        valueDisplay.textContent = `00:0${timer}`;
      }
    }, 1000);
  }

  if (!wheelParent.classList.contains("log-out")) {
    startBtn.addEventListener("click", () => {
      if (!gameEnd) {
        return;
      }

      const hasError = checkInputs();
      if (hasError) {
        gameEnd = true;
        return;
      }

      gameEnd = false; 
      handleBetItems('');
      disableInputs();
      startBtn.textContent = 'В ИГРЕ';

      startTimer(5, time, () => {
        animateWheel();
      });
    });
  }
}
