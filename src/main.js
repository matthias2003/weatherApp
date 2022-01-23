import {getWeatherByCity} from './apiService.js';

const viewElems = {};



const getDOMElem = id => {
    return document.getElementById(id)
}


const connectHTMLElements = () => {
    viewElems.mainContainer = getDOMElem('mainContainer');
    viewElems.weatherSearchView = getDOMElem('weatherSearchView');
    viewElems.weatherForecastView = getDOMElem('weatherForecastView');

    viewElems.searchInput = getDOMElem('searchInput');
    viewElems.searchButton = getDOMElem('searchButton');
    
    viewElems.weatherCity = getDOMElem('weatherCity');
    viewElems.weatherIcon = getDOMElem('weatherIcon');
    viewElems.weatherCityContainer = getDOMElem('weatherCityContainer');

    viewElems.weatherCurrentTemp = getDOMElem('weatherCurrentTemp');
    viewElems.weatherMaxTemp = getDOMElem('weatherMaxTemp');
    viewElems.weatherMinTemp = getDOMElem('weatherMinTemp');
    
    viewElems.returnToSearchBtn = getDOMElem('returnToSearchBtn');
}

const setupListeners = () => {
    viewElems.searchInput.addEventListener('keydown', onEnterSubmit);
    viewElems.searchButton.addEventListener('click', onClickSubmit);
}

const initializeApp = () => {
    connectHTMLElements();
    setupListeners();
}


const onClickSubmit = () => {};

const onEnterSubmit = event => {
    console.log(event);
    if(event.key==='Enter') {
        let query = viewElems.searchInput.value;
        getWeatherByCity(query);
    }
};

document.addEventListener('DOMContentLoaded',initializeApp);