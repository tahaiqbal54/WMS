// import { NoAuthGuard } from './../_guards/noauth.guard';
import { Routes, CanActivate } from '@angular/router';

// Users Components
import {PutawaysListComponent} from './list/inventory-list.component';


export const InventoryRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: PutawaysListComponent,
        // resolve: {
        //   data: UsersResolver
        // },
        data: {
          title: 'Inventory'
        },
        // canActivateChild: [NoAuthGuard]
      },
      // {
      //   path: 'add/:id',
      //   component: PutAwayAddComponent,
      //   data: {
      //     title: 'Inventory'
      //   },
      // },
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
      // {
      //   path: 'edit/:id',
      //   component: UsersEditComponent,
      //   // resolve: {
      //   //   data: UserDetailResolver
      //   // },
      //   data: {
      //     title: 'Edit User'
      //   },
      //   // canActivateChild: [NoAuthGuard]
      // }
    ]
  }
];

