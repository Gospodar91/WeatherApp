import './FiveDaysSmall.css';
import fiveDaysTemplate from './5-days-template.hbs';
const moment = require('moment');
const fiveDaysList = document.querySelector('.FiveDaysWeaterList');

function parseData(obj) {
  const cityMobile = document.querySelector('.FiveDaysSmall__city-mobile');
  const cityTablet = document.querySelector('.FiveDaysSmall__city-tablet');
  const city = obj.city.name;
  const country = obj.city.country;
  cityMobile.innerHTML = `${city}, ${country}`;
  cityTablet.innerHTML = `${city}, ${country}`;

  const dataArray = obj.list;
  const SCREEN_VISIBLE_DAYS = 5;
  const PERIODS_IN_ONE_DAY = dataArray.length / SCREEN_VISIBLE_DAYS;// 8 
  const fiveDaysArr = dataArray.filter(day => dataArray.indexOf(day) % PERIODS_IN_ONE_DAY === 0);

  const daysArr = fiveDaysArr.map(day => moment(day.dt * 1000).format('dddd'));
  const datesArr = fiveDaysArr.map(day => moment(day.dt * 1000).format("DD MMM"));
  const iconsArr = fiveDaysArr.map(day => day.weather[0].icon);
  const daysForGalaArr = fiveDaysArr.map(day => moment(day.dt * 1000).format('D'));
  const MaxTempFromFiveDaysArr = daysForGalaArr.map(DAY => {
    const maxArray = dataArray.filter(day => moment(day.dt * 1000).format('D') == DAY).map(day => day.main.temp_max);
    return Math.round(Math.max(...maxArray));
  });
  const MinTempFromFiveDaysArr = daysForGalaArr.map(DAY => {
    const maxArray = dataArray.filter(day => moment(day.dt * 1000).format('D') == DAY).map(day => day.main.temp_max);
    return Math.round(Math.min(...maxArray));
  });

  const fiveDaysData = [{}, {}, {}, {}, {}];

  daysArr.forEach((el, i) => { fiveDaysData[i].day = el; fiveDaysData[i].weather = obj.list[i].weather[0].main;});
  datesArr.forEach((el, i) => { fiveDaysData[i].date = el });
  iconsArr.forEach((el, i) => { fiveDaysData[i].icon = el });
  MinTempFromFiveDaysArr.forEach((el, i) => { fiveDaysData[i].min = el });
  MaxTempFromFiveDaysArr.forEach((el, i) => { fiveDaysData[i].max = el });
  daysForGalaArr.forEach((el, i) => { fiveDaysData[i].dayForGala = el });

  const markUp = fiveDaysTemplate(fiveDaysData);
  fiveDaysList.innerHTML = '';
  fiveDaysList.insertAdjacentHTML('beforeend', markUp);
}

export default parseData;

///////////SLIDER//
const prevArrow = document.querySelector('.FiveDaysSmall__navBtn--left'); 
const nextArrow = document.querySelector('.FiveDaysSmall__navBtn--right'); 
let currentStep = 0;

nextArrow.addEventListener('click', handlerNextHour);
prevArrow.addEventListener('click', handlerPrevHour);

function handlerNextHour(event) {
  if(currentStep >= 2){
    return
  }
  currentStep++;
  setPositionRight();
}
function handlerPrevHour(event) {
  if(currentStep <= 0){
    return
  }
  currentStep--;
  setPositionLeft();
}
function setPositionRight() {
  fiveDaysList.style.transform += `translateX(-84px)`;
  fiveDaysList.style.transitionDuration = '500ms';
}
function setPositionLeft() {
  fiveDaysList.style.transform += `translateX(84px)`;
  fiveDaysList.style.transitionDuration = '500ms';
}
///////////SLIDER//