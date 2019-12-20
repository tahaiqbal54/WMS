import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastOptions, ToastyService} from 'ng2-toasty';
import {NotificationCommunicationService} from '../../_services';



declare var $: any;


@Component({
  selector: 'warehouse-add',
  templateUrl: 'warehouse-add.html',
  styleUrls: ['./warehouse-add.css']
})

export class WarehouseAddComponent implements AfterViewInit, OnDestroy, OnInit {


  warehouseForm = this.fb.group({});
  cities : any []  = [];
  selectedCity: any = {};
  countries : any []  = [];
  selectedCountry: any = {};
  dropdownSettingsCity: any = {};
  dropdownSettingsCountry: any = {};
  formSubmitted: boolean = false;
  isActive: boolean = false;
  position:any;

  constructor(private router: Router,private fb: FormBuilder,private toastyService: ToastyService, private toastCommunicationService: NotificationCommunicationService) {}


  ngOnInit() {
    this.warehouseForm = new FormGroup({
      siteId: new FormControl('',Validators.required),
      siteName: new FormControl('',Validators.required),
      warehouseId: new FormControl('',Validators.required),
      warehouseName: new FormControl('',Validators.required),
      warehouseCity: new FormControl(''),
      warehouseCountry: new FormControl(''),
      warehouseAddress: new FormControl('',Validators.required),
      warehouseContact: new FormControl('',Validators.required),
      isActive: new FormControl('')
    });


    this.warehouseForm.patchValue({siteId: 2});
    this.position = "bottom-right";

    this.cities = [
      {id:1, city: 'Karachi'},
      {id:2, city: 'Hyderabad'},
      {id:3, city: 'Larkana'},
      {id:4, city: 'Rahim Yar Khan'},
    ];
    this.dropdownSettingsCity = {
      singleSelection: false,
      idField: 'id',
      textField: 'city',
      selectAllText: 'Select All',
      itemsShowLimit: this.cities.length,
      enableCheckAll: true,
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

    this.countries = [
      {id:1,country: 'Pakistan'},
      {id:2,country: 'Dubai'}
    ];
    this.dropdownSettingsCountry = {
      singleSelection: false,
      idField: 'id',
      textField: 'country',
      selectAllText: 'Select All',
      itemsShowLimit: this.countries.length,
      enableCheckAll: true,
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
    this.selectedCountry = [{id: 1,country:'Pakistan'}];

  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}


  onItemSelectCountry(item: any) {
  }
  onItemDeSelectCountry(item: any) {
  }
  onDeSelectAllCountry(item: any) {
  }
  onSelectAllCountry(item: any) {
  }


  onItemSelectCity(item: any) {
  }
  onItemDeSelectCity(item: any) {
  }
  onDeSelectAllCity(item: any) {
  }
  onSelectAllCity(item: any) {
  }

  get f() { return this.warehouseForm.controls; }

  routeBack(){

  }

  saveWarehouse(){

    this.formSubmitted = true;
    if(!this.warehouseForm.valid){
      return;
    }else{
      if(this.selectedCity.length > 0 && this.selectedCountry.length > 0){
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



