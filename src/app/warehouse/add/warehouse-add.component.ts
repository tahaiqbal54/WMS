import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastOptions, ToastyService} from 'ng2-toasty';
import {NotificationCommunicationService, SitesService} from '../../_services';



declare var $: any;


@Component({
  selector: 'warehouse-add',
  templateUrl: 'warehouse-add.html',
  styleUrls: ['./warehouse-add.css']
})

export class WarehouseAddComponent implements AfterViewInit, OnDestroy, OnInit {


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


  constructor(private router: Router,private fb: FormBuilder,private toastyService: ToastyService, private toastCommunicationService: NotificationCommunicationService, private siteService: SitesService) {}


  ngOnInit() {
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

    this.siteService.getSites()
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



    this.siteService.getCountry()
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

          this.selectedCountry = [{Id: this.countries[0].Id,Name:this.countries[0].Name}];


          this.siteService.getCity(this.countries[0].Id)
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

        },
          (error: any) => {
            console.log(error);
        });



    this.position = "bottom-right";











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
  }
  onItemDeSelectCity(item: any) {
  }

  onItemSelectSiteName(item: any) {
    this.warehouseForm.patchValue({siteId:item.Id});
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

        let selectedSite = this.siteNames.filter((site) => site.Id == this.warehouseForm.get('siteName').value[0].Id);


        let warehouseObj = {
          Id: this.warehouseForm.get('warehouseId').value,
          WarehouseCode: '',
          WarehouseName: this.warehouseForm.get('warehouseName').value,
          WarehouseAddress: this.warehouseForm.get('warehouseAddress').value,
          WarehouseContactNo: this.warehouseForm.get('warehouseContact').value,
          CountryId: this.warehouseForm.get('warehouseCountry').value[0].Id,
          Country: this.warehouseForm.get('warehouseCountry').value[0].Name,
          CityId: this.warehouseForm.get('warehouseCity').value[0].Id,
          City: this.warehouseForm.get('warehouseCity').value[0].Name,
          SiteId: this.warehouseForm.get('siteId').value ,
          SiteCode: selectedSite[0].SiteCode,
          IsActive: true,
          IsDefault: true,
        };

        console.log('warehouseObj',warehouseObj);

        let toastOptions: ToastOptions = {
          title: 'Success',
          msg: 'Warehouse Saved Success',
          showClose: true,
          timeout: 2000,
          theme: 'default',

        };
        this.toastyService.success(toastOptions);
        this.toastCommunicationService.setPosition(this.position);
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



