// import { NoAuthGuard } from './../_guards/noauth.guard';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ThemeConstants} from '../shared/config/theme-constant';
import {APIConstants} from '../shared/config/api-constant';

import {UsersRoutes} from './users-routing.module';

// Users Components
import {UsersListComponent} from './list/users-list.component';
import {UsersAddComponent} from './add/users-add.component';
//import {UsersViewComponent} from './view/users-view.component';
import {UsersEditComponent} from './edit/users-edit.component';
import {DataTablesModule} from 'angular-datatables';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpResponse} from '@angular/common/http';

import { NgSelectizeModule } from 'ng-selectize';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import {FormsModule} from '@angular/forms';
//import {UserDetailResolver, UsersResolver, UserViewResolver} from '../_guards';
import {OrderService} from '../_services';


@NgModule({
  imports: [
    RouterModule.forChild(UsersRoutes),
    DataTablesModule,
    CommonModule,
    NgSelectizeModule,
    NgbModule,
    CustomFormsModule,
    FormsModule
    /*NgModule*/
  ],
  declarations: [
    UsersListComponent,
    UsersAddComponent,
    //UsersViewComponent,
    UsersEditComponent
  ],
  providers: [
    ThemeConstants,
    //  NoAuthGuard,
    APIConstants,
    //UsersResolver,
    //UserDetailResolver,
    OrderService,
    //UserViewResolver
  ]
})

export class UsersModule {}
