import './FiveDaysSmall.css';

// const $ = require("jquery");
// import  'slick-carousel/slick/slick.css'
// import slick from 'slick-carousel/slick/slick.js'

//   $('.FiveDaysWeaterList').slick({
//     infinite: true,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     prevArrow: '.FiveDaysSmall__navBtn--left',
//     nextArrow: '.FiveDaysSmall__navBtn--right'
//   });

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
    const minArr = fiveDaysArr.map(day => parseInt(day.main.temp_min));
    const maxArr = fiveDaysArr.map(day => parseInt(day.main.temp_max));
    const daysForGalaArr = fiveDaysArr.map(day => moment(day.dt * 1000).format('D'));
    
    const fiveDaysData = [{}, {}, {}, {}, {}];

    daysArr.forEach((el, i) => { fiveDaysData[i].day = el });
    datesArr.forEach((el, i) => { fiveDaysData[i].date = el });
    iconsArr.forEach((el, i) => { fiveDaysData[i].icon = el });
    minArr.forEach((el, i) => { fiveDaysData[i].min = el });
    maxArr.forEach((el, i) => { fiveDaysData[i].max = el });
    daysForGalaArr.forEach((el, i) => { fiveDaysData[i].dayForGala = el });

    const markUp = fiveDaysTemplate(fiveDaysData);
    fiveDaysList.innerHTML = '';
    fiveDaysList.insertAdjacentHTML('beforeend', markUp);
}

export default parseData;