import './DataWindow.css';
// import data from './data.json';
const dayNow = document.querySelector('.data__day');
const monthNow = document.querySelector('.month');
const timeNow = document.querySelector('.time');
const sunriseTime = document.querySelector('.sunrise__time');
const sunsetTime = document.querySelector('.twilight__time');

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function buildDataWindowLayout(data) {
 
  setInterval(() => {
    const date = new Date();
    const localTime = date.getTime();
    const localOffset = date.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const timeDifference = utc + 1000 * data.timezone;
    const actualTime = new Date(timeDifference);
    dayNow.innerHTML = days[actualTime.getDay()] + ` ` + actualTime.getDate();
    monthNow.innerHTML = months[actualTime.getMonth()];
    
    timeNow.innerHTML =
      pad(actualTime.getHours()) +
      `:` +
      pad(actualTime.getMinutes()) +
      `:` +
      pad(actualTime.getSeconds());
  }, 1000);
  
}
function pad(value) {
  return String(value).padStart(2, '0');
}
export default buildDataWindowLayout;
