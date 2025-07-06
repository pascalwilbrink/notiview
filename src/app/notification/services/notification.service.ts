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
        title: 'New Notification',
        body: 'This is a default notification',
        type: 'default',
        read: false
      },
      {
        id: 2,
        title: 'Notification with actions',
        body: 'This notification has actions',
        type: 'success',
        read: false,
        actions: [
          {
            type: 'app',
            app: 'vscode'
          },
          {
            type: 'browser',
            url: 'https://google.com'
          }
        ]
      },
      {
        id: 3,
        title: 'Info Notification',
        body: 'This notification has info',
        type: 'info',
        read: false
      },
      {
        id: 4,
        title: 'Warning Notification',
        body: 'This is a warning notification',
        type: 'warning',
        read: true
      },
      {
        id: 5,
        title: 'Danger Notification',
        body: 'This is an danger notification',
        type: 'danger',
        read: true
      }
    ])
  }
}
