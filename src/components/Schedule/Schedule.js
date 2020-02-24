import './Schedule.css';
import canvas from './canvasjs.min.js';

const scheduleButtons = document.querySelector('.schedule__div');
const legend = document.querySelector('.schedule__legend');
const scheduleButtonText = document.querySelector('.show-charts');
const ellipse = document.querySelector('.ellipse-img');
const scheduleSection = document.querySelector('.schedule');

scheduleButtons.addEventListener('click', openChart);

function openChart(e) {
  ellipse.classList.toggle('ellipse-img-open');
  scheduleSection.classList.toggle('none-schedule');
  legend.classList.toggle('schedule__legend-none');
  if (ellipse.classList.contains('ellipse-img-open')) {
    scheduleButtonText.textContent = 'Hide Chart';
  } else {
    scheduleButtonText.textContent = 'Show Chart';
  }
}
