import './MoreInfo.css';
import GlobalEmitter from '../GlobalFunctionAndVariables/EventEmitter';
import res from '../../services.js';
const moment = require('moment');
let day;
// import hourlyWeatherTemp from './hourlyWeatherTemplate.hbs';

const refs = {
  fiveDaysList: document.querySelector('.FiveDaysWeaterList'),
  hourlyWeather: document.querySelector('.hourly-weather'),
  fiveDaysItem: document.querySelector('.FiveDaysWeaterList__item'),
  containerMoreInfo: document.querySelector('.MoreInfo'),
};

refs.fiveDaysList.addEventListener('click', handlerWeatherDay);

function handlerWeatherDay(event) {
  if (event.currentTarget === event.target) {
    return;
  }
  refs.containerMoreInfo.style.display = 'block';
  const dataAtribute = event.target.getAttribute('data-day');
  day = dataAtribute;
  const newArray = filterArray(res.fiveDay['list'], day);
  console.log(newArray);

//   const markupHourlyWeather = newArray.reduce(
//     (acc, city) => acc + hourlyWeatherTemp(city),
//     "",);

   // console.log('hghgjhgj', markupHourlyWeather)

//   refs.hourlyWeather.insertAdjacentHTML('beforeend', markupHourlyWeather);
}

function filterArray(array, letDay) {
  return array.filter(item => moment(item['dt'] * 1000).format('D') == letDay);
}

function clearHourlyWeatherContainer() {
  refs.country.innerHTML = '';
}
