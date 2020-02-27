import './Schedule.css';
import moment from 'moment';
import Chart from 'chart.js';
const ctx = document.getElementById('myChart');
const chartDiv = document.querySelector('.chartDiv');
import datajson from './data.json';
console.log('Schedule data', datajson);
const scheduleButtons = document.querySelector('.schedule__div');
const scheduleButtonText = document.querySelector('.show-charts');
const ellipse = document.querySelector('.ellipse-img');
const scheduleSection = document.querySelector('#schedule');
import GlobalEmitter from '../GlobalFunctionAndVariables/EventEmitter';
// GlobalEmitter.on(GlobalEmitter.ON_GRAPH_READY, onGraphReady);
// function onGraphReady(data){
// }
let initData;

function findScheduleData(data) {
  const dataArray = data.list;
  const SCREEN_VISIBLE_DAYS = 5;
  const PERIODS_IN_ONE_DAY = dataArray.length / SCREEN_VISIBLE_DAYS; // 8
  const fiveDaysArr = dataArray.filter(
    day => dataArray.indexOf(day) % PERIODS_IN_ONE_DAY === 0,
  );
  const daysArr = fiveDaysArr.map(day => moment(day.dt * 1000).format('dddd'));
  const datesArr = fiveDaysArr.map(day =>
    moment(day.dt * 1000).format('Do MMM'),
  );
  const temp = fiveDaysArr.map(day => parseInt(day.main.temp));
  const humidity = fiveDaysArr.map(day => parseInt(day.main.humidity));
  const pressure = fiveDaysArr.map(day => parseInt(day.main.pressure));
  const wind = fiveDaysArr.map(day => parseInt(day.wind.speed));
   initData = {
    type: 'line',
    data: {
      labels: [...daysArr],
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
}

let myChart;

scheduleButtons.addEventListener('click', openChart);
function openChart(e) {
  ellipse.classList.toggle('ellipse-img-open');
  if (ellipse.classList.contains('ellipse-img-open')) {
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
if (window.matchMedia('(min-width: 1280px)').matches) {
  findScheduleData(datajson)
  ctx.height = 100;
  myChart = new Chart(ctx, initData);
}
if (window.matchMedia('(min-width: 768px)').matches) {
  findScheduleData(datajson)
  ctx.height = 100;
  myChart = new Chart(ctx, initData);
}
if (window.matchMedia('(min-width: 320px)').matches) {
  findScheduleData(datajson)
  ctx.height = 500;
  myChart = new Chart(ctx, initData);
}