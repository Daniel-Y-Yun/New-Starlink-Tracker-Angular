import { Injectable } from '@angular/core';
import sat_data from '../assets/json/sat_data.json';
import { LaunchDate } from './launchDate';

@Injectable({
  providedIn: 'root',
})
export class SatDataService {
  data = JSON.parse(JSON.stringify(sat_data));
  dates = sat_data.dates;
  launchDateList: LaunchDate[] = [];

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

  constructor() {
    this.initLaunchDates(); // list of LaunchDate objects
  }
}
