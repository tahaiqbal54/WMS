import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
//import {UsersService} from '../../_services/users.service';
import {ShipmentHeader} from '../../_models';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {OrderService} from '../../_services/order.service';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';

import {ToastOptions, ToastyService} from 'ng2-toasty';
import {NotificationCommunicationService,ShipmentService} from '../../_services';

declare var $: any;


@Component({
  templateUrl: 'shipment-add.html',
  providers: [OrderService,ShipmentService]
})

export class ShipmentAddComponent implements AfterViewInit, OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  OrderHeader: ShipmentHeader;
  OrderDetail: any[] = [];
  confirm_password: string;

  inserted: string;
  message: string;
  validationError: any = false;
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
  BatchNo: any;
  ASNNO: any = null;
  LineId: any;
  detailId: any = 0;
  index: any;

  position:any;
  AsnNo: any;
  udf1: string;
  udf2: string;


  constructor(private router: Router,private ShipmentService:ShipmentService, private orderservice: OrderService,private toastyService: ToastyService, private toastCommunicationService: NotificationCommunicationService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user_id = this.currentUser.User[0].Id;
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
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        emptyTable: 'No Details found'
      },
    };
    this.OrderDetail = [];
    this.dtTrigger.next();
    this.OrderHeader = new ShipmentHeader();
    

    this.ShipmentService
      .getCustomers(this.user_id)
      .subscribe(
        (data: any) => {
          console.log(data);
          data.forEach(customer => {
            let obj = {
              id: customer.Id,
              CustomerName: customer.CustomerName
            };
            this.customerOptions.push(obj);
          });
          //this.customerOptions = data['Customer'];
          console.log(this.customerOptions);
        },
        (error: any) => console.log(error)
      );
  }

  onCustomerChange(event: any) {
    this.customer_id = event;
    this.ShipmentService
      .getVendors(event)
      .subscribe(
        (data: any) => {
          this.vendorOptions = data;
          console.log(this.vendorOptions);
        },
        (error: any) => console.log(error)
      );
      this.ShipmentService
      .getWarehouses(event)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.warehouseOptions = data;
          console.log(this.warehouseOptions);
        },
        (error: any) => console.log(error)
      );
      this.orderservice
      .getProducts(event)
      .subscribe(
        (data: any) => {
          this.product = data;
          data.forEach(customer => {
            let obj = {
              id: customer.Id,
              ProductName: customer.SKU
            };
            this.ProductOptions.push(obj);
          });
          //this.customerOptions = data['Customer'];
          console.log(this.ProductOptions);
        },
        (error: any) => console.log(error)
      );
  }

  // onQCChange(event: any, value: boolean): void {
  //   if (event.target.checked) {
  //     this.OrderHeader.RequiredQC = value;
  //     console.log(this.OrderHeader.RequiredQC);
  //   } else {
  //     this.OrderHeader.RequiredQC = false;
  //   }


  //   //this.OrderHeader.RequiredQC = value;
  // }

  SaveOrder() {
    if(this.OrderHeader.CustomerId &&
      this.OrderHeader.CustomerRefNo !== '' &&
      this.OrderHeader.ReferenceNo1 !== '' &&
      this.OrderHeader.ReferenceNo2 !== '' &&
      this.OrderHeader.VendorId &&
      this.OrderHeader.WarehouseId
    ){

      console.log(this,this.OrderHeader);
      this.ShipmentService.createPurchase(this.OrderHeader)
        .subscribe(
          (data: any) => {
            if (data)
            {
              console.log(data);
              let toastOptions: ToastOptions = {
                title: 'Success',
                msg: 'Shipment Order Created',
                showClose: true,
                timeout: 2000,
                theme: 'default',

              };
              this.toastyService.success(toastOptions);
              this.toastCommunicationService.setPosition(this.position);
            }

            this.ASNNO = data.Id;
            this.AsnNo = data.SONo;
          },
          (error: any) => {
            console.log(error);
            swal(error.error['Message']);


          }
        );


    }else{
      let toastOptions: ToastOptions = {
        title: 'Missing Field',
        msg: 'Fill All Fields ',
        showClose: true,
        timeout: 2000,
        theme: 'default',

      };
      this.toastyService.error(toastOptions);
      this.toastCommunicationService.setPosition(this.position);

    }



  }

  adddismodal() {
    this.products = '';
    this.UnitId = '';
    this.Quantity = '';
    this.PackId = '';
    this.Pack = '';
    this.Description = '';
    this.BatchNo = '';
    this.udf1 = '';
    this.udf2 = '';
    this.UOM = '';
    this.udf1 = '';
    this.udf2 = '';
    this.orderservice
      .getProducts(this.customer_id)
      .subscribe(
        (data: any) => {
          this.product = data;
          data.forEach(customer => {
            let obj = {
              id: customer.Id,
              ProductName: customer.SKU
            };
            this.ProductOptions.push(obj);
          });
          //this.customerOptions = data['Customer'];
          console.log(this.ProductOptions);
        },
        (error: any) => console.log(error)
      );
    setTimeout(() => {
      $('#modaladddis').modal('show');
    }, 1500);

  }

  onProductChange(event) {
    console.log(this.product);
    this.product.forEach(product => {
      if (event == product.Id) {
        this.Description = product.Description;
        this.UOM = product.UnitName;
        this.Pack = product.PackKey;
        this.UnitId = product.UnitId;
        this.PackId = product.PackId;
      }
    });
  }

  CloseDetail(){
    $("#modaladddis").modal("hide");
  }

  ADDDetail() {
    if(this.products != 0 && this.Quantity){

      let detail = {
        Id: 0,
        ShipmentId: this.ASNNO,
        ProductId: this.products,
        QtyShiped: this.Quantity,
        BatchNo: this.BatchNo
        
      };
      console.log(detail);
      this.ShipmentService.createDetail(detail)
        .subscribe(
          (data: any) => {
            if (data) {
              console.log(data);
              let toastOptions: ToastOptions = {
                title: 'Success',
                msg: 'Product Detail Added',
                showClose: true,
                timeout: 2000,
                theme: 'default',

              };
              this.toastyService.success(toastOptions);
              this.toastCommunicationService.setPosition(this.position);
            }
            this.OrderDetail = data;
            this.rerender();
            $('#modaladddis').modal('hide');
          },
          (error: any) => {
            console.log(error);
            swal(error.error['Message']);
          }
        );
      

    }
    else{
      let toastOptions: ToastOptions = {
        title: 'Error',
        msg: 'Fill All The Fields',
        showClose: true,
        timeout: 2000,
        theme: 'default',

      };
      this.toastyService.error(toastOptions);
      this.toastCommunicationService.setPosition(this.position);
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

  DeleteDetailItem(index: any, Id: any) {


    (swal as any).fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.ShipmentService.DeleteDetail(Id, this.ASNNO)
          .subscribe(
            (data: any) => {

              this.OrderDetail.splice(index, 1);


              let toastOptions: ToastOptions = {
                title: 'Delete',
                msg: 'ASN Order Detail Deleted',
                showClose: true,
                timeout: 2000,
                theme: 'default',

              };
              this.toastyService.success(toastOptions);
              this.toastCommunicationService.setPosition(this.position);


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

  editDetail(Id: any, index: any) {
    this.index = index;
    this.ShipmentService.GetDetail(this.ASNNO, Id)
      .subscribe(
        (data: any) => {
          console.log(data);
          data.forEach(data => {
            this.detailId = data.Id;
            this.LineId = data.LineId;
            this.products = data.ProductId;
            this.Quantity = data.QtyOrdered;
            this.BatchNo = data.BatchNo;
            this.udf1 = data.UDF1;
            this.udf2 = data.UDF2;
            if(data.ManDate){
              this.ManufactureDate = new Date(data.ManDate);
            }else{
              this.ManufactureDate = null;
            }
            if(data.ExpDate){
              this.ExpiryDate = new Date(data.ExpDate);
            }else{
              this.ExpiryDate = null;
            }
          });
          setTimeout(() => {
            $('#modaladddis').modal('show');
          }, 1500);

        },
        (error: any) => {
          console.log(error);
          swal(error.error['Message']);
        }
      );
  }

  UpdateDetail() {

    if(
      this.product.length > 0  &&
      this.Quantity
    ) {

      let detail = {
        Id: this.detailId,
        ShipmentId: this.ASNNO,
        LineId: this.LineId,
        ProductId: this.products,
        QtyShiped: this.Quantity,
        BatchNo: this.BatchNo,
        UDF1: this.udf1,
        UDF2: this.udf2
      };

      console.log(detail);
      this.ShipmentService.EditDetail(detail)
        .subscribe(
          (data: any) => {
            if (data) {

              let toastOptions: ToastOptions = {
                title: 'Success',
                msg: 'ASN Order Edit Success',
                showClose: true,
                timeout: 2000,
                theme: 'default',

              };
              this.toastyService.success(toastOptions);
              this.toastCommunicationService.setPosition(this.position);

            }
            console.log(data);
            this.OrderDetail = data;
            this.products = '';
            this.UnitId = '';
            this.Quantity = '';
            this.PackId = '';
            this.BatchNo = '';
            this.ManufactureDate = null;
            this.ExpiryDate = null;
            this.UDF = [];
            this.Pack = '';
            this.Description = '';
            this.UOM = '';
            $('#modaladddis').modal('hide');
          },
          (error: any) => {
            console.log(error);
            swal(error.error['Message']);
          }
        );
      //this.ASNNO = '';
    }else{
      let toastOptions: ToastOptions = {
        title: 'Missing Field',
        msg: 'Fill All The Fields',
        showClose: true,
        timeout: 2000,
        theme: 'default',

      };
      this.toastyService.error(toastOptions);
      this.toastCommunicationService.setPosition(this.position);
    }
  }

  SubmitASN() {
    this.ShipmentService.UpdateShipStatus(8, this.ASNNO)
      .subscribe(
        (data: any) => {
          if (data) {
         //   this.inserted = 'success';
         //   this.message = 'The Order has been created.';
            let toastOptions: ToastOptions = {
              title: 'Success',
              msg: 'The Order has been Submitted',
              showClose: true,
              timeout: 2000,
              theme: 'default',

            };
            this.toastyService.success(toastOptions);
            this.toastCommunicationService.setPosition(this.position);
          }
          console.log(data);
          this.router.navigate(['/shipment/list']);
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


