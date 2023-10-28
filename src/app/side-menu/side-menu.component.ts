import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchDate } from '../launchDate';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { Satellite } from '../satellite';

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
  @Input() launchDate!: LaunchDate;
  @Input() globalToggle!: boolean;
  @Output() launchDateEvent = new EventEmitter<LaunchDate>();
  @Output() idEvent = new EventEmitter<Satellite>();
  showDate = this.globalToggle;

  clickDateButton() {
    this.showDate = !this.showDate;
    this.launchDateEvent.emit(this.launchDate);
  }

  clickIdButton(sat: Satellite) {
    this.idEvent.emit(sat)
  }

}
