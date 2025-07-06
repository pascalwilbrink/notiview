import { Component, computed, signal } from '@angular/core';
import { PageComponent } from '../../../common/components/page/page.component';
import { SidenavComponent } from '../../../common/components/sidenav/sidenav.component';
import { App, AppService } from '../../../app/services/app.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    PageComponent,
    SidenavComponent,
    NgFor,
    RouterLink
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  heading = computed(() => {
    return this.selectedApp() ? this.selectedApp()?.name : 'All'
  })

  sidenavOpen =  signal<boolean>(true);

  apps = signal<App[]>([]);

  selectedApp = signal<App | null>(null);

  constructor(
    private readonly appService: AppService
  ) { 
    this.appService.getApps()
      .subscribe({
        next: (res) => {
          this.apps.set(res);
        }
      })
  }

  onSidenavToggle() {
    this.sidenavOpen.set(!this.sidenavOpen());
  }

  selectApp(app: App) {
    this.selectedApp.set(app);
  }

  deselectApp() {
    this.selectedApp.set(null);
  }

  isSelected(app: App | null): boolean {
    return app === this.selectedApp();
  }
}
