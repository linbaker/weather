import {Component, OnInit} from "@angular/core";
import { WeatherForecastComponent } from "../weather-forecast/weather-forecast.component";
import { Weather } from "../models/weather.model";
import { WeatherService } from "../weather.service";

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css'],
})
  export class WeatherListComponent implements OnInit {
    weather: Weather[];

    constructor(private weatherService: WeatherService) {}

    ngOnInit():any {
      this.weather = this.weatherService.getWeatherForecast();
    }
}
