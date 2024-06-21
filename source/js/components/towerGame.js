import { removeCustomClass, addCustomClass, addClassInArray } from "../functions/customFunctions";
import { getValueBet } from "./gameCalc";

const towerParent = document.querySelector('.tower-app');

if (towerParent) {
    const gameCalc = towerParent.querySelector('.game-calc');
    const input = gameCalc.querySelector('.game-bet__label input');
    const betBtns = gameCalc.querySelectorAll('.game-bet .bet-btn');
    const inputs = towerParent.querySelectorAll('input[name="open_currency"]');
    const towerRows = towerParent.querySelectorAll('.tower-app__row');
    const startBtn = towerParent.querySelector('[data-start]');
    const list = towerParent.querySelector('.tower-app__list');
    const percentElements = towerParent.querySelectorAll('[data-percent]');
    const gameBtnValue = gameCalc.querySelector('.game-btn__value');
    const gameBtnText = gameCalc.querySelector('.game-btn__text');
    const gameBtnIcon = gameCalc.querySelector('.game-btn__icon');
    let selectedValue;
    let activeRow;
    let activeRowIndex = 0;
    let gameWon = false;
    input.value = +0;

    const items = [
        { name: "lose", img: "./img/sprite/bomb.svg" },
        { name: "win", img: "./img/sprite/coin.svg" },
    ];

    const multipliers = {
        1: [1.19, 1.48, 1.86, 2.32, 2.90, 3.62, 4.53, 5.66, 7.08, 8.85],
        2: [1.58, 2.64, 4.40, 7.33, 12.22, 20.36, 33.94, 56.56, 94.27, 157.11],
        3: [2.38, 5.64, 14.84, 37.11, 92.77, 231.93, 579.83, 1449.58, 3623.96, 9059.91],
        4: [4.75, 23.75, 118.75, 593.75, 2968.75, 14843.75, 74218.75, 371093.75, 1855468.75, 9277343.75]
    };

    list.style.pointerEvents = 'none';

    getValueBet(input, betBtns);
    updateSelectedValue();
    updatePercentElements(selectedValue);

    inputs.forEach(input => {
        input.addEventListener('change', () => {
            updateSelectedValue();
            updatePercentElements(selectedValue);
        });
    });

    function handleInput(input) {
        input.addEventListener('focus', function() {
            if (input.value === '0') {
                input.value = '';
            }
        });
    
        input.addEventListener('blur', function() {
            if (input.value === '') {
                input.value = '0';
            }
        });
    }

    handleInput(input);

    function updateSelectedValue() {
        const checkedInput = towerParent.querySelector('.open-btn input:checked');
        if (checkedInput) {
            selectedValue = parseInt(checkedInput.id.match(/\d+/)[0], 10);
        }
    }

    function updatePercentElements(value) {
        if (multipliers[value]) {
            percentElements.forEach((element, index) => {
                if (multipliers[value][index]) {
                    element.setAttribute('data-percent', multipliers[value][index]);
                } else {
                    element.setAttribute('data-percent', '');
                }
            });
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
            row.innerHTML = '';
            for (let i = 0; i < numCardsPerRow; i++) {
                const cardHTML = generateEmptyCard();
                row.innerHTML += cardHTML;
            }
        });
    }

    function updateCard(card, item) {
        card.className = 'tower-card';
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

    let cardsArray = [];

    function addCardClickHandlers(cards) {
        cards.forEach(card => {
            card.addEventListener('click', cardClickHandler);
        });
    }

    function removeCardClickHandlers(cards) {
        cards.forEach(card => {
            card.removeEventListener('click', cardClickHandler);
        });
    }

    function cardClickHandler(event) {
        const card = event.currentTarget;

        if (card.classList.contains('lose')) {
            list.style.pointerEvents = 'none';
            gameBtnText.textContent = 'Играть';
            gameBtnIcon.style.display = 'none';
            gameBtnValue.style.display = 'none';
            
            input.removeAttribute('disabled');
            betBtns.forEach(btn => btn.removeAttribute('disabled'));
            inputs.forEach(input => input.removeAttribute('disabled'));

            resetCards();
            addClassInArray(towerRows, 'active');
            gameWon = false;
        } else if (card.classList.contains('win')) {
            const rowCards = activeRow.querySelectorAll('.tower-card');
            rowCards.forEach(rowCard => {
                rowCard.classList.add('active');
            });

            const percentElement = activeRow.previousElementSibling;
          
            if (percentElement) {
                const percentValue = parseFloat(percentElement.getAttribute('data-percent'));
                const inputValue = parseFloat(input.value);
                const result = percentValue * inputValue;
                gameBtnValue.textContent = result.toFixed(2); 
            }

            if (activeRowIndex < towerRows.length - 1) {
                activeRowIndex++;
                const previousRow = activeRow;
                activeRow = towerRows[activeRowIndex];
                activeRow.classList.add('active');

                const nextCards = activeRow.querySelectorAll('.tower-card');
                shuffleArray(cardsArray);
                nextCards.forEach((nextCard, idx) => {
                    updateCard(nextCard, cardsArray[idx]);
                });
       
                removeCardClickHandlers(previousRow.querySelectorAll('.tower-card'));
                addCardClickHandlers(nextCards);

                gameBtnText.textContent = 'Забрать';
                gameBtnIcon.style.display = 'flex';
                gameBtnValue.style.display = 'flex';
            }
            gameWon = true;
        }
    }

    if(!towerParent.classList.contains('log-out')){
        startBtn.addEventListener('click', () => {
            if (gameWon) {
                gameBtnText.textContent = 'Играть';
                gameBtnIcon.style.display = 'none';
                gameBtnValue.style.display = 'none';

                input.removeAttribute('disabled');
                betBtns.forEach(btn => btn.removeAttribute('disabled'));
                inputs.forEach(input => input.removeAttribute('disabled'));
                resetCards();
                addClassInArray(towerRows, 'active');
                gameWon = false;
            } else {
                activeRowIndex = 0;
                towerRows.forEach(row => row.classList.remove('active'));
                addEmptyCardsToRows(towerRows, 5);
                list.style.pointerEvents = 'none';
        
                if (input.value === '0') {
                    addCustomClass(gameCalc.querySelector('.game-bet__label'), 'error');
                } else {
                    removeCustomClass(gameCalc.querySelector('.game-bet__label'), 'error');
                    
                    gameBtnText.textContent = 'Выберите карту';
                    list.style.pointerEvents = 'all';
                    gameBtnValue.textContent = parseFloat(input.value);
                    
                    input.setAttribute('disabled', 'true');
                    betBtns.forEach(btn => btn.setAttribute('disabled', 'true'));
                    inputs.forEach(input => input.setAttribute('disabled', 'true'));
                    
                    if (towerRows.length > 0) {
                        activeRow = towerRows[0];
                        activeRow.classList.add('active');
        
                        cardsArray = [];
        
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
                        });
        
                        addCardClickHandlers(cards);
                    }
                }
            }
        });
    }   

    updatePercentElements(selectedValue);

    function resetCards() {
        towerRows.forEach(row => {
            const rowCards = row.querySelectorAll('.tower-card');
    
            if (!row.classList.contains('active') && !row.previousElementSibling?.classList.contains('active')) {
                shuffleArray(cardsArray);
                rowCards.forEach((rowCard, idx) => {
                    updateCard(rowCard, cardsArray[idx]);
                });
            }
    
            rowCards.forEach((card) => { card.classList.add('active') });
        });
    }
}
