import { Component, inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import env  from '../../assets/json/env.json'; 
import { SatDataService } from '../sat-data.service';
import { LaunchDate } from '../launchDate';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SideMenuComponent,
    MatSidenavModule,
    MatButtonModule,
  ],
  templateUrl: 'home.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  url = env.env.base_api_url;
  api_key = env.env.api_key;
  data = [];
  // `${baseUrl}tle/${satId}&apiKey=${apiKey}`

  satData: SatDataService = inject(SatDataService)
  launchDateList: LaunchDate[] = this.satData.launchDateList;
  currentDate: LaunchDate = this.launchDateList[0];

  showSats(launchDate: LaunchDate) {
    this.currentDate = launchDate;
    console.log(this.currentDate)
  }

  async getSatData() {
    const data = await fetch('{this.url}tle/45730&apiKey={api_key}');
    return await data.json() ?? [];
  }

  test() {
    this.getSatData().then(data => {
        this.data = data;
      });
  }
}
