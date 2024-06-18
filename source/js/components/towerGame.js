import {
    fadeOut,
    removeCustomClass,
    addCustomClass,
    addClassInArray
} from "../functions/customFunctions";

import { getValueBet } from "./gameCalc";

import vars from '../_vars';

const towerParent = document.querySelector('.tower-app');

if (towerParent) {
    const gameCalc = towerParent.querySelector('.game-calc');
    const input = gameCalc.querySelector('.game-bet__label input');
    const betBtns = gameCalc.querySelectorAll('.game-bet .bet-btn');
    const inputs = towerParent.querySelectorAll('input[name="open_currency"]');
    const towerRows = towerParent.querySelectorAll('.tower-app__row');
    const startBtn = towerParent.querySelector('[data-start]');
    const list = towerParent.querySelector('.tower-app__list');

    input.value = +0;
    let selectedValue;
    let activeRow;

    const items = [
        { name: "lose", img: "./img/sprite/bomb.svg" },
        { name: "win", img: "./img/sprite/coin.svg" },
    ];

    list.style.pointerEvents = 'none';

    getValueBet(input, betBtns);
    updateSelectedValue(selectedValue);

    inputs.forEach(input => {
        input.addEventListener('change', () => {
            updateSelectedValue();
        });
    });

    function updateSelectedValue() {
        const checkedInput = towerParent.querySelector('.open-btn input:checked');
        if (checkedInput) {
            selectedValue = parseInt(checkedInput.id.match(/\d+/)[0], 10);
        }
    }

    function generateEmptyCard() {
        return `
          <div class="tower-card">
          </div>
        `;
    }

    function addEmptyCardsToRows(rows, numCardsPerRow) {
        rows.forEach(row => {
            for (let i = 0; i < numCardsPerRow; i++) {
                const cardHTML = generateEmptyCard();
                row.innerHTML += cardHTML;
            }
        });
    }

    function updateCard(card, item) {
        card.className = 'tower-card'; // Сброс всех классов
        card.classList.add(item.name);

        const cardContent = `
            <div class="tower-card__wrapp">
                <span class="tower-card__icon">
                    <svg width='32' height='32'>
                        <use href='img/sprite/sprite.svg#hand'></use>
                    </svg>
                </span>
            </div>
            <div class="tower-card__bet">
                <img width='32' height='32' src='${item.img}' alt='${item.name}'>
            </div>
        `;

        card.innerHTML = cardContent;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    addEmptyCardsToRows(towerRows, 5);

    startBtn.addEventListener('click', () => {
   
        if (input.value === '0') {
            addCustomClass(gameCalc.querySelector('.game-bet__label'), 'error');
        } else {
            removeCustomClass(gameCalc.querySelector('.game-bet__label'), 'error');
            
            list.style.pointerEvents = 'all';

            if (towerRows.length > 0) {
                activeRow = towerRows[0];
                activeRow.classList.add('active');

                const cardsArray = [];

                for (let i = 0; i < 5; i++) {
                    if (i < selectedValue) {
                        cardsArray.push(items[0]);
                    } else {
                        cardsArray.push(items[1]);
                    }
                }

                shuffleArray(cardsArray);

                const cards = activeRow.querySelectorAll('.tower-card');
                cards.forEach((card, index) => {
                    const item = cardsArray[index];
                    updateCard(card, item);

                    card.addEventListener('click', () => {
                        if (card.classList.contains('lose')) {
                            console.log('Card is lose');
                            
                            towerRows.forEach(row => {
                                const rowCards = row.querySelectorAll('.tower-card');
                                if (row !== activeRow) {
                                    shuffleArray(cardsArray);
                                    rowCards.forEach((rowCard, idx) => {
                                        updateCard(rowCard, cardsArray[idx]);
                                    });
                                }
                                rowCards.forEach(rowCard => {
                                    rowCard.classList.add('active');
                                });
                            });
                            addClassInArray(towerRows, 'active');
                        } else {
                            console.log('Card is win');
                        }
                    });
                });
            }
        }
    });
}
