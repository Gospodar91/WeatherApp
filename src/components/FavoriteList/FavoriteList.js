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

//function for drawing and deleting buttons
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

//left button
prevButton.addEventListener('click', onClickPrevBtn);
function onClickPrevBtn(event) {
  qtyClickBtn--;
  if (qtyClickBtn < lenghtLiChild + 1) {
    prevButton.hidden = true;
  }
  nextButton.hidden = false;
  choiseLii.forEach(li => {
    li.style.transform += 'translateX(113px)';
    li.style.transitionDuration = 500 + 'ms';
  });
}

//right button
nextButton.addEventListener('click', onClickNextBtn);
function onClickNextBtn(event) {
  let clientWidth = document.documentElement.clientWidth;
  let lenghtLiChild = favoritesUl.children.length;
  qtyClickBtn++;
  if (qtyClickBtn > lenghtLiChild - 3 && clientWidth < 770) {
    nextButton.hidden = true;
  } else if (qtyClickBtn > lenghtLiChild - 5 && clientWidth > 771) {
    nextButton.hidden = true;
  }
  prevButton.hidden = false;
  choiseLii.forEach(li => {
    li.style.transform += 'translateX(-113px)';
    li.style.transitionDuration = 500 + 'ms';
  });
}

let city = input;
export function onClickFavorites() {
  city = input.value;
  if (city.length >= 1) {
    favoritesUl.innerHTML = '';
    setDataInLS(city);
    getDataFromLS();
    favorites.classList.add('bgNew');
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
  }
}
function getDataFromLS() {
  const lsData = localStorage.getItem('town');
  if (lsData) {
    const parsedSettings = JSON.parse(lsData);
    const markup = favoritesLocal({ parsedSettings });
    favoritesUl.insertAdjacentHTML('beforeend', markup);
  }
  checkQtyLi();
}
getDataFromLS();
if (favoritesUl.children.length) {
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
}
