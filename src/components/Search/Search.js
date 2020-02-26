import './Search.css';
import services from '../../services';

import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';

const choiseForm = document.querySelector('#search-form');
const choiseInput = document.querySelector('#search-input');
choiseInput.addEventListener('input', onInput);
choiseForm.addEventListener('submit', submitForm);

function onInput(event) {
  PNotify.closeAll();
}

function submitForm(event) {
  event.preventDefault();
  services.city = choiseInput.value;
  if (services.blockSection === 'today') {
    services.getTodayWeather(services.city);
  } else if (services.blockSection === 'fiveDay') {
    services.getFiveDayWeather(services.city);
  }
  services.getImgBackground(services.city);
}
