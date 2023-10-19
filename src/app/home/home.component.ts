import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from '../side-menu/side-menu.component';

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
    </div>
  `,
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

}
