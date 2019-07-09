import {Component, OnInit} from "@angular/core";
import { WeatherForecastComponent } from "../weather-forecast/weather-forecast.component";
import { ReactiveFormsModule } from "@angular/forms";

import { Weather } from "../models/weather.model";
import {WeatherService} from "../weather.service";
import {Subject} from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})

export class WeatherSearchComponent implements OnInit {
    private searchStream = new Subject<string>();
    data: any = {};

    constructor(private weatherService:WeatherService) {
    }

    onSubmit() {
        const weather = new Weather(this.data.name, this.data.weather[0].description, this.data.main.temp);
        this.weatherService.addWeather(weather);

    }

    onSearchLocation(cityName:string) {
        this.searchStream
            .next(cityName);
    }

    ngOnInit() {
        this.searchStream
            .pipe(debounceTime(300))
            .pipe(distinctUntilChanged())
            .pipe(switchMap((input:string) => this.weatherService.searchWeatherData(input)))
            .subscribe(
              data => this.data = data
            );
    }
}
