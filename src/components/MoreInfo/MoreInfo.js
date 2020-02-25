import './MoreInfo.css';
import GlobalEmitter from '../GlobalFunctionAndVariables/EventEmitter';
/* конфигурация */

let width = 118; // ширина картинки
let count = 4; // видимое количество изображений
const refMoreInfo = document.querySelector('.MoreInfo');

let list = refMoreInfo.querySelector('.more-info-list');
let listElems = refMoreInfo.querySelectorAll('.more-info-item');

let position = 4; // положение ленты прокрутки

refMoreInfo.querySelector('.hourly-weather-prev-btn').onclick = function() {
  // сдвиг влево
  position += width * count;
  // последнее передвижение влево может быть не на 3, а на 2 или 1 элемент
  position = Math.min(position, 4)
  list.style.marginLeft = position + 'px';
};

refMoreInfo.querySelector('.hourly-weather-next-btn').onclick = function() {
  // сдвиг вправо
  position -= width * count;
  // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
  position = Math.max(position, -width * (listElems.length - count));
  list.style.marginLeft = position + 'px';
};

document.addEventListener("swap", function(event){alert('Swaped ' + event.detail.direction + ' at ' + event.target.id);}, false);