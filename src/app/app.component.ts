import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
  ],
  template: `
    <div>
      <app-home></app-home>
    </div>
  `,
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'starlink-tracker';
}
