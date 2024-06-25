import {
  removeCustomClass,
  addCustomClass,
  addClassInArray,
  removeClassInArray
} from "../functions/customFunctions";

const parent = document.querySelector(".jackpot-app");
import { getValueBet } from "./gameCalc";

if (parent) {
  const cells = 31;
  const gameCalc = parent.querySelector('.game-calc');
  const startBtn = parent.querySelector("[data-start]");
  const input = gameCalc.querySelector('.game-bet__label input');
  const betBtns = gameCalc.querySelectorAll('.game-bet .bet-btn');
  const betValue = gameCalc.querySelector('[data-value]');

  const text = parent.querySelector('.jackpot-app__text');
  const name = parent.querySelector('.jackpot-app__name');
  const timer = parent.querySelector('.jackpot-app__timer');
  const time = parent.querySelector('.jackpot-app__time');
  const ticket = parent.querySelector('[data-ticket]');
  const percent = parent.querySelector('[data-percent]');
  const bet = parent.querySelector('[data-value-bet]');
  const content = parent.querySelector('.jackpot-app__content');
  const bottomMenu = parent.querySelector('.jackpot-app__bottom');
  const top = parent.querySelector('.jackpot-app__top');

  name.innerHTML = 'Для начала игры нужны двое';
  text.innerHTML = 'Ожидание';
  time.innerHTML = '00:05';
  addCustomClass(timer, 'active');

  const items = [
    { name: "ArduinoBoy", img: "./img/cabinet/ava.png", value: '300', percent: 98.3, chance: 10, ticket: '156' },
    { name: "ArduinoBoy2", img: "./img/cabinet/ava.png", value: '350', percent: 94.3, chance: 25, ticket: '621' },
    { name: "ArduinoBoy3", img: "./img/cabinet/ava.png", value: '400', percent: 95.3, chance: 30, ticket: '125' },
    { name: "ArduinoBoy4", img: "./img/cabinet/ava.png", value: '500', percent: 96.3, chance: 40, ticket: '344' },
    { name: "ArduinoBoy5", img: "./img/cabinet/ava.png", value: '600', percent: 97.3, chance: 30, ticket: '561' },
    { name: "ArduinoBoy6", img: "./img/cabinet/ava.png", value: '250', percent: 93.3, chance: 35, ticket: '783' },
  ];

  getValueBet(input, betBtns);

  function getItem() {
    let item;

    while (!item) {
      const chance = Math.floor(Math.random() * 100);

      items.forEach(elm => {
        if (chance < elm.chance && !item) item = elm;
      });
    }

    return item;
  }

  function generateCardHTML(item) {
    return `
      <div class="jackpot-card">
          <img width='100' height='100' src='${item.img}' alt='image'>
          <span class='jackpot-card__bet'>${item.value}</span>
          <span class='jackpot-card__percent'>${item.percent}%</span>
      </div>
    `;
  }

  function generateItems() {
    const oldList = document.querySelector('.jackpot-app__list');
    if (oldList) {
      oldList.remove();
    }

    document.querySelector('.jackpot-app__content').innerHTML = `
      <ul class="jackpot-app__list"></ul>
    `;

    const list = document.querySelector('.jackpot-app__list');

    for (let i = 0; i < cells; i++) {
      const item = getItem();

      const li = document.createElement('li');
      li.setAttribute('data-item', JSON.stringify(item));
      li.classList.add('jackpot-app__item');
      li.innerHTML = generateCardHTML(item);

      list.append(li);
    }
  }

  generateItems();

  let isStarted = false;
  let isFirstStart = true;

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

  function resetGame() {
    name.innerHTML = 'Для начала игры нужны двое';
    text.innerHTML = 'Ожидание';
    time.innerHTML = '00:05';
    ticket.innerHTML = '';
    percent.innerHTML = '';
    bet.innerHTML = '';
    removeCustomClass(timer, 'active');
    removeCustomClass(top, 'active');
    removeCustomClass(name, 'active');
    removeCustomClass(text, 'active');
    removeCustomClass(content, 'active');
    removeCustomClass(bottomMenu, 'active');
    generateItems();
  }

  function start() {
    if (isStarted) return;
    isStarted = true;

    if (!isFirstStart) {
      generateItems();
    } else {
      isFirstStart = false;
    }

    const list = document.querySelector('.jackpot-app__list');
    const bets = list.querySelectorAll('.jackpot-card__bet');
    const percents = list.querySelectorAll('.jackpot-card__percent');

    setTimeout(() => {
      addClassInArray(bets, 'active');
      addClassInArray(percents, 'active');

      list.style.left = '50%';
      list.style.transform = 'translate3d(-50%, 0, 0)';

      const cards = document.querySelectorAll('.jackpot-card');
      addClassInArray(cards, 'active');
    }, 0);

    const item = list.querySelectorAll('li')[15];

    list.addEventListener('transitionend', () => {
      isStarted = false;
      item.classList.add('active');
      const data = JSON.parse(item.getAttribute('data-item'));
      
      ticket.innerHTML = '#' + data.ticket;
      percent.innerHTML = data.percent + '%';
      bet.innerHTML = data.value;
      addCustomClass(bottomMenu, 'active');
      name.innerHTML = `${data.name}`;
      text.innerHTML = 'Победитель';
      enableInputs();

      const allItems = list.querySelectorAll('li');
      allItems.forEach((el) => {
        if (el !== item) {
          addCustomClass(el, 'active');
        }
      });
      removeCustomClass(item, 'active');
    }, { once: true });
  }

  function startCountdown(callback) {
    let countdown = 5;
    const interval = setInterval(() => {
      if (countdown >= 0) {
        time.innerHTML = `00:0${countdown}`;
        if (countdown === 0) {
          clearInterval(interval);
          addCustomClass(timer, 'active');
          addCustomClass(top, 'active');
          removeCustomClass(name, 'active');
          removeCustomClass(text, 'active');
          name.innerHTML = 'Выбираем победителя';
          text.innerHTML = 'Крутится';
          
          callback();

          const list = document.querySelector('.jackpot-app__list');
          const cards = list.querySelectorAll('.jackpot-card');
          addClassInArray(cards, 'active');
        }
        countdown--;
      }
    }, 1000);
  }

  if (!parent.classList.contains("log-out")) {
    startBtn.addEventListener('click', function (e) {
      e.preventDefault();
      
      if (parent.classList.contains('log-out')) {
        return;
      }
      
      if (checkInputs()) return;

      disableInputs();
      resetGame();
    
      addCustomClass(name, 'active');
      addCustomClass(text, 'active');
      removeCustomClass(timer, 'active');
    
      betValue.innerHTML = input.value;
      addCustomClass(content, 'active');

      startCountdown(start);
    });
  }
}
