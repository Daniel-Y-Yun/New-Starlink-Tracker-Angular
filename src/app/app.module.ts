import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SatTableComponent } from './sat-table/sat-table.component';

@NgModule({
  declarations: [
    SatTableComponent
  ],
  imports: [HttpClientModule, BrowserModule],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
