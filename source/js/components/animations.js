import lottie from 'lottie-web';

const platformData = require('./../platfrom.json');
const moreData = require('./../more.json');
const securityData = require('./../security.json');
const aprData = require('./../apr.json');
const supportData = require('./../support.json');
const riskData = require('./../risk.json');


const platformEl = document.getElementById('platform');
const moreEl = document.getElementById('more');
const securityEl = document.getElementById('security');
const aprEl = document.getElementById('apr');
const supportEl = document.getElementById('support');
const riskEl = document.getElementById('risk');

const platformOptions = {
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: platformData,
};

const moreOptions = {
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: moreData,
};

const securityOptions = {
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: securityData,
};

const aprOptions = {
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: aprData,
};

const supportOptions = {
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: supportData,
};

const riskOptions = {
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: riskData,
};


function initAnimation(options, container) {
  if (options && container) {
    options.container = container;
    lottie.loadAnimation(options);
  }
}

initAnimation(platformOptions, platformEl);
initAnimation(moreOptions, moreEl);
initAnimation(securityOptions, securityEl);
initAnimation(aprOptions, aprEl);
initAnimation(supportOptions, supportEl);
initAnimation(riskOptions, riskEl);


const giftElements = document.querySelectorAll('.gift');

giftElements && giftElements.forEach(function(gift){
  playGiftAnimation(gift);
  setInterval(function() {
    playGiftAnimation(gift);
  }, 4000);
});

function playGiftAnimation(el) {
  el.classList.add('animate-gift');
  setTimeout(() => {
    el.classList.remove('animate-gift');
  }, 2000);
}
