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
  divBtns: document.querySelector('.hourly-weather-btns'),
  btnClose: document.querySelector('.hourly-weather-close'),
  galleryForItems: document.querySelector('.gallery'),
};



refs.fiveDaysList.addEventListener('click', handlerWeatherDay);

function handlerWeatherDay(event) {
  if (event.currentTarget === event.target) {
    return;
  }
  refs.btnClose.style.display = 'block';
  refs.containerMoreInfo.classList.remove('visually-hidden');
  // refs.containerMoreInfo.style.display = 'block';
  refs.divBtns.classList.remove('visually-hidden');
  refs.btnClose.addEventListener('click', handlerCloseHourlyWeather);
  refs.galleryForItems.style.display = 'block';
  refs.galleryForItems.classList.add('visually');

  function handlerCloseHourlyWeather(event){
    refs.containerMoreInfo.classList.add('visually-hidden');;
    pLi.classList.add('closedMoreInfo');
    pLi.classList.remove('coloredDay');
  }

  const dataAtribute = event.target.getAttribute('data-day');
  day = dataAtribute;
  const newArray = ourDays = filterArray(res.fiveDay.list, day);

  const elemLi = newArray.find(elem =>
    document.querySelector(`[data-day="${dataAtribute}"]`),
  );

  const pLi = document.querySelector(
    `[data-day="${moment(elemLi['dt'] * 1000).format('D')}"]`,
  );

  pLi.classList.add('coloredDay');

  const liElem1 = refs.fiveDaysList.childNodes[0];
  const liElem2 = refs.fiveDaysList.childNodes[2];
  const liElem3 = refs.fiveDaysList.childNodes[4];
  const liElem4 = refs.fiveDaysList.childNodes[6];
  const liElem5 = refs.fiveDaysList.childNodes[8];

  liElem1.addEventListener('click', handlerLi1);
  liElem2.addEventListener('click', handlerLi2);
  liElem3.addEventListener('click', handlerLi3);
  liElem4.addEventListener('click', handlerLi4);
  liElem5.addEventListener('click', handlerLi5);

  function handlerLi1() {
    liElem1.classList.add('coloredDay');
    liElem1.classList.remove('closedMoreInfo');
    liElem2.classList.remove('coloredDay');
    liElem3.classList.remove('coloredDay');
    liElem4.classList.remove('coloredDay');
    liElem5.classList.remove('coloredDay');
  }

  function handlerLi2() {
    liElem1.classList.remove('coloredDay');
    liElem2.classList.add('coloredDay');
    liElem2.classList.remove('closedMoreInfo');
    liElem3.classList.remove('coloredDay');
    liElem4.classList.remove('coloredDay');
    liElem5.classList.remove('coloredDay');
  }

  function handlerLi3() {
    liElem1.classList.remove('coloredDay');
    liElem2.classList.remove('coloredDay');
    liElem3.classList.add('coloredDay');
    liElem3.classList.remove('closedMoreInfo');
    liElem4.classList.remove('coloredDay');
    liElem5.classList.remove('coloredDay');
  }

  function handlerLi4() {
    liElem1.classList.remove('coloredDay');
    liElem2.classList.remove('coloredDay');
    liElem3.classList.remove('coloredDay');
    liElem4.classList.add('coloredDay');
    liElem4.classList.remove('closedMoreInfo');
    liElem5.classList.remove('coloredDay');
  }

  function handlerLi5() {
    liElem1.classList.remove('coloredDay');
    liElem2.classList.remove('coloredDay');
    liElem3.classList.remove('coloredDay');
    liElem4.classList.remove('coloredDay');
    liElem5.classList.add('coloredDay');
    liElem5.classList.remove('closedMoreInfo');
  }

  clearHourlyWeatherContainer();
  const markupHourlyWeather = newArray.reduce((acc, city) => {
    return (
      acc +
      `<li class="hourly-weather-item" id="${city.weather[0].main}">
      <p class="hourly-weather-item__set-time">${moment(
        city['dt'] * 1000,
      ).format('LT')}</p>
      <img class="hourly-weather-item__set-img" src="https://openweathermap.org/img/w/${
        city.weather[0].icon
      }.png" alt="">
      <p class="hourly-weather-item__set-temperature">${parseInt(
        city.main.temp,
      )}&deg;</p>
      <div class="hourly-weather-item__weather-details">
        <p class="hourly-weather-item__pressure-value">${
          city.main.pressure
        }mm</p>
        <p class="hourly-weather-item__humidity-value">${
          city.main.humidity
        }%</p>
        <p class="hourly-weather-item__wind-value">${city.wind.speed}m/s</p>
      </div>
    </li>`
    );
  }, '');

  refs.hourlyWeather.insertAdjacentHTML('beforeend', markupHourlyWeather);
  setTimeout(scroll => {
    window.scrollTo({
      top: 500,
      behavior: "smooth"
    })
  }, 350) 
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
// const VISIBLE_ITEMS = 3;

refs.btnPrev.style.display = 'none';

refs.btnNext.addEventListener('click', handlerNextHour);
refs.btnPrev.addEventListener('click', handlerPrevHour);

function handlerNextHour(event) {
  currentStep++;
  refs.btnPrev.style.display = 'block';
  setPosition();
}

let list = refs.hourlyWeather;

function handlerPrevHour(event) {
  currentStep--;
  refs.btnNext.style.display = 'block';
  
  list.style.transitionDuration = '500ms';
  setPosition();
}


function setPosition() {
  if (currentStep < 1) {
    refs.btnPrev.style.display = 'none';
  }
  if (currentStep + 2 >= ourDays.length) {
    refs.btnNext.style.display = 'none';
  }
  list.style.marginLeft = -currentStep * 140 + 'px';
  list.style.transitionDuration = '500ms';
}

// for submit form, repaint hours weather
// export function repaintNewHoursWeatherOnSubmitForm(res) {
//   refs.containerMoreInfo.style.display = 'block';
//   const newArray = (ourDays = filterArray(res.list, day));
//   clearHourlyWeatherContainer();
//   const markupHourlyWeather = newArray.reduce((acc, city) => {
//     return (
//       acc +
//       `<li class="hourly-weather-item">
//       <p class="hourly-weather-item__set-time">${moment(
//         city['dt'] * 1000,
//       ).format('LT')}</p>
//       <img class="hourly-weather-item__set-img" src="https://openweathermap.org/img/w/${
//         city.weather[0].icon
//       }.png" alt="">
//       <p class="hourly-weather-item__set-temperature">${parseInt(
//         city.main.temp,
//       )}&deg;</p>
//       <div class="hourly-weather-item__weather-details">
//         <p class="hourly-weather-item__pressure-value">${
//           city.main.pressure
//         }mm</p>
//         <p class="hourly-weather-item__humidity-value">${
//           city.main.humidity
//         }%</p>
//         <p class="hourly-weather-item__wind-value">${city.wind.speed}m/s</p>
//       </div>
//     </li>`
//     );
//   }, '');

//   refs.hourlyWeather.insertAdjacentHTML('beforeend', markupHourlyWeather);
// }
