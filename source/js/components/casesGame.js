import {
  fadeOut,
  removeCustomClass,
  addCustomClass
} from "../functions/customFunctions";

import { modalClickHandler } from "./modals";
import { modalHandler } from "./casesModal";
import vars from '../_vars';

const { overlay, parent } = vars;

if (parent) {
  const startBtns = parent.querySelectorAll(".start");
  const bottomMenu = parent.querySelector(".cases-app__bottom");
  const box = parent.querySelector(".cases-app__box");
  const cells = 31;

  // Вероятность от 0.001 до 100
  const items = [
    { name: "Diamond Amazon", img: "./img/case/img1.png", value: '24,297', chance: 10 },
    { name: "Albino Monkey", img: "./img/case/img2.png", value: '23,197', chance: 25 },
    { name: "Guardian Lion", img: "./img/case/img3.png", value: '25,354', chance: 30 },
    { name: "Koala", img: "./img/case/img4.png", value: '23,334', chance: 40 },
    { name: "Toy Monkey", img: "./img/case/img5.png", value: '32,545', chance: 30 },
    { name: "Karate Gorilla", img: "./img/case/img6.png", value: '14,131', chance: 35 },
  ];

  function getItem() {
    let item;

    while (!item) {
      const chance = Math.floor(Math.random() * 100);

      items.forEach((elm) => {
        if (chance < elm.chance && !item) item = elm;
      });
    }

    return item;
  }

  function generateCardHTML(item) {
    return `
      <div class="case-card case-card--game">
        <div class="case-card__box">
          <div class="case-card__image">
            <img width='100' height='100' src='${item.img}' alt='image'>
          </div>
          <div class="chars">
            <div class="chars__icon">
              <img width='20' height='20' src='img/case/m.png' alt='image'>
            </div>
            <div class="chars__icon">
              <img width='20' height='20' src='img/case/f.png' alt='image'>
            </div>
            <div class="chars__icon">
              <img width='20' height='20' src='img/case/r.png' alt='image'>
            </div>
          </div>
        </div>
        <span class="case-card__title">${item.name}</span>
      </div>
    `;
  }

  function generateList() {
    const ul = document.createElement("ul");
    ul.classList.add("cases-app__list");

    for (let i = 0; i < cells; i++) {
      const item = getItem();
      const li = document.createElement("li");
      li.setAttribute("data-item", JSON.stringify(item));
      li.classList.add("cases-app__list-item");
      li.innerHTML = generateCardHTML(item);
      ul.append(li);
    }

    return ul;
  }

  function generateRow() {
    const row = document.createElement("div");
    row.classList.add("cases-app__row");
    const pointer = document.createElement("span");
    pointer.classList.add("cases-app__pointer");
    row.append(pointer);
    row.append(generateList());
  
    return row;
  }

  function generateItems(count) {
    box.innerHTML = "";
    for (let i = 0; i < count; i++) {
      box.append(generateRow());
    }
  }

  let isStarted = false;
  let selectedCheckboxNumber = 1;

  function start() {
    if (isStarted) return;
    isStarted = true;

    generateItems(selectedCheckboxNumber);
    updateGridColumns(selectedCheckboxNumber);

    setTimeout(() => {
      const lists = document.querySelectorAll(".cases-app__list");
      const selectedItems = [];

      lists.forEach(function (list) {
        setTimeout(() => {
          list.style.left = "50%";
          list.style.transform = "translate3d(-50%, 0, 0)";
        }, 100);

        const item = list.querySelectorAll("li")[15];
        const data = JSON.parse(item.getAttribute("data-item"));
        selectedItems.push(data);

        list.addEventListener(
          "transitionend",
          () => {
            isStarted = false;
            item.classList.add("active");
            modalClickHandler(bottomMenu, 'win');
            modalHandler(overlay, selectedItems);
          },
          { once: true }
        );
      });
    }, 0);
  }

  startBtns &&
    startBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        removeCustomClass(parent, "block");
        fadeOut(bottomMenu, 0);
        start();
        addCustomClass(parent, "active");
      });
    });

  function getSelectedCheckbox(box) {
    const checkboxes = box.querySelectorAll('input[name="open_currency"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const selectedNumber = checkbox.id.replace("x", "");
        selectedCheckboxNumber = parseInt(selectedNumber, 10);
      }
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          const selectedNumber = checkbox.id.replace("x", "");
          selectedCheckboxNumber = parseInt(selectedNumber, 10);
        }
      });
    });
  }

  function updateGridColumns(number) {
    if (number === 4) {
      box.style.gridTemplateColumns = `repeat(2, 1fr)`;
      removeCustomClass(box, 'mode');
    } else if (number === 5) {
      box.style.gridTemplateColumns = `repeat(3, 1fr)`;
      wrapLastTwoListsInInner();
      removeCustomClass(box, 'mode');
    } else if (number === 1) {
      addCustomClass(box, 'mode');
      box.style.gridTemplateColumns = `100%`;
    } else {
      box.style.gridTemplateColumns = `repeat(${number}, 1fr)`;
      removeCustomClass(box, 'mode');
    }
  }

  function wrapLastTwoListsInInner() {
    const rows = box.querySelectorAll(".cases-app__row");
    if (rows.length >= 2) {
      const inner = document.createElement("div");
      inner.classList.add("cases-app__inner");
      const lastTwoRows = Array.from(rows).slice(-2);
      lastTwoRows.forEach((row) => inner.appendChild(row));
      box.appendChild(inner);
    }
  }

  getSelectedCheckbox(parent);
  generateItems(selectedCheckboxNumber);
  updateGridColumns(selectedCheckboxNumber);
}
