import { Component, OnInit , AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
//import {UsersService} from '../../_services/users.service';
import {OrderHeader} from '../../_models/OrderHeader';
import {Router, ActivatedRoute} from "@angular/router";
import swal from 'sweetalert2';
import { OrderService } from '../../_services/order.service';
import {ReceiveService} from '../../_services/receive.service';
import { DataTableDirective } from "angular-datatables";
import { Subject } from 'rxjs';
declare var $: any;
import {ToastOptions, ToastyService} from 'ng2-toasty';
import {NotificationCommunicationService} from '../../_services';


@Component({
  templateUrl: 'recieving-add.html',
  providers: [OrderService,ReceiveService]
})

export class RecievingAddComponent implements AfterViewInit, OnDestroy, OnInit {
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
  position:any;

  constructor(private router: Router,private orderservice: OrderService,private receiveservice: ReceiveService,private route: ActivatedRoute,private toastyService: ToastyService, private toastCommunicationService: NotificationCommunicationService) {
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

    this.receiveservice.UpdatePurchaseStatus(3,this.Id)
    .subscribe(
      (data: any) => {
        if (data) {
          // this.inserted = 'success';
          // this.message = "The Order has been created.";
        }
        console.log(data);
      }, 
      (error: any) => {
        console.log(error);
        swal(error.error['Message']);
      }
    );


    this.receiveservice.getReceiveDetails(this.Id)
      .subscribe(
        (data: any) => {
          this.OrderDetail = data;
          console.log(this.OrderDetail);
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
      }


    ADDDetail(){
      if(this.Quantity == null || this.Quantity == undefined || this.LPNNo == null || this.LPNNo == undefined){
        let toastOptions: ToastOptions = {
          title: 'Error',
          msg: 'Fill All Fields',
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
        PurchaseId: this.Id,
        PurchaseDetailId: this.detailId,
        ProductId:this.productId,
        UnitId: this.UnitId,
        QtyOrdered: this.Quantity,
        LPNNo: this.LPNNo,
        PackId: this.PackId,
        BatchNo: this.BatchNo,
        ManDate:this.ManufactureDate,
        ExpDate: this.ExpiryDate,
        LocationId : 1,
        QCRequired: true,        
      }
      console.log(detail);
      this.receiveservice.createReceive(detail)
      .subscribe(
        (data: any) => {
          if (data) {
            let toastOptions: ToastOptions = {
              title: 'Success',
              msg: 'Product Recieved',
              showClose: true,
              timeout: 2000,
              theme: 'default',

            };
            this.toastyService.success(toastOptions);
            this.toastCommunicationService.setPosition(this.position);
            // setTimeout(() => {
            //   this.router.navigate(['/users/list']);
            // }, 3000);
          }
          console.log(data);
          window.location.reload();
          this.products = '';
          this.UnitId = '';
          this.Quantity = '';
          this.PackId = '';
          this.Pack = '';
          this.Description = '';
          this.BatchNo = '';
          this.ManufactureDate = null;
          this.ExpiryDate = null;
          this.UDF = [];
          this.UOM = '';
          $("#modaladddis").modal("hide");
          //this.OrderDetail = data;
          //this.rerender();
        }, 
        (error: any) => {
          console.log(error);
          swal(error.error['Message']);
        }
      );
      //this.ASNNO = '';
      
    }
    }

    CloseDetail(){
      $("#modaladddis").modal("hide");
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

   
    editDetail(Id: any, index:any){
      this.index = index;
      this.detailId = Id;
      this.orderservice.GetPurchaseDetail(this.Id,Id)
      .subscribe(
        (data: any) => {
        console.log(data);
        data.forEach(data => {
        this.detailId = data.Id;
        this.LineId = data.LineId;
        this.products= data.SKU;
        this.productId = data.ProductId;
        this.Quantity = data.QtyRemained;
        this.BatchNo = data.BatchNo;
        if(data.ManDate === null){
          console.log(data.ManDate);
          this.ManufactureDate = null;
        } else {
          this.ManufactureDate = new Date(data.ManDate);
        }
        if(data.ExpDate === null){
          console.log(data.ExpDate);
          this.ExpiryDate = null;
        } else {
          this.ExpiryDate = new Date(data.ExpDate);
        }
        this.UOM = data.UnitName;
        this.Description = data.Description;
        this.Pack = data.PackKey;
        this.UnitId = data.UnitId;
        this.PackId = data.PackId;
        });
        setTimeout(() => {
          $("#modaladddis").modal("show");
        }, 1500);
  
        }, 
        (error: any) => {
          console.log(error);
          swal(error.error['Message']);
        }
      );
    }

    

    parseDate(dateString: string): Date {
      if (dateString) {
        return new Date(dateString);
      } else {
        return null;
      }
    }

  }
