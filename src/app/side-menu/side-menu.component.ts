import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchDate } from '../launchDate';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { Satellite } from '../satellite';
import { SatDataService } from '../sat-data.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
  ],
  templateUrl: 'side-menu.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  @Input() sat!: Satellite;
  @Input() globalToggle!: boolean;
  @Output() launchDateEvent = new EventEmitter<LaunchDate>();
  @Output() idEvent = new EventEmitter<Satellite>();
  showDate = this.globalToggle;
  // satService: SatDataService = inject(SatDataService);
  // satList: Satellite[] = this.satService.getSatList();

  // clickDateButton() {
  //   this.showDate = !this.showDate;
  //   this.launchDateEvent.emit(this.launchDate);
  // }

  clickIdButton(sat: Satellite) {
    this.idEvent.emit(sat)
  }

}
