import { first } from 'rxjs/operators';
//import { user_disable } from '../../_models/user_disable';
//import { User } from '../../_models/user';
import  swal  from 'sweetalert2';
import {Component, AfterViewChecked, OnInit, ViewChild, AfterViewInit, OnDestroy, QueryList, ViewChildren} from '@angular/core';
import { Subject } from 'rxjs';
import {InventoryService} from '../../_services';
import {ActivatedRoute, Router, ActivatedRouteSnapshot} from "@angular/router";
import {Observable, of, forkJoin} from 'rxjs';
import {mergeMap, map, take} from 'rxjs/operators';
import { DataTableDirective } from "angular-datatables";
import {ToastOptions, ToastyService} from 'ng2-toasty';
import {NotificationCommunicationService,ExcelService} from '../../_services';
declare var $: any;


@Component({
  templateUrl: 'QC-add.html',
  providers: [InventoryService]
})
export class QCAddComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChildren(DataTableDirective)
  dtElement: QueryList<DataTableDirective>;
  // dtInstance: DataTables.Api;
  // dtInstance1: DataTables.Api;
  dtOptions: DataTables.Settings = {};
  dtOptions1: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtTrigger1: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();
  users: any[] = [];
  //user: User;
  //user_disable:user_disable;
  inserted: string;
  message: string;
  tab: number = 0;
  currentUser: any;
  user_id : any;
  WarehouseId: any = null;
  CustomerId: any = 0;
  ProductId: any = 0;
  LocationId: any = 0;
  LotNo: any = "";
  position:any;
  BatchNo: any = "";
  LPNNo: any = "";
  allocationId: any = [];
  checked: number;
  holddata: any = [];
  holdId: any;
  reasonId: any;
  remarks: any = "";
  AsnNo: any;
  visible: number = 0;
  cus_id: number;
  Actions: any;
  QCID: any;
  QCActions: any;
  

  constructor(private excelService:ExcelService,private router: Router,private InventoryService: InventoryService, private route: ActivatedRoute,private toastyService: ToastyService, private toastCommunicationService: NotificationCommunicationService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user_id=this.currentUser.UserRoleRightsList[0].UserRoleId;
  }

  warehouseOptions: any = [];
  warehousesSelectConfig: any = {
    labelField: 'WarehouseName',
    valueField: 'Id',
    searchField: ['WarehouseName']
  };

  LPNOptions: any = [];
  LPNSelectConfig: any = {
    labelField: 'Name',
    valueField: 'Name',
    searchField: ['Name']
  };

  BatchOptions: any = [];
  BatchSelectConfig: any = {
    labelField: 'Name',
    valueField: 'Name',
    searchField: ['Name']
  };

  LocationOptions: any = [];
  LocationSelectConfig: any = {
    labelField: 'LocationName',
    valueField: 'Id',
    searchField: ['WarehouseName']
  };

  ReasonOptions: any = [];
  ReasonSelectConfig: any = {
    labelField: 'Reason',
    valueField: 'Id',
    searchField: ['Reason']
  };

  ProductOptions: any = [];
  ProductSelectConfig: any = {
    labelField: 'ProductCode',
    valueField: 'Id',
    searchField: ['ProductCode']
  };

  LOTOptions: any = [];
  LOTSelectConfig: any = {
    labelField: 'Name',
    valueField: 'Name',
    searchField: ['Name']
  };

  ngOnInit() {
    this.position = "bottom-right";
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        emptyTable: "No Inventory found"
      },
      columnDefs: [
        { width: "20%", searchable: true, targets: 1 },
        // { orderData: 5, targets: 2},
        // { visible: false, targets: 5 }
      ]
    };

    this.dtOptions1 = {
      pagingType: 'full_numbers',
      destroy: true,
      language: {
        emptyTable: "No detail found"
      },
  
    };
    
  
this.InventoryService
.getLocations()
.subscribe(
  (data: any) => {
    console.log(data);
    data.forEach(customer => {
      let obj = {
        Id: customer.Id,
        LocationName: customer.LocationName
      };
      this.LocationOptions.push(obj);
    });
    //this.customerOptions = data['Customer'];
    console.log(this.LocationOptions);
  },
  (error: any) => console.log(error)
);


this.InventoryService
.getWarehouse()
.subscribe(
  (data: any) => {
    console.log(data);
    data.forEach(customer => {
      let obj = {
        Id: customer.Id,
        WarehouseName: customer.WarehouseName
      };
      this.warehouseOptions.push(obj);
    });
    //this.customerOptions = data['Customer'];
    console.log(this.warehouseOptions);
  },
  (error: any) => console.log(error)
);


this.InventoryService
.getProducts()
.subscribe(
  (data: any) => {
    console.log(data);
    data.forEach(customer => {
      let obj = {
        Id: customer.Id,
        ProductCode: customer.ProductCode
      };
      this.ProductOptions.push(obj);
    });
    //this.customerOptions = data['Customer'];
    console.log(this.ProductOptions);
  },
  (error: any) => console.log(error)
);


this.InventoryService
.getBatch()
.subscribe(
  (data: any) => {
    console.log(data);
    data.forEach(customer => {
      let obj = {
        Name: customer.BATCHNO
      };
      this.BatchOptions.push(obj);
    });
    //this.customerOptions = data['Customer'];
    console.log(this.BatchOptions);
  },
  (error: any) => console.log(error)
);

this.InventoryService
.getLPN()
.subscribe(
  (data: any) => {
    console.log(data);
    data.forEach(customer => {
      let obj = {
        Name: customer.LpnNo
      };
      this.LPNOptions.push(obj);
    });
    //this.customerOptions = data['Customer'];
    console.log(this.LPNOptions);
  },
  (error: any) => console.log(error)
);


this.InventoryService
.getLOT()
.subscribe(
  (data: any) => {
    console.log(data);
    data.forEach(customer => {
      let obj = {
        Name: customer.LotNo
      };
      this.LOTOptions.push(obj);
    });
    //this.customerOptions = data['Customer'];
    console.log(this.LOTOptions);
  },
  (error: any) => console.log(error)
);

this.InventoryService
.getReason()
.subscribe(
  (data: any) => {
    console.log(data);
     data.forEach(customer => {
       let obj = {
         Id: customer.Id,
         Reason: customer.Reason
       };
       this.ReasonOptions.push(obj);
     });
    //this.ReasonOptions = data['Customer'];
     console.log(this.ReasonOptions);
  },
  (error: any) => console.log(error)
);



}


onQCChange(event: any, value: any, index: any): void {
  if (event.target.checked) {
    console.log(value);
    this.allocationId.push(value);
    this.holddata.push(this.users[index]);
    console.log(this.allocationId);
    this.rerender();
  } else {
    this.allocationId.splice(index, 1);
  }
}

onChange(event: any): void {
  if (event.target.checked) {
    this.checked = 1;
    this.holddata = this.users;
    this.users.forEach(detail => {
      this.allocationId.push(detail.Id)
    });
    console.log(this.allocationId);
    this.rerender();
  } else {
    this.checked = 0;
    this.holddata = [];
    this.allocationId = [];
  }
}

Fetch(){
  if(this.WarehouseId == null || this.WarehouseId == undefined){
    let toastOptions: ToastOptions = {
      title: 'Error',
      msg: 'Kindly select Warehouse',
      showClose: true,
      timeout: 2000,
      theme: 'default',

    };
    this.toastyService.error(toastOptions);
    this.toastCommunicationService.setPosition(this.position);
  }
  else {
    this.InventoryService
    .getQCData(this.WarehouseId,this.CustomerId,this.ProductId,this.BatchNo,this.LPNNo,this.LotNo,0)
    .subscribe(
      (data: any) => {
        console.log(data);
        this.users = data;
        this.rerender();
      },
    (error: any) => console.log(error)
  );
 }
}

ExportToExcel() : void {
  this.excelService.exportAsExcelFile(this.users, 'Inventory');
}

CreateQC(){
  this.holdId = this.allocationId.join();
  this.InventoryService.createQC(this.WarehouseId,this.reasonId,this.remarks,this.holdId)
      .subscribe(
        (data: any) => {
          if (data) {
            console.log(data);
            let toastOptions: ToastOptions = {
              title: 'Success',
              msg: 'QC Applied Successfully',
              showClose: true,
              timeout: 2000,
              theme: 'default',

            };
            this.toastyService.success(toastOptions);
            this.toastCommunicationService.setPosition(this.position);
            this.QCID= data.Id;
            this.AsnNo = data.JournalNo;
            this.visible = 1;
            this.InventoryService
            .getQCData(this.WarehouseId,this.CustomerId,this.ProductId,this.BatchNo,this.LPNNo,this.LotNo,0)
            .subscribe(
              (data: any) => {
                console.log(data);
                this.users = data;
                this.rerender();
              },
            (error: any) => console.log(error)
          );
          }
        },
        (error: any) => {
          console.log(error);
          swal(error.error['Message']);
        }
      );
}

AddAction(){
  let actions = {
    Id: 0,
    InventoryQcReleaseId: this.QCID,
    QcAction: this.Actions,
    Remarks: ""
  }
  this.InventoryService.AddAction(this.AsnNo,actions)
      .subscribe(
        (data: any) => {
          if (data) {
            console.log(data);
            let toastOptions: ToastOptions = {
              title: 'Success',
              msg: 'QC Action Added Successfully',
              showClose: true,
              timeout: 2000,
              theme: 'default',

            };
            this.toastyService.success(toastOptions);
            this.toastCommunicationService.setPosition(this.position);
            this.QCActions = data;
            // this.rerender();
          }
        },
        (error: any) => {
          console.log(error);
          swal(error.error['Message']);
        }
      );
}

MarkQC(){
  this.InventoryService.MarkQC(this.AsnNo,this.reasonId,this.remarks)
      .subscribe(
        (data: any) => {
          if (data) {
            console.log(data);
            let toastOptions: ToastOptions = {
              title: 'Success',
              msg: 'QC Marked Successfully',
              showClose: true,
              timeout: 2000,
              theme: 'default',

            };
            this.toastyService.success(toastOptions);
            this.toastCommunicationService.setPosition(this.position);
            this.router.navigate(['/QC/list']);
          }
        },
        (error: any) => {
          console.log(error);
          swal(error.error['Message']);
        }
      );
}

OpenModal(){
  $("#modaladddis").modal("show");
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
      //this.dtTrigger1.next();
    }
  });
}

ngOnDestroy(): void {
  this.dtElement.forEach((table) => {
    if (table.dtTrigger) {
      // Call the dtTrigger to rerender again
      table.dtTrigger.unsubscribe();
      //this.dtTrigger1.unsubscribe();
    }
  });
}


}
