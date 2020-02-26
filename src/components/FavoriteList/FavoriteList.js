import './FavoriteList.css';

import GlobalEmitter from '../GlobalFunctionAndVariables/EventEmitter';

import favoritesList from './favoritesLi.hbs';
const favorites = document.querySelector('.favorite-next');
const input = document.querySelector('#search-input');
const favoritesUl = document.querySelector('.favorites-list');
const favoritesLi = document.querySelector('.favorites-list__item');
favorites.addEventListener('click', onClickFavorites);
function onClickFavorites(e) {
  localStorage.setItem('town', 'input.value');
}


