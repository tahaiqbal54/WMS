// import { NoAuthGuard } from './../_guards/noauth.guard';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ThemeConstants} from '../shared/config/theme-constant';
import {APIConstants} from '../shared/config/api-constant';

import {ShipmentRoutes} from './shipment-routing.module';

// Users Components
import {ShipmentListComponent} from './list/shipment-list.component';
import {ShipmentAddComponent} from './add/shipment-add.component';
//import {UsersViewComponent} from './view/users-view.component';
import {ShipmentEditComponent} from './edit/shipment-edit.component';
import {DataTablesModule} from 'angular-datatables';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpResponse} from '@angular/common/http';

import { NgSelectizeModule } from 'ng-selectize';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import {FormsModule} from '@angular/forms';
//import {UserDetailResolver, UsersResolver, UserViewResolver} from '../_guards';
import {ShipmentService,NotificationCommunicationService,OrderService} from '../_services';


import {ToastyModule} from 'ng2-toasty'


@NgModule({
  imports: [
    RouterModule.forChild(ShipmentRoutes),
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
    ShipmentListComponent,
    ShipmentAddComponent,
    //UsersViewComponent,
    ShipmentEditComponent
  ],
  providers: [
    ThemeConstants,
    //  NoAuthGuard,
    APIConstants,
    //UsersResolver,
    //UserDetailResolver,
    ShipmentService,
    OrderService,
    //UserViewResolver
    NotificationCommunicationService
  ]
})

export class ShipmentModule {}
