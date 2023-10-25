import { Component, inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import env  from '../../assets/json/env.json'; 
import { SatDataService } from '../sat-data.service';
import { LaunchDate } from '../launchDate';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';


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
  ],
  templateUrl: 'home.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  url = env.env.base_api_url;
  api_key = env.env.api_key;
  data: any[] = ["hello"];
  // `${baseUrl}tle/${satId}&apiKey=${apiKey}`

  satData: SatDataService = inject(SatDataService)
  launchDateList: LaunchDate[] = this.satData.launchDateList;
  currentDate: LaunchDate = this.launchDateList[0];
  currentId: String = "";

  showSats(launchDate: LaunchDate) {
    this.currentDate = launchDate;
  }

  showId(id: String) {
    this.currentId = id;
    console.log(this.data)
    this.data = this.satData.getPostById(id)
    console.log(this.data)
  }

  async getSatData(id: String) {
    const data = await fetch(' https://api.n2yo.com/rest/v1/satellite/tle/44772&apiKey=3CHDPN-FC6B4C-ADPBFB-4V01');
    return await data.json() ?? [];
  }

  constructor(private satApi: SatDataService) {}

  // test() {
  //   this.getSatData().then(data => {
  //       this.data = data;
  //     });
  // }
}
