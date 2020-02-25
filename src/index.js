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
import services from './services';

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
   console.log('---searchWeatherData---');
      services.getImgBackground(city);
    })
    .catch((e) => {
      console.log('---searchWeatherData error---',e);
      if (services.blockSection === 'today') {
        services.getTodayWeather(services.city);
      } else if (services.blockSection === 'fiveDay') {
        services.getFiveDayWeather(services.city);
      }
   
      
    });
}




function showQuote(){
  GlobalEmitter.emit(GlobalEmitter.ON_QUOTE_READY, {
    ...quoteData[Math.floor(Math.random() * quoteData.length)],
  });
}
setInterval(showQuote, 8000);
showQuote();


// GlobalEmitter.on(GlobalEmitter.ON_QUOTE_READY, showRandomQuote);
// function showRandomQuote(event){
//     console.log(event);
// }
