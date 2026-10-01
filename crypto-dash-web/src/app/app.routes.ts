import { Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./core/routing/main.routes').then(w => w.routes),
    },
    {
        path: 'login',
        loadComponent: () => import('./core/components/auth/authentication/authentication.component').then(c => c.AuthenticationComponent),
    },
    {
        path: '**',
        component: NotFoundComponent,
    }

];
