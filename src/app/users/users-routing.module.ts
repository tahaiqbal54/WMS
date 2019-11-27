// import { NoAuthGuard } from './../_guards/noauth.guard';
import { Routes, CanActivate } from '@angular/router';

// Users Components
import {UsersListComponent} from './list/users-list.component';
import {UsersAddComponent} from './add/users-add.component';
//import {UsersViewComponent} from './view/users-view.component';
import {UsersEditComponent} from './edit/users-edit.component';
//import {UserDetailResolver} from '../_guards';
//import {UsersResolver} from '../_guards';
//import {UserViewResolver} from '../_guards';


export const UsersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: UsersListComponent,
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
        component: UsersAddComponent,
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
        component: UsersEditComponent,
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

