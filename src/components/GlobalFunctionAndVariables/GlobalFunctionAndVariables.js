function getWeather(location) {
    const baseUrl = `https://api.openweathermap.org/data/2.5/forecast?APPID=8defc985a5e2c764076c53bf90c6c44e&units=metric&lang=en&q=${location}`;
    // return new Promise((resolve, reject) => {
      fetch(baseUrl)
        .then(response => {
          return response.json();
        }) //делаем запрос фетчем по нашему URL - возвращает промис =>в then получаем ответ и
        // преобразовываем с помощью .json в обьект => в следующем then нам приходят уже данные
        // и мы их прокидываем в callback => catch ловит ошибку если она произошла в момент получения данных!
        .then(data => {
            const weather = {
                id: data.city.id,
                location: data.city.name,
                coordlat: data.city.coord.lat,
                coordlon: data.city.coord.lon,
                sunrise: data.city.sunrise,
                sunset: data.city.sunset,
                curentdate: data.list[0].dt,
                temp: data.list[0].main.temp,
                mintemp: data.list[0].main.temp_min,
                maxtemp: data.list[0].main.temp_max,
                pressure: data.list[0].main.pressure,
                humidity: data.list[0].main.humidity,
                icon: data.list[0].weather[0].icon,
                speedwind: data.list[0].wind.speed,
            }
             console.log(weather);
      })
      .catch(error => {
        // reject(error("DATA NOT AVAILABLE"));
      });
      
  
}
getWeather('kiev');

