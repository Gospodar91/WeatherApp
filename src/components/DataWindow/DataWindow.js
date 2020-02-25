import './DataWindow.css';
import GlobalEmitter from '../GlobalFunctionAndVariables/EventEmitter';

GlobalEmitter.on(GlobalEmitter.ON_DATE_LOADED, onDateReady);

function onDateReady(data) {
    alert('!')
  document.querySelector('.data__day').innerHTML = ""
  document.querySelector('.month');
  document.querySelector('.time');
  document.querySelector('.sunrise__time');
  document.querySelector('.twilight__time');
}

setTimeout(onDateReady, 1000, {
  coord: { lon: 35.18, lat: 47.82 },
  weather: [
    { id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' },
  ],
  base: 'stations',
  main: {
    temp: 3.68,
    feels_like: -2.71,
    temp_min: 3,
    temp_max: 4,
    pressure: 1012,
    humidity: 69,
  },
  visibility: 10000,
  wind: { speed: 6, deg: 290 },
  clouds: { all: 35 },
  dt: 1582618663,
  sys: {
    type: 1,
    id: 8902,
    country: 'UA',
    sunrise: 1582604959,
    sunset: 1582643757,
  },
  timezone: 7200,
  id: 687700,
  name: 'Zaporizhia',
  cod: 200,
});
