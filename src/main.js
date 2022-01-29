import { getWeatherByCity } from './apiService.js';
import { mapListToDOMElements } from './domActions.js';

class WeatherApp{
    constructor(){
        this.viewElems = {};
        this.initializeApp();
    }
    
    initializeApp = () => {
        this.connectDOMEelements();
        this.setupListeners();
    }

    connectDOMEelements = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
        this.viewElems = mapListToDOMElements(listOfIds);
    }

    setupListeners = () => {
        this.viewElems.searchInput.addEventListener('keydown',this.handelSubmit);
        this.viewElems.searchButton.addEventListener('click',this.handelSubmit)
        this.viewElems.returnToSearchBtn.addEventListener('click',this.returnToSearch)
    }

    handelSubmit = event => {
        if (event.type === "click" || event.key === "Enter"){
            this.fadeInOut();
            let query = this.viewElems.searchInput.value;
            getWeatherByCity(query).then(data => {
            this.displayWeatherData(data);       
        });
        }
    }

    fadeInOut = () => {
        if (this.viewElems.mainContainer.style.opacity === '1' || this.viewElems.mainContainer.style.opacity === ''){
            this.viewElems.mainContainer.style.opacity = '0';
        } else {
            this.viewElems.mainContainer.style.opacity = '1';
        }
    }
    
    switchView = () => {
        if(this.viewElems.weatherSearchView.style.display !== 'none') {
            this.viewElems.weatherSearchView.style.display = 'none'
            this.viewElems.weatherForecastView.style.display = 'block';
        }
        else {
            this.viewElems.weatherForecastView.style.display = 'none';
            this.viewElems.weatherSearchView.style.display = 'flex';
        }
    
    };
    
    returnToSearch = () => {
        this.fadeInOut();
        setTimeout(()=>{
            this.switchView();
            this.fadeInOut()
        },500);
    };

    displayWeatherData = data => {
        this.switchView();
        this.fadeInOut();
    
        const weather = data.consolidated_weather[0];
        this.viewElems.weatherCity.innerText = data.title;
        this.viewElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
        this.viewElems.weatherIcon.alt = weather.weather_state_name;
        const currTemp = weather.the_temp.toFixed(2);
        const maxTemp = weather.max_temp.toFixed(2);
        const minTemp = weather.min_temp.toFixed(2);
        
        this.viewElems.weatherCurrentTemp.innerText = `Current temperature: ${currTemp} °C`;
        this.viewElems.weatherMaxTemp.innerText = `Max temperature: ${maxTemp} °C`;
        this.viewElems.weatherMinTemp.innerText = `Min temperature: ${minTemp} °C`;
    };    
}


const onEnterSubmit = event => {
    if(event.key==='Enter') {
        this.fadeInOut();
        let query = viewElems.searchInput.value;
        getWeatherByCity(query).then(data => {
            displayWeatherData(data);       
        });
        
    };
};


document.addEventListener('DOMContentLoaded',new WeatherApp());