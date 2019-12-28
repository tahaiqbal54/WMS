import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import Swal from 'sweetalert2';
import {WarehouseService} from '../../_services/warehouse.service';



declare var $: any;

@Component({
  selector: 'warehouse-list',
  templateUrl: 'warehouse-list.html',
})

export class WarehouseListComponent implements AfterViewInit, OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  warehouses: any[] = [];

  constructor(private router: Router,private WarehouseService:WarehouseService) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        emptyTable: "No warehouses found"
      },
      columnDefs: [
        { width: "20%", searchable: true, targets: 1 },
        { orderData: 5, targets: 2},
        { visible: false, targets: 5 }
      ]
    };
    this.WarehouseService.getWarehouses()
      .subscribe(
        (data: any) => {
          console.log(data);
          this.warehouses = data;




          this.rerender();
        },(error: any) => {
          console.log(error);
        });


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

  deleteWarehouse(warehouseId:any) {
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



