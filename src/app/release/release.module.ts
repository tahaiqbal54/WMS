// import { NoAuthGuard } from './../_guards/noauth.guard';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ThemeConstants} from '../shared/config/theme-constant';
import {APIConstants} from '../shared/config/api-constant';

import {ReleaseRoutes} from './release-routing.module';

// Users Components
//import {UsersListComponent} from './list/users-list.component';
//import {UsersAddComponent} from './add/users-add.component';
//import {UsersViewComponent} from './view/users-view.component';
//import {UsersEditComponent} from './edit/users-edit.component';
import {ReleaseListComponent} from './list/release-list.component';
import {ReleaseViewComponent} from './view/release-edit.component';
import {DataTablesModule} from 'angular-datatables';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpResponse} from '@angular/common/http';

import { NgSelectizeModule } from 'ng-selectize';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import {FormsModule} from '@angular/forms';
//import {UserDetailResolver, UsersResolver, UserViewResolver} from '../_guards';
import {InventoryService,NotificationCommunicationService,AllocationService,PickService,ExcelService,ShipService} from '../_services'

import {ToastyModule} from 'ng2-toasty'


@NgModule({
  imports: [
    RouterModule.forChild(ReleaseRoutes),
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
    ReleaseListComponent,
    ReleaseViewComponent
    // //UsersViewComponent,
    // UsersEdiComponent
  ],
  providers: [
    ThemeConstants,
    //  NoAuthGuard,
    APIConstants,
    NotificationCommunicationService,
    ExcelService,
    InventoryService
    //UserViewResolver
  ]
})

export class ReleaseModule {}
