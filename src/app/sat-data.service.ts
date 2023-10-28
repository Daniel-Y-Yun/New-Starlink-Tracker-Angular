import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import sat_data from '../assets/json/sat_data.json';
import { LaunchDate } from './launchDate';
import env from '../assets/json/env.json';

@Injectable({
  providedIn: 'root',
})
export class SatDataService {
  data = JSON.parse(JSON.stringify(sat_data));
  dates = sat_data.dates;
  launchDateList: LaunchDate[] = [];

  url = env.env.base_api_url;
  api_key = env.env.api_key;

  constructor(private http: HttpClient) {
    this.initLaunchDates(); // list of LaunchDate objects
  }

  initLaunchDates(): LaunchDate[] {
    let launchDates: LaunchDate[] = [];

    this.dates.forEach((date) => {
      let launchDate: LaunchDate = {
        date: date,
        ids: this.data[date],
      };
      launchDates.push(launchDate);
    });

    this.launchDateList = launchDates;
    return launchDates;
  }

  getById(id: String): any {
    let headers = new HttpHeaders().set('content-type', 'application/json');
    const url = '/api/' + id + "&apiKey=" + this.api_key;

    return this.http.get(url, {'headers': headers});
  }

}
