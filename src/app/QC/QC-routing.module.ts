// import { NoAuthGuard } from './../_guards/noauth.guard';
import { Routes, CanActivate } from '@angular/router';

// Users Components
// import {UsersListComponent} from './list/users-list.component';
// import {UsersAddComponent} from './add/users-add.component';
// //import {UsersViewComponent} from './view/users-view.component';
// import {UsersEditComponent} from './edit/users-edit.component';
//import {UserDetailResolver} from '../_guards';
//import {UsersResolver} from '../_guards';
//import {UserViewResolver} from '../_guards';
import {QCListComponent} from './list/QC-list.component'
import {QCAddComponent} from './add/QC-add.component';
import {QCEditComponent} from './edit/QC-edit.component'
import {QCViewComponent} from './view/QC-view.component'


export const ShipRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: QCListComponent,
        // resolve: {
        //   data: UsersResolver
        // },
        data: {
          title: 'Receiving'
        },
        // canActivateChild: [NoAuthGuard]
      },
      {
        path: 'add',
        component: QCAddComponent,
        data: {
          title: 'Add Receiving'
        },
      },
      {
        path: 'edit/:JournalNo',
        component: QCEditComponent,
        data: {
          title: 'Add Receiving'
        },
      },
      {
        path: 'view/:JournalNo',
        component: QCViewComponent,
        data: {
          title: 'Add Receiving'
        },
      },
        // canActivateChild: [NoAuthGuard]
      // },
  //     // {
  //     //   path: 'view/:id',
  //     //   component: UsersViewComponent,
  //     //   resolve: {
  //     //     data: UserViewResolver
  //     //   },
  //     //   data: {
  //     //     title: 'View User'
  //     //   },
  //     //   // canActivateChild: [NoAuthGuard]
  //     // },
  //     {
  //       path: 'edit/:id',
  //       component: UsersEditComponent,
  //       // resolve: {
  //       //   data: UserDetailResolver
  //       // },
  //       data: {
  //         title: 'Edit User'
  //       },
  //       // canActivateChild: [NoAuthGuard]
  //     }
   ]
   }
    
];

