import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { SatDataService } from '../sat-data.service';
import { LaunchDate } from '../launchDate';
import { Satellite } from '../satellite';

@Component({
  selector: 'app-sat-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './sat-table.component.html',
  styleUrls: ['./sat-table.component.css'],
})
export class SatTableComponent implements AfterViewInit {
  @Input() launchDate!: LaunchDate;

  satService: SatDataService = inject(SatDataService);
  satList: Satellite[] = this.satService.getSatList();

  displayedColumns: string[] = [
    'name',
    'id',
    'tle',
    'epoch',
    'meanMotion',
    'eccentricity',
    'inclination',
    'ra',
    'arg',
    'meanAnomoly',
    'ephemeris',
    'class',
    'noradId',
    'elementSetNo',
    'rev',
    'bstar',
    'meanMotionDot',
    'meanMotionDdot'
  ];
  dataSource = new MatTableDataSource<Satellite>(this.satList);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // test = [
  //   OBJECT_NAME,
  //   OBJECT_ID,
  //   EPOCH,
  //   MEAN_MOTION,
  //   ECCENTRICITY,
  //   INCLINATION,
  //   RA_OF_ASC_NODE,
  //   ARG_OF_PERICENTER,
  //   MEAN_ANOMALY,
  //   EPHEMERIS_TYPE,
  //   CLASSIFICATION_TYPE,
  //   NORAD_CAT_ID,
  //   ELEMENT_SET_NO,
  //   REV_AT_EPOCH,
  //   BSTAR,
  //   MEAN_MOTION_DOT,
  //   MEAN_MOTION_DDOT,
  // ];
}
