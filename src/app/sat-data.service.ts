import { Injectable } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import sat_data from '../assets/json/sat_data.json';
import test_data from '../assets/json/test.json';
import { LaunchDate } from './launchDate';
import { Satellite } from './satellite';
import env from '../assets/json/env.json';
import { last, lastValueFrom } from 'rxjs';
import ommData from '../assets/json/omm.json';
import { ThisReceiver } from '@angular/compiler';
import { Omm } from './omm';

@Injectable({
  providedIn: 'root',
})
export class SatDataService {
  data = JSON.parse(JSON.stringify(test_data));
  dates = test_data.dates;
  launchDateList: LaunchDate[] = [];
  satList: Satellite[] = [];

  url = env.env.base_api_url;
  api_key = env.env.api_key;
  tleText = '';
  ommData: JSON = JSON.parse(JSON.stringify(ommData));

  constructor(private http: HttpClient) {
    this.readFile();
    this.initSatsList();
    console.log(this.ommData)

    // console.log(this.tleText)
    // this.parseSatData(this.tleText);
    // console.log(this.satList);
  }

  async getTleData() {
    const url = '/api/' + 'gp.php?GROUP=Starlink&FORMAT=TLE';

    const tleData$ = this.http.get(url, { responseType: 'text' });
    let tleData: any = await lastValueFrom(tleData$);
    console.log(tleData);
    return tleData;
  }

  async getOmmData() {
    const url = '/api/' + 'gp.php?GROUP=Starlink&FORMAT=JSON';

    const ommData$ = this.http.get(url, { responseType: 'text' });
    let ommData: any = await lastValueFrom(ommData$);
    console.log(ommData);
    return ommData;
  }

  // async readFile() {
  //   const text$ = this.http.get('../assets/json/tle.txt', {
  //     responseType: 'text',
  //   });
  //   let text: any = await lastValueFrom(text$);
  //   this.tleText = text;
  //   console.log('here');
  //   console.log(this.tleText);
  // }

  readFile() {
    this.http.get('../assets/json/tle.txt', {
      responseType: 'text',
    }).subscribe(data => {
      this.initSats(data, this.ommData)
      console.log(this.satList)
    })
  }

  // Initializes a list of Satellite objects
  // This is done once a day to prevent too many api calls to CelesTrak
  initSatsList() {
    const lastExecutionDate = localStorage.getItem('lastExecutionDate');
    const currentDate = new Date();
    const currentDateString = currentDate.toDateString();

    if (lastExecutionDate !== currentDateString) {
      // Your code to be executed once a day goes here
      console.log('This code runs once a day.');

      let tleData = this.getTleData();
      let ommData = this.getOmmData();

      // Update the last execution date in localStorage
      localStorage.setItem('lastExecutionDate', currentDateString);
    } else {
      console.log('This code has already been executed today.');
    }
  }

  private initSats(tleData: string, ommData: JSON) {
    const lines = tleData.split('\n');

    let currentIndex = 0;
    while (currentIndex < lines.length) {
      const line = lines[currentIndex].trim();
      if (line.startsWith('STARLINK-')) {
        const name = line;
        const line1 = lines[currentIndex + 1].trim();
        const line2 = lines[currentIndex + 2].trim();

        let sat: Satellite = {
          satname: name,
          tle: line1 + "\n" + line2,
        };

        this.satList.push(sat);
        currentIndex += 3; // Move to the next STARLINK entry
      } else {
        currentIndex++; // Move to the next line
      }
    }

    this.initOmmObs(ommData);
  }

  initOmmObs(ommData: JSON) {
    let ommDict = {};
    ommData.map(sat => {
      let omm: Omm = {
        OBJECT_ID: sat.OBJECT_ID,
        EPOCH: sat.EPOCH,
        MEAN_MOTION: sat.MEAN_MOTION,
        ECCENTRICITY: sat.ECCENTRICITY,
        INCLINATION: sat.INCLINATION,
        RA_OF_ASC_NODE: sat.RA_OF_ASC_NODE,
        ARG_OF_PERICENTER: sat.ARG_OF_PERICENTER,
        MEAN_ANOMALY: sat.MEAN_ANOMALY,
        EPHEMERIS_TYPE: sat.EPHEMERIS_TYPE,
        CLASSIFICATION_TYPE: sat.CLASSIFICATION_TYPEg,
        NORAD_CAT_ID: sat.NORAD_CAT_ID,
        ELEMENT_SET_NO: sat.ELEMENT_SET_NO,
        REV_AT_EPOCH: sat.REV_AT_EPOCH,
        BSTAR: sat.BSTAR,
        MEAN_MOTION_DOT: sat.MEAN_MOTION_DOT,
        MEAN_MOTION_DDOT: sat.MEAN_MOTION_DDOT
      }
      ommDict[sat.OBJECT_NAME] = omm;
    })
  }

  // async testFlask() {
  //   const url = '/test';
  //   const data$ = this.http.get(url);
  //   let data: any = await lastValueFrom(data$);
  //   console.log(data);
  // }

  // private async parseTleDate() {
  //   const tleData$ = this.getTleData();
  //   console.log('first')
  //   let tleData: any = await lastValueFrom(tleData$);
  //   // console.log(JSON.stringify(JSON.parse(tleData)));
  //   console.log('here')
  //   console.log(tleData);
  // }

  // initLaunchDates(): LaunchDate[] {
  //   let launchDates: LaunchDate[] = [];

  //   this.dates.forEach((date) => {
  //     let launchDate: LaunchDate = {
  //       date: date,
  //       sats: this.initSatList(date),
  //     };
  //     launchDates.push(launchDate);
  //   });

  //   this.launchDateList = launchDates;
  //   return launchDates;
  // }

  // initSatList(date: string): Satellite[] {
  //   // console.log(this.data[date])
  //   let sats: Satellite[] = [];

  //   this.data[date].forEach((id: string) => {
  //     this.setTleAndName(id);
  //     this.setSatPos(id);

  //     let newSat: Satellite = {
  //       satid: id,
  //       satname: this.satName,
  //       tle: this.tle,
  //       satlat: this.satlat,
  //       satlong: this.satlong,
  //       satalt: this.satalt,
  //       azimuth: this.azimuth,
  //       elevation: this.elevation,
  //       ra: this.ra,
  //       dec: this.dec,
  //       timestamp: this.timestamp
  //     };
  //     sats.push(newSat);
  //   });
  //   return sats;
  // }
  // TODO: don't init all sats at once at beginning; this will exceed number
  // of calls per hour. Maybe try only loading when launch group is selected or
  // find a more elegant ui/ux design for displaying sats.

  // private async setTleAndName(id: string) {
  //   const satData$ = this.getTleById(id);
  //   let data: any = await lastValueFrom(satData$);
  //   this.tle = data.info.tle;
  //   this.satName = data.info.satname;
  //   // console.log(id);
  //   console.log(data);
  // }

  // private async setSatPos(id: string) {
  //   const satPosData$ = this.getSatPosById(id);
  //   let data: any = await lastValueFrom(satPosData$);
  //   console.log(data);
  //   this.satlat = data.positions[0].satlatitude;
  //   this.satlong = data.positions[0].satlongitude;
  //   this.satalt = data.positions[0].sataltitude;
  //   this.azimuth = data.positions[0].azimuth;
  //   this.elevation = data.positions[0].elevation;
  //   this.ra = data.positions[0].ra;
  //   this.dec = data.positions[0].dec;
  //   this.timestamp = data.positions[0].timestamp;
  // }

  getLaunchDateList(): LaunchDate[] {
    return this.launchDateList;
  }

  // getTleById(id: String): any {
  //   let headers = new HttpHeaders().set('content-type', 'application/json');
  //   const url = '/api/' + 'tle/' + id + '&apiKey=' + this.api_key;

  //   return this.http.get(url);
  // }

  // getSatPosById(id: String): any {
  //   let headers = new HttpHeaders().set('content-type', 'application/json');
  //   const url =
  //     '/api/' +
  //     'positions/' +
  //     id +
  //     '/' +
  //     this.userLat +
  //     '/' +
  //     this.userLong +
  //     '/' +
  //     this.userAlt +
  //     '/' +
  //     this.sec +
  //     '/' +
  //     '&apiKey=' +
  //     this.api_key;

  //   return this.http.get(url, { headers: headers });
  // }
}
