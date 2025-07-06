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
  timestamp: Date;
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
    const now = new Date();
    
    this.$noticiations.next([
      {
        id: 1,
        title: 'New message in #general',
        body: 'John Doe: Hey team, the new feature is ready for testing!',
        type: 'default',
        read: false,
        timestamp: new Date(now.getTime() - 5 * 60 * 1000), // 5 minutes ago
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
        timestamp: new Date(now.getTime() - 15 * 60 * 1000), // 15 minutes ago
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
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
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
        timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000), // 1 day ago
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
        timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
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