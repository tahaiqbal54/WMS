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
          console.log(data);
          this.sites = data;
          // data.sort(function(o) {
          //   return new Date(o.ReceiptDate);
          // });
          // data.reverse();
          // let count = 0;

          // data.forEach(order => {
          //     if (order.ReceiptDate != null) {
          //       order[
          //         "ReceiptDate_formatted"
          //       ] = order.ReceiptDate.split("T").shift();
          //       order.sortOrder = count++;
          //     } else order.sortOrder = data.length;
          //     order[
          //       "ReceiptDate_formatted"
          //     ] = order.ReceiptDate.split("T").shift();
          //     this.users.push(order);
          // });
        
          this.rerender();
        (error: any) => {
          console.log(error);
          // this.inserted = 'failure';
          // this.message = error.error.message;
        }
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

  deleteSite(siteId:any) {
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



