// import { NoAuthGuard } from './../_guards/noauth.guard';
import { Routes, CanActivate } from '@angular/router';

// Users Components
import {ShipmentListComponent} from './list/shipment-list.component';
import {ShipmentAddComponent} from './add/shipment-add.component';
//import {UsersViewComponent} from './view/users-view.component';
import {ShipmentEditComponent} from './edit/shipment-edit.component';
//import {UserDetailResolver} from '../_guards';
//import {UsersResolver} from '../_guards';
//import {UserViewResolver} from '../_guards';


export const ShipmentRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ShipmentListComponent,
        // resolve: {
        //   data: UsersResolver
        // },
        data: {
          title: 'Users'
        },
        // canActivateChild: [NoAuthGuard]
      },
      {
        path: 'add',
        component: ShipmentAddComponent,
        data: {
          title: 'Add User'
        },
      },
        // canActivateChild: [NoAuthGuard]
      // },
      // {
      //   path: 'view/:id',
      //   component: UsersViewComponent,
      //   resolve: {
      //     data: UserViewResolver
      //   },
      //   data: {
      //     title: 'View User'
      //   },
      //   // canActivateChild: [NoAuthGuard]
      // },
      {
        path: 'edit/:id',
        component: ShipmentEditComponent,
        // resolve: {
        //   data: UserDetailResolver
        // },
        data: {
          title: 'Edit User'
        },
        // canActivateChild: [NoAuthGuard]
      }
    ]
  }
];

