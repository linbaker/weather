import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {Subject} from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { WeatherService } from '../weather.service';
import { Weather } from "../models/weather.model";

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css'],
  providers: [ WeatherService ]
})

export class WeatherFormComponent implements OnInit {

    private searchStream = new Subject <string> ();
    data: any = {};

    constructor(private weatherService:WeatherService) {
    }

    onSubmit() {
        const weatherByLocation = new Weather(this.data.name, this.data.weather[0].description, this.data.main.temp);
        return weatherByLocation;
    }

    onSearchLocation(city:string) {
        this.searchStream
            .next(city);
    }

    ngOnInit() {
        this.searchStream
            .pipe(debounceTime(300))
            .pipe(distinctUntilChanged())
            .pipe(switchMap((input: string) => this.weatherService.searchWeatherData(input)))
            .subscribe(
              data => this.data = data
            );
    }
}
