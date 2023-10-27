import { Component, inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import env from '../../assets/json/env.json';
import { SatDataService } from '../sat-data.service';
import { LaunchDate } from '../launchDate';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

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
  data: any;

  satData: SatDataService = inject(SatDataService);
  launchDateList: LaunchDate[] = this.satData.launchDateList;
  currentDate: LaunchDate = this.launchDateList[0];
  currentId: String = '';

  showSats(launchDate: LaunchDate) {
    this.currentDate = launchDate;
  }

  showId(id: String) {
    this.currentId = id;
    this.satData.getById(id).subscribe((data: JSON) => {
      console.log(data);
      this.data = data;
    });
    // TODO: data returned is not synch, fix with map and/or pipe?
  }

  constructor(private satApi: SatDataService) {}
}
