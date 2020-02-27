const baseUrlForTodayWeather = 'https://api.openweathermap.org/data/2.5/weather?APPID=8defc985a5e2c764076c53bf90c6c44e&units=metric&lang=en&q=';
const baseUrlForFiveDayWeather = 'https://api.openweathermap.org/data/2.5/forecast?APPID=8defc985a5e2c764076c53bf90c6c44e&units=metric&lang=en&q=';

const choiseForm = document.querySelector('#search-form');
const choiseInput=document.querySelector('#search-input');


choiseForm.addEventListener('submit', submitForm);
function submitForm (event){
    event.preventDefault();
}


const makeUrlForDetectedCityFromCurrentCoord =(latitude, longitude) => {
    const APIKEY = "67daddc6-334a-4325-8705-7fd9afb2f209";
    return `https://graphhopper.com/api/1/geocode?reverse=true&point=${latitude},${longitude}&debug=true&key=${APIKEY}`
}

export default {
    city: 'kyiv',
    today: null,
    fiveDay: null,
    blockSection: 'today',
    
    getCurrentCityForCurrentLocationCoord() {
        const option = {
            timeout: 500
        };

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, option);
        })
          .then(location => {
            const url = makeUrlForDetectedCityFromCurrentCoord(location.coords.latitude, location.coords.longitude)

            return fetch(url)
                .then(response => response.json())
                .then(response => {
                    this.city = response.hits[0].city;
                    return response.hits[0].city;
                })
                .catch((err) => {throw err});
          })
          .catch((error) => {throw error});
    },
            
    getTodayWeather(city) {
        fetch(baseUrlForTodayWeather + city)
        .then(res => res.json())
        .then(res => {
            // console.log('res getTodayWeather ', res);
            this.today = res;
            this.blockSection = 'today';
            console.log('this ', this);
        })
        .catch(err => console.log(err))
    },

    getFiveDayWeather(city) {
        fetch(baseUrlForFiveDayWeather + city)
        .then(res => res.json())
        .then(res => {
            // console.log('res FiveDayWeather ', res);
            this.fiveDay = res;
            this.blockSection = 'fiveDay';
            // console.log('this ', this);
        })
        .catch(err => console.log(err))
    },

    getImgBackground() {}
    
}
