import './AnimationWeather.css';
// import GlobalEmitter from '../GlobalFunctionAndVariables/EventEmitter';
const weatherSnow = 'snow';
const weatherRain = 'rain';

class weatherAnimation {
  constructor(selector) {
    this.selector = selector;
    this.element = document.querySelector(selector);
    // this.weather =
  }
  animationBuild() {
    this.element.insertAdjacentHTML(
      'afterBegin',
      `<div class="sky"><div class="clouds_two"></div><div class="clouds_one"></div><div class="clouds_three"></div>`,
    );
  }
}

const startAnimation = new weatherAnimation('.animationweather-special');
startAnimation.animationBuild();
