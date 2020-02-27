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
const favoritesForm = document.querySelector('#search-form');
const nextButton = document.querySelector('.favorite-next');
const prevButton = document.querySelector('.favourite-prev');
const mainDiv = document.querySelector('.js-width-conteiner');



nextButton.hidden = false;
prevButton.hidden = true;
let widthUl = 0;
let widthArray=[0];
let lineWidth =0;
let offset=0;
let step = 0;


nextButton.addEventListener('click', onClickNextBtn);
function onClickNextBtn (event){ 
  let searchLi = document.querySelectorAll('.favorites-list__item')
  for(let i= 0; i<searchLi.length; i++){
  widthArray.push(searchLi[i].offsetWidth)
  lineWidth += searchLi[i].offsetWidth;

favoritesUl.style.width = lineWidth + 'px';
console.log(widthArray);
offset=(offset+widthArray[step]);
console.log('OFFSET',offset)
favoritesUl.style.left = -offset + 'px';
step ++;
  }
}

prevButton.addEventListener('click', onClickPrevBtn);
function onClickPrevBtn (event){

}
// let searchLi = document.querySelectorAll('.favorites-list__item');
//   console.log('PPPPPP', searchLi[0].offsetWidth);



























// let quantityLi = favoritesUl.children.length;
// if(quantityLi <= 2 && mainDiv.offsetWidth <= 280){
//   nextButton.hidden = true,
//   prevButton.hidden = true
// }else if(quantityLi <= 3 && mainDiv.offsetWidth <= 492){
//   nextButton.hidden = true,
//   prevButton.hidden = true
// }else if(quantityLi <= 4 && mainDiv.offsetWidth <= 520){
//   nextButton.hidden = true,
//   prevButton.hidden = true
// }
favorites.addEventListener('click', onClickFavorites);
let city = input;
function onClickFavorites(e) {
  city = input.value;
  if (city.length >= 1) {
    favoritesUl.innerHTML = '';
    setDataInLS(city);
    getDataFromLS();
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
}
getDataFromLS();
if (favoritesUl.children.length) {
  const favoritesBtn = document.querySelector('.favorites-list__item-close');
  const li = document.querySelector('.favorites-list__item');
  const favoritesLink = document.querySelector('.favorites-list__item-link');
  favoritesUl.addEventListener('click', onClickLink);
  function onClickLink(e) {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      return;
    }
    services.city = input.value = e.target.textContent;
    GlobalEmitter.emit(GlobalEmitter.ON_SEND_SUBMIT_FROM_FAVORITES, e);
  }
  favoritesBtn.addEventListener('click', btnDelet);
  function btnDelet(e) {
    const lsData = JSON.parse(localStorage.getItem('town'));
    const lsDataFilter = lsData.filter(arr => arr.indexOf([1]));
    li.remove();
    localStorage.removeItem('town', lsDataFilter);
  }
}