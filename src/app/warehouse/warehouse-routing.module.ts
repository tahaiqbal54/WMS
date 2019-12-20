import { Routes } from '@angular/router';
import {WarehouseListComponent} from './list/warehouse-list.component';
import {WarehouseAddComponent} from './add/warehouse-add.component';
import {WarehouseEditComponent} from './edit/warehouse-edit.component';


export const WarehouseRoutes : Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: WarehouseListComponent,
        data: {
          title: 'Warehouse'
        },
      },
      {
        path: 'add',
        component: WarehouseAddComponent,
        data: {
          title: 'Add Warehouse'
        },
      },

      {
        path: 'edit/:id',
        component: WarehouseEditComponent,
        data: {
          title: 'Edit Warehouse'
        },
      },

    ]
  }
];

