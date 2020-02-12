// import { NoAuthGuard } from './../_guards/noauth.guard';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ThemeConstants} from '../shared/config/theme-constant';
import {APIConstants} from '../shared/config/api-constant';

import {AllocationRoutes} from './allocation-routing.module';

// Users Components
//import {UsersListComponent} from './list/users-list.component';
//import {UsersAddComponent} from './add/users-add.component';
//import {UsersViewComponent} from './view/users-view.component';
//import {UsersEditComponent} from './edit/users-edit.component';
import {AllocationListComponent} from './list/allocation-list.component';
import {AllocationAddComponent} from './add/allocation-add.component';
import {DataTablesModule} from 'angular-datatables';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpResponse} from '@angular/common/http';

import { NgSelectizeModule } from 'ng-selectize';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import {FormsModule} from '@angular/forms';
//import {UserDetailResolver, UsersResolver, UserViewResolver} from '../_guards';
import {ReceiveService,NotificationCommunicationService,AllocationService} from '../_services'

import {ToastyModule} from 'ng2-toasty'


@NgModule({
  imports: [
    RouterModule.forChild(AllocationRoutes),
    DataTablesModule,
    CommonModule,
    NgSelectizeModule,
    NgbModule,
    CustomFormsModule,
    FormsModule,
    ToastyModule.forRoot()
    /*NgModule*/
  ],
  declarations: [
       AllocationListComponent,
       AllocationAddComponent,
    // //UsersViewComponent,
    // UsersEdiComponent
  ],
  providers: [
    ThemeConstants,
    //  NoAuthGuard,
    APIConstants,
    //UsersResolver,
    //UserDetailResolver,
    ReceiveService,
    AllocationService,
    NotificationCommunicationService
    //UserViewResolver
  ]
})

export class AllocationModule {}
