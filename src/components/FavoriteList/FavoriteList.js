import './FavoriteList.css';

import GlobalEmitter from '../GlobalFunctionAndVariables/EventEmitter';
import favoritesList from './favoritesLi.hbs';
import PNotify from '../../../node_modules/pnotify/dist/es/PNotify.js';
import PNotifyButtons from '../../../node_modules/pnotify/dist/es/PNotifyButtons.js';
import '../../../node_modules/pnotify/dist/PNotifyBrightTheme.css';

const favorites = document.querySelector('.search__form-favourite');
const input = document.querySelector('#search-input');
const favoritesUl = document.querySelector('.favorites-list');
const listBtn = document.querySelector('.favorite-next');

favorites.addEventListener('click', onClickFavorites);
let city;

// function getDataFromLS() {
//   const lsData = localStorage.getItem('town');
//   if(lsData) {
//     const parsedSettings = JSON.parse(lsData);
//     city = parsedSettings;
//     const markup = favoritesList({ city });
//     favoritesUl.insertAdjacentHTML('beforeend', markup);
//   }
//   return [];
// }
function setDataInLS(city) {
  const lsData = localStorage.getItem('town');
  if (lsData) {
    const parsedDataFromLs = JSON.parse(lsData);
    localStorage.setItem('town', JSON.stringify([...parsedDataFromLs, city]));
  } else {
    localStorage.setItem('town', JSON.stringify([city]));
  }
}

function onClickFavorites(e) {
  city = input.value;
  if (city.length >= 1) {
    const markup = favoritesList({ city });
    favoritesUl.insertAdjacentHTML('beforeend', markup);
    setDataInLS(city);
    // getDataFromLS()
  } else {
    PNotify.defaults.delay = 1200;
    PNotify.error({
      title: 'Oh No!',
      text: 'Enter city!',
    });
  }
}

function savedStoreg() {
  if (localStorage.getItem('town')) {
    city = localStorage.getItem('town');
    const markup = favoritesList({ city });
    favoritesUl.insertAdjacentHTML('beforeend', markup);
  }
}
savedStoreg();

if (favoritesUl.children.length >= 1) {
  const favoritesBtn = document.querySelector('.favorites-list__item-close');
  const Ul = document.querySelector('.favorites-list__item');

  favoritesBtn.addEventListener('click', btn);
  function btn() {
    Ul.remove();
    localStorage.removeItem('town');
  }
}
