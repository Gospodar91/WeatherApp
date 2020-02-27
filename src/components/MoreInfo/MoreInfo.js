import './MoreInfo.css';
import GlobalEmitter from '../GlobalFunctionAndVariables/EventEmitter';
import res from '../../services.js';
let day = 0;

const refs = {
    fiveDaysList: document.querySelector('.FiveDaysWeaterList'),
    hourlyWeather: document.querySelector('.hourly-weather'),
}

export default function showTemperature (res) {
    refs.setTemperature.textContent = `${res.list[0].main.temp}`;
    refs.setPressure.textContent = `${res.list[0].main['pressure']}mm`;
    refs.setHumidity.textContent = `${res.list[0].main['humidity']}%`;
    refs.setWind.textContent = `${res.list[0].wind['speed']}m/s`;
    console.log('ooooooo',res.list[0].wind['speed'])
  };

refs.fiveDaysList.addEventListener('click', handlerWeatherDay);
// refs.moreInfoSecondDay.addEventListener('click', handlerWeatherForSecondDay);


function handlerWeatherDay(event) {
  const 
}

// в item поступит ссылка на лишку
function showDataAtribute (item) {
    const dataAtribute = item.getAtribute("");
}