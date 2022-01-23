export const getWeatherByCity = city => {
    return fetch(`https://www.metaweather.com/api/location/search/?query=${city} `)
    .then(resp => resp.json())
    .then(data => {
        console.log(data.woeid);
    });
};

