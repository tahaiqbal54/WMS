import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ThemeConstants} from '../shared/config/theme-constant';
import {APIConstants} from '../shared/config/api-constant';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {SigninRoutes} from './signin-routing.module';

// Dashboard Component
import {SigninComponent} from './signin.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forChild(SigninRoutes),
    FormsModule
  ],
  declarations: [
    SigninComponent
  ],
  providers: [
    ThemeConstants,
    APIConstants,
  ]
})
export class SigninModule {
}
