import './DataWindow.css';
// import data from './data.json';

const dayNow = document.querySelector('.data__day');
const monthNow = document.querySelector('.month');
const timeNow = document.querySelector('.time');
const sunriseTime = document.querySelector('.sunrise__time');
const sunsetTime = document.querySelector('.twilight__time');

function buildDataWindowLayout(data) {
  // const date = new Date(data.dt);
  // const hoursTest = date.getHours();
  // console.log(hoursTest);
  // document.querySelector('.time').innerHTML = hoursTest;
  const smth = new Date ()
  const localTime = smth.getTime()
  const localOffset = smth.getTimezoneOffset()*60000
  const utc = localTime + localOffset
  const shit = utc + (1000*data.timezone) 
  const newShit = new Date(shit)
  console.log(newShit)
}

export default buildDataWindowLayout;
