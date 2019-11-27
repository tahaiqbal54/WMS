import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// Dashboard Components
import { SigninComponent } from './signin.component';

export const SigninRoutes: Routes = [
    {
        path: '',
        component: SigninComponent,
        data: {
           title: 'Sign In'
        }
    }
];

