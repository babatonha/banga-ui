import { Routes } from '@angular/router';
import { HomeComponent } from './features/landing/home/home.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'home'},
    {path:'home', component: HomeComponent},
    {path: 'login', loadComponent: () => import('./features/authentication/login/login.component').then(mod => mod.LoginComponent)},
    {path: 'register', loadComponent: () => import('./features/authentication/register/register.component').then(mod => mod.RegisterComponent)},
    {path: 'forgot-password', loadComponent: () => import('./features/authentication/forgot-password/forgot-password.component').then(mod => mod.ForgotPasswordComponent)},
    {path: 'change-password', loadComponent: () => import('./features/authentication/change-password/change-password.component').then(mod => mod.ChangePasswordComponent)},
    {path: 'profile', loadComponent: () => import('./features/admin/profile/profile.component').then(mod => mod.ProfileComponent), canActivate: [authGuard]},
    {path: 'new-property', loadComponent: () => import('./features/property/new-property/new-property.component').then(mod => mod.NewPropertyComponent), canActivate: [authGuard]},
    {path: 'my-property', loadComponent: () => import('./features/property/my-property/my-property.component').then(mod => mod.MyPropertyComponent), canActivate: [authGuard]},
];
