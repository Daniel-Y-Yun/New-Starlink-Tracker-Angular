import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
  ],
  template: `
    <app-home></app-home>
  `,
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'starlink-tracker';
}
