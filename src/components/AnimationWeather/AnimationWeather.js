import './AnimationWeather.css';
import GlobalEmitter from '../GlobalFunctionAndVariables/EventEmitter';


class AnimationWeather {
  constructor(selector) {
    this.selector = selector;
    this.element = document.querySelector(selector);
  
  }
  animationBuildRain() {
    document.querySelector('.animationweather-special').classList.remove('thunder');

    if(document.querySelector('.sky')){
      document.querySelector('.sky').innerHTML = '';
    }
    document.querySelector('.animationweather').classList.remove('weather');
    document.querySelector('.animationweather').classList.remove('snow');
    document.querySelector('.sky').insertAdjacentHTML(
      'afterBegin',
      `<div class="clouds_two"></div><div class="clouds_one"></div><div class="clouds_three">`,
    );
    document.querySelector('.animationweather').classList.add('weather');
    document.querySelector('.animationweather').classList.add('rain');
    if (Math.random() >= 0.5){
    document.querySelector('.animationweather-special').classList.add('thunder');
  }
  }

  animationBuildClouds() {
    document.querySelector('.animationweather-special').classList.remove('thunder');

    if(document.querySelector('.sky')){
      document.querySelector('.sky').innerHTML = '';
    }
    document.querySelector('.animationweather').classList.remove('weather');
    document.querySelector('.animationweather').classList.remove('rain');
    document.querySelector('.animationweather').classList.add('snow');
    document.querySelector('.sky').insertAdjacentHTML(
      'afterBegin',
      `<div class="sky"><div class="clouds_two"></div><div class="clouds_one"></div><div class="clouds_three"></div>`,
    );
  }
  animationBuildSnow() {
    document.querySelector('.animationweather-special').classList.remove('thunder');

    if(document.querySelector('.sky')){
      document.querySelector('.sky').innerHTML = '';
    }
    
    document.querySelector('.animationweather').classList.remove('weather');
    document.querySelector('.animationweather').classList.remove('rain');
    document.querySelector('.sky').insertAdjacentHTML(
      'afterBegin',
      `<div class="sky"><div class="clouds_two"></div><div class="clouds_one"></div><div class="clouds_three"></div>`,
    );
    document.querySelector('.animationweather').classList.add('weather');
    document.querySelector('.animationweather').classList.add('snow');

 
  }
  
  animationBuildClear() {
    document.querySelector('.animationweather-special').classList.remove('thunder');

    if(document.querySelector('.sky')){
      document.querySelector('.sky').innerHTML = '';
    }
    
    document.querySelector('.animationweather').classList.remove('weather');
    document.querySelector('.animationweather').classList.remove('rain');
    document.querySelector('.animationweather').classList.remove('snow');

  }

  startAnimation(weather) {
    if (weather === 'Clear') {
  
      this.animationBuildClear();
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



