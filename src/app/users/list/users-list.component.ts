import Swal from "sweetalert2";
import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import { Subject } from 'rxjs';
import {OrderService} from '../../_services';
import {ActivatedRoute, Router, ActivatedRouteSnapshot} from "@angular/router";
import {Observable, of, forkJoin} from 'rxjs';
import {mergeMap, map, take} from 'rxjs/operators';
import { DataTableDirective } from "angular-datatables";


@Component({
  templateUrl: 'users-list.html',
  providers: [OrderService]
})
export class UsersListComponent implements AfterViewInit, OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  users: any[] = [];
  //user: User;
  //user_disable:user_disable;
  inserted: string;
  message: string;
  tab: number = 0;
  currentUser: any;
  user_id : any;


  constructor(private router: Router,private orderservice: OrderService, private route: ActivatedRoute) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user_id=this.currentUser.UserRoleRightsList[0].UserRoleId;
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        emptyTable: "No users found"
      },
      columnDefs: [
        { width: "20%", searchable: true, targets: 1 },
        { orderData: 6, targets: 2},
        { visible: false, targets: 6 }
      ]
    };
    this.orderservice.getPurchase(this.user_id)
      .subscribe(
        (data: any) => {
          data.sort(function(o) {
            return new Date(o.ASNDate);
          });
          data.reverse();
          let count = 0;

          data.forEach(order => {
              if (order.ASNDate != null) {
                order[
                  "ASNDate_formatted"
                ] = order.ASNDate.split("T").shift();
                order.sortOrder = count++;
              } else order.sortOrder = data.length;
              order[
                "ASNDate_formatted"
              ] = order.ASNDate.split("T").shift();
              this.users.push(order);
          });
          console.log(this.users);
          this.rerender();
        (error: any) => {
          console.log(error);
          this.inserted = 'failure';
          this.message = error.error.message;
        }
        });
  }

  DeleteASN(Id:any,index){

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

        this.orderservice.DeleteASN(Id)
          .subscribe(
            (data: any) => {
              //this.users = data;
              console.log(data);
              this.users.splice(index,1);
              this.dtOptions = {
                pagingType: 'full_numbers',
                language: {
                  emptyTable: "No users found"
                },

              };
              this.rerender();

              (error: any) => {
                console.log(error);
                this.inserted = 'failure';
                this.message = error.error.message;
              }
            });
      }else{
        console.log('cancelled');
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


}
