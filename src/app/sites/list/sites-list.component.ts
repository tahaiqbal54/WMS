import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import Swal from "sweetalert2";
import {SitesService} from "../../_services/sites.service";
import {ToastOptions, ToastyService} from 'ng2-toasty';
import {NotificationCommunicationService} from '../../_services';
import swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'site-list',
  templateUrl: 'sites-list.html',
})

export class SitesListComponent implements AfterViewInit, OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  sites: any[] = [];
  position:any;

  constructor(private router: Router,private SitesService: SitesService,private toastyService: ToastyService, private toastCommunicationService: NotificationCommunicationService) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        emptyTable: "No Sites found"
      },
      columnDefs: [
        { width: "20%", searchable: true, targets: 1 },
        { orderData: 5, targets: 2},
        { visible: false, targets: 5 }
      ]
    };
    this.position = "bottom-right";

    this.SitesService.getSites()
      .subscribe(
        (data: any) => {

          this.sites = data;

          this.rerender();
        },
        (error: any) => {
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

  inActiveSite(locationId:any) {
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

        this.SitesService.SiteStatus(locationId,true)
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
              this.SitesService.getSites()
              .subscribe(
                (data: any) => {

                  this.sites = data;

                  this.rerender();
                },
                (error: any) => {
                  console.log(error);
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

  inDeActiveSite(locationId:any) {
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

        this.SitesService.SiteStatus(locationId,false)
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
              this.SitesService.getSites()
              .subscribe(
                (data: any) => {

                  this.sites = data;

                  this.rerender();
                },
                (error: any) => {
                  console.log(error);
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



