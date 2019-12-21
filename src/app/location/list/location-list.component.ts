import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import Swal from 'sweetalert2';



declare var $: any;

@Component({
  selector: 'location-list',
  templateUrl: 'location-list.html',
})

export class LocationListComponent implements AfterViewInit, OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  locations: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.locations = [
      {
        "id" : 1,
        "location_name": "Location A",
        "created_at": "19-12-2019"
      },
      {
        "id" : 2,
        "location_name": "Location B",
        "created_at": "19-12-2019"
      },
      {
        "id" : 3,
        "location_name": "Location C",
        "created_at": "19-12-2019"
      },
      {
        "id" : 4,
        "location_name": "Location D",
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



