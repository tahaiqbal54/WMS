import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import Swal from "sweetalert2";
import {ProductService} from '../../_services';



declare var $: any;

@Component({
  selector: 'product-list',
  templateUrl: 'product-list.html',
})

export class ProductListComponent implements AfterViewInit, OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  products: any[] = [];

  constructor(private router: Router,private productService: ProductService) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        emptyTable: "No Product found"
      }
    };

    this.getProducts();

    this.products = [
      {id: 1, product_name: 'Product A'},
      {id: 2, product_name: 'Product B'},
      {id: 3, product_name: 'Product C'},
      ];

  }


  getProducts(){
    this.productService.getProducts().subscribe((products) =>{
      console.log('product',products);

      this.products = products;
      this.rerender();
    },(err) =>{
       console.log('err',err);
    })
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  deleteProduct(productId:any) {
    (Swal as any).fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

      } else {
        console.log('cancelled');
      }
    });
  }

}



