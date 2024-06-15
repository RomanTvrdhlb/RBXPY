import {fadeIn, fadeOut} from '../functions/customFunctions';
import vars from '../_vars';

const {notificationsBox, referralCards, transferIds} = vars;

referralCards && referralCards.forEach(function(card){
    const valueEl = card.querySelector('[data-value]');
    const copyBtn = card.querySelector('.copy-btn');
    
    copyBtn.addEventListener('click', function(e){
        e.preventDefault();

        const value = valueEl.getAttribute('data-value');

        navigator.clipboard.writeText(value)
        .then(() => {
            valueEl.innerText = 'Link copied!';
            valueEl.style.color = '#22EE86';
        })
        .catch(err => {
            valueEl.innerText = 'Error copied!';
            valueEl.style.color = '#F62C2C';
        });
    });
});

if(notificationsBox){
    const cards = notificationsBox.querySelectorAll('.notification');

    fadeIn(notificationsBox, 0, 'flex');
    cards.forEach(function(card){
        fadeIn(card, 0, 'flex');
    })

    cards.forEach(function(card){
        const close = card.querySelector('.notification__close');

        close.addEventListener('click', function(e){
            e.preventDefault();
            fadeOut(card, 200);
        })
    })

    setTimeout(function() {
        closeBox(notificationsBox, cards);
    }, 4000);
}

function closeBox(box, cards) {
    fadeOut(box, 200);

    cards.forEach(function(card){
        fadeOut(card, 200);
    })
}

transferIds && transferIds.forEach(function(card){
    let flag = false;

    if(card.classList.contains('requisites')){
        flag = true;
    }
   
    const valueEl = card.querySelector('[data-value]');
    const copyBtn = card.querySelector('.copy-btn');
    
    copyBtn.addEventListener('click', function(e){
        e.preventDefault();

        const value = valueEl.getAttribute('data-value');

        navigator.clipboard.writeText(value)
        .then(() => {
            flag ? valueEl.innerText = 'Requisites copied!' : valueEl.innerText = 'ID copied!';
            valueEl.style.color = '#7FE408';
            valueEl.style.fontWeight = '500';
        })
        .catch(err => {
            valueEl.innerText = 'Error copied!';
            valueEl.style.color = '#F62C2C';
            valueEl.style.fontWeight = '500';
        });
    });
});

const cabinetBtns = document.querySelectorAll('.tab-nav__btn');

    if(cabinetBtns.length > 0){
        const firstItem = document.querySelector('.tab-nav__item:first-child');
        const secondItem = document.querySelector('.tab-nav__item:nth-child(2)');
        const secondItemButton = document.querySelector('.tab-nav__item:nth-child(2) .tab-nav__btn');
        const lastItem = document.querySelector('.tab-nav__item:last-child');
        const lastItemButton = document.querySelector('.tab-nav__item:last-child .tab-nav__btn');
        
        function resetStyles() {
          firstItem.style.zIndex = '';
          secondItemButton.style.padding = '';
          lastItem.style.zIndex = '';
          lastItemButton.style.padding = '';
        }
      
        function updateTabStyles() {
          resetStyles();
      
          const activeTab = document.querySelector('.tab-nav__btn.active');
          
          if (activeTab === cabinetBtns[0]) {
            firstItem.style.zIndex = '3';
            secondItem.style.zIndex = '2';
            lastItem.style.zIndex = '1';
            secondItemButton.style.padding = '12px 20px 12px 40px';
            lastItemButton.style.padding = '12px 20px 12px 40px';
          } else if (activeTab === cabinetBtns[1]) {
            firstItem.style.zIndex = '2';
            secondItem.style.zIndex = '3';
            lastItem.style.zIndex = '2';
            lastItemButton.style.padding = '12px 20px 12px 40px';
          } else if (activeTab === cabinetBtns[2]) {
            firstItem.style.zIndex = '1';
            secondItem.style.zIndex = '2';
            lastItem.style.zIndex = '3';
          }
        }
      
        cabinetBtns.forEach(btn => {
          btn.addEventListener('click', function() {
            cabinetBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateTabStyles();
          });
        });
      
        updateTabStyles();
}
  