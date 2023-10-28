import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import sat_data from '../assets/json/sat_data.json';
import { LaunchDate } from './launchDate';
import { Satellite } from './satellite';
import env from '../assets/json/env.json';
import { last, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SatDataService {
  data = JSON.parse(JSON.stringify(sat_data));
  dates = sat_data.dates;
  launchDateList: LaunchDate[] = [];
  tle: string = "";
  satName: string = "";

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
      // this.setTle(id);
      // this.setSatName(id);
      let newSat: Satellite = {
        satid: id,
        // satname: this.satName,
        // tle: this.tle
      };
      sats.push(newSat);
    });
    return sats;
  }
  // TODO: don't init all sats at once at beginning; this will exceed number
  // of calls per hour. Maybe try only loading when launch group is selected or
  // find a more elegant ui/ux design for displaying sats. 

  private async setTle(id: string) {
    const satData$ = this.getSatDataById(id);
    let data: any = await lastValueFrom(satData$);
    this.tle = data.info.tle;
  }

  private async setSatName(id: string) {
    const satData$ = this.getSatDataById(id);
    let data: any = await lastValueFrom(satData$);
    this.satName = data.info.satname;
  }

  getSatDataById(id: String): any {
    let headers = new HttpHeaders().set('content-type', 'application/json');
    const url = '/api/' + id + '&apiKey=' + this.api_key;

    return this.http.get(url, { headers: headers });
  }
}
