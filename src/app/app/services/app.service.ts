import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface App {
  id?: number;
  name: string;
  color: string;
  apiKey: string;
  enabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apps$: BehaviorSubject<App[]>;
  private nextId = 4; // Start from 4 since we have 3 default apps

  constructor() { 
    this.apps$ = new BehaviorSubject<App[]>([]);
    this.loadApps();
  }

  getApps(): Observable<App[]> {
    return this.apps$.asObservable();
  }

  addApp(app: App): Observable<App> {
    const newApp: App = {
      ...app,
      id: this.nextId++,
      apiKey: app.apiKey || this.generateApiKey()
    };

    const currentApps = this.apps$.value;
    this.apps$.next([...currentApps, newApp]);
    
    return of(newApp);
  }

  deleteApp(id: number): Observable<void> {
    const currentApps = this.apps$.value;
    const updatedApps = currentApps.filter(app => app.id !== id);
    this.apps$.next(updatedApps);
    
    return of(void 0);
  }

  protected loadApps() {
    this.apps$.next([
      {
        id: 1,
        name: 'Slack',
        color: '#e11b61',
        apiKey: 'nv_slack_' + this.generateRandomString(24),
        enabled: true,
      },
      {
        id: 2,
        name: 'Gmail',
        color: '#e6472c',
        apiKey: 'nv_gmail_' + this.generateRandomString(24)
        enabled: true
      },
      {
        id: 3,
        name: 'ActivePieces',
        color: '#7c3fdb',
        apiKey: 'nv_activepieces_' + this.generateRandomString(24),
        enabled: true
      }
    ]);
  }

  private generateApiKey(): string {
    return 'nv_' + this.generateRandomString(32);
  }

  private generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}