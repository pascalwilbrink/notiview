import { Injectable } from '@angular/core';
import { App } from '../../app/services/app.service';
import { BehaviorSubject, Observable } from 'rxjs';

export type NotificationActionType = 'app' | 'browser'

interface BaseNotificationAction {
  type: NotificationActionType;
}

export interface AppNotificationAction extends BaseNotificationAction {
  type: 'app'
  app: string;
}

export interface BrowserNotificationAction extends BaseNotificationAction {
  type: 'browser';
  url: string;
}

export type NotificationAction = AppNotificationAction | BrowserNotificationAction;

export type NotificationType = 'default' | 'success' | 'info' | 'warning' | 'danger'

export interface Notification {
  id?: number;
  title: string;
  body?: string;
  actions?: NotificationAction[]
  read?: boolean
  app?: App
  type: NotificationType
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private $noticiations: BehaviorSubject<Notification[]>;

  constructor() { 
    this.$noticiations = new BehaviorSubject<Notification[]>([]);

    this.loadNotifications();
  }

  getNotifications(): Observable<Notification[]> {
    return this.$noticiations.asObservable();
  }

  protected loadNotifications() {
    this.$noticiations.next([
      {
        id: 1,
        title: 'New message in #general',
        body: 'John Doe: Hey team, the new feature is ready for testing!',
        type: 'default',
        read: false,
        app: {
          id: 1,
          name: 'Slack',
          color: '#e11b61',
          apiKey: 'nv_slack_example',
          enabled: true
        }
      },
      {
        id: 2,
        title: 'New email from Sarah Wilson',
        body: 'Subject: Project Update - Please review the latest changes',
        type: 'success',
        read: false,
        app: {
          id: 2,
          name: 'Gmail',
          color: '#e6472c',
          apiKey: 'nv_gmail_example',
          enabled: true
        },
        actions: [
          {
            type: 'app',
            app: 'gmail'
          },
          {
            type: 'browser',
            url: 'https://gmail.com'
          }
        ]
      },
      {
        id: 3,
        title: 'Workflow completed successfully',
        body: 'Your automation "Daily Report Generator" has finished running',
        type: 'info',
        read: false,
        app: {
          id: 3,
          name: 'ActivePieces',
          color: '#7c3fdb',
          apiKey: 'nv_activepieces_example',
          enabled: true
        }
      },
      {
        id: 4,
        title: 'System maintenance scheduled',
        body: 'Scheduled maintenance will begin at 2:00 AM EST tomorrow',
        type: 'warning',
        read: true,
        app: {
          id: 1,
          name: 'Slack',
          color: '#e11b61',
          apiKey: 'nv_slack_example',
          enabled: true
        }
      },
      {
        id: 5,
        title: 'Failed to sync data',
        body: 'Unable to connect to external API. Please check your configuration.',
        type: 'danger',
        read: true,
        app: {
          id: 3,
          name: 'ActivePieces',
          color: '#7c3fdb',
          apiKey: 'nv_activepieces_example',
          enabled: true
        }
      }
    ])
  }
}