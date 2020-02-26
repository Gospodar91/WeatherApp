import './AnimationWeather.css';
// import res from '../../services.js';
import GlobalEmitter from '../GlobalFunctionAndVariables/EventEmitter';
// const weatherSnow = 'snow';
// const weatherRain = 'rain';

class AnimationWeather {
  constructor(selector) {
    this.selector = selector;
    this.element = document.querySelector(selector);
    // this.weather =
  }
  animationBuildRain() {
    this.element.insertAdjacentHTML(
      'afterBegin',
      `<div class="sky"><div class="clouds_two"></div><div class="clouds_one"></div><div class="clouds_three"></div>`,
    );
    document.querySelector('.animationweather').classList.add('weather');
    document.querySelector('.animationweather').classList.add('rain');
    document.querySelector('.animationweather-special').classList.add('opacity');
  }

  animationBuildClouds() {
    this.element.insertAdjacentHTML(
      'afterBegin',
      `<div class="sky"><div class="clouds_two"></div><div class="clouds_one"></div><div class="clouds_three"></div>`,
    );
  }
  animationBuildSnow() {
    this.element.insertAdjacentHTML(
      'afterBegin',
      `<div class="sky"><div class="clouds_two"></div><div class="clouds_one"></div><div class="clouds_three"></div>`,
    );
    document.querySelector('.animationweather').classList.add('weather');
    document.querySelector('.animationweather').classList.add('snow');

    document.querySelector('.animationweather-special').classList.add('opacity');
  }
  startAnimation(weather) {
    if (weather === 'Clear') {
      return;
    } else if (weather === 'Rain') {
      this.animationBuildRain();
    }
    else if (weather === 'Snow') {
      this.animationBuildSnow();
    }
    else if (weather === 'Clouds') {
      this.animationBuildClouds();
    }
  }
}

const exStartAnimation = new AnimationWeather('.animationweather-special');
GlobalEmitter.on(GlobalEmitter.ON_WEATHER_READY, exStartAnimation.startAnimation.bind(exStartAnimation));



