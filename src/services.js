import renderDataInDom from '../src/components/WeatherInfo/WeatherInfo';
import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
import showTemperature from '../src/components/MoreInfo/MoreInfo';
import buildDataWindowLayout from './components/DataWindow/DataWindow.js';
import GlobalEmitter from './components/GlobalFunctionAndVariables/EventEmitter.js';
import FiveDaysSmall from './components/FiveDaysSmall/FiveDaysSmall';
import { onClickFavorites } from './components/FavoriteList/FavoriteList';

const baseUrlForTodayWeather =
  'https://api.openweathermap.org/data/2.5/weather?APPID=8defc985a5e2c764076c53bf90c6c44e&units=metric&lang=en&q=';
const baseUrlForFiveDayWeather =
  'https://api.openweathermap.org/data/2.5/forecast?APPID=8defc985a5e2c764076c53bf90c6c44e&units=metric&lang=en&q=';

const makeUrlForDetectedCityFromCurrentCoord = (latitude, longitude) => {
  const APIKEY = '67daddc6-334a-4325-8705-7fd9afb2f209';
  return `https://graphhopper.com/api/1/geocode?reverse=true&point=${latitude},${longitude}&debug=true&key=${APIKEY}`;
};
const mainDiv1 = document.querySelector('.background-image-buffer');
mainDiv1.querySelector('img').addEventListener('load', onBgReady);
export default {
  city: 'Kyiv',
  today: null,
  fiveDay: null,
  blockSection: 'today',

  getCurrentCityForCurrentLocationCoord() {
    const option = {
      maximumAge: 600000,
      timeout: 500,
    };
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, option);
    })
      .then(location => {
        const url = makeUrlForDetectedCityFromCurrentCoord(
          location.coords.latitude,
          location.coords.longitude,
        );

        return fetch(url)
          .then(response => response.json())
          .then(response => {
            this.city = response.hits[0].city;
            return response.hits[0].city;
          })
          .catch(err => {
            throw err;
          });
      })
      .catch(error => {
        throw error;
      });
  },

  getTodayWeather(city) {
    this.today = null;
    this.fiveDay = null;
    fetch(baseUrlForTodayWeather + city)
      .then(res => {
        if (res.status === 404) {
          PNotify.error({
            title: 'NOTICE!',
            text: "Can't show such city!",
          });
          document
            .querySelector('.search__form-favourite')
            .removeEventListener('click', onClickFavorites);
        }
        return res.json();
      })
      .then(res => {
        this.today = res;
        this.blockSection = 'today';
        renderDataInDom(res);
        buildDataWindowLayout(res);
        GlobalEmitter.emit(GlobalEmitter.ON_WEATHER_READY, res.weather[0].main);
        document.querySelector('#wrapper-body').removeAttribute('style');
        document
          .querySelector('.search__form-favourite')
          .addEventListener('click', onClickFavorites);
      })
      .catch(err => {
        console.error('Error of request');
        document
          .querySelector('.search__form-favourite')
          .removeEventListener('click', onClickFavorites);
      });
  },

  getFiveDayWeather(city) {
    this.fiveDay = null;
    this.today = null;

    fetch(baseUrlForFiveDayWeather + city)
      .then(res => {
        if (res.status === 404) {
          PNotify.error({
            title: 'NOTICE!',
            text: 'Please write correct city!',
          });
          document
            .querySelector('.search__form-favourite')
            .removeEventListener('click', onClickFavorites);
        }
        return res.json();
      })
      .then(res => {
        this.fiveDay = res;
        this.blockSection = 'fiveDay';
        GlobalEmitter.emit(GlobalEmitter.ON_GRAPH_READY, res);
        FiveDaysSmall(res);

        GlobalEmitter.emit(
          GlobalEmitter.ON_WEATHER_READY,
          res.list[0].weather[0].main,
        );
        document
          .querySelector('.search__form-favourite')
          .addEventListener('click', onClickFavorites);
      })
      .catch(error => {
        console.error('error', error);
        document
          .querySelector('.search__form-favourite')
          .removeEventListener('click', onClickFavorites);
      });
  },

  getImgBackground(cityName) {
    const baseUrl = 'https://pixabay.com/api/';
    const key = '&key=15364832-46e4bda7ae3c94390e1b1153f';
    const requestParams = `?image_type=photo&orientation=horizontal&category=buildings&q=${cityName}&page=1&per_page=30`;
    return fetch(baseUrl + requestParams + key)
      .then(response => response.json())
      .then(parsedResponse => {
        let rand = Math.floor(Math.random() * parsedResponse.hits.length);
        const mainDiv = document.querySelector('.background-image');
        mainDiv1.style.height = mainDiv.clientHeight + 'px';
        mainDiv1.style.backgroundImage = `url(${parsedResponse.hits[rand].largeImageURL})`;
        mainDiv1.querySelector('img').src =
          parsedResponse.hits[rand].largeImageURL;
      })
      .catch(error => {});
  },
};

function onBgReady(e) {
  const mainDiv = document.querySelector('.background-image');
  mainDiv.style.backgroundImage = `url(${mainDiv1.querySelector('img').src})`;
}
