import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SatTableComponent } from './sat-table/sat-table.component';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
  ],
  imports: [HttpClientModule, BrowserModule, MatTableModule],
  providers: [DatePipe],
  bootstrap: [],
})
export class AppModule {}
