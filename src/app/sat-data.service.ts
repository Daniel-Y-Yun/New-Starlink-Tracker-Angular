import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import sat_data from '../assets/json/sat_data.json';
import { LaunchDate } from './launchDate';
import { Observable } from 'rxjs';
import env from '../assets/json/env.json';
import api from '../proxy.conf.json'

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

  getPostById(id: String): any {
    console.log(api)
    this.http
      .get<any>(api + '44772&apiKey=3CHDPN-FC6B4C-ADPBFB-4V01')
      .subscribe((data: any) => {
        return data;
      });
  }

  // ${this.url}${id}&apiKey=${this.api_key}
}
