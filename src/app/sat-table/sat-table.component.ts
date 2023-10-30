import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-sat-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './sat-table.component.html',
  styleUrls: ['./sat-table.component.css'],
})
export class SatTableComponent {}
