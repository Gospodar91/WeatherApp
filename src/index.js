import './stylesheet/fonts.css';
import './stylesheet/normalize.css';
import './stylesheet/reset.css';
import './components/Search/Search';
import './components/FavoriteList/FavoriteList';

//  пример импорта иконок и  изображений
// import Logo from './assets/images'
// <img src={Logo} />

import Close from './assets/icons/close/close-24px.svg';

console.log(Close)
const body = document.querySelector('body');
body.insertAdjacentHTML('beforeend', `<svg viewBox="0 0 30 10">
<use href="${Close}" x="10" fill="blue"/>
</svg>`)