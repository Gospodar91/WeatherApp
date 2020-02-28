import './FavoriteList.css';
import services from '../../services';
import GlobalEmitter from '../GlobalFunctionAndVariables/EventEmitter';
import favoritesLocal from './favoritesLocal.hbs';
import PNotify from '../../../node_modules/pnotify/dist/es/PNotify.js';
import PNotifyButtons from '../../../node_modules/pnotify/dist/es/PNotifyButtons.js';
import '../../../node_modules/pnotify/dist/PNotifyBrightTheme.css';

const favorites = document.querySelector('.search__form-favourite');
const input = document.querySelector('#search-input');
const favoritesUl = document.querySelector('.favorites-list');
const nextButton = document.querySelector('.favorite-next');
const prevButton = document.querySelector('.favourite-prev');

nextButton.hidden = true;
prevButton.hidden = true;

let qtyClickBtn = 0;
let choiseLii = favoritesUl.children;
let lenghtLiChild = favoritesUl.children.length;
let clientWidth = document.documentElement.clientWidth;
let widthArray = [];

function receiveLenghtLi(event) {
  let searchLi = document.querySelectorAll('.favorites-list__item');
  for (let i = 0; i < searchLi.length; i++) {
    widthArray.push(searchLi[i].offsetWidth);
  }
}

//функция для появления и удаления кнопок
function checkQtyLi() {
  if (favoritesUl.children.length) {
    let key = JSON.parse(localStorage.getItem('town'));
    if (clientWidth < 771) {
      if (key.length > 2) {
        nextButton.hidden = false;
      }
    } else if (clientWidth > 771) {
      if (key.length > 4) {
        nextButton.hidden = false;
      }
    }
  }
}

//назад кнопка
prevButton.addEventListener('click', onClickPrevBtn);
function onClickPrevBtn(event) {
  qtyClickBtn--;
  if (qtyClickBtn < lenghtLiChild + 1) {
    prevButton.hidden = true;
    //когда дошел до конца слайда PREV пропала
  }
  nextButton.hidden = false;
  choiseLii.forEach(li => {
    li.style.transform += 'translateX(113px)';
    li.style.transitionDuration = 500 + 'ms';
  });
}

//вперед кнопка
nextButton.addEventListener('click', onClickNextBtn);
function onClickNextBtn(event) {
  let clientWidth = document.documentElement.clientWidth;
  let lenghtLiChild = favoritesUl.children.length;
  qtyClickBtn++;
  if (qtyClickBtn > lenghtLiChild - 3 && clientWidth < 770) {
    nextButton.hidden = true;
    // когда долистал до конца пропала кнопка Next
  } else if (qtyClickBtn > lenghtLiChild - 5 && clientWidth > 771) {
    nextButton.hidden = true;
  }
  prevButton.hidden = false;
  //когда пролистал вправо появилась PREV
  choiseLii.forEach(li => {
    li.style.transform += 'translateX(-113px)';
    li.style.transitionDuration = 500 + 'ms';
  });
  receiveLenghtLi();
}

// favorites.addEventListener('click', onClickFavorites);
let city = input;
export function onClickFavorites() {
  city = input.value;
  if (city.length >= 1) {
    favoritesUl.innerHTML = '';
    setDataInLS(city);
    getDataFromLS();
    // favorites.classList.add('bgNew');
    checkQtyLi();
  } else {
    PNotify.defaults.delay = 1200;
    PNotify.error({
      title: 'Oh No!',
      text: 'Enter city!',
    });
  }
}

function setDataInLS(city) {
  const lsData = localStorage.getItem('town');
  if (lsData) {
    const parsedDataFromLs = JSON.parse(lsData);
    if (parsedDataFromLs.includes(city)) {
      PNotify.defaults.delay = 1200;
      PNotify.error({
        title: 'Oh No!',
        text: 'This city you have already added!',
      });
      return;
    }
    localStorage.setItem('town', JSON.stringify([...parsedDataFromLs, city]));
  } else {
    localStorage.setItem('town', JSON.stringify([city]));
    document.querySelector('.search__form-favourite').removeEventListener('click', onClickFavorites);
  }
}

function getDataFromLS() {
  const lsData = localStorage.getItem('town');
  if (lsData) {
    const parsedSettings = JSON.parse(lsData);
    const markup = favoritesLocal({ parsedSettings });
    favoritesUl.insertAdjacentHTML('beforeend', markup);
    checkQtyLi();
  }
}
getDataFromLS();

favoritesUl.addEventListener('click', onClickLink);
function onClickLink(e) {
  e.preventDefault();
  if (e.target === e.currentTarget) {
    return;
  } else if (e.target.tagName === 'BUTTON') {
    const lsData = JSON.parse(localStorage.getItem('town'));
    const lsDataFilter = lsData.filter(el => el !== e.target.dataset.text);
    localStorage.setItem('town', JSON.stringify(lsDataFilter));
    e.target.parentNode.remove();
  } else {
    services.city = input.value = e.target.textContent;
    GlobalEmitter.emit(GlobalEmitter.ON_SEND_SUBMIT_FROM_FAVORITES, e);
    favorites.classList.add('bgNew');
  }
}
