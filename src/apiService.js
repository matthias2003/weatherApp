const API__KEY = '5846839cf6a9461992a133154232009';

export const getWeatherByCity = city => {
    return fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API__KEY}&q=${city}&days=1&aqi=no&alerts=no`)
    .then(resp => resp.json());
};

