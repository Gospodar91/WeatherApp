import './MoreInfo.css';
import res from '../../services.js';
import moment from 'moment';
let day;

const refs = {
  fiveDaysList: document.querySelector('.FiveDaysWeaterList'),
  hourlyWeather: document.querySelector('.hourly-weather-list'),
  fiveDaysItem: document.querySelector('.FiveDaysWeaterList__item'),
  containerMoreInfo: document.querySelector('.MoreInfo'),
  btnNext: document.querySelector('.hourly-weather-next-btn'),
  btnPrev: document.querySelector('.hourly-weather-prev-btn'),
};

refs.fiveDaysList.addEventListener('click', handlerWeatherDay);

function handlerWeatherDay(event) {
  if (event.currentTarget === event.target) {
    return;
  }
  refs.containerMoreInfo.style.display = 'block';
  const dataAtribute = event.target.getAttribute('data-day');
  day = dataAtribute;
  const newArray = ourDays = filterArray(res.fiveDay['list'], day);
  clearHourlyWeatherContainer();

  const markupHourlyWeather = newArray.reduce(
    (acc, city) => {
      return acc + `<li class="hourly-weather-item">
      <p class="hourly-weather-item__set-time">${moment(city['dt'] * 1000).format('LT')}</p>
      <img class="hourly-weather-item__set-img" src="https://openweathermap.org/img/w/${city.weather[0].icon}.png" alt="">
      <p class="hourly-weather-item__set-temperature">${parseInt(city.main.temp)}&deg;</p>
      <div class="hourly-weather-item__weather-details">
        <p class="hourly-weather-item__pressure-value">${city.main.pressure}mm</p>
        <p class="hourly-weather-item__humidity-value">${city.main.humidity}%</p>
        <p class="hourly-weather-item__wind-value">${city.wind.speed}m/s</p>
      </div>
    </li>`
    },
    "",);

  refs.hourlyWeather.insertAdjacentHTML('beforeend', markupHourlyWeather);
}

function filterArray(array, letDay) {
  return array.filter(item => moment(item['dt'] * 1000).format('D') == letDay);
}

function clearHourlyWeatherContainer() {
  refs.hourlyWeather.innerHTML = '';
}

// slider

let currentStep = 0;
let ourDays;
const VISIBLE_ITEMS = 3;

refs.btnPrev.style.display = 'none';

refs.btnNext.addEventListener('click', handlerNextHour);
refs.btnPrev.addEventListener('click', handlerPrevHour);


function handlerNextHour (event) {
  currentStep++;
  refs.btnPrev.style.display = 'block';
  setPosition();
}

function handlerPrevHour (event) {
 currentStep--;
 refs.btnNext.style.display = 'block';
  setPosition();
}
let list = refs.hourlyWeather;
function setPosition () {

  if (currentStep<1){
    refs.btnPrev.style.display = 'none';
  }
  if (currentStep + 2>= ourDays.length){
    refs.btnNext.style.display = 'none';
  }
  list.style.marginLeft = -currentStep * 160 + 'px';
};

// for submit form, repaint hours weather
export function repaintNewHoursWeatherOnSubmitForm(res) {
  refs.containerMoreInfo.style.display = 'block';
  const newArray = ourDays = filterArray(res.list, day);
  clearHourlyWeatherContainer();

  const markupHourlyWeather = newArray.reduce(
    (acc, city) => {
      return acc + `<li class="hourly-weather-item">
      <p class="hourly-weather-item__set-time">${moment(city['dt'] * 1000).format('LT')}</p>
      <img class="hourly-weather-item__set-img" src="https://openweathermap.org/img/w/${city.weather[0].icon}.png" alt="">
      <p class="hourly-weather-item__set-temperature">${parseInt(city.main.temp)}&deg;</p>
      <div class="hourly-weather-item__weather-details">
        <p class="hourly-weather-item__pressure-value">${city.main.pressure}mm</p>
        <p class="hourly-weather-item__humidity-value">${city.main.humidity}%</p>
        <p class="hourly-weather-item__wind-value">${city.wind.speed}m/s</p>
      </div>
    </li>`
    },
    "",);

  refs.hourlyWeather.insertAdjacentHTML('beforeend', markupHourlyWeather);
}

