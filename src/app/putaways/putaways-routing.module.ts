// import { NoAuthGuard } from './../_guards/noauth.guard';
import { Routes, CanActivate } from '@angular/router';

// Users Components
import {PutawaysListComponent} from './list/putaways-list.component';
import {PutAwayAddComponent} from './add/putaway-add.component';


export const PutawayRoutes: Routes = [
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
          title: 'Users'
        },
        // canActivateChild: [NoAuthGuard]
      },
      {
        path: 'add/:id',
        component: PutAwayAddComponent,
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

