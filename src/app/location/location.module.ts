
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
import {LocationRoutes} from './location-routing.module';
import {NotificationCommunicationService} from '../_services';


import {LocationAddComponent} from './add/location-add.component';
import {LocationListComponent} from './list/location-list.component';
import {LocationEditComponent} from './edit/location-edit.component';
import {LocationService} from '../_services/location.service';


@NgModule({
  imports: [
    RouterModule.forChild(LocationRoutes),
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
    LocationAddComponent,
    LocationListComponent,
    LocationEditComponent
  ],
  providers: [
    ThemeConstants,
    APIConstants,
    NotificationCommunicationService,
    LocationService
  ]
})

export class LocationModule {}
