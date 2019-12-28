import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import Swal from 'sweetalert2';
import {LocationService} from '../../_services/location.service';
import {d} from '@angular/core/src/render3';



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

  constructor(private router: Router,private locationService: LocationService) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };

    this.locationService.getLocations().subscribe( (data) =>{
        this.locations = data;
        this.rerender();

    },(err) =>{
        console.log('err',err);
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

  inActiveWarehouse(locationId:any) {
    (Swal as any).fire({
      title: 'Are you sure?',
      text: "You won't be able to disable this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.locations.map((location)=>{
          if(location.Id == locationId){
             location.IsActive = !location.IsActive;
          }
        });


      } else {
        console.log('cancelled');
      }
    });
  }

}



