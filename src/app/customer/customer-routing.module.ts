import { Routes } from '@angular/router';
import {CustomerListComponent} from './list/customer-list.component';
import {CustomerAddComponent} from './add/customer-add.component';
import {CustomerEditComponent} from './edit/customer-edit.component';


export const CustomerRoutes : Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: CustomerListComponent,
        data: {
          title: 'Customers'
        },
      },
      {
        path: 'add',
        component: CustomerAddComponent,
        data: {
          title: 'Customer Add'
        },
      },
      {
        path: 'edit/:id',
        component: CustomerEditComponent,
        data: {
          title: 'Customer Edit'
        },
      }
    ]
  }
];

