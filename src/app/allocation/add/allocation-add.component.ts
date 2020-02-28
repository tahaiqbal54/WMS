import { Component, AfterViewChecked, OnInit, ViewChild, AfterViewInit, OnDestroy, QueryList, ViewChildren } from "@angular/core";
//import {UsersService} from '../../_services/users.service';
import { OrderHeader } from '../../_models/OrderHeader';
import { Router, ActivatedRoute } from "@angular/router";
import swal from 'sweetalert2';
import { OrderService } from '../../_services/order.service';
import { ReceiveService, AllocationService } from '../../_services';
import { DataTableDirective } from "angular-datatables";
import { Subject } from 'rxjs';
declare var $: any;
import { ToastOptions, ToastyService } from 'ng2-toasty';
import { NotificationCommunicationService } from '../../_services';


@Component({
  templateUrl: 'allocation-add.html',
  providers: [OrderService, ReceiveService]
})

export class AllocationAddComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChildren(DataTableDirective)
  dtElement: QueryList<DataTableDirective>;
  // dtInstance: DataTables.Api;
  // dtInstance1: DataTables.Api;
  dtOptions: DataTables.Settings = {};
  dtOptions1: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtTrigger1: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();

  OrderHeader: OrderHeader;
  OrderDetail: any[] = [];
  confirm_password: string;
  inserted: string;
  message: string;
  avatar: any;
  public currentUser: any;
  user_id: any;
  customer_id: any;
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
  ExpiryDate: Date;
  ReceiptDate: Date;
  BatchNo: any;
  ASNNO: any;
  LineId: any;
  detailId: any = 0;
  index: any;
  Id: any;
  productId: any;
  LOTNo: any;
  LPNNo: any;
  position: any;
  Detail: any;
  ShipmentId: any;
  QtyShiped: any;
  QtyIssued: any;
  QtyRemained: any;
  warehouseId: any;

  constructor(private router: Router, private AllocationService: AllocationService, private orderservice: OrderService, private receiveservice: ReceiveService, private route: ActivatedRoute, private toastyService: ToastyService, private toastCommunicationService: NotificationCommunicationService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user_id = this.currentUser.User[0].Id;
    this.Id = this.route.snapshot.paramMap.get('SONo');
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


    // this.receiveservice.UpdatePurchaseStatus(3,this.Id)
    // .subscribe(
    //   (data: any) => {
    //     if (data) {
    //       // this.inserted = 'success';
    //       // this.message = "The Order has been created.";
    //     }
    //     console.log(data);
    //   }, 
    //   (error: any) => {
    //     console.log(error);
    //     swal(error.error['Message']);
    //   }
    // );

    console.log(this.Id);

    this.AllocationService.getAllocationDetails(this.Id)
      .subscribe(
        (data: any) => {
          this.OrderDetail = data;
          console.log(data);
          this.dtOptions = {
            pagingType: 'full_numbers',
            destroy: true,
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


  ADDDetail() {
    if (this.Quantity == null || this.Quantity == undefined || this.LPNNo == null || this.LPNNo == undefined) {
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
        Id: 0,
        PurchaseId: this.Id,
        PurchaseDetailId: this.detailId,
        ProductId: this.productId,
        UnitId: this.UnitId,
        QtyOrdered: this.Quantity,
        LPNNo: this.LPNNo,
        PackId: this.PackId,
        BatchNo: this.BatchNo,
        ManDate: this.ManufactureDate,
        ExpDate: this.ExpiryDate,
        LocationId: 1,
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

  CloseDetail() {
    $("#modaladddis").modal("hide");
  }


  rerender(): void {
    this.dtElement.forEach((table) => {
      if (table.dtTrigger) {
        table.dtInstance.then((dt: DataTables.Api) => {
          dt.destroy();
          // Call the dtTrigger to rerender again
          table.dtTrigger.next();
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.dtElement.forEach((table) => {
      if (table.dtTrigger) {
        // Call the dtTrigger to rerender again
        table.dtTrigger.next();
      }
    });
  }

  ngOnDestroy(): void {
    this.dtElement.forEach((table) => {
      if (table.dtTrigger) {
        // Call the dtTrigger to rerender again
        table.dtTrigger.unsubscribe();
      }
    });
  }


  editDetail(index: any, DetailId: any, ShipmentId: any, productId: any, WarehouseID: any, BatchNo: any) {
    this.index = index;
    this.detailId = DetailId;
    this.ShipmentId = ShipmentId;
    this.QtyShiped = this.OrderDetail[index].QtyShiped;
    this.QtyIssued = this.OrderDetail[index].QtyIssued;
    this.QtyRemained = this.OrderDetail[index].QtyRemained;
    this.warehouseId = WarehouseID;
    this.BatchNo = BatchNo;
    this.AllocationService.GetAllocationDetail(productId, WarehouseID, BatchNo)
      .subscribe(
        (data: any) => {
          this.dtOptions1 = {
            pagingType: 'full_numbers',
            destroy: true,
            language: {
              emptyTable: "No detail found"
            },

          };
          console.log(data);
          this.Detail = data;
          this.rerender();
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

  Allocate(Id, ProductId, UnitId, PackId, LocationId, BatchNo, LPNNo, Qty) {
    console.log(Qty);
    let detail = {
      Id: 0,
      ShipmentId: this.ShipmentId,
      ShipmentDetailId: this.detailId,
      ProductId: ProductId,
      UnitId: UnitId,
      PackId: PackId,
      LocationId: LocationId,
      BatchNo: BatchNo,
      LPNNo: LPNNo,
      QtyAllocated: Qty,
      InventTransactionId: Id
    }
    console.log(detail);

    this.AllocationService.AllocateDetail(detail)
      .subscribe(
        (data: any) => {
          if (data) {
            let toastOptions: ToastOptions = {
              title: 'Success',
              msg: 'Allocated Successfully',
              showClose: true,
              timeout: 2000,
              theme: 'default',

            };
            this.toastyService.success(toastOptions);
            this.toastCommunicationService.setPosition(this.position);
            this.AllocationService.getAllocationDetails(this.Id)
              .subscribe(
                (data: any) => {
                  this.OrderDetail = data;
                  console.log(data);
                  this.dtOptions = {
                    pagingType: 'full_numbers',
                    language: {
                      emptyTable: "No users found"
                    },
                  };
                  this.QtyShiped = this.OrderDetail[this.index].QtyShiped;
                  this.QtyIssued = this.OrderDetail[this.index].QtyIssued;
                  this.QtyRemained = this.OrderDetail[this.index].QtyRemained;
                  this.rerender();
                  (error: any) => {
                    console.log(error);
                    this.inserted = 'failure';
                    this.message = error.error.message;
                  }
                });
            this.AllocationService.GetAllocationDetail(ProductId, this.warehouseId, this.BatchNo)
              .subscribe(
                (data: any) => {
                  this.dtOptions1 = {
                    pagingType: 'full_numbers',
                    destroy: true,
                    language: {
                      emptyTable: "No detail found"
                    },

                  };
                  console.log(data);
                  this.Detail = data;
                  this.rerender();
                },
                (error: any) => {
                  console.log(error);
                  swal(error.error['Message']);
                }
              );

          }
        },
        (error: any) => {
          console.log(error);
          swal(error.error['Message']);
        }
      );
  }

  valid() {
    swal('Feature is under development')
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    } else {
      return null;
    }
  }

}
