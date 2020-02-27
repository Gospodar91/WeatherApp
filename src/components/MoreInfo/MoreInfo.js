import './MoreInfo.css';
import res from '../../services.js';
import moment from 'moment';
let day;

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
  clearHourlyWeatherContainer();

  const markupHourlyWeather = newArray.reduce(
    (acc, city) => {
      return acc + `<li class="more-info-item more-info-item__time-00-00">
      <p class="more-info-item__set-time">${moment(city.dt).format('hh:mm')}</p>
      <img class="more-info-item__set-img" src="https://openweathermap.org/img/w/${city.weather[0].icon}.png" alt="">
      <p class="more-info-item__set-temperature">${parseInt(city.main.temp)}&deg;</p>
      <div class="more-info-item__weather-details">
        <p class="more-info-item__pressure-value">${city.main.pressure}mm</p>
        <p class="more-info-item__humidity-value">${city.main.humidity}%</p>
        <p class="more-info-item__wind-value">${city.wind.speed}m/s</p>
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
