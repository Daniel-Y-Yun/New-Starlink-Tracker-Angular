import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { SatDataService } from '../sat-data.service';
import { LaunchDate } from '../launchDate';
import { Satellite } from '../satellite';


@Component({
  selector: 'app-sat-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './sat-table.component.html',
  styleUrls: ['./sat-table.component.css'],
})
export class SatTableComponent {
  @Input() launchDate!: LaunchDate;

  // satService: SatDataService = inject(SatDataService);
  // launchDateList: LaunchDate[] = this.satService.getLaunchDateList();

  displayedColumns: string[] = ['name', 'id', 'tle', 'satlat', 'satlong', 'satalt', 'azimuth', 'elevation', 'ra', 'dec', 'timestamp'];
  // ELEMENT_DATA: Satellite[] = this.launchDate.sats;
  // dataSource = new MatTableDataSource<Satellite>(this.ELEMENT_DATA);

}
