import { Routes } from '@angular/router';
import {ProductListComponent} from './list/product-list.component';
import {ProductAddComponent} from './add/product-add.component';
import {ProductEditComponent} from './edit/product-edit.component';


export const ProductRoutes : Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ProductListComponent,
        data: {
          title: 'Product List'
        },
      },
      {
        path: 'add',
        component: ProductAddComponent,
        data: {
          title: 'Product Add'
        },
      },

      {
        path: 'edit/:id',
        component: ProductEditComponent,
        data: {
          title: 'Product Edit'
        },
      },


    ]
  }
];

