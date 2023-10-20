import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import env  from '../../assets/json/env.json'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SideMenuComponent
  ],
  template: `
    <div>
      <app-side-menu></app-side-menu>
      {{ data }}
    </div>
  `,
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  url = env.env.base_api_url;
  api_key = env.env.api_key;
  data = [];
  // `${baseUrl}tle/${satId}&apiKey=${apiKey}`

  async getSatData() {
    const data = await fetch('{this.url}tle/45730&apiKey={api_key}');
    return await data.json() ?? [];
  }

  test() {
    this.getSatData().then(data => {
        this.data = data;
      });
  }
}
