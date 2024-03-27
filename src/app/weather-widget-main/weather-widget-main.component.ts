import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.scss']
})
export class WeatherWidgetMainComponent implements OnInit {

  WeatherData: any;
  constructor() { }

  ngOnInit(): void {
    this.getWeatherData();
    console.log(this.WeatherData);
  }

  getWeatherData(){
    let data = JSON.parse('{"coord":{"lon":77.2167,"lat":28.6667},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50d"}],"base":"stations","main":{"temp":301.2,"feels_like":300.38,"temp_min":301.2,"temp_max":301.2,"pressure":1013,"humidity":32},"visibility":3500,"wind":{"speed":1.54,"deg":200},"clouds":{"all":40},"dt":1710312605,"sys":{"type":1,"id":9165,"country":"IN","sunrise":1710291785,"sunset":1710334694},"timezone":19800,"id":1273294,"name":"Delhi","cod":200}');
    this.setWeatherData(data);
  }

  setWeatherData(data){
    this.WeatherData = data;
    
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();

    let sunriseTime = new Date(this.WeatherData.sys.sunrise * 1000);
    this.WeatherData.sunrise_time = sunriseTime.toLocaleTimeString(); 

    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
    this.WeatherData.wind.speed_km = (this.WeatherData.wind.speed * 3.6).toFixed(1);
  }
}
