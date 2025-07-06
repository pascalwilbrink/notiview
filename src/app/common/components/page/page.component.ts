import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'nv-page',
  standalone: true,
  imports: [],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {

  heading = input.required<string>();
 
  @Output()
  sidenavToggle: EventEmitter<void> = new EventEmitter<void>();

  toggleSidenav() {
    this.sidenavToggle.next();
  }
}
