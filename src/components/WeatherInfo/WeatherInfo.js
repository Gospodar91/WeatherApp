import './WeatherInfo.css';

const weatherInfoToday = document.querySelector('.weather-today-wrapper');

import GlobalEmitter from '../GlobalFunctionAndVariables/EventEmitter';

const fiveDaysWeatherBtn = document.querySelector('.five-days');
const todayWeatherBtn = document.querySelector('.weather-today');
fiveDaysWeatherBtn.addEventListener('click', onFiveDaysWeatherBtnClick);

function onFiveDaysWeatherBtnClick(e) {
  weatherInfoToday.classList.add('visually-hidden');
  fiveDaysWeatherBtn.classList.remove('weather-button-unactive');
  fiveDaysWeatherBtn.classList.add('weather-button-active');
  fiveDaysWeatherBtn.removeEventListener('click', onFiveDaysWeatherBtnClick);
  todayWeatherBtn.classList.add('weather-button-unactive');
  todayWeatherBtn.addEventListener('click', onTodayWeatherBtnClick);
}

function onTodayWeatherBtnClick(e) {
  weatherInfoToday.classList.remove('visually-hidden');
  todayWeatherBtn.classList.remove('weather-button-unactive');
  todayWeatherBtn.classList.add('weather-button-active');
  todayWeatherBtn.removeEventListener('click', onTodayWeatherBtnClick);
  fiveDaysWeatherBtn.classList.add('weather-button-unactive');
  fiveDaysWeatherBtn.addEventListener('click', onFiveDaysWeatherBtnClick);
}
