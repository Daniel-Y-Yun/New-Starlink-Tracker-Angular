import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p class="test">
      {{testString}}
    </p>
  `,
  styleUrls: ['./side-menu.component.css']
})

export class SideMenuComponent {
  testString: String = "test works"

}
