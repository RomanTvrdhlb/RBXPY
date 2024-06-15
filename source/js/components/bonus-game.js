import vars from '../_vars';
import {removeCustomClass, addCustomClass} from '../functions/customFunctions';

const {bonusParent} = vars;

if (bonusParent) {
    const btn = bonusParent.querySelector('.wheel-btn');
    const wheel = bonusParent.querySelector('.main-bonus__wheel-bg');

    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const minRotations = 2; //минимальное количество прокрутов
        const maxRotations = 5; //максимальное количество прокрутов
        const randomRotations = Math.floor(Math.random() * (maxRotations - minRotations + 1)) + minRotations;
        
        const rotateEnd = randomRotations * 360; //конечный угол поворота

        const animationDuration = randomRotations;
        wheel.style.setProperty('--rotate-end', `${rotateEnd}deg`);
        wheel.style.setProperty('--animation-duration', `${animationDuration}s`);
        removeCustomClass(wheel, 'active')
        void wheel.offsetWidth;
        addCustomClass(wheel, 'active');
    });
}





  
  