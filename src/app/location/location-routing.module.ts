import { Routes } from '@angular/router';
import {LocationListComponent} from './list/location-list.component';
import {LocationAddComponent} from './add/location-add.component';
import {LocationEditComponent} from './edit/location-edit.component';



export const LocationRoutes : Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: LocationListComponent,
        data: {
          title: 'Location'
        },
      },
      {
        path: 'add',
        component: LocationAddComponent,
        data: {
          title: 'Add Location'
        },
      },
      {
        path: 'edit/:id',
        component: LocationEditComponent,
        data: {
          title: 'Edit Location'
        },
      }



    ]
  }
];

