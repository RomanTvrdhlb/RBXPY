import noUiSlider from "nouislider";

const stakeRange = document.getElementById("stake");
const daysRange = document.getElementById("days");
const choseRanges = document.querySelectorAll('[data-choose]');

choseRanges && choseRanges.forEach(function(range){
  let flag = false;
  if(range.classList.contains('mode')){
    flag = true;
  }
  let slider = range.querySelector(".range-slider");
  let value = range.querySelector(".range__value");
  const input = range.parentNode.querySelector(".range__value");

  noUiSlider.create(slider, {
    start: flag ? 129 : 1,
    step: 0.2,
    connect: "lower",
    range: {
      min: 1,
      max: 1000,
    },
  });

  slider.noUiSlider.on("update", function (values, handle) {
    value.value = values[handle];
  });

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      slider.noUiSlider.set(this.value);
    }
  });

})

if (stakeRange) {
  let stakeSlider = stakeRange.querySelector(".range-slider");
  let stakeValue = stakeRange.querySelector(".range__value");
  const input = stakeSlider.parentNode.querySelector(".range__value");

  noUiSlider.create(stakeSlider, {
    start: 129,
    step: 0.2,
    connect: "lower",
    range: {
      min: 0.1,
      max: 1000,
    },
  });


  stakeSlider.noUiSlider.on("update", function (values, handle) {
    stakeValue.value = values[handle];
  });


}

if (daysRange) {
  let daysSlider = daysRange.querySelector(".range-slider");
  let daysValue = daysRange.querySelector(".range__value");
  const input = daysSlider.parentNode.querySelector(".range__value");
  noUiSlider.create(daysSlider, {
    start: 229,
    step: 1,
    connect: "lower",
    range: {
      min: 1,
      max: 365,
    },
  });
  
  daysSlider.noUiSlider.on("update", function (values, handle) {
    daysValue.value = Math.round(values[handle]);
  });
  
}
