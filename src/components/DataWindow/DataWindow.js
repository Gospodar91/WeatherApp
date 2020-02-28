import './DataWindow.css';const dayNow = document.querySelector('.data__day');
const monthNow = document.querySelector('.month');
const timeNow = document.querySelector('.time');
const sunriseTime = document.querySelector('.sunrise__time');
const sunsetTime = document.querySelector('.twilight__time');
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
let resetInterval;
function buildDataWindowLayout(data) {
  clearInterval(resetInterval);
  resetInterval = setInterval(() => {
    const date = new Date();
    const localTime = date.getTime();
    const localOffset = date.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const timeDifference = utc + 1000 * data.timezone;
    const actualTime = new Date(timeDifference);
    dayNow.textContent = days[actualTime.getDay()] + ` ` + actualTime.getDate();
    monthNow.textContent = months[actualTime.getMonth()];    timeNow.textContent =
      pad(actualTime.getHours()) +
      `:` +
      pad(actualTime.getMinutes()) +
      `:` +
      pad(actualTime.getSeconds());
  }, 1000);  const sunriseTimeMs = data.sys.sunrise;
  const currentSunrise = new Date(sunriseTimeMs * 1000);
  const getSunriseTime = currentSunrise.getTime();
  const sunriseOffset = currentSunrise.getTimezoneOffset() * 60000;
  const sunriseUtc = getSunriseTime + sunriseOffset;
  const sunriseTimeZone = sunriseUtc + 1000 * data.timezone;
  const actualSunriseTime = new Date(sunriseTimeZone);
  sunriseTime.textContent =
    pad(actualSunriseTime.getHours()) +
    `:` +
    pad(actualSunriseTime.getMinutes());  const sunsetTimeMs = data.sys.sunset;
  const currentSunset = new Date(sunsetTimeMs * 1000);
  const getSunsetTime = currentSunset.getTime();
  const sunsetOffset = currentSunset.getTimezoneOffset() * 60000;
  const sunsetUtc = getSunsetTime + sunsetOffset;
  const sunsetTimeZone = sunsetUtc + 1000 * data.timezone;
  const actualSunsetTime = new Date(sunsetTimeZone);
  sunsetTime.textContent =
    pad(actualSunsetTime.getHours()) + `:` + pad(actualSunsetTime.getMinutes());
}function pad(value) {
  return String(value).padStart(2, '0');
}
export default buildDataWindowLayout;