import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import sat_data from '../assets/json/sat_data.json';
import test_data from '../assets/json/test.json';
import { LaunchDate } from './launchDate';
import { Satellite } from './satellite';
import env from '../assets/json/env.json';
import { last, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SatDataService {
  data = JSON.parse(JSON.stringify(test_data));
  dates = test_data.dates;
  launchDateList: LaunchDate[] = [];
  tle: string = '';
  satName: string = '';

  url = env.env.base_api_url;
  api_key = env.env.api_key;
  userLat = 39.9526;
  userLong = 75.1652;
  userAlt = 12;
  sec = 1;

  constructor(private http: HttpClient) {
    this.initLaunchDates(); // list of LaunchDate objects
  }

  initLaunchDates(): LaunchDate[] {
    let launchDates: LaunchDate[] = [];

    this.dates.forEach((date) => {
      let launchDate: LaunchDate = {
        date: date,
        sats: this.initSatList(date),
      };
      launchDates.push(launchDate);
    });

    this.launchDateList = launchDates;
    return launchDates;
  }

  initSatList(date: string): Satellite[] {
    // console.log(this.data[date])
    let sats: Satellite[] = [];
    this.data[date].forEach((id: string) => {
      // this.setTleAndName(id);
      let newSat: Satellite = {
        satid: id,
        satname: this.satName,
        tle: this.tle,
      };
      sats.push(newSat);
    });
    return sats;
  }
  // TODO: don't init all sats at once at beginning; this will exceed number
  // of calls per hour. Maybe try only loading when launch group is selected or
  // find a more elegant ui/ux design for displaying sats.

  private async setTleAndName(id: string) {
    const satData$ = this.getTleById(id);
    let data: any = await lastValueFrom(satData$);
    this.tle = data.info.tle;
    this.satName = data.info.satname;
    console.log(id);
    console.log(data);
  }

  getLaunchDateList(): LaunchDate[] {
    return this.launchDateList;
  }

  getTleById(id: String): any {
    let headers = new HttpHeaders().set('content-type', 'application/json');
    const url = '/api/' + 'tle/' + id + '&apiKey=' + this.api_key;

    return this.http.get(url, { headers: headers });
  }

  getSatPostById(id: String): any {
    let headers = new HttpHeaders().set('content-type', 'application/json');
    const url =
      '/api/' +
      'positions/' +
      id +
      '/' +
      this.userLat +
      '/' +
      this.userLong +
      '/' +
      this.userAlt +
      '/' +
      this.sec +
      '/' +
      '&apiKey=' +
      this.api_key;

      return this.http.get(url, { headers: headers });
  }
}
