import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import Swal from 'sweetalert2';
import {LocationService} from '../../_services/location.service';
import {d} from '@angular/core/src/render3';
import {ToastOptions, ToastyService} from 'ng2-toasty';
import {NotificationCommunicationService} from '../../_services';
import swal from 'sweetalert2';


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
  position:any;

  constructor(private router: Router,private toastyService: ToastyService, private toastCommunicationService: NotificationCommunicationService,private locationService: LocationService) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };

    this.position = "bottom-right";

    this.locationService.getLocations().subscribe( (data) =>{
        this.locations = data;
        console.log(this.locations);
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
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {

        this.locationService.LocationStatus(locationId,true)
        .subscribe(
          (data: any) => {
            if (data)
            {
              let toastOptions: ToastOptions = {
                title: 'Success',
                msg: 'Location Status Activate',
                showClose: true,
                timeout: 2000,
                theme: 'default',
      
              };
              this.toastyService.success(toastOptions);
              this.toastCommunicationService.setPosition(this.position);
              this.locationService.getLocations().subscribe( (data) =>{
                this.locations = data;
                console.log(this.locations);
                this.rerender();
        
            },(err) =>{
                console.log('err',err);
            });
            }
          },
          (error: any) => {
            console.log(error);
            swal(error.error['Message']);


          }
        );


      } else {
        console.log('cancelled');
      }
    });
  }

  inDeActiveWarehouse(locationId:any) {
    (Swal as any).fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {

        this.locationService.LocationStatus(locationId,false)
        .subscribe(
          (data: any) => {
            if (data)
            {
              let toastOptions: ToastOptions = {
                title: 'Success',
                msg: 'Location Status Disabled',
                showClose: true,
                timeout: 2000,
                theme: 'default',
      
              };
              this.toastyService.success(toastOptions);
              this.toastCommunicationService.setPosition(this.position);
              this.locationService.getLocations().subscribe( (data) =>{
                this.locations = data;
                console.log(this.locations);
                this.rerender();
        
            },(err) =>{
                console.log('err',err);
            });
            }
          },
          (error: any) => {
            console.log(error);
            swal(error.error['Message']);


          }
        );


      } else {
        console.log('cancelled');
      }
    });
  }

}



