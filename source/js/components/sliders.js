import Swiper from "swiper";
import vars from "../_vars";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const { mainSliders, caseSliders } = vars;


mainSliders && mainSliders.forEach(function(slider){
  const container = slider.querySelector('.swiper-container');
  const pagination = slider.querySelector(".swiper-pagination");
  const nextBtn = slider.querySelector('.swiper-button-next');
  const prevBtn = slider.querySelector('.swiper-button-prev');
  
  const swiper = new Swiper(container,
    {
      modules: [Autoplay, Pagination, Navigation],
      spaceBetween: 20,
      slidesPerView: 1,
      loop: true,
      speed: 1500,
      observer: true,
      observeParents: true,
      autoplay: {
        delay: 3000,
      },
      pagination: {
        clickable: true,
        el: pagination && pagination,
      },
      navigation: {
        nextEl: nextBtn && nextBtn,
        prevEl: prevBtn && prevBtn,
      },
      breakpoints:{
        320:{
          spaceBetween: 15,
        },
        576:{
          spaceBetween: 20,
        },
      },
    }
  );
})


caseSliders && caseSliders.forEach(function(slider){
  const container = slider.querySelector('.swiper-container');
  
  const swiper = new Swiper(container,
    {
      spaceBetween: 20,
      slidesPerView: 'auto',
      grabCursor: true,
      speed: 1500,
      observer: true,
      observeParents: true,
      watchSlidesProgress: true,
    }
  );
})


