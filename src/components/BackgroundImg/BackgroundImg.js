import './BackgroundImg.css';

const baseUrl = 'https://pixabay.com/api/';
const key = '&key=15364832-46e4bda7ae3c94390e1b1153f';

    fetchImage() {
        const requestParams = `?image_type=photo&orientation=horizontal&q=kiev&page=1&per_page=20`
        return fetch(baseUrl + requestParams + key)
            .then(response => response.json())
            .then(parsedResponse => {
                return parsedResponse.hits
            });
        };



    BgChange = document.body.style,

    fChange = function(){
    BgChange.backgroundImage='url("")';
    };