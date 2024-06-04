import {toggleClassInArray, toggleCustomClass, removeCustomClass, removeClassInArray, fadeIn, fadeOut, addCustomClass} from '../functions/customFunctions';


const cards = document.querySelectorAll('.card');

cards && cards.forEach(function(card){

    const speed = card.querySelector('[data-speed]');
    const plusBtn = card.querySelector('.card__btn--plus');
    const minusBtn = card.querySelector('.card__btn--minus');
    const refreshBtn = card.querySelector('.card__btn--refresh');
    const value = card.querySelector('.card__speed-value');
    const arrow = card.querySelector('.card__arrow');
    let count = +speed.dataset.speed;
    let rotation = (+speed.dataset.speed / 5) * 18;

    value.innerText = `${count}%`;
    arrow.style.transform = `rotate(${rotation}deg)`;
    
    plusBtn.addEventListener('click', function(e){
        e.preventDefault();

        count += 5;
        rotation += 18;
        if (count > 100) {
            count = 100;
            rotation = 360;
        }
        speed.dataset.speed = count;
        value.innerText = `${count}%`;
        arrow.style.transform = `rotate(${rotation}deg)`;
    })

    minusBtn.addEventListener('click', function(e){
        e.preventDefault();
        count -= 5;
        rotation -= 18;

        if (count < 0) {
            count = 0;
            rotation = 0;
        }
        speed.dataset.speed = count;
        value.innerText = `${count}%`
        arrow.style.transform = `rotate(${rotation}deg)`;
      
    })

    refreshBtn.addEventListener('click', function(e){
        e.preventDefault();
        count = 0;
        speed.dataset.speed = count;
        value.innerText = `${count}%`
        rotation = 0;
        arrow.style.transform = `rotate(${rotation}deg)`;
    })

   
    // function rotateArrow() {
    //     const rotation = Math.floor(360 / (100 / 5)); // Количество полных оборотов
      
    // }
})

const dashCards = document.querySelectorAll('.dashboard-card');

dashCards && dashCards.forEach(function(card){
    const btn = card.querySelector('.dashboard-card__btn');
    const close = card.querySelector('.dashboard-card__close');
    const menu = card.querySelector('.dashboard-card__wrapp');

    btn.addEventListener('click', function(e){
        e.preventDefault();
        addCustomClass(menu, 'active');
    })

    close.addEventListener('click', function(e){
        e.preventDefault();
        removeCustomClass(menu, 'active');
    })
})

const copyCards = document.querySelectorAll('.deposit-card');

copyCards && copyCards.forEach(function(card){
    const generateBtn = card.querySelector('.deposit-card__btn');
    const form = card.querySelector('.main-copy');
    const formInput = form.querySelector('input').value;
    const copyBtn = form.querySelector('.main-copy__btn');

    generateBtn.addEventListener('click', function(e){
        e.preventDefault();
        addCustomClass(form, 'active');
    })
})

const copyForms = document.querySelectorAll('.main-copy');

copyForms && copyForms.forEach(function(form){
    const formInput = form.querySelector('input');
    const copyBtn = form.querySelector('.main-copy__btn');

    copyBtn.addEventListener('click', function(e){
        e.preventDefault();

        const value = formInput.value;

        navigator.clipboard.writeText(value)
        .then(() => {
            formInput.value = 'Link copied!';
            formInput.style.color = '#53FFEC';
        })
        .catch(err => {
            formInput.value = 'Error copied!';
            formInput.style.color = '#F62C2C';
        });
    });
});


const referralCards = document.querySelectorAll('.main-referral');

referralCards && referralCards.forEach(function(card){
    const valueEl = card.querySelector('[data-value]');
    const copyBtn = card.querySelector('.copy');
    
    copyBtn.addEventListener('click', function(e){
        e.preventDefault();

        const value = valueEl.getAttribute('data-value');

        navigator.clipboard.writeText(value)
        .then(() => {
            valueEl.innerText = 'Link copied!';
            valueEl.style.color = '#53FFEC';
        })
        .catch(err => {
            valueEl.innerText = 'Error copied!';
            valueEl.style.color = '#F62C2C';
        });
    });
});

const exchangeForms = document.querySelectorAll('.exchange-form');

exchangeForms && exchangeForms.forEach(function(form){
    const formBox = form.querySelector('.exchange-form__box');
    const btn = form.querySelector('.exchange-form__btn');
    let flag = false;

    btn.addEventListener('click', function(e){
        e.preventDefault();
        if(flag === false){
            flag = true;
            addCustomClass(formBox, 'active');
        } else {
            flag = false;
            removeCustomClass(formBox, 'active');
        }
    })

    const ranges = form.querySelectorAll('.range__value');

    ranges.forEach(function(range){
        range.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        });
    })
})