  
import css from'./BackgroundImg.css';

const baseUrl = 'https://pixabay.com/api/';
const key = '&key=15364832-46e4bda7ae3c94390e1b1153f';
const requestParams = `?image_type=photo&orientation=horizontal&q=kiev&page=1&per_page=20`
const mainDiv = document.querySelector(".background-image")

function fetchImage(city) {
    const baseUrl = 'https://pixabay.com/api/';
    const key = '&key=15364832-46e4bda7ae3c94390e1b1153f';
    const requestParams = `?image_type=photo&orientation=horizontal&q=${city}&page=1&per_page=40`
    return fetch(baseUrl + requestParams + key)
        .then(response => response.json())
        .then(parsedResponse => {
           
        const imgArr = parsedResponse.hits;
        console.log(imgArr);
        const rand = Math.floor(Math.random() * imgArr.length);

        mainDiv.style.backgroundImage = `url(${parsedResponse.hits[rand].fullHDURL})`
        // console.dir(mainDiv.style)
        })
    };

export default fetchImage;