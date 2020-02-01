import { Routes } from '@angular/router';
import {SitesListComponent} from './list/sites-list.component';
import {SitesAddComponent} from './add/sites-add.component';
import {SitesEditComponent} from './edit/sites-edit.component';


export const SitesRoutes : Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: SitesListComponent,
        data: {
          title: 'Sites'
        },
      },
      {
        path: 'add',
        component: SitesAddComponent,
        data: {
          title: 'Add Site'
        },
      },

      {
        path: 'edit/:id',
        component: SitesEditComponent,
        data: {
          title: 'Edit Site'
        },
      },

    ]
  }
];

