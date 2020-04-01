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
  templateUrl: 'inventory-update.html',
  providers: [InventoryService]
})
export class InventoryUpdateComponent implements AfterViewInit, OnDestroy, OnInit {
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
  disabled: any = [];
  oldLot: any;
  oldBatch: any;
  oldMD: any;
  oldED: any;
  condition: boolean;
  newLot: any = null;
  newBatch: any = null;
  newMD: any = null;
  newED: any = null;
  transId: any;
  UpdateArr : any = [];
  

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

  CustomerOptions: any = [];
  CustomerSelectConfig: any = {
    labelField: 'CustomerName',
    valueField: 'Id',
    searchField: ['CustomerName']
  };

  ReasonOptions: any = [];
  ReasonSelectConfig: any = {
    labelField: 'Reason',
    valueField: 'Id',
    searchField: ['Reason']
  };

  LocationOptions: any = [];
  LocationSelectConfig: any = {
    labelField: 'LocationName',
    valueField: 'Id',
    searchField: ['WarehouseName']
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
    .getCustomer()
    .subscribe(
      (data: any) => {
        console.log(data);
        data.forEach(customer => {
          let obj = {
            Id: customer.Id,
            CustomerName: customer.CustomerName
          };
          this.CustomerOptions.push(obj);
        });
        //this.customerOptions = data['Customer'];
        console.log(this.CustomerOptions);
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
    // console.log(value);
    // this.allocationId.push(value);
    // this.holddata.push(this.users[index]);
    // console.log(this.allocationId);
    // this.rerender();
    this.disabled.push(index);
    console.log(this.disabled);
    //this.Disablecheck(this.disabled,index);
  } else {
    this.disabled.splice(index, 1);
  }
}

onChange(event: any): void {
  if (event.target.checked) {
    this.checked = 1;
   let arr = Object.keys(this.users);
    arr.forEach(detail => {
      this.disabled.push(parseInt(detail))
    });
    console.log(this.disabled);
    // this.rerender();
  } else {
     this.checked = 0;
       this.disabled = [];
    // this.allocationId = [];
  }
}

// Disablecheck(disabledcheck: any,index:any){
//     if(disabledcheck.indexOf(index) !== -1){
//       this.condition = true;
//     } else {
//       this.condition = false;
//     }
// }


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
    .getUpdateData(this.WarehouseId,this.CustomerId,this.ProductId,this.LocationId,this.BatchNo,this.LPNNo,this.LotNo)
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

ADDDetail(){
  let obj = {
    Id:0,
    InventoryUpdateId: 0,
    InventTransactionId: this.transId,
    OldBatchNo: this.newBatch,
    OldLPNNo: this.newLot,
    OldLotNo: null,
    OldManDate: this.newMD,
    OldExpDate: this.newED
   }  

   this.UpdateArr.forEach((element,index) => {
     if(element.InventTransactionId == this.transId){
      this.UpdateArr.splice(index, 1);
     }
   });

   this.UpdateArr.push(obj);
   console.log(this.UpdateArr);
   this.users.forEach(data => {
     if(data.Id == this.transId){
       data.LPNNo = this.newLot;
       data.BatchNo = this.newBatch;
       data.ManDate = this.newMD;
       data.ExpDate = this.newED;
     }
   });
   $("#modaladddis").modal("hide");
    this.newLot = null;
    this.newBatch = null;
    this.newMD = null;
    this.newED = null;
}


Holddata(){
  this.holdId = this.allocationId.join();
  this.InventoryService.createUpdate(this.reasonId,this.remarks,this.UpdateArr)
      .subscribe(
        (data: any) => {
          if (data) {
            console.log(data);
            let toastOptions: ToastOptions = {
              title: 'Success',
              msg: 'Update Successfully',
              showClose: true,
              timeout: 2000,
              theme: 'default',

            };
            this.toastyService.success(toastOptions);
            this.toastCommunicationService.setPosition(this.position);
            this.AsnNo = data.JournalNo;
          }
        },
        (error: any) => {
          console.log(error);
          swal(error.error['Message']);
        }
      );
}

OpenModal(Id:any,lot:any,batch:any,ManDate:any,ExpDate:any){
  this.transId = Id;
  this.oldLot = lot;
  this.oldBatch = batch;
  this.oldMD = ManDate;
  this.oldED = ExpDate;
  $("#modaladddis").modal("show");
}

CloseDetail(){
  this.oldLot = null;
  this.oldBatch = null;
  this.oldMD = null;
  this.oldED = null;
  this.newLot = null;
  this.newBatch = null;
  this.newMD = null;
  this.newED = null;
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
