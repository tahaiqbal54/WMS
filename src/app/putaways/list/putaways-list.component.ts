import { first } from 'rxjs/operators';
//import { user_disable } from '../../_models/user_disable';
//import { User } from '../../_models/user';
import  swal  from 'sweetalert2';
import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import { Subject } from 'rxjs';
import {PutAwayService} from '../../_services';
import {ActivatedRoute, Router, ActivatedRouteSnapshot} from "@angular/router";
import {Observable, of, forkJoin} from 'rxjs';
import {mergeMap, map, take} from 'rxjs/operators';
import { DataTableDirective } from "angular-datatables";


@Component({
  templateUrl: 'putaway-list.html',
  providers: [PutAwayService]
})
export class PutawaysListComponent implements AfterViewInit, OnDestroy, OnInit {
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
  

  constructor(private router: Router,private orderservice: PutAwayService, private route: ActivatedRoute) {
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
        { orderData: 5, targets: 2},
        { visible: false, targets: 5 }
      ]
    };
    this.orderservice.getPutaway(this.user_id)
      .subscribe(
        (data: any) => {
          console.log(data);
          data.sort(function(o) {
            return new Date(o.ReceiptDate);
          });
          data.reverse();
          let count = 0;

          data.forEach(order => {
              if (order.ReceiptDate != null) {
                order[
                  "ReceiptDate_formatted"
                ] = order.ReceiptDate.split("T").shift();
                order.sortOrder = count++;
              } else order.sortOrder = data.length;
              order[
                "ReceiptDate_formatted"
              ] = order.ReceiptDate.split("T").shift();
              this.users.push(order);
          });
          this.rerender();
        (error: any) => {
          console.log(error);
          this.inserted = 'failure';
          this.message = error.error.message;
        }
        });
  }

  // DeleteASN(Id:any,index){
  //   this.orderservice.DeleteASN(Id)
  //   .subscribe(
  //     (data: any) => {
  //       //this.users = data;
  //       console.log(data);
  //       this.users.splice(index,1);
  //       this.dtOptions = {
  //         pagingType: 'full_numbers',
  //         language: {
  //           emptyTable: "No users found"
  //         },
          
  //       };
  //       this.rerender();
  //     (error: any) => {
  //       console.log(error);
  //       this.inserted = 'failure';
  //       this.message = error.error.message;
  //     }
  //     });
  // }

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

  // disable(){
  //   this.user_disable= new user_disable();
  //   this.user_disable.user_id = 
  //   this.user_disable.status = 'disabled';
  //   this.usersService.disabled(this.user_disable)
  //     .subscribe(
  //       (data: any) => {
  //         if (data.success) {
  //           this.inserted = 'success';
  //           this.message = "The status has been updated.";
  //         }
  //         console.log(data);
  //       },
  //       (error: any) => {
  //         console.log(error);
  //         this.inserted = 'failure';
  //         this.message = error.error.message;
  //       }
  //     );
  // }

//   disablebutton(id, name) {
//     swal({
//         title: "Are you sure?",   
//         text: "",   
//         type: "warning",   
//         showCancelButton: true,   
//         confirmButtonColor: "#DD6B55",   
//         confirmButtonText: "Yes, disable it!",
        
//     }).then((result)=>{
//       if(this.currentUser.first_name != name){
//       if(result.value){
//         this.user_disable= new user_disable();
//         this.user_disable.user_id = id;
//         this.user_disable.status = 'disabled';
//         this.usersService.disabled(this.user_disable)
//           .subscribe(
//             (data: any) => {
//               if (data.success) {
//                 this.inserted = 'success';
//                 this.message = "The status has been updated.";
//                 location.reload(true);
//               }
//             },
//             (error: any) => {
//               console.log(error);
//               this.inserted = 'failure';
//               this.message = error.error.message;
//             }
//           );
//       } else if(result.dismiss === swal.DismissReason.cancel) {
//       swal(
//         'Cancelled',
//         'Your User is still Active :)',
//         'error'
//       )
//     }
//   }else{
//     swal(
//       'Cancelled',
//       'You can not disable yourself :)',
//       'error'
//     )
//   }
//   })
// }

// enablebutton(id) {
//   swal({
//       title: "Are you sure?",   
//       text: "",   
//       type: "warning",   
//       showCancelButton: true,   
//       confirmButtonColor: "#DD6B55",   
//       confirmButtonText: "Yes, enable it!",
//   }).then((result)=>{
//     if(result.value){
//       this.user_disable= new user_disable();
//       this.user_disable.user_id = id;
//       this.user_disable.status = 'active';
//       this.usersService.disabled(this.user_disable)
//         .subscribe(
//           (data: any) => {
//             if (data.success) {
//               this.inserted = 'success';
//               this.message = "The status has been updated.";
//               location.reload(true);
//             }
//           },
//           (error: any) => {
//             console.log(error);
//             this.inserted = 'failure';
//             this.message = error.error.message;
//           }
//         );
//     } else if(result.dismiss === swal.DismissReason.cancel) {
//       swal(
//         'Cancelled',
//         'Your User is still Disable :)',
//         'error'
//       )
//     }   
//   })
  
//}

}
