import './WeatherInfo.css';

const weatherInfoBlock = document.querySelector('.weather-info');
const weatherInfoToday = document.querySelector('.weather-today-wrapper');
const dataToday = document.querySelector('.data');
const quoteToday = document.querySelector('.quote');
const noneMoreInfoToday = document.querySelector('.none-MoreInfo');
const secondPage = document.querySelector('#second-page');

import GlobalEmitter from '../GlobalFunctionAndVariables/EventEmitter';

const fiveDaysWeatherBtn = document.querySelector('.five-days');
const todayWeatherBtn = document.querySelector('.weather-today');
fiveDaysWeatherBtn.addEventListener('click', onFiveDaysWeatherBtnClick);
todayWeatherBtn.addEventListener('click', onTodayWeatherBtnClick)

function onFiveDaysWeatherBtnClick(e) {
  weatherInfoToday.classList.add('visually-hidden');
  dataToday.classList.add('visually-hidden');
  quoteToday.classList.add('visually-hidden');
  noneMoreInfoToday.classList.add('visually-hidden');
  secondPage.classList.remove('visually-hidden');
  weatherInfoBlock.classList.add('pudding-for-five-days');

  fiveDaysWeatherBtn.classList.remove('weather-button-unactive');
  fiveDaysWeatherBtn.classList.add('weather-button-active');
  fiveDaysWeatherBtn.removeEventListener('click', onFiveDaysWeatherBtnClick);
  todayWeatherBtn.classList.add('weather-button-unactive');
  todayWeatherBtn.addEventListener('click', onTodayWeatherBtnClick);
}

function onTodayWeatherBtnClick(e) {
  weatherInfoToday.classList.remove('visually-hidden');
  dataToday.classList.remove('visually-hidden');
  quoteToday.classList.remove('visually-hidden');
  noneMoreInfoToday.classList.remove('visually-hidden');
  secondPage.classList.add('visually-hidden');
  weatherInfoBlock.classList.remove('pudding-for-five-days');

  todayWeatherBtn.classList.remove('weather-button-unactive');
  todayWeatherBtn.classList.add('weather-button-active');
  todayWeatherBtn.removeEventListener('click', onTodayWeatherBtnClick);
  fiveDaysWeatherBtn.classList.add('weather-button-unactive');
  fiveDaysWeatherBtn.addEventListener('click', onFiveDaysWeatherBtnClick);
}
