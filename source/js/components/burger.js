import { disableScroll } from '../functions/disable-scroll';
import { enableScroll } from '../functions/enable-scroll';
import vars from '../_vars';

import {toggleClassInArray, toggleCustomClass, removeCustomClass, removeClassInArray, fadeIn, fadeOut, addCustomClass} from '../functions/customFunctions';
const {overlay, burger, mobileMenu, chatBtn, chat, barLinks} = vars;

const mobileMenuHandler = function(overlay, mobileMenu, burger) {
 
  burger.forEach((btn) => {
    btn.addEventListener('click', function(e){
      e.preventDefault();
      removeCustomClass(document.querySelector('[data-chat]'), 'active');
      removeCustomClass(document.querySelector('.chat'), 'active');
      toggleCustomClass(mobileMenu);
      toggleClassInArray(burger);
      toggleCustomClass(overlay);
      btn.classList.contains('active') ? disableScroll() : enableScroll()

    })
  })
}

const hideMenuHandler = function(overlay, mobileMenu, burger) {
    removeCustomClass(mobileMenu);
    removeClassInArray(burger);
    removeCustomClass(overlay);
    enableScroll()
}

const chatHandler = function(chat, btn){
    btn.addEventListener('click', function(e){
      e.preventDefault();
      removeClassInArray(barLinks, 'active')
      toggleCustomClass(chat);
      toggleCustomClass(btn);
      
      btn.classList.contains('active') ? disableScroll() : enableScroll()
    })
}

const hideChatHandler = function(chat,btn) {
  removeCustomClass(chat);
  removeCustomClass(btn);
  enableScroll()
}

if (overlay) {
  mobileMenuHandler(overlay,mobileMenu,burger);
  chatHandler(chat, chatBtn);
  overlay.addEventListener('click', function(e){
    e.target.classList.contains('overlay') ?
    hideMenuHandler(overlay,mobileMenu,burger) : null;
    e.target.classList.contains('overlay') ?
    hideChatHandler(chat, chatBtn) : null;
  });
}
