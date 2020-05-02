// import { NoAuthGuard } from './../_guards/noauth.guard';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ThemeConstants} from '../shared/config/theme-constant';
import {APIConstants} from '../shared/config/api-constant';

import {ShipRoutes} from './QC-routing.module';

// Users Components
//import {UsersListComponent} from './list/users-list.component';
//import {UsersAddComponent} from './add/users-add.component';
//import {UsersViewComponent} from './view/users-view.component';
//import {UsersEditComponent} from './edit/users-edit.component';
import {QCListComponent} from './list/QC-list.component';
import {QCAddComponent} from './add/QC-add.component';
import {QCEditComponent} from './edit/QC-edit.component';
import {QCViewComponent} from './view/QC-view.component'
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
    RouterModule.forChild(ShipRoutes),
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
    QCListComponent,
    QCAddComponent,
    QCEditComponent,
    QCViewComponent
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

export class QCModule {}
