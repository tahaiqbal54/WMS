//import { ScheduleService } from './_services/schedule.service';
//import { TradeAreaService } from './_services/map.service';
//import { ApprovalDetailResolver } from './_guards/approvalview.resolver';
//import { ApprovalService } from './_services/approval.service';
// import { NoAuthGuard } from './_guards/noauth.guard';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {AuthenticationService} from './_services';
//import {OutletsService} from './_services';
//import {UsersService} from './_services';
//import {RegionsService} from './_services';
//import {RolesService} from './_services';
//import {ProductsService} from './_services';
//import {FacilitiesService} from './_services';
//import {NFRService} from './_services';

// Layout Modules
import {CommonLayoutComponent} from './common/common-layout.component';
import {AuthenticationLayoutComponent} from './common/authentication-layout.component';

// Directives
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Sidebar_Directives} from './shared/directives/side-nav.directive';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

// Routing Module
import {AppRoutes} from './app.routing';

// App Component
import {AppComponent} from './app.component';

// web customs
//import {Page404Component} from './extras/404/404.component';
import {SigninModule} from './signin/signin.module';
import {SignOutComponent} from './signout';
//import { ResetPasswordModule } from './reset_password/reset_password.modules';
import {AuthGuard} from './_guards';
import {APIConstants} from "./shared/config/api-constant";
import {cardPortletRefresh, cardPortletDelete} from "./shared/directives/cards.directive";
//import { LOgService } from './_services/logs.service';
import {CalendarComponent} from "ap-angular-fullcalendar/src/calendar/calendar";


// Outlet
// import { OutletViewService } from './retail-outlets/outlet-view.service';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes, {useHash: true}),
    NgbModule.forRoot(),
    FormsModule,
    PerfectScrollbarModule,
    SigninModule,
    HttpClientModule,
    //ResetPasswordModule
  ],
  declarations: [
    AppComponent,
    CommonLayoutComponent,
    AuthenticationLayoutComponent,
    Sidebar_Directives,
    cardPortletRefresh,
    cardPortletDelete,
    SignOutComponent,
    CalendarComponent
  ],
  providers: [
    AuthGuard,
    // NoAuthGuard,
    AuthenticationService,
    APIConstants,
    //UsersService,
    //OutletsService,
    //LOgService,
    //RegionsService,
    //RolesService,
    //ProductsService,
    //FacilitiesService,
    //NFRService,
    //ApprovalService,
    //ApprovalDetailResolver,
    //TradeAreaService,
    //ScheduleService

  ],
  bootstrap: [AppComponent]
})


export class AppModule {}
