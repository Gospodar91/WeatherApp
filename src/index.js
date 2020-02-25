import './stylesheet/fonts.css';
import './stylesheet/WorkFonts.css';
import './stylesheet/normalize.css';
import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
import '../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import './stylesheet/styles.css';
import './components/Search/Search';
import './components/FavoriteList/FavoriteList';
import './components/WeatherInfo/WeatherInfo';
import './components/Quote/Quote';
import './components/BackgroundImg/BackgroundImg';
import './components/DataWindow/DataWindow';
import './components/FiveDaysSmall/FiveDaysSmall';
import './components/MoreInfo/MoreInfo';
import './components/Schedule/Schedule';
import './components/Geolocation/Geolocation';
import './components/AnimationWeather/AnimationWeather';
import './components/CubeAnimation/CubeAnimation';
import './components/GlobalFunctionAndVariables/globalFunctionAndVariables';
import GlobalEmitter from './components/GlobalFunctionAndVariables/EventEmitter';
import quoteData from './components/Quote/data';

// GlobalEmitter.on(GlobalEmitter.ON_START, onStart);

// function onStart(e){

//     console.log('HELLO ON START', e);
// }

// setTimeout(function(){
//     GlobalEmitter.emit(GlobalEmitter.ON_GEO, {z:'ON_GEO'})
// }, 1000);

// Проект без использования Emitter, только с объктом services
import services from './services';
import addBackground from './components/BackgroundImg/BackgroundImg';
import './components/BackgroundImg/BackgroundImg.css';
document.addEventListener('DOMContentLoaded', searchWeatherData);

// const choiseForm = document.querySelector('#search-form');
// const choiseInput = document.querySelector('#search-input');

// choiseForm.addEventListener('submit', submitForm);

// function submitForm(event) {
//   event.preventDefault();
//   services.city = choiseInput.value;
//   console.log(choiseInput.value);
//   console.log(services.city);
// }

function searchWeatherData() {
  // пробуем определить по координатам местонахождение человека:
  services
    .getCurrentCityForCurrentLocationCoord()
    .then(city => {
      if (services.blockSection === 'today') {
        services.getTodayWeather(city);
      } else if (services.blockSection === 'fiveDay') {
        services.getFiveDayWeather(city);
      }
      addBackground(city);
    })
    .catch(() => {
      if (services.blockSection === 'today') {
        services.getTodayWeather(services.city);
      } else if (services.blockSection === 'fiveDay') {
        services.getFiveDayWeather(services.city);
      }
      addBackground(services.city);
    });
}

setInterval(function() {
  GlobalEmitter.emit(GlobalEmitter.ON_QUOTE_READY, {
    ...quoteData[Math.floor(Math.random() * quoteData.length)],
  });
}, 5000);

// GlobalEmitter.on(GlobalEmitter.ON_QUOTE_READY, showRandomQuote);
// function showRandomQuote(event){
//     console.log(event);
// }
