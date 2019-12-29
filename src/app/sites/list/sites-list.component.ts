import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import Swal from "sweetalert2";
import {SitesService} from "../../_services/sites.service";


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

  constructor(private router: Router,private SitesService: SitesService) {
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

  inActiveSite(siteId:any) {
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

        this.sites.map((site) =>{
          if(site.Id == siteId){
            site.IsActive = ! site.IsActive;
          }
        } )

      } else {
        console.log('cancelled');
      }
    });
  }

}



