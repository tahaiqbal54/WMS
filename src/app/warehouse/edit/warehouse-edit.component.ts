import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastOptions, ToastyService} from 'ng2-toasty';
import {NotificationCommunicationService, SitesService, WarehouseService} from '../../_services';
import swal from 'sweetalert2';


declare var $: any;


@Component({
  selector: 'warehouse-edit',
  templateUrl: 'warehouse-edit.html',
  styleUrls: ['./warehouse-edit.css']
})

export class WarehouseEditComponent implements AfterViewInit, OnDestroy, OnInit {



  warehouseForm = this.fb.group({});

  siteNames: any [] = [];
  selectedSiteName: any = {};
  cities : any []  = [];
  selectedCity: any = {};
  countries : any []  = [];
  selectedCountry: any = {};
  dropdownSettingsSiteName: any = {};
  dropdownSettingsCity: any = {};
  dropdownSettingsCountry: any = {};
  dropdownSettingsSite: any = {};
  formSubmitted: boolean = false;
  isActive: boolean = false;
  position:any;
  warehouseId: any;
  warehouse:any = null;


  constructor(private router: Router,private route: ActivatedRoute, private fb: FormBuilder,private toastyService: ToastyService, private toastCommunicationService: NotificationCommunicationService,private siteService: SitesService,private warehouseService: WarehouseService) {}


  ngOnInit() {

    this.route.params.subscribe(params => {
      this.warehouseId = +params['id'];
    });











    this.warehouseForm = new FormGroup({
      siteId: new FormControl('',Validators.required),
      siteName: new FormControl(''),
      warehouseId: new FormControl('',Validators.required),
      warehouseName: new FormControl('',Validators.required),
      warehouseCity: new FormControl(''),
      warehouseCountry: new FormControl(''),
      warehouseAddress: new FormControl(''),
      warehouseContact: new FormControl('')
    });
    if(this.warehouseId){
      this.warehouseService.getWarehouse(this.warehouseId).subscribe(
        (data: any) => {
          console.log(data);
          if(data){
            data.map((warehouse) =>{
              if(warehouse.Id == this.warehouseId){
                this.warehouse = warehouse;
              }
            });

            if(this.warehouse){


              this.warehouseForm.patchValue({
                warehouseId : this.warehouse.WarehouseCode,
                siteId:  this.warehouse.SiteId,
                warehouseName: this.warehouse.WarehouseName,
                warehouseAddress: this.warehouse.WarehouseAddress ? this.warehouse.WarehouseAddress : '-',
                warehouseContact: this.warehouse.WarehouseContactNo ? this.warehouse.WarehouseContactNo : '-',
              });


              this.warehouseService.getCountry()
                .subscribe(
                  (data: any) => {
                    this.countries = data;
                    this.dropdownSettingsCountry = {
                      singleSelection: true,
                      idField: 'Id',
                      textField: 'Name',
                      selectAllText: 'Select All',
                      itemsShowLimit: this.countries.length,
                      enableCheckAll: false,
                      unSelectAllText: 'UnSelect All',
                      allowSearchFilter: true,
                      limitSelection: -1,
                      clearSearchFilter: true,
                      searchPlaceholderText: 'Search',
                      noDataAvailablePlaceholderText: 'No data available',
                      closeDropDownOnSelection: true,
                      showSelectedItemsAtTop: false,
                      defaultOpen: false
                    };

                    this.selectedCountry = [{Id: this.warehouse.CountryId, Name:this.warehouse.Country }]

                  },
                  (error: any) => {
                    console.log(error);
                  });


                 this.siteService.getCity(this.warehouse.CountryId)
                 .subscribe(
                  (data: any) => {
                    this.cities = data;
                    this.dropdownSettingsCity = {
                      singleSelection: true,
                      idField: 'Id',
                      textField: 'Name',
                      selectAllText: 'Select All',
                      itemsShowLimit: this.cities.length,
                      enableCheckAll: false,
                      unSelectAllText: 'UnSelect All',
                      allowSearchFilter: true,
                      limitSelection: -1,
                      clearSearchFilter: true,
                      searchPlaceholderText: 'Search',
                      noDataAvailablePlaceholderText: 'No data available',
                      closeDropDownOnSelection: true,
                      showSelectedItemsAtTop: false,
                      defaultOpen: false
                    };

                    this.selectedCity= [{Id: this.warehouse.CityId,Name: this.warehouse.City}]

                  },(error: any) => {
                    console.log(error);
                  });





              this.siteService.getSites()
                .subscribe(
                  (data: any) => {
                    this.siteNames = data;
                    this.dropdownSettingsSite = {
                      singleSelection: true,
                      idField: 'Id',
                      textField: 'SiteName',
                      selectAllText: 'Select All',
                      itemsShowLimit: this.siteNames.length,
                      enableCheckAll: false,
                      unSelectAllText: 'UnSelect All',
                      allowSearchFilter: true,
                      limitSelection: -1,
                      clearSearchFilter: true,
                      searchPlaceholderText: 'Search',
                      noDataAvailablePlaceholderText: 'No data available',
                      closeDropDownOnSelection: false,
                      showSelectedItemsAtTop: false,
                      defaultOpen: false
                    };

                    let selectedSite = this.siteNames.filter((site) => site.Id == this.warehouse.SiteId);
                    this.selectedSiteName  =  [{Id: this.warehouse.SiteId,SiteName: selectedSite[0].SiteName }];

                  },
                  (error: any) => {
                    console.log(error);
                  });

            }




          }

        },(error: any) => {
          console.log(error);
        });
    }








    this.position = "bottom-right";





    this.selectedCountry = [{id: 1,country:'Pakistan'}];


  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}


  onItemSelectCountry(item: any) {
    this.siteService.getCity(item.Id)
      .subscribe(
        (data: any) => {
          this.cities = data;
          this.dropdownSettingsCity = {
            singleSelection: true,
            idField: 'Id',
            textField: 'Name',
            selectAllText: 'Select All',
            itemsShowLimit: this.cities.length,
            enableCheckAll: false,
            unSelectAllText: 'UnSelect All',
            allowSearchFilter: true,
            limitSelection: -1,
            clearSearchFilter: true,
            searchPlaceholderText: 'Search',
            noDataAvailablePlaceholderText: 'No data available',
            closeDropDownOnSelection: true,
            showSelectedItemsAtTop: false,
            defaultOpen: false
          };

        },(error: any) => {
          console.log(error);

        });
  }
  onItemDeSelectCountry(item: any) {
  }



  onItemSelectCity(item: any) {
    this.warehouseService.getSites(item.Id)
      .subscribe(
        (data: any) => {
          this.siteNames = data;

          console.log('this.siteName',this.siteNames);

          this.dropdownSettingsSite = {
            singleSelection: true,
            idField: 'Id',
            textField: 'SiteName',
            selectAllText: 'Select All',
            itemsShowLimit: this.siteNames.length,
            enableCheckAll: false,
            unSelectAllText: 'UnSelect All',
            allowSearchFilter: true,
            limitSelection: -1,
            clearSearchFilter: true,
            searchPlaceholderText: 'Search',
            noDataAvailablePlaceholderText: 'No data available',
            closeDropDownOnSelection: false,
            showSelectedItemsAtTop: false,
            defaultOpen: false
          };


        },
        (error: any) => {
          console.log(error);
        });
  }
  onItemDeSelectCity(item: any) {
  }

  onItemSelectSiteName(item: any) {
    this.warehouseForm.patchValue({siteId:item.id});
  }
  onItemDeSelectSiteName(item: any) {
    this.warehouseForm.patchValue({siteId:''});
  }


  get f() { return this.warehouseForm.controls; }

  routeBack(){
    this.router.navigate(['/warehouse/list'])
  }

  saveWarehouse(){

    this.formSubmitted = true;
    if(!this.warehouseForm.valid){
      return;
    }else{
      if(this.selectedCity.length > 0 && this.selectedCountry.length > 0 && this.selectedSiteName.length > 0){

        let warehouseObj = {
          Id: this.warehouseId,
          WarehouseCode: this.warehouseForm.get('warehouseId').value,
          WarehouseName: this.warehouseForm.get('warehouseName').value,
          WarehouseAddress: this.warehouseForm.get('warehouseAddress').value,
          WarehouseContactNo: this.warehouseForm.get('warehouseContact').value,
          CountryId: this.warehouseForm.get('warehouseCountry').value[0].Id,
          CityId: this.warehouseForm.get('warehouseCity').value[0].Id,
          SiteId: this.warehouseForm.get('siteId').value ,
          IsActive: true,
          IsDefault: true,
        };


        console.log('this.warehouse',warehouseObj);
        this.warehouseService.editWarehouse(warehouseObj,this.warehouseId)
        .subscribe(
          (data: any) => {
            if (data)
            {
              let toastOptions: ToastOptions = {
                title: 'Success',
                msg: 'Warehouse Updated Successfully',
                showClose: true,
                timeout: 2000,
                theme: 'default',
      
              };
              this.toastyService.success(toastOptions);
              this.toastCommunicationService.setPosition(this.position);
              this.routeBack();
            }
          },
          (error: any) => {
            console.log(error);
            swal(error.error['Message']);


          }
        );
      }else{
        let toastOptions: ToastOptions = {
          title: 'Warning',
          msg: 'Make sure you fill all the required fields',
          showClose: true,
          timeout: 2000,
          theme: 'default',

        };
        this.toastyService.warning(toastOptions);
        this.toastCommunicationService.setPosition(this.position);
      }

    }

  }



}



