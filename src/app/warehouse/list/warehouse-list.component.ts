import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';



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

  constructor(private router: Router) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.warehouses = [
      {
        "id" : 1,
        "warehouse_name": "Warehouse A",
        "created_at": "19-12-2019"
      },
      {
        "id" : 2,
        "warehouse_name": "Warehouse B",
        "created_at": "19-12-2019"
      },
      {
        "id" : 3,
        "warehouse_name": "Warehouse C",
        "created_at": "19-12-2019"
      },
      {
        "id" : 4,
        "warehouse_name": "Warehouse D",
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

}



