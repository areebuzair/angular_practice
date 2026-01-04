import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./introduction/introduction').then((m) => m.Introduction);
        }
    },
    {
        path: 'todos',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./todos/todos').then((m) => m.Todos);
        }
    },
    {
        path: 'datapass',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./datapass/datapass').then((m) => m.Datapass);
        }
    },
    {
        path: 'map',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./mappage/mappage').then((m) => m.Mappage);
        }
    }
];
