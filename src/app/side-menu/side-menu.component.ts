import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchDate } from '../launchDate';
import { SideMenuEntryComponent } from '../side-menu-entry/side-menu-entry.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    CommonModule,
    SideMenuEntryComponent,
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
  showDate = this.globalToggle;

  clickDateButton() {
    this.showDate = !this.showDate;
    this.launchDateEvent.emit(this.launchDate);
  }
}
