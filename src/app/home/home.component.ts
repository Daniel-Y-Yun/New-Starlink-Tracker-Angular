import { Component, inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import {MatTabsModule} from '@angular/material/tabs';
import env from '../../assets/json/env.json';
import { SatDataService } from '../sat-data.service';
import { LaunchDate } from '../launchDate';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { last, lastValueFrom } from 'rxjs';
import { Satellite } from '../satellite';
import { SatTableComponent } from '../sat-table/sat-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SideMenuComponent,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    SatTableComponent
  ],
  templateUrl: 'home.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  url = env.env.base_api_url;
  api_key = env.env.api_key;
  satData: any;
  showSatname = true;

  satService: SatDataService = inject(SatDataService);
  launchDateList: LaunchDate[] = this.satService.getLaunchDateList();
  satList: Satellite[] = this.satService.getSatList();
  currentDate: LaunchDate = this.launchDateList[0];
  currentId: String = '';

  showSats(launchDate: LaunchDate) {
    this.currentDate = launchDate;
  }

  // async showId(sat: Satellite) {
  //   // let id = sat.satid;
  //   const satData$ = this.satService.getTleById(id);
  //   this.satData = await lastValueFrom(satData$);
  //   console.log(this.satData);
  //   sat.satname = this.satData.info.satname;

  //   this.showSatname = true;
  //   console.log(this.satData.info.satname)
  // }

  constructor() {}
}
