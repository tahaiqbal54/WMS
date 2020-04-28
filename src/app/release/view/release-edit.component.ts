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
  templateUrl: 'release-edit.html',
  providers: [InventoryService]
})
export class ReleaseViewComponent implements AfterViewInit, OnDestroy, OnInit {
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
  LotNo: any = null;
  position:any;
  BatchNo: any = null;
  LPNNo: any = null;
  allocationId: any = [];
  checked: number;
  holddata: any = [];
  holdId: any;
  reasonId: any;
  remarks: any = "";
  AsnNo: any;
  visible: number = 0;
  JournalNo: string;
  QCActions: any;
  Actions: any;
  QCID: any;
  Releaseremarks: any;
  

  constructor(private excelService:ExcelService,private router: Router,private InventoryService: InventoryService, private route: ActivatedRoute,private toastyService: ToastyService, private toastCommunicationService: NotificationCommunicationService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user_id=this.currentUser.UserRoleRightsList[0].UserRoleId;

    this.JournalNo = this.route.snapshot.paramMap.get('JournalNo');

  }

  ReasonOptions: any = [];
  ReasonSelectConfig: any = {
    labelField: 'Reason',
    valueField: 'Id',
    searchField: ['Reason']
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
    .getQCByJournal(this.JournalNo)
    .subscribe(
      (data: any) => {
        console.log(data);
        this.users = data.QCReleaseDetail;
        this.reasonId = data.QCRelease[0].Reason;
        this.remarks = data.QCRelease[0].Remarks;
        this.AsnNo = data.QCRelease[0].JournalNo;
        this.QCID = data.QCRelease[0].Id;
        this.QCActions = data.QCReleaseAction;
        this.rerender();
      },
    (error: any) => console.log(error)
  );

}

onChange(value:any,action:any,index:any) {
  if(action === 'pass'){
    this.QCActions[index].Pass = true;
    this.QCActions[index].Fail = false;
  } else {
    this.QCActions[index].Pass = false;
    this.QCActions[index].Fail = true;
  }
      
}


Release(){
  console.log(this.QCActions);
  this.InventoryService.createRelease(this.QCID,this.Releaseremarks,this.QCActions)
      .subscribe(
        (data: any) => {
          if (data) {
            console.log(data);
            let toastOptions: ToastOptions = {
              title: 'Success',
              msg: 'Released Successfully',
              showClose: true,
              timeout: 2000,
              theme: 'default',

            };
            this.toastyService.success(toastOptions);
            this.toastCommunicationService.setPosition(this.position);
            this.router.navigate(['/release/list']);
          }
        },
        (error: any) => {
          console.log(error);
          swal(error.error['Message']);
        }
      );
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
