import lottie from 'lottie-web';
import {addCustomClass} from '../functions/customFunctions';

const animationData = require('./../preloader.json'),
    preloader = document.querySelector('.preloader'),
    
    options = {
    container: document.getElementById('loader'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: animationData,
};

if(preloader && animationData){
const initPreload = lottie.loadAnimation(options);

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function(){
        addCustomClass(preloader, 'loaded');
        window.preloaderLoaded = true;
    },3500)
});
}