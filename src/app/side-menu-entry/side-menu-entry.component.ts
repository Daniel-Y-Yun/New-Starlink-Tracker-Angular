import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LaunchDate } from '../launchDate';

@Component({
  selector: 'app-side-menu-entry',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatSidenavModule, NgIf],
  templateUrl: 'side-menu-entry.html',
  styleUrls: ['./side-menu-entry.component.css']
})
export class SideMenuEntryComponent {
  @Input() launchDate!: LaunchDate;
  showDate = false;
}
