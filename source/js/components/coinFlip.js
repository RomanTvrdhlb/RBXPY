import { removeCustomClass, addCustomClass } from "../functions/customFunctions";

const parent = document.querySelector("[data-flip]");

if (parent) {
  const coin = parent.querySelector('.flip-app__coin');
  const icon = parent.querySelector('.flip-app__icon');
  const content = parent.querySelector('.flip-app__content');

  let totalFlips = 0;
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

    setTimeout(() => {
      const winningSide = result === 0 ? 'Kandara' : 'Vellion';

      console.log(`Результат: ${winningSide}`);

      content.classList.remove('bounce');
    }, 2000);
  }

  window.addEventListener('load', () => {
    setTimeout(flipCoin, 1000);
  });
}
