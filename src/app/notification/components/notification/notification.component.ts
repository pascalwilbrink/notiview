import { Component, input, ViewEncapsulation } from '@angular/core';
import { Notification } from '../../services/notification.service';

@Component({
  selector: 'nv-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
  host: {
    class: 'nv-notification',
    '[class.nv-notification--success]': `notification().type === 'success'`,
    '[class.nv-notification--default]': `notification().type === 'default'`,
    '[class.nv-notification--info]': `notification().type === 'info'`,
    '[class.nv-notification--warning]': `notification().type === 'warning'`,
    '[class.nv-notification--danger]': `notification().type === 'danger'`,
    '[class.nv-notification--unread]': `!notification().read`,
    '[class.nv-notification--read]': `notification().read`

  },
  encapsulation: ViewEncapsulation.None
})
export class NotificationComponent {

  notification = input.required<Notification>()

}

