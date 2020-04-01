// import { NoAuthGuard } from './../_guards/noauth.guard';
import { Routes, CanActivate } from '@angular/router';

// Users Components
import {PutawaysListComponent} from './list/inventory-list.component';
import {InventoryHoldComponent} from './hold/inventory-hold.component';
import {InventoryUnHoldComponent} from './unhold/inventory-unhold.component';
import {TransactionComponent} from './transaction/inventory-transaction.component';
import {InventoryUpdateComponent} from './update/inventory-update.component';


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
      {
        path: 'hold',
        component: InventoryHoldComponent,
        // resolve: {
        //   data: UsersResolver
        // },
        data: {
          title: 'Inventory'
        },
        // canActivateChild: [NoAuthGuard]
      },
      {
        path: 'unhold',
        component: InventoryUnHoldComponent,
        // resolve: {
        //   data: UsersResolver
        // },
        data: {
          title: 'Inventory'
        },
        // canActivateChild: [NoAuthGuard]
      },
      {
        path: 'transaction',
        component: TransactionComponent,
        // resolve: {
        //   data: UsersResolver
        // },
        data: {
          title: 'Inventory'
        },
        // canActivateChild: [NoAuthGuard]
      },
      {
        path: 'update',
        component: InventoryUpdateComponent,
        // resolve: {
        //   data: UsersResolver
        // },
        data: {
          title: 'Inventory'
        },
        // canActivateChild: [NoAuthGuard]
      },
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

