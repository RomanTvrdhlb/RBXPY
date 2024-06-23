import {
  removeCustomClass,
  addCustomClass,
} from "../functions/customFunctions";
import { getValueBet } from "./gameCalc";

const crashParent = document.querySelector(".crash-app");

if (crashParent) {
  const gameCalc = crashParent.querySelector(".game-calc");
  const input = gameCalc.querySelector(".game-bet__label.bet input");
  const inputStop = gameCalc.querySelector(".game-bet__label.stop input");
  const betBtns = gameCalc.querySelectorAll(".game-bet .bet-btn");
  const startBtn = crashParent.querySelector("[data-start]");
  const betValue = crashParent.querySelector(".crash-app__profit");
  const betText = crashParent.querySelector(".crash-app__text");
  const historyList = crashParent.querySelector(".crash-app__history");

  const betInfo = crashParent.querySelector(".crash-app__info");
  const rocket = crashParent.querySelector(".crash-app__rocket");
  const stars = crashParent.querySelector(".crash-app__stars");
  const cloud = crashParent.querySelector(".crash-app__cloud");
  const blast = crashParent.querySelector(".crash-app__blast");

  let gameEnd = false;
  let bet = parseFloat(input.value);

  input.value = "0";
  betText.textContent = "Начало через...";
  betValue.textContent = "0.05";

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

  function startTimer(duration, valueDisplay) {
    let timer = duration;
    valueDisplay.textContent = timer.toFixed(2);

    const interval = setInterval(() => {
      timer -= 0.01;
      if (timer < 0) timer = 0;

      valueDisplay.textContent = timer.toFixed(2);

      if (timer <= 0) {
        clearInterval(interval);
        valueDisplay.textContent = "0.00";
        startIncrementingValue(valueDisplay, parseFloat(inputStop.value));
        betText.textContent = "Летим...";
        addCustomClass(rocket, "active");
        addCustomClass(stars, "active");
        addCustomClass(cloud, "active");
      }
    }, 1000);
  }

  function getSpeedForValue(value) {
    if (value < 1.3) return 100;
    if (value < 1.5) return 98;
    if (value < 2) return 97;
    if (value < 3) return 90;
    if (value < 4) return 80;
    if (value < 6) return 60;
    return 50;
  }

  function startIncrementingValue(valueDisplay, stopValue) {
    let value = 1.0;
    let speed = getSpeedForValue(value);

    const increment = () => {
      value += 0.01;
      valueDisplay.textContent = "x" + value.toFixed(2);

      if (stopValue !== 0 && value >= stopValue) {
        clearTimeout(incrementInterval);
        valueDisplay.textContent = "x" + stopValue.toFixed(2);
        endGame(value);
        return;
      }

      if (Math.random() < 0.01) {
        clearTimeout(incrementInterval);
        endGame(value);
        return;
      }

      speed = getSpeedForValue(value);
      incrementInterval = setTimeout(increment, speed);
    };

    let incrementInterval = setTimeout(increment, speed);
  }

  function endGame(value) {
    addCustomClass(rocket, "stop");
    removeCustomClass(rocket, "active");
    removeCustomClass(stars, "active");
    addCustomClass(blast, "active");
    addCustomClass(betInfo, "stop");
    betText.textContent = "Стоп...";
    bet = (parseFloat(input.value) * value).toFixed(2);
    console.log("Bet:", bet);
    addToHistory(value);
    enableInputs();
    gameEnd = true;
  }

  function addToHistory(value) {
    const historyItem = document.createElement("li");
    historyItem.classList.add("crash-app__item");

    const betSpan = document.createElement("span");
    betSpan.classList.add("crash-app__bet");
    betSpan.textContent = "x" + value.toFixed(2);

    if (value < 1.3) betSpan.classList.add("red");
    else if (value < 1.5) betSpan.classList.add("orange");
    else if (value < 2) betSpan.classList.add("yellow");
    else if (value < 3) betSpan.classList.add("green");
    else betSpan.classList.add("violet");

    historyItem.appendChild(betSpan);
    historyList.insertBefore(historyItem, historyList.firstChild);
  }

  function enableInputs() {
    input.removeAttribute("disabled");
    inputStop.removeAttribute("disabled");
    startBtn.removeAttribute("disabled");
    betBtns.forEach((btn) => btn.removeAttribute("disabled"));
  }

  if (!crashParent.classList.contains("log-out")) {
    startBtn.addEventListener("click", () => {
      removeCustomClass(rocket, "stop");
      removeCustomClass(rocket, "active");
      removeCustomClass(stars, "active");
      removeCustomClass(cloud, "active");
      removeCustomClass(blast, "active");
      removeCustomClass(betInfo, "stop");
      betText.textContent = "Начало через...";

      if (gameEnd) {
        enableInputs();
        gameEnd = false;
      }

      bet = parseFloat(input.value);

      const hasError = checkInputs();
      if (!hasError) {
        input.setAttribute("disabled", "true");
        inputStop.setAttribute("disabled", "true");
        startBtn.setAttribute("disabled", "true");
        betBtns.forEach((btn) => btn.setAttribute("disabled", "true"));
        startTimer(0.05, betValue, betText);
      }
    });
  }
}