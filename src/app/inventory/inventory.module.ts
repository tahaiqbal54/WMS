// import { NoAuthGuard } from './../_guards/noauth.guard';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ThemeConstants} from '../shared/config/theme-constant';
import {APIConstants} from '../shared/config/api-constant';

import {InventoryRoutes} from './inventory-routing.module';

// Users Components
import {PutawaysListComponent} from './list/inventory-list.component';
import {InventoryHoldComponent} from './hold/inventory-hold.component';
import {InventoryUnHoldComponent} from './unhold/inventory-unhold.component';
import {TransactionComponent} from './transaction/inventory-transaction.component';
import {InventoryUpdateComponent} from './update/inventory-update.component';
// import {PutAwayAddComponent} from './add/putaway-add.component';
import {DataTablesModule} from 'angular-datatables';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpResponse} from '@angular/common/http';

import { NgSelectizeModule } from 'ng-selectize';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import {FormsModule} from '@angular/forms';
//import {UserDetailResolver, UsersResolver, UserViewResolver} from '../_guards';
import {OrderService,InventoryService,NotificationCommunicationService,ExcelService} from '../_services';
import {ToastyModule} from 'ng2-toasty'


@NgModule({
  imports: [
    RouterModule.forChild(InventoryRoutes),
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
    PutawaysListComponent,
    InventoryHoldComponent,
    InventoryUnHoldComponent,
    TransactionComponent,
    InventoryUpdateComponent
    // PutAwayAddComponent,
    // //UsersViewComponent,
    // UsersEditComponent
  ],
  providers: [
    ThemeConstants,
    //  NoAuthGuard,
    APIConstants,
    //UsersResolver,
    //UserDetailResolver,
    OrderService,
    ExcelService,
    InventoryService,
    NotificationCommunicationService
    //UserViewResolver
  ]
})

export class InventoryModule {}
