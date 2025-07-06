import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface App {
  id?: number;
  name: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apps$: BehaviorSubject<App[]>;

  constructor() { 
    this.apps$ = new BehaviorSubject<App[]>([]);

    this.loadApps();
  }

  getApps(): Observable<App[]> {
    return this.apps$.asObservable();
  }

  protected loadApps() {
    this.apps$.next([
      {
        id: 1,
        name: 'Slack',
        color: '#e11b61'
      },
      {
        id: 2,
        name: 'Gmail',
        color: '#e6472c'
      },
      {
        id: 3,
        name: 'ActivePieces',
        color: '#7c3fdb'
      }
    ])
  }

}
