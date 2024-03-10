import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path:'register', loadComponent: () => import('./register-form/register-form.component').then(m => m.RegisterFormComponent) },
    { path:'login', loadComponent: () => import('./login-form/login-form.component').then(m => m.LoginFormComponent) },
    { path:'products', loadComponent: () => import('./table-of-products/table-of-products.component').then(m => m.TableOfProductsComponent) },
];
