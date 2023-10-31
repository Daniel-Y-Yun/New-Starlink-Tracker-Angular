import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { SatDataService } from '../sat-data.service';
import { LaunchDate } from '../launchDate';


@Component({
  selector: 'app-sat-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './sat-table.component.html',
  styleUrls: ['./sat-table.component.css'],
})
export class SatTableComponent {
  satService: SatDataService = inject(SatDataService);
  launchDateList: LaunchDate[] = this.satService.getLaunchDateList();
}
