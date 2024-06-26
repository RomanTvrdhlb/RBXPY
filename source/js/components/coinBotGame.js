import {
  removeCustomClass,
  addCustomClass,
  addClassInArray,
  removeClassInArray
} from "../functions/customFunctions";
import { getValueBet } from "./gameCalc";

const parent = document.querySelector("[data-flip-game]");

if (parent) {
  const gameCalc = parent.querySelector('.game-calc');
  const startBtn = parent.querySelector("[data-start]");
  const input = gameCalc.querySelector('.game-bet__label input');
  const betBtns = gameCalc.querySelectorAll('.game-bet .bet-btn');
  const coin = parent.querySelector('.flip-app__coin');
  const icon = parent.querySelector('.flip-app__icon');
  const content = parent.querySelector('.flip-app__content');
  
  const kandaraRadio = parent.querySelector('#kandara');
  const vellionRadio = parent.querySelector('#vellion');
  
  getValueBet(input, betBtns);

  let isStarted = false;
  let isFirstStart = true;
  let totalFlips = 0;
  let currentSide = 0;

  function checkInputs() {
    let isError = false;

    if (input.value === "0" || input.value === "") {
      addCustomClass(input.parentNode, "error");
      isError = true;
    } else {
      removeCustomClass(input.parentNode, "error");
    }

    return isError;
  }

  function enableInputs() {
    input.removeAttribute("disabled");
    betBtns.forEach((btn) => btn.removeAttribute("disabled"));
    startBtn.removeAttribute("disabled");
  }

  function disableInputs() {
    input.setAttribute("disabled", "true");
    betBtns.forEach((btn) => btn.setAttribute("disabled", "true"));
    startBtn.setAttribute("disabled", "true");
  }

  let totalAngle = 0;

  function flipCoin() {
    const flipCount = Math.floor(Math.random() * 3) + 5;
    const baseAngle = 360 * flipCount;
    totalFlips += flipCount;

    const result = totalFlips % 2;

    totalAngle += baseAngle;

    const finalAngle = totalAngle + (result === 0 ? 0 : 180);

    coin.style.transform = `rotateY(${finalAngle}deg)`;
    addCustomClass(icon, 'active');
    addCustomClass(coin, 'active');
    addCustomClass(content, 'bounce');
    // content.classList.add('bounce');

    const selectedSide = kandaraRadio.checked ? 'Kandara' : 'Vellion';

    setTimeout(() => {
      const winningSide = result === 0 ? 'Kandara' : 'Vellion';
      const didWin = selectedSide === winningSide;

      console.log(`Результат: ${winningSide}`);
      console.log(`Вы выбрали: ${selectedSide}`);
      console.log(`Вы ${didWin ? 'выиграли' : 'проиграли'}!`);

      content.classList.remove('bounce');

      enableInputs();
      isStarted = false;
    }, 2000);
  }

  if (!parent.classList.contains("log-out")) {
    startBtn.addEventListener('click', function (e) {
      e.preventDefault();

      if (parent.classList.contains('log-out')) {
        return;
      }

      if (checkInputs()) return;

      disableInputs();
      flipCoin();
    });
  }
}
