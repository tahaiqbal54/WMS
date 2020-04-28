import { first } from 'rxjs/operators';
//import { user_disable } from '../../_models/user_disable';
//import { User } from '../../_models/user';
import Swal from "sweetalert2";
import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import { Subject } from 'rxjs';
import {ReceiveService,AllocationService,PickService,ShipService,InventoryService} from '../../_services';
import {ActivatedRoute, Router, ActivatedRouteSnapshot} from "@angular/router";
import {Observable, of, forkJoin} from 'rxjs';
import {mergeMap, map, take} from 'rxjs/operators';
import { DataTableDirective } from "angular-datatables";


@Component({
  templateUrl: 'release-list.html',
  providers: [ReceiveService]
})
export class ReleaseListComponent implements AfterViewInit, OnDestroy, OnInit {
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
  

  constructor(private router: Router,private InventoryService: InventoryService, private route: ActivatedRoute) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user_id=this.currentUser.User[0].Id;
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        emptyTable: "No Journal found"
      },
      columnDefs: [
        { width: "20%", searchable: true, targets: 0 },
        { orderData: 5, targets: 1},
        { visible: false, targets: 5 }
      ]
    };
    this.InventoryService.getReleaseJournal()
      .subscribe(
        (data: any) => {
          console.log(data);
          data.sort(function(o) {
            return new Date(o.JournalDate);
          });
          data.reverse();
          let count = 0;

          data.forEach(order => {
              if (order.JournalDate != null) {
                order[
                  "SODate_formatted"
                ] = order.JournalDate.split("T").shift();
                order.sortOrder = count++;
              } else order.sortOrder = data.length;
              order[
                "SODate_formatted"
              ] = order.JournalDate.split("T").shift();
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

  // checkstatus(StatusId: any, Id: any) {
  //   (Swal as any).fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes!'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.router.navigate(['/receiving/add/' + Id])
  //     }else{
  //       console.log('cancelled');
  //     }
  //   });
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
