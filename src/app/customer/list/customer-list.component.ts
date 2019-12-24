import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import Swal from 'sweetalert2';



declare var $: any;

@Component({
  selector: 'cusstomer-list',
  templateUrl: 'customer-list.html',
})

export class CustomerListComponent implements AfterViewInit, OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  customers: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.customers = [
      {
        "id" : 1,
        "customer_name": "Customer A",
        "created_at": "19-12-2019"
      },
      {
        "id" : 2,
        "customer_name": "Customer B",
        "created_at": "19-12-2019"
      },
      {
        "id" : 3,
        "customer_name": "Customer C",
        "created_at": "19-12-2019"
      },
      {
        "id" : 4,
        "customer_name": "Customer D",
        "created_at": "19-12-2019"
      },
    ];

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

  deleteCustomer(customerId:any) {
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



