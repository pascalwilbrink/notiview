import { Routes } from '@angular/router';
import { MainComponent } from './main/pages/main/main.component';
import { SettingsComponent } from './settings/page/settings/settings.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: MainComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    }
];
