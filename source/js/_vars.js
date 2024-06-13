export default {
  activeMode: 'active-mode',
  activeClass: "active",
  windowEl: window,
  documentEl: document,
  htmlEl: document.documentElement,
  bodyEl: document.body,
  header: document.querySelector("header"),
  footer: document.querySelector("footer"),
  burger: document.querySelectorAll('.burger'),
  mobileMenu: document.querySelector('.mobile'),
  overlay: document.querySelector('[data-overlay]'),
  modals: [...document.querySelectorAll('[data-popup]')],
  modalsButton: [...document.querySelectorAll('[data-btn-modal]')],
  innerButtonModal: [...document.querySelectorAll('[data-btn-inner]')],
  mainSliders: document.querySelectorAll('.main-slider'),
  chatBtn: document.querySelector('[data-chat]'),
  chat: document.querySelector('.chat'),
  barLinks: document.querySelectorAll('.aside-nav__button'),
  notificationsBox: document.querySelector('.notifications-wrapper'),
  referralCards: document.querySelectorAll('.referral-card'),
  transferIds: document.querySelectorAll('.transfer-id'),
  caseSliders: document.querySelectorAll('.cases-slider'),
  cabinetBtns: document.querySelectorAll('.tab-nav__btn'),

  
}

