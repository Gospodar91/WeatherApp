import './BackgroundImg.css';
import loader from '../Loader/loader';

const baseUrl = 'https://pixabay.com/api/';
const key = '&key=15364832-46e4bda7ae3c94390e1b1153f';
const requestParams = `?image_type=photo&category=travel&orientation=horizontal&q=kiev&page=1&per_page=40`;
const mainDiv = document.querySelector('.background-image');

const fetchImage = () => {
  const baseUrl = 'https://pixabay.com/api/';
  const key = '&key=15364832-46e4bda7ae3c94390e1b1153f';
  const requestParams = `?image_type=photo&category=places&orientation=horizontal&q=kiev&page=1&per_page=40`;

  return fetch(baseUrl + requestParams + key)
    .then(response => {
      response.json();
    })
    .then(parsedResponse => {
      const imgArr = parsedResponse.hits;

      const rand = Math.floor(Math.random() * imgArr.length);

      mainDiv.style.backgroundImage = `url(${parsedResponse.hits[rand].largeImageURL})`;
    });
};

export default fetchImage;

fetchImage();
