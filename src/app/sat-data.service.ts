import { Injectable } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
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
  today: Date = new Date();
  jsToday: string = '';
  dateToggle: boolean = false;
  

  tle: string = '';
  satName: string = '';
  satlat: number = 0;
  satlong: number = 0;
  satalt: number = 0;
  azimuth: number = 0;
  elevation: number = 0;
  ra: number = 0;
  dec: number = 0;
  timestamp: number = 0;

  url = env.env.base_api_url;
  api_key = env.env.api_key;
  userLat = 39.9526;
  userLong = 75.1652;
  userAlt = 12;
  sec = 1;

  constructor(private http: HttpClient) {
    // this.initLaunchDates(); // list of LaunchDate objects
    this.jsToday = formatDate(this.today, 'dd-MM-yyy', 'en-US');
    this.getTleData();
    this.getOmmData();
  }

  async getTleData() {
    const url = '/api/' + 'gp.php?GROUP=Starlink&FORMAT=TLE';

    const tleData$ = this.http.get(url, {responseType: 'text'});
    let tleData: any = await lastValueFrom(tleData$);
    console.log(tleData)
    return tleData;
  }

  async getOmmData() {
    const url = '/api/' + 'gp.php?GROUP=Starlink&FORMAT=JSON';

    const ommData$ = this.http.get(url, {responseType: 'text'});
    let ommData: any = await lastValueFrom(ommData$);
    console.log(ommData)
    return ommData;
  }

  // private async parseTleDate() {
  //   const tleData$ = this.getTleData();
  //   console.log('first')
  //   let tleData: any = await lastValueFrom(tleData$);
  //   // console.log(JSON.stringify(JSON.parse(tleData)));
  //   console.log('here')
  //   console.log(tleData);
  // }

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
      this.setTleAndName(id);
      this.setSatPos(id);

      let newSat: Satellite = {
        satid: id,
        satname: this.satName,
        tle: this.tle,
        satlat: this.satlat,
        satlong: this.satlong,
        satalt: this.satalt,
        azimuth: this.azimuth,
        elevation: this.elevation,
        ra: this.ra,
        dec: this.dec,
        timestamp: this.timestamp
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
    // console.log(id);
    console.log(data);
  }

  private async setSatPos(id: string) {
    const satPosData$ = this.getSatPosById(id);
    let data: any = await lastValueFrom(satPosData$);
    console.log(data)
    this.satlat = data.positions[0].satlatitude;
    this.satlong = data.positions[0].satlongitude;
    this.satalt = data.positions[0].sataltitude;
    this.azimuth = data.positions[0].azimuth;
    this.elevation = data.positions[0].elevation;
    this.ra = data.positions[0].ra;
    this.dec = data.positions[0].dec;
    this.timestamp = data.positions[0].timestamp;
  }

  getLaunchDateList(): LaunchDate[] {
    return this.launchDateList;
  }

  getTleById(id: String): any {
    let headers = new HttpHeaders().set('content-type', 'application/json');
    const url = '/api/' + 'tle/' + id + '&apiKey=' + this.api_key;

    return this.http.get(url);
  }

  getSatPosById(id: String): any {
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
