import { first } from 'rxjs/operators';
//import { user_disable } from '../../_models/user_disable';
//import { User } from '../../_models/user';
import  swal  from 'sweetalert2';
import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import { Subject } from 'rxjs';
import {InventoryService} from '../../_services';
import {ActivatedRoute, Router, ActivatedRouteSnapshot} from "@angular/router";
import {Observable, of, forkJoin} from 'rxjs';
import {mergeMap, map, take} from 'rxjs/operators';
import { DataTableDirective } from "angular-datatables";
import {ToastOptions, ToastyService} from 'ng2-toasty';
import {NotificationCommunicationService,ExcelService} from '../../_services';


@Component({
  templateUrl: 'inventory-list.html',
  providers: [InventoryService]
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
  WarehouseId: any = null;
  CustomerId: any = 0;
  ProductId: any = 0;
  LocationId: any = 0;
  LotNo: any = "";
  position:any;
  

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

  LocationOptions: any = [];
  LocationSelectConfig: any = {
    labelField: 'LocationName',
    valueField: 'Id',
    searchField: ['WarehouseName']
  };

  CustomerOptions: any = [];
  CustomerSelectConfig: any = {
    labelField: 'CustomerName',
    valueField: 'Id',
    searchField: ['CustomerName']
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
    .getInvebtoryData(this.WarehouseId,this.CustomerId,this.ProductId,this.LocationId,this.LotNo)
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


}
