import './MoreInfo.css';
import GlobalEmitter from '../GlobalFunctionAndVariables/EventEmitter';
import res from '../../services.js';
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

export default function showTemperature (res) {
    refs.setTemperature.textContent = `${res.list[0].main.temp}`;
    refs.setPressure.textContent = `${res.list[0].main['pressure']}mm`;
    refs.setHumidity.textContent = `${res.list[0].main['humidity']}%`;
    refs.setWind.textContent = `${res.list[0].wind['speed']}m/s`;
    console.log('ooooooo',res.list[0].wind['speed'])
  };

// refs.moreInfoFirstDay.addEventListener('click', handlerWeatherForFirstDay);
// refs.moreInfoSecondDay.addEventListener('click', handlerWeatherForSecondDay);


function handlerWeatherForFirstDay(event) {
    refs.containerWeatherForFirstDay.style.display = 'block';
    refs.containerWeatherForSecondDay.style.display = 'none';
}

function handlerWeatherForSecondDay(event) {
    refs.containerWeatherForFirstDay.style.display = 'none';
    refs.containerWeatherForSecondDay.style.display = 'block';
}