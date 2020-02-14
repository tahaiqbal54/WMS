import { Component, AfterViewChecked, OnInit, ViewChild, AfterViewInit, OnDestroy, QueryList, ViewChildren } from "@angular/core";
//import {UsersService} from '../../_services/users.service';
import { OrderHeader } from '../../_models/OrderHeader';
import { Router, ActivatedRoute } from "@angular/router";
import swal from 'sweetalert2';
import { OrderService } from '../../_services/order.service';
import { ReceiveService, AllocationService, ExcelService, PickService , ShipService} from '../../_services';
import { DataTableDirective } from "angular-datatables";
import { Subject } from 'rxjs';
declare var $: any;
import { ToastOptions, ToastyService } from 'ng2-toasty';
import { NotificationCommunicationService } from '../../_services';


@Component({
  templateUrl: 'ship-add.html',
  providers: [OrderService, ReceiveService]
})

export class ShipAddComponent implements AfterViewInit, OnDestroy, OnInit {
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
  allocationId: any = [];
  checked: number;

  constructor(private router: Router, private ShipService: ShipService, private excelService: ExcelService, private AllocationService: AllocationService, private route: ActivatedRoute, private toastyService: ToastyService, private toastCommunicationService: NotificationCommunicationService) {
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

    this.ShipService.getShipDetails(this.Id)
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

  onQCChange(event: any, value: any, index: any): void {
    if (event.target.checked) {
      this.allocationId.push(value);
      console.log(this.allocationId);
    } else {
      this.allocationId.splice(index, 1);
    }
  }

  onChange(event: any): void {
    if (event.target.checked) {
      this.checked = 1;
      this.OrderDetail.forEach(detail => {
        this.allocationId.push(detail.Id)
      });
      console.log(this.allocationId);
    } else {
      this.checked = 0;
      this.allocationId = [];
    }
  }

  PickAll() {
    this.ShipmentId = this.allocationId.join();
    console.log(this.ShipmentId);
    this.ShipService.createShip(this.ShipmentId)
      .subscribe(
        (data: any) => {
          if (data) {
            let toastOptions: ToastOptions = {
              title: 'Success',
              msg: 'Picked Successfully',
              showClose: true,
              timeout: 2000,
              theme: 'default',

            };
            this.toastyService.success(toastOptions);
            this.toastCommunicationService.setPosition(this.position);
            this.ShipService.getShipDetails(this.Id)
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
        },
        (error: any) => {
          console.log(error);
          swal(error.error['Message']);
        }
      );
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

  ExportToExcel(): void {
    let arr = [];
    this.OrderDetail.forEach(data => {
      let obj = {
        Product: data.SKU,
        Expected_Delivery_Quantity: data.QtyShiped,
        Allocated_Quantity: data.QtyIssued,
        Balance: data.QtyRemained,
        UOM: data.UnitName,
        Batch: data.BatchNo
      }
      arr.push(obj);
    });
    this.excelService.exportAsExcelFile(arr, 'Pick');
  }


  

  

  pick(id: any) {
    this.ShipService.createShip(id)
      .subscribe(
        (data: any) => {
          if (data) {
            let toastOptions: ToastOptions = {
              title: 'Success',
              msg: 'Picked Successfully',
              showClose: true,
              timeout: 2000,
              theme: 'default',

            };
            this.toastyService.success(toastOptions);
            this.toastCommunicationService.setPosition(this.position);
            this.ShipService.getShipDetails(this.Id)
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
