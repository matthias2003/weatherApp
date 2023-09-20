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
        this.viewElems.searchButton.addEventListener('click',this.handelSubmit);
        this.viewElems.returnToSearchBtn.addEventListener('click',this.returnToSearch);
        this.viewElems.searchInput.addEventListener('focus',this.clearInput)
    }

    clearInput = () => {
        this.viewElems.searchInput.value = ""; 
        this.viewElems.searchInput.style.borderColor = 'black'; 
        this.clearWrongCity();
    }

    handelSubmit = event => {
        if (event.type === "click" || event.key === "Enter"){
            let query = this.viewElems.searchInput.value;
            getWeatherByCity(query).then(data => {
                if (!data.error) {
                    this.fadeInOut();
                    this.displayWeatherData(data);
                    this.viewElems.searchInput.style.borderColor = 'black';
                    this.clearWrongCity();
                } else {
                    this.viewElems.searchInput.style.cssText = 'border-color:red;border-radius:15px;';
                    this.wrongCityAlert();}
            })};
        };

    wrongCityAlert = () => {
        if(!(document.getElementById('wrongCityAlert'))) {
            let p = document.createElement('p');
            let text = document.createTextNode('Takie miasto nie istnieje!');
            p.id = 'wrongCityAlert'
            p.classList.add('wrongCityAlertText')
            p.appendChild(text);
            this.viewElems.weatherSearchView.appendChild(p);
        }
    }

    clearWrongCity = () => {
        if(document.getElementById('wrongCityAlert')) {
            document.getElementById('wrongCityAlert').remove();
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
        setTimeout(() => {
            this.switchView();
            this.fadeInOut()
        },500);

        const current_temp = data.current;
        const forecast_temp = data.forecast.forecastday[0].day;

        this.viewElems.weatherCity.innerText = data.location.name;
        this.viewElems.weatherIcon.src = data.current.condition.icon;
        this.viewElems.weatherIcon.alt = data.current.condition.text;

        const currTemp = current_temp.temp_c;
        const maxTemp = forecast_temp.maxtemp_c;
        const minTemp = forecast_temp.mintemp_c;
          
        this.viewElems.weatherCurrentTemp.innerText = `Current temperature: ${currTemp} °C`;
        this.viewElems.weatherMaxTemp.innerText = `Max temperature: ${maxTemp} °C`;
        this.viewElems.weatherMinTemp.innerText = `Min temperature: ${minTemp} °C`;
    };    
}


document.addEventListener('DOMContentLoaded',new WeatherApp());