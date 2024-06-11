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
    const valueEl = card.querySelector('[data-value]');
    const copyBtn = card.querySelector('.copy-btn');
    
    copyBtn.addEventListener('click', function(e){
        e.preventDefault();

        const value = valueEl.getAttribute('data-value');

        navigator.clipboard.writeText(value)
        .then(() => {
            valueEl.innerText = 'ID copied!';
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