import './Schedule.css';
import GlobalEmitter from '../GlobalFunctionAndVariables/EventEmitter.js';
import moment from 'moment';
import Chart from 'chart.js';
const ctx = document.getElementById('myChart');
const chartDiv = document.querySelector('.chartDiv');
import datajson from './data.json';
const scheduleButtons = document.querySelector('.schedule__div');
const scheduleButtonText = document.querySelector('.show-charts');
const ellipse = document.querySelector('.ellipse-img');
const scheduleSection = document.querySelector('#schedule');
let initData;
let tempAverage = {};
let humidityAverage = {};
let windspeedAverage = {};
let pressureAverage = {};
GlobalEmitter.on(GlobalEmitter.ON_GRAPH_READY, findScheduleData);

export default function findScheduleData(data) {
  tempAverage = {};
  humidityAverage = {};
  windspeedAverage = {};
  pressureAverage = {};
  const dataArray = data.list;
  const SCREEN_VISIBLE_DAYS = 5;
  const PERIODS_IN_ONE_DAY = dataArray.length / SCREEN_VISIBLE_DAYS; // 8
  const fiveDaysArr = dataArray.filter(
    day => dataArray.indexOf(day) % PERIODS_IN_ONE_DAY === 0,
  );
  // console.log('Data', data);
  // console.log('DataArray', dataArray);

  dataArray.map(day => {
    const dt = day.dt_txt.split(' ')[0];
    tempAverage[dt] = tempAverage[dt]
      ? tempAverage[dt] + day.main.temp / PERIODS_IN_ONE_DAY
      : day.main.temp / PERIODS_IN_ONE_DAY;
  });

  dataArray.map(day => {
    const dt = day.dt_txt.split(' ')[0];
    humidityAverage[dt] = humidityAverage[dt]
      ? humidityAverage[dt] + day.main.humidity / PERIODS_IN_ONE_DAY
      : day.main.humidity / PERIODS_IN_ONE_DAY;
  });

  dataArray.map(day => {
    const dt = day.dt_txt.split(' ')[0];
    windspeedAverage[dt] = windspeedAverage[dt]
      ? windspeedAverage[dt] + day.wind.speed / PERIODS_IN_ONE_DAY
      : day.wind.speed / PERIODS_IN_ONE_DAY;
  });

  dataArray.map(day => {
    const dt = day.dt_txt.split(' ')[0];
    pressureAverage[dt] = pressureAverage[dt]
      ? pressureAverage[dt] + day.main.pressure / PERIODS_IN_ONE_DAY
      : day.main.pressure / PERIODS_IN_ONE_DAY;
  });

  const datesArr = fiveDaysArr.map(day =>
    moment(day.dt * 1000).format('Do MMM YYYY'),
  );
  const temp = Object.values(tempAverage).map(temp => Math.floor(temp));
  const humidity = Object.values(humidityAverage).map(hum => Math.round(hum));
  const pressure = Object.values(pressureAverage).map(pres => Math.round(pres));
  const wind = Object.values(windspeedAverage).map(wind => Math.round(wind));
  initData = {
    type: 'line',
    data: {
      labels: [...datesArr],
      datasets: [
        {
          data: [...temp],
          label: 'Temperature, C°',
          borderColor: '#ff6b08',
          fill: false,
        },
        {
          data: [...humidity],
          label: 'Humidity, %',
          borderColor: '#4169e1',
          fill: false,
        },
        {
          data: [...wind],
          label: 'Wind Speed, m/s',
          borderColor: '#eb9b05',
          fill: false,
        },
        {
          data: [...pressure],
          label: 'Atmosphere Pressure, m/m',
          borderColor: '#057806',
          fill: false,
        },
      ],
    },
  };
  if (window.matchMedia('(min-width: 1280px)').matches) {
    ctx.height = 100;
    myChart = new Chart(ctx, initData);
  }
  if (window.matchMedia('(min-width: 768px)').matches) {
    ctx.height = 100;
    myChart = new Chart(ctx, initData);
  }
  if (window.matchMedia('(min-width: 320px)').matches) {
    ctx.height = 500;
    myChart = new Chart(ctx, initData);
  }
}

let myChart;
function scrollSchedule() {
  window.scrollTo({
    top: 1000,
    behavior: 'smooth',
  });
}

scheduleButtons.addEventListener('click', openChart);
function openChart(e) {
  ellipse.classList.toggle('ellipse-img-open');
  if (ellipse.classList.contains('ellipse-img-open')) {
    setTimeout(scrollSchedule, 400);
    scheduleButtonText.textContent = 'Hide Chart';
    scheduleSection.classList.add('schedule');
    scheduleSection.classList.remove('none-schedule');
  } else {
    scheduleButtonText.textContent = 'Show Chart';
    scheduleSection.classList.remove('schedule');
    scheduleSection.classList.add('none-schedule');
  }
  chartDiv.classList.toggle('none-chart');
}
