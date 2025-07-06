import { Component, input, ViewEncapsulation } from '@angular/core';
import { Notification, NotificationAction } from '../../services/notification.service';
import { NgFor, NgIf } from '@angular/common';
import { formatDistanceToNow } from 'date-fns';

@Component({
  selector: 'nv-notification',
  standalone: true,
  imports: [NgIf, NgFor],
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

  getRelativeTime(): string {
    return formatDistanceToNow(this.notification().timestamp, { addSuffix: true });
  }

  getActionLabel(action: NotificationAction): string {
    switch (action.type) {
      case 'app':
        return `Open ${action.app}`;
      case 'browser':
        const url = new URL(action.url);
        return `Open ${url.hostname}`;
      default:
        return 'Unknown Action';
    }
  }

  executeAction(action: NotificationAction): void {
    switch (action.type) {
      case 'app':
        // In a real Electron app, this would use IPC to communicate with the main process
        // to launch the specified application
        console.log(`Opening app: ${action.app}`);
        // Example: window.electronAPI?.openApp(action.app);
        break;
      case 'browser':
        // Open URL in default browser
        window.open(action.url, '_blank');
        break;
      default:
        console.warn('Unknown action type:', action);
    }
  }
}