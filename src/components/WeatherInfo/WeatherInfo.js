import './WeatherInfo.css';
import GlobalEmitter from '../GlobalFunctionAndVariables/EventEmitter';
import todayWeatherData from '../../services';

const weatherInfoBlock = document.querySelector('.weather-info');
const weatherInfoToday = document.querySelector('.weather-today-wrapper');
const dataToday = document.querySelector('.data');
const quoteToday = document.querySelector('.quote');
const secondPage = document.querySelector('#second-page');

const fiveDaysWeatherBtn = document.querySelector('.five-days');
const todayWeatherBtn = document.querySelector('.weather-today');
fiveDaysWeatherBtn.addEventListener('click', onFiveDaysWeatherBtnClick);
todayWeatherBtn.addEventListener('click', onTodayWeatherBtnClick);
let currentCity;

function onFiveDaysWeatherBtnClick(e) {
  if (currentCity !== todayWeatherData.city) {
    if (!todayWeatherData.fiveDay) {
      todayWeatherData.getFiveDayWeather(todayWeatherData.city);
      currentCity = todayWeatherData.city;
    }
  }
  todayWeatherData.blockSection='fiveDay';
  weatherInfoToday.classList.add('visually-hidden');
  dataToday.classList.add('visually-hidden');
  quoteToday.classList.add('visually-hidden');
  secondPage.classList.remove('visually-hidden');
  weatherInfoBlock.classList.add('pudding-for-five-days');

  fiveDaysWeatherBtn.classList.remove('weather-button-unactive');
  fiveDaysWeatherBtn.classList.add('weather-button-active');
  fiveDaysWeatherBtn.removeEventListener('click', onFiveDaysWeatherBtnClick);
  todayWeatherBtn.classList.add('weather-button-unactive');
  todayWeatherBtn.addEventListener('click', onTodayWeatherBtnClick);
}

function onTodayWeatherBtnClick(e) {
  if (currentCity !== todayWeatherData.city) {
    if (!todayWeatherData.today) {
      todayWeatherData.getTodayWeather(todayWeatherData.city);
      currentCity = todayWeatherData.city;
    }
  }
  todayWeatherData.blockSection='today';
  weatherInfoToday.classList.remove('visually-hidden');
  dataToday.classList.remove('visually-hidden');
  quoteToday.classList.remove('visually-hidden');
  secondPage.classList.add('visually-hidden');
  weatherInfoBlock.classList.remove('pudding-for-five-days');

  todayWeatherBtn.classList.remove('weather-button-unactive');
  todayWeatherBtn.classList.add('weather-button-active');
  todayWeatherBtn.removeEventListener('click', onTodayWeatherBtnClick);
  fiveDaysWeatherBtn.classList.add('weather-button-unactive');
  fiveDaysWeatherBtn.addEventListener('click', onFiveDaysWeatherBtnClick);
}

const todayWeatherImg = document.querySelector('#weather-today-sky');
const todayWeatherCity = document.querySelector('.current-city-name');
const todayWeatherCurrentTemperature = document.querySelector(
  '.today-current-temperature',
);
const todayWeatherMinTemperature = document.querySelector('#today-min');
const todayWeatherMaxTemperature = document.querySelector('#today-max');

export default function renderDataInDom(data) {
  todayWeatherImg.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  todayWeatherCity.textContent = `${data.name}, ${data.sys.country}`;
  todayWeatherCurrentTemperature.textContent = `${Math.round(data.main.temp)}`;
  todayWeatherMinTemperature.textContent = `${Math.round(data.main.temp_min)}`;
  todayWeatherMaxTemperature.textContent = `${Math.round(data.main.temp_max)}`;
}
