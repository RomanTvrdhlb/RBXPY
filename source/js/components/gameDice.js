import noUiSlider from "nouislider";
import { removeCustomClass, addCustomClass } from "../functions/customFunctions";

document.addEventListener("DOMContentLoaded", () => {
    const diceParent = document.querySelector(".dice-app");

    if (!diceParent) return;

    const gameCalc = diceParent.querySelector(".game-calc");
    const input = gameCalc.querySelector(".game-bet__label.bet input");
    const betBtns = gameCalc.querySelectorAll(".game-bet .bet-btn");
    const startBtn = diceParent.querySelector("[data-start]");
    const betValue = diceParent.querySelector(".dice-app__value");
    const historyList = diceParent.querySelector(".dice-app__history");

    const slider = document.getElementById("dice-range");
    const sliderValue = document.getElementById("dice-chance");
    const coefficientValue = document.getElementById("dice-coef");
    const diceWinInput = document.getElementById("dice-win");

    let gameEnd = false;
    let bet = parseFloat(input.value);
    input.value = "0";

    if (slider) {
        noUiSlider.create(slider, {
            start: [53.75],
            step: 0.01,
            range: {
                min: [0],
                max: [100],
            },
            tooltips: [true],
            format: {
                to: (value) => parseFloat(value).toFixed(2),
                from: (value) => Number(value),
            },
            pips: {
                mode: "values",
                values: [0, 25, 50, 75, 100],
                density: 4,
            },
        });

        slider.noUiSlider.on("update", (values, handle) => {
            const sliderVal = parseFloat(values[handle]);
            sliderValue.value = sliderVal.toFixed(2) + "%";
            const coefficient = calculateCoefficient(sliderVal);
            coefficientValue.value = coefficient.toFixed(2);
            updateDiceWinInput();
        });
    }

    function calculateCoefficient(sliderVal) {
        const k = 1;
        return 100 / (sliderVal + k);
    }

    function updateDiceWinInput() {
        const bet = parseFloat(input.value);
        const coefficient = parseFloat(coefficientValue.value);
        diceWinInput.value = (bet * coefficient).toFixed(2);
    }

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

    function endGame(value, isWin) {
        addToHistory(value, isWin);
        setTimeout(enableInputs, 250);
        gameEnd = true;
    }

    function addToHistory(value, isWin) {
        const historyItem = document.createElement("li");
        addCustomClass(historyItem, "dice-app__item");

        const betSpan = document.createElement("span");
        addCustomClass(betSpan, "dice-app__bet");
        betSpan.textContent = Math.round(value) + "%";

        if (!isWin) {
            addCustomClass(betSpan, "red");
        }

        historyItem.appendChild(betSpan);
        historyList.insertBefore(historyItem, historyList.firstChild);
    }

    function enableInputs() {
        input.removeAttribute("disabled");
        startBtn.removeAttribute("disabled");
        betBtns.forEach((btn) => btn.removeAttribute("disabled"));
    }

    function generateRandomNumber() {
        return Math.random() * 100;
    }

    function animateNumber(targetValue, callback) {
        let currentValue = 0;
        betValue.innerText = currentValue.toFixed(2);
        betValue.classList.remove("win", "lose");

        const step = targetValue < 15 ? 0.06 : 0.8;
        const intervalTime = 1;

        const interval = setInterval(() => {
            currentValue += step;
            if (currentValue >= targetValue) {
                clearInterval(interval);
                currentValue = targetValue;
                callback();
            }
            betValue.innerText = currentValue.toFixed(2);
        }, intervalTime);
    }

    function setupBetButtons(input, btns) {
        if (!btns) return;
        btns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const betValue = btn.getAttribute("data-bet");
                switch (betValue) {
                    case "clear":
                        input.value = 0;
                        break;
                    case "1/2":
                        input.value /= 2;
                        break;
                    case "2x":
                        input.value *= 2;
                        break;
                    case "min":
                        input.value = 10;
                        break;
                    case "max":
                        input.value = 100000;
                        break;
                    default:
                        input.value = +input.value + +betValue;
                }
                updateDiceWinInput();
            });
        });
    }

    setupBetButtons(input, betBtns);

    if (!diceParent.classList.contains("log-out")) {
        startBtn.addEventListener("click", () => {
            if (gameEnd) {
                enableInputs();
                gameEnd = false;
            }

            bet = parseFloat(input.value);
            const hasError = checkInputs();

            if (!hasError) {
                input.setAttribute("disabled", "true");
                startBtn.setAttribute("disabled", "true");
                betBtns.forEach((btn) => btn.setAttribute("disabled", "true"));

                const randomNumber = generateRandomNumber();
                const chance = parseFloat(sliderValue.value);
                const isWin = randomNumber <= chance;

                animateNumber(randomNumber, () => {
                    if (isWin) {
                        addCustomClass(betValue, "win");
                    } else {
                        addCustomClass(betValue, "lose");
                    }
                    endGame(randomNumber, isWin);
                });
            }
        });
    }
});
