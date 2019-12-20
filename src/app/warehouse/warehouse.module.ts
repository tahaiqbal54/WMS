
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
import {WarehouseRoutes} from './warehouse-routing.module';
import {NotificationCommunicationService} from '../_services';


import {WarehouseAddComponent} from './add/warehouse-add.component';
import {WarehouseEditComponent} from './edit/warehouse-edit.component';
import {WarehouseListComponent} from './list/warehouse-list.component';


@NgModule({
  imports: [
    RouterModule.forChild(WarehouseRoutes),
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
    WarehouseAddComponent,
    WarehouseEditComponent,
    WarehouseListComponent
  ],
  providers: [
    ThemeConstants,
    APIConstants,
    NotificationCommunicationService
  ]
})

export class WarehouseModule {}
