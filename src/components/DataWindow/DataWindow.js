import './DataWindow.css';
// import data from './data.json';

const dayNow = document.querySelector('.data__day');
const monthNow = document.querySelector('.month');
const timeNow = document.querySelector('.time');
const sunriseTime = document.querySelector('.sunrise__time');
const sunsetTime = document.querySelector('.twilight__time');

function buildDataWindowLayout(data) {
  const date = new Date ()
  const localTime = date.getTime()
  const localOffset = date.getTimezoneOffset()*60000
  const utc = localTime + localOffset
  const timeDifference = utc + (1000*data.timezone) 
  const actualTime = new Date(timeDifference)
  console.log(actualTime)
}

export default buildDataWindowLayout;
