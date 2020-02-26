import './MoreInfo.css';
import GlobalEmitter from '../GlobalFunctionAndVariables/EventEmitter';
import rez from '../../services.js';


console.log(rez.city);

const refs = {
    moreInfoFirstDay: document.querySelector('.js-FiveDaysWeaterList__firstDay'),
    moreInfoSecondDay: document.querySelector('.js-FiveDaysWeaterList__secondDay'),
    containerWeatherForFirstDay: document.querySelector('.js-MoreInfoFirstDay'),
    containerWeatherForSecondDay: document.querySelector('.js-MoreInfoSecondDay'),
    containerWeatherForThirdDay: document.querySelector('.js-MoreInfoSecondDay'),
    containerWeatherForForthDay: document.querySelector('.js-MoreInfoSecondDay'),
    containerWeatherForFifthDay: document.querySelector('.js-MoreInfoSecondDay'),
    setTemperature: document.querySelector('.more-info-item__set-temperature'),
    setPressure: document.querySelector('.more-info-item__pressure-value'),
    setHumidity: document.querySelector('.more-info-item__humidity-value'),
    setWind: document.querySelector('.more-info-item__wind-value'),
}

const showTemperature = rez => {
    refs.setTemperature.textContent = `${rez.city}`;
    refs.setPressure.textContent = `${rez.fiveDay.list[0].main['pressure']}mm`;
    refs.setHumidity.textContent = `${rez.fiveDay.list[0].main['humidity']}%`;
    refs.setWind.textContent = `${rez.fiveDay.list[0].wind['speed']}m/s`;
    console.log(rez.fiveDay.list[0].wind['speed'])
  };

refs.moreInfoFirstDay.addEventListener('click', handlerWeatherForFirstDay);
refs.moreInfoSecondDay.addEventListener('click', handlerWeatherForSecondDay);


function handlerWeatherForFirstDay(event) {
    showTemperature(rez);
    refs.containerWeatherForFirstDay.style.display = 'block';
    refs.containerWeatherForSecondDay.style.display = 'none';
}

function handlerWeatherForSecondDay(event) {
    refs.containerWeatherForFirstDay.style.display = 'none';
    refs.containerWeatherForSecondDay.style.display = 'block';
}
