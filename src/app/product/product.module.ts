
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
import {ProductRoutes} from './product-routing.module';
import {NotificationCommunicationService} from '../_services';
import {ProductListComponent} from './list/product-list.component';
import {ProductAddComponent} from './add/product-add.component';
import {ProductEditComponent} from './edit/product-edit.component';






@NgModule({
  imports: [
    RouterModule.forChild(ProductRoutes),
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
    ProductListComponent,
    ProductAddComponent,
    ProductEditComponent
  ],
  providers: [
    ThemeConstants,
    APIConstants,
    NotificationCommunicationService
  ]
})

export class ProductModule {}
