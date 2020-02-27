import './Search.css';
import services from '../../services';

import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';

const choiseForm = document.querySelector('#search-form');
const choiseInput = document.querySelector('#search-input');
choiseInput.addEventListener('input', onInput);
choiseForm.addEventListener('submit', submitForm);
// console.log('>>>>>>>>>>>>>>>>>>>>>>>>choiseForm',choiseForm);
function onInput(event) {
  PNotify.closeAll();
}

function submitForm(event) {
  // alert('qwdqwdqw');
  event.preventDefault();
  if (choiseInput.value === '') {
    PNotify.error({
      title: 'NOTICE!',
      text: 'Please write search city!',
    });
  }
  /////////виправляв Стахура///////////////////////
  if (choiseInput.value !== services.city) {
    services.city = choiseInput.value;
   
        services.getTodayWeather(services.city);
     
        services.getFiveDayWeather(services.city);
     
    services.getImgBackground(services.city);
  }
  // if (services.blockSection === 'today') {
  //   services.getTodayWeather(services.city);
  // } else if (services.blockSection === 'fiveDay') {
  //   services.getFiveDayWeather(services.city);
  // }
  // services.getImgBackground(services.city);
}
