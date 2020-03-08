import './Search.css';
import services from '../../services';

import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
import GlobalEmitter from '../GlobalFunctionAndVariables/EventEmitter';

const choiseForm = document.querySelector('#search-form');
const choiseInput = document.querySelector('#search-input');

const containerMoreInfo = document.querySelector('.MoreInfo');

choiseInput.addEventListener('input', onInput);
choiseForm.addEventListener('submit', submitForm);
function onInput(event) {
  PNotify.closeAll();
}
GlobalEmitter.on(GlobalEmitter.ON_SEND_SUBMIT_FROM_FAVORITES, submitForm);
function submitForm(event) {
  event.preventDefault();
  containerMoreInfo.classList.add('visually-hidden');
  if (choiseInput.value === '') {
    PNotify.error({
      title: 'NOTICE!',
      text: 'Please write search city!',
    });
  }
  if (choiseInput.value !== services.city) {
    services.city = choiseInput.value;
    if (services.blockSection === 'today') {
      services.getTodayWeather(services.city);
    } else if (services.blockSection === 'fiveDay') {
      services.getFiveDayWeather(services.city);
    }
    services.getImgBackground(services.city);
  }
}
