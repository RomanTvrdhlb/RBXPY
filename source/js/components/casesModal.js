export function modalHandler(overlay, items) {
    const currentModal = overlay.querySelector(`[data-popup="win"]`);
    const box = currentModal.querySelector(".modal__inner");
    box.innerHTML = ''; 

    items.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("case-card", "case-card--win");
      card.innerHTML = generateModalCard(item);
      box.append(card);
    });

    if (items.length >= 5) {
        currentModal.classList.add("mode");
      } else {
        currentModal.classList.remove("mode");
      }
  }

  function generateModalCard(item) {
    return `
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
          <span class="case-card__title">${item.name}</span>
          <div class="case-card__price">
              <span class="case-card__coin">
                <svg width='20' height='20'>
                  <use href='img/sprite/sprite.svg#coin'></use>
                </svg>
              </span>
              <span class="case-card__value">${item.value}</span>
          </div>
          <div class="case-card__btns">
              <button class="violet-btn"><span class="violet-btn__text">Продать предмет</span><span
                  class="violet-btn__text--mob">Продать</span></button>
              <button class="transparent-btn transparent-btn--violet">в инвентарь</button>
          </div>
      
      `;
  }