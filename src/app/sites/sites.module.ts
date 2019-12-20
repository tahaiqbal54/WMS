
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
import {SitesRoutes} from './sites-routing.module';
import {NotificationCommunicationService} from '../_services';


import {SitesAddComponent} from './add/sites-add.component';
import {SitesEditComponent} from './edit/sites-edit.component';
import {SitesListComponent} from './list/sites-list.component';


@NgModule({
  imports: [
    RouterModule.forChild(SitesRoutes),
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
    SitesAddComponent,
    SitesEditComponent,
    SitesListComponent
  ],
  providers: [
    ThemeConstants,
    APIConstants,
    NotificationCommunicationService
  ]
})

export class SitesModule {}
