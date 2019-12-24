///import { NoAuthGuard } from './_guards/noauth.guard';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Layouts
import {CommonLayoutComponent} from './common/common-layout.component';
import {AuthenticationLayoutComponent} from './common/authentication-layout.component';
//import {Page404Component} from './extras/404/404.component';
import {SigninComponent} from './signin';
import {SignOutComponent} from './signout';
import {AuthGuard} from './_guards';
//import {ResetPasswordComponent } from './reset_password/reset_password.component';


export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: SigninComponent,
  },
  {
    path: 'logout',
    component: SignOutComponent,
  },
  {
    path: '',
    component: CommonLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        //canActivate: [AuthGuard]
      },
      {
        path: 'users',
        loadChildren: './users/users.module#UsersModule',
        //canActivate: [AuthGuard]
      },
      {
        path: 'receiving',
        loadChildren: './recieving/recieving.module#RecievingModule',
        //canActivate: [AuthGuard]
      },
      {
        path: 'putaway',
        loadChildren: './putaways/putaways.module#PutawaysModule',
        //canActivate: [AuthGuard]
      },
      {
        path: 'sites',
        loadChildren: './sites/sites.module#SitesModule',
        //canActivate: [AuthGuard]
      },
      {
        path: 'warehouse',
        loadChildren: './warehouse/warehouse.module#WarehouseModule',
        //canActivate: [AuthGuard]
      },
      {
        path: 'location',
        loadChildren: './location/location.module#LocationModule',
        //canActivate: [AuthGuard]
      },
      {
        path: 'customer',
        loadChildren: './customer/customer.module#CustomerModule',
        //canActivate: [AuthGuard]
      },
      // {
      //   path: 'retail-outlets',
      //   loadChildren: './retail-outlets/outlets.modules#OutletsModule',
      //   canActivate: [AuthGuard]
      // },
      {
        path: 'extras',
        loadChildren: './extras/extras.modules#ExtrasModule'
      },
      // {
      //   path: 'regional-structure',
      //   loadChildren: './regional-structure/regional.modules#RegionalModule',
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: 'inspection-sheet',
      //   loadChildren: './inspection-sheet/inspection-sheet.modules#InspectionSheet_Module',
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: 'stock',
      //   loadChildren: './stock_reconcilation/stock.module#Stock_Module',
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: 'log',
      //   loadChildren: './logs/logs.modules#Log_Module',
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: '',
      //   loadChildren: './gallery/gallery.module#GalleryModule',
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: '',
      //   loadChildren: './facilitygallery/facilitygallery.module#FacilityGalleryModule',
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: 'stock_sheet',
      //   loadChildren: './stock_reconcilation/stock.module#Stock_Module',
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: 'sale',
      //   loadChildren: './sales/sale.module#SalesModule',
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: 'calender',
      //   loadChildren: './calender/calender.modules#CalendersModule',
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: 'approval',
      //   loadChildren: './approval/approval.modules#ApprovalModule',
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: 'schedule',
      //   loadChildren: './calender_schedule/calender_schedule.modules#Calenders_scheduleModule',
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: 'tradearea',
      //   loadChildren: './maps/maps.modules#MapsModule',
      //   canActivate: [AuthGuard]
      // }
    ]
  }
  // },
  // {
  //   path: '**',
  //   //component: Page404Component
  // }
];

