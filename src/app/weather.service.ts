import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError} from "rxjs/operators"
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
// import { weatherAPI } from '../environments/api-keys';
import { Weather } from "./models/weather.model";
import { Weather_Forecast } from './weather-data/weather-data.component';

@Injectable({
  providedIn: 'root' 
})
export class WeatherService {

constructor(private http: HttpClient) { }

getWeatherForecast() {
    return Weather_Forecast;
}

addWeather(weather: Weather) {
    Weather_Forecast.push(weather);
}

clearWeatherForecast() {
       Weather_Forecast.splice(0);
   }

  searchWeatherData(cityName: string): Observable<any> {
      return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=1a884f65ad6bb67b17e772389e29b35e&units=imperial`)
          .pipe(map(response => response))
          .pipe(catchError(error => {
              console.error(error);
              return Observable.throw(error.json())
          }));
  }
}
