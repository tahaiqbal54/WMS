
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ThemeConstants} from '../shared/config/theme-constant';
import {APIConstants} from '../shared/config/api-constant';


import {DataTablesModule} from 'angular-datatables';
import {CommonModule} from '@angular/common';


import { NgSelectizeModule } from 'ng-selectize';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import {ToastyModule} from 'ng2-toasty'
import {CustomerRoutes} from './customer-routing.module';
import {CustomerService, NotificationCommunicationService, WarehouseService} from '../_services';



import {CustomerListComponent} from './list/customer-list.component';
import {CustomerAddComponent} from './add/customer-add.component';
import {CustomerEditComponent} from './edit/customer-edit.component';


@NgModule({
  imports: [
    RouterModule.forChild(CustomerRoutes),
    NgMultiSelectDropDownModule.forRoot(),
    DataTablesModule,
    CommonModule,
    NgSelectizeModule,
    NgbModule,
    CustomFormsModule,
    ReactiveFormsModule,
    FormsModule,
    ToastyModule.forRoot()

  ],
  declarations: [
    CustomerListComponent,
    CustomerAddComponent,
    CustomerEditComponent
  ],
  providers: [
    ThemeConstants,
    APIConstants,
    NotificationCommunicationService,
    CustomerService,
    WarehouseService
  ]
})

export class CustomerModule {}
