import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
//import {UsersService} from '../../_services/users.service';
import {OrderHeader} from '../../_models/OrderHeader';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {OrderService} from '../../_services/order.service';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';

import {ToastOptions, ToastyService} from 'ng2-toasty';
import {NotificationCommunicationService} from '../../_services';

declare var $: any;


@Component({
  templateUrl: 'users-add.html',
  providers: [OrderService]
})

export class UsersAddComponent implements AfterViewInit, OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  OrderHeader: OrderHeader;
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
  ASNNO: any;
  LineId: any;
  detailId: any = 0;
  index: any;

  position:any;


  constructor(private router: Router, private orderservice: OrderService,private toastyService: ToastyService, private toastCommunicationService: NotificationCommunicationService) {
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
    this.OrderHeader = new OrderHeader();
    this.orderservice
      .getWarehouses(this.user_id)
      .subscribe(
        (data: any) => {
          this.warehouseOptions = data['Warehouse'];
          console.log(this.warehouseOptions);
        },
        (error: any) => console.log(error)
      );

    this.orderservice
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
    this.orderservice
      .getVendors(event)
      .subscribe(
        (data: any) => {
          this.vendorOptions = data;
          console.log(this.vendorOptions);
        },
        (error: any) => console.log(error)
      );
  }

  onQCChange(event: any, value: boolean): void {
    if (event.target.checked) {
      this.OrderHeader.RequiredQC = value;
      console.log(this.OrderHeader.RequiredQC);
    } else {
      this.OrderHeader.RequiredQC = false;
    }


    //this.OrderHeader.RequiredQC = value;
  }

  SaveOrder() {
    if(this.OrderHeader.ASNDate &&
      this.OrderHeader.CustomerId &&
      this.OrderHeader.ExpectedRecvDate &&
      this.OrderHeader.ReferenceNo1 !== '' &&
      this.OrderHeader.ReferenceNo2 !== '' &&
      this.OrderHeader.VendorId &&
      this.OrderHeader.WarehouseId
    ){


      this.orderservice.createPurchase(this.OrderHeader)
        .subscribe(
          (data: any) => {
            if (data)
            {
              let toastOptions: ToastOptions = {
                title: 'Success',
                msg: 'ASN Order Add Success',
                showClose: true,
                timeout: 2000,
                theme: 'default',

              };
              this.toastyService.success(toastOptions);
              this.toastCommunicationService.setPosition(this.position);
            }

            this.ASNNO = data.Id;
          },
          (error: any) => {
            console.log(error);
            swal(error.error);


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
        this.UOM = product.Unit.UnitName;
        this.Pack = product.Pack.PackCode;
        this.UDF.push(product.UDF1);
        this.UDF.push(product.UDF2);
        this.UDF.push(product.UDF3);
        this.UDF.push(product.UDF4);
        this.UDF.push(product.UDF5);
        this.UnitId = product.Unit.Id;
        this.PackId = product.Pack.Id;
      }
      console.log(this.Description);
      console.log(this.UOM);
      console.log(this.Pack);
      console.log(this.UDF);
    });
  }

  ADDDetail() {
    if(this.products != 0 && this.ManufactureDate && this.ExpiryDate && this.BatchNo != '' && this.Quantity){

      let detail = {
        Id: 0,
        PurchaseId: this.ASNNO,
        LineId: 0,
        ProductId: this.products,
        UnitId: this.UnitId,
        QtyOrdered: this.Quantity,
        WarehouseId: this.OrderHeader.WarehouseId,
        PackId: this.PackId,
        BatchNo: this.BatchNo,
        ManDate: this.ManufactureDate,
        ExpDate: this.ExpiryDate,
        UDF1: this.UDF[0],
        UDF2: this.UDF[1],
        UDF3: this.UDF[2],
        UDF4: this.UDF[3],
        UDF5: this.UDF[4],
      };
      this.orderservice.createPurchaseDetail(detail)
        .subscribe(
          (data: any) => {
            if (data) {


              let toastOptions: ToastOptions = {
                title: 'Success',
                msg: 'ASN Detail Add Success',
                showClose: true,
                timeout: 2000,
                theme: 'default',

              };
              this.toastyService.success(toastOptions);
              this.toastCommunicationService.setPosition(this.position);
            }
            this.OrderDetail = data;
            this.rerender();
          },
          (error: any) => {
            console.log(error);
            swal(error.error['Message']);
          }
        );

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
      $('#modaladddis').modal('hide');

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

        this.orderservice.DeletePurchaseDetail(Id, this.ASNNO)
          .subscribe(
            (data: any) => {
              // if (data) {
              //   this.inserted = 'success';
              //   this.message = "The Order has been created.";
              //   // setTimeout(() => {
              //   //   this.router.navigate(['/users/list']);
              //   // }, 3000);
              // }
              console.log(data);
              this.OrderDetail.splice(index, 1);
              //this.OrderDetail = data;
              //this.rerender();

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
    this.orderservice.GetPurchaseDetail(this.ASNNO, Id)
      .subscribe(
        (data: any) => {
          console.log(data);
          data.forEach(data => {
            this.detailId = data.Id;
            this.LineId = data.LineId;
            this.products = data.ProductId;
            this.Quantity = data.QtyOrdered;
            this.BatchNo = data.BatchNo;
            this.ManufactureDate = new Date(data.ManDate);
            this.ExpiryDate = new Date(data.ExpDate);
            // console.log(this.LineId);
            // console.log(this.products);
            // console.log(this.UnitId);
            // console.log(this.Quantity);
            // console.log(this.PackId);
            // console.log(this.Pack);
            // console.log(this.BatchNo);
            console.log(this.ManufactureDate);
            console.log(this.ExpiryDate);
            // console.log(this.UDF);
            // console.log(detailId);
            // console.log(this.ASNNO);
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
      this.Quantity &&
      this.BatchNo &&
      this.ManufactureDate &&
      this.ExpiryDate
    ) {

      let detail = {
        Id: this.detailId,
        PurchaseId: this.ASNNO,
        LineId: this.LineId,
        ProductId: this.products,
        UnitId: this.UnitId,
        QtyOrdered: this.Quantity,
        WarehouseId: this.OrderHeader.WarehouseId,
        PackId: this.PackId,
        BatchNo: this.BatchNo,
        ManDate: this.ManufactureDate,
        ExpDate: this.ExpiryDate,
        UDF1: this.UDF[0],
        UDF2: this.UDF[1],
        UDF3: this.UDF[2],
        UDF4: this.UDF[3],
        UDF5: this.UDF[4],
      };


      this.orderservice.EditPurchaseDetail(detail)
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
          },
          (error: any) => {
            console.log(error);
            swal(error.error['Message']);
          }
        );
      //this.ASNNO = '';
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
    this.orderservice.UpdatePurchaseStatus(2, this.ASNNO)
      .subscribe(
        (data: any) => {
          if (data) {
         //   this.inserted = 'success';
         //   this.message = 'The Order has been created.';
            let toastOptions: ToastOptions = {
              title: 'Success',
              msg: 'The Order has been created',
              showClose: true,
              timeout: 2000,
              theme: 'default',

            };
            this.toastyService.success(toastOptions);
            this.toastCommunicationService.setPosition(this.position);
          }
          console.log(data);
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



