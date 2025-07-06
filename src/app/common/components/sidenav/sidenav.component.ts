import { NgIf } from '@angular/common';
import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nv-sidenav',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  host: {
    class: 'nv-sidenav',
    '[class.nv-sidenav--open]': `opened()`
  },
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent {

  opened = input<boolean>(false);

}
