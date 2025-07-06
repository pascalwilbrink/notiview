import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { App, AppService } from '../../../app/services/app.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgFor,
    NgIf
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  
  apps = signal<App[]>([]);
  showCreateForm = false;
  showAppKey: { [key: number]: boolean } = {};
  createAppForm: FormGroup;

  constructor(
    private readonly appService: AppService,
    private readonly fb: FormBuilder
  ) {
    this.createAppForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      color: ['#1e79e2', Validators.required]
    });

    this.appService.getApps().subscribe({
      next: (apps) => {
        this.apps.set(apps);
        // Initialize showAppKey state for all apps
        apps.forEach(app => {
          if (app.id) {
            this.showAppKey[app.id] = false;
          }
        });
      }
    });
  }

  onCreateApp() {
    if (this.createAppForm.valid) {
      const formValue = this.createAppForm.value;
      const newApp: App = {
        name: formValue.name,
        color: formValue.color,
        apiKey: this.generateApiKey()
      };

      this.appService.addApp(newApp).subscribe({
        next: (createdApp) => {
          this.apps.update(apps => [...apps, createdApp]);
          if (createdApp.id) {
            this.showAppKey[createdApp.id] = true; // Show API key for newly created app
          }
          this.cancelCreate();
        }
      });
    }
  }

  cancelCreate() {
    this.showCreateForm = false;
    this.createAppForm.reset({
      name: '',
      color: '#1e79e2'
    });
  }

  toggleAppKey(app: App) {
    if (app.id) {
      this.showAppKey[app.id] = !this.showAppKey[app.id];
    }
  }

  deleteApp(app: App) {
    if (app.id && confirm(`Are you sure you want to delete "${app.name}"? This action cannot be undone.`)) {
      this.appService.deleteApp(app.id).subscribe({
        next: () => {
          this.apps.update(apps => apps.filter(a => a.id !== app.id));
          if (app.id) {
            delete this.showAppKey[app.id];
          }
        }
      });
    }
  }

  copyToClipboard(text: string, inputElement: HTMLInputElement) {
    inputElement.select();
    inputElement.setSelectionRange(0, 99999); // For mobile devices
    
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
      console.log('API key copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  private generateApiKey(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'nv_';
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}