import { Component, OnInit , AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
//import {UsersService} from '../../_services/users.service';
import {OrderHeader} from '../../_models/OrderHeader';
import {Router, ActivatedRoute} from "@angular/router";
import swal from 'sweetalert2';
import { OrderService } from '../../_services/order.service';
import {ReceiveService} from '../../_services/receive.service';
import {PutAwayService} from '../../_services/putaways.services';
import { DataTableDirective } from "angular-datatables";
import { Subject } from 'rxjs';
declare var $: any;
import {ToastOptions, ToastyService} from 'ng2-toasty';
import {NotificationCommunicationService} from '../../_services';


@Component({
  templateUrl: 'putaway-add.html',
  providers: [OrderService,ReceiveService,PutAwayService]
})

export class PutAwayAddComponent implements AfterViewInit, OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  OrderHeader: OrderHeader;
  OrderDetail: any[] = [];
  confirm_password: string;
  inserted: string;
  message: string;
  avatar: any;
  public currentUser: any;
  user_id: any;
  customer_id:any;
  product: any[] = [];
  products: any;
  Description: any;
  Quantity: any;
  UOM: any;
  UnitId: any;
  PackId: any;
  Pack: any;
  UDF: any[] = [];
  ManufactureDate: Date;
  ExpiryDate:Date;
  ReceiptDate:Date;
  BatchNo: any;
  ASNNO:any;
  LineId: any;
  detailId: any = 0;
  index: any;
  Id: any;
  productId: any;
  LOTNo: any;
  LPNNo: any;
  fromlocation: any;
  fromlocationId: any;
  recieveId: any;
  tolocation: any;
  position:any;

  constructor(private router: Router,private putawayservice: PutAwayService,private receiveservice: ReceiveService,private route: ActivatedRoute,private toastyService: ToastyService, private toastCommunicationService: NotificationCommunicationService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user_id=this.currentUser.User[0].Id;
    this.Id = parseInt(this.route.snapshot.paramMap.get('id').trim(), 10);
  }

  warehouseOptions: any = [];
  warehousesSelectConfig: any = {
    labelField: 'WarehouseName',
    valueField: 'Id',
    searchField: ['WarehouseName']
  };

  customerOptions: any = [];
  customerSelectConfig: any = {
    labelField: 'CustomerName',
    valueField: 'id',
    searchField: ['CustomerName']
  };

  vendorOptions: any = [];
  vendorSelectConfig: any = {
    labelField: 'CustomerName',
    valueField: 'Id',
    searchField: ['CustomerName']
  };
  vendorEnabled: boolean;

  ProductOptions: any = [];
  ProductConfig: any = {
    labelField: 'ProductName',
    valueField: 'id',
    searchField: ['ProductName']
  };
  

  ngOnInit() {
    this.position = "bottom-right";
    this.putawayservice.getPutawayDetail(this.Id)
      .subscribe(
        (data: any) => {
          // this.OrderDetail = data;
          // console.log(this.OrderDetail);
          this.dtOptions = {
            pagingType: 'full_numbers',
            language: {
              emptyTable: "No users found"
            },
            
          };
          data.sort(function(o) {
            return new Date(o.ManDate);
          });
          data.reverse();
          let count = 0;

          data.forEach(order => {
              if (order.ManDate) {
                order.ManDate = order.ManDate.split("T").shift();
                
              } 
              this.OrderDetail.push(order);
          });
          this.rerender();
        (error: any) => {
          console.log(error);
          this.inserted = 'failure';
          this.message = error.error.message;
        }
        });
  //   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   if(this.currentUser.role_id == 2 || this.currentUser.role_id == 3){
  //     swal(
  //       "You are not authorized for this page"
  //     )
  //     this.router.navigate(['/dashboard']);
  //   } else if(this.currentUser.role_id == 4){
  //     swal(
  //       "You are not authorized for this page"
  //     )
  //     this.router.navigate(['/retail-outlets/list']);
  //   }
  //   this.OrderHeader = new OrderHeader();
  //   this.orderservice
  //     .getWarehouses(this.user_id)
  //     .subscribe(
  //       (data: any) => {
  //         this.warehouseOptions = data['Warehouse'];
  //         console.log(this.warehouseOptions);
  //       },
  //       (error: any) => console.log(error)
  //     );

  //   this.orderservice
  //     .getCustomers(this.user_id)
  //     .subscribe(
  //       (data: any) => {
  //         console.log(data);
  //         data.forEach(customer => {
  //           let obj = {
  //             id : customer.Id,
  //             CustomerName : customer.CustomerName
  //           }
  //           this.customerOptions.push(obj);
  //         });
  //         //this.customerOptions = data['Customer'];
  //         console.log(this.customerOptions);
  //       },
  //       (error: any) => console.log(error)
  //     );
  // }

  // onCustomerChange(event: any) {
  //   this.customer_id = event;
  //   this.orderservice
  //     .getVendors(event)
  //     .subscribe(
  //       (data: any) => {
  //         this.vendorOptions = data;
  //         console.log(this.vendorOptions);
  //       },
  //       (error: any) => console.log(error)
  //     );
  //   }

  //   onQCChange(event: any, value:boolean): void {
  //     if(event.target.checked){
  //       this.OrderHeader.RequiredQC = value;
  //       console.log(this.OrderHeader.RequiredQC);
  //     }else{
  //       this.OrderHeader.RequiredQC = false;
  //     }
       
      
  //     //this.OrderHeader.RequiredQC = value;
   }

   OpenModal(index: any){
     this.fromlocation = '';
     this.tolocation = '';
     this.fromlocation = this.OrderDetail[index].Location;
     this.productId = this.OrderDetail[index].ProductId;
     this.LPNNo = this.OrderDetail[index].LPNNo;
     this.fromlocationId = this.OrderDetail[index].LocationId;
     this.recieveId = this.OrderDetail[index].Id;
     this.Quantity = this.OrderDetail[index].QtyOrdered;
    $("#modal").modal("show");
   }

    ADDDetail(){
      if(this.tolocation == null || this.tolocation == undefined){
        let toastOptions: ToastOptions = {
          title: 'Error',
          msg: 'Kindly give location',
          showClose: true,
          timeout: 2000,
          theme: 'default',

        };
        this.toastyService.error(toastOptions);
        this.toastCommunicationService.setPosition(this.position);
      }
      else {
      let detail = {
        Id:0,
        ProductId: this.productId,
        LPNNo: this.LPNNo,
        FromLocationId:this.fromlocationId,
        ToLocation: this.tolocation,
        ReceiveId: this.recieveId,
        Qty: this.Quantity
      }
      console.log(detail);
      this.putawayservice.PutawayPost(detail)
      .subscribe(
        (data: any) => {
          if (data) {
            let toastOptions: ToastOptions = {
              title: 'Success',
              msg: 'PutAway Successful',
              showClose: true,
              timeout: 2000,
              theme: 'default',

            };
            this.toastyService.success(toastOptions);
            this.toastCommunicationService.setPosition(this.position);
            $("#modal").modal("hide");
            // setTimeout(() => {
            //   this.router.navigate(['/users/list']);
            // }, 3000);
          }
          console.log(data);
          this.fromlocation = '';
          this.rerender();
        }, 
        (error: any) => {
          console.log(error);
          swal(error.error['Message']);
        }
      );
    }
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

    
    

    parseDate(dateString: string): Date {
      if (dateString) {
        return new Date(dateString);
      } else {
        return null;
      }
    }

  }



