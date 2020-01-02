import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import Swal from 'sweetalert2';
import {CustomerService} from '../../_services';



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

  constructor(private router: Router,private customerService:CustomerService ) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };


    this.getCustomers();

  }


  //Id: 1, CustomerId: "CUS-001", CustomerName: "Customer - 1"
  getCustomers(){
    this.customerService.getCustomers().subscribe((data)=>{

       if(data){
         data.map((customer) =>{
             this.customers.push({
               id : customer.Id,
               customerId: customer.CustomerId,
               customerName: customer.CustomerName,
               isActive: customer.IsActive
             });
         });

         this.rerender();
       }
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

  statusToggle(customerId:any) {
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
       this.customers.map((customer) =>{
            if(customer.id == customerId){
              customer.isActive = !customer.isActive;
            }
       });
      } else {
        console.log('cancelled');
      }
    });
  }

}



