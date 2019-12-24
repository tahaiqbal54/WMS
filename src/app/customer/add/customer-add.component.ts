import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastOptions, ToastyService} from 'ng2-toasty';
import {NotificationCommunicationService} from '../../_services';



declare var $: any;


@Component({
  selector: 'customer-add',
  templateUrl: 'customer-add.html',
  styleUrls: ['./customer-add.css']
})

export class CustomerAddComponent implements AfterViewInit, OnDestroy, OnInit {


  customerForm = this.fb.group({});

  cities : any []  = [];
  selectedCity: any = {};
  countries : any []  = [];
  selectedCountry: any = {};
  warehouses: any [] = [];
  selectedWarehouse: any = {};
  types: any [] = [];
  selectedTypes: any = {};
  rotateBy: any [] = [];
  selectedRotateBy: any = {};
  defaultQCLocations: any [] = [];
  selectedDefaultQCLocation: any  = {};
  defaultPackLocation: any [] = [];
  selectedDefaultPackLocation: any  = {};
  defaultPickLocation: any [] = [];
  selectedDefaultPickLocation: any  = {};
  defaultPutawayLocations: any [] = [];
  selectedDefaultPutawayLocation: any  = {};
  defaultsortLocation: any [] = [];
  selectedDefaultSortLocation: any  = {};
  defaultHoldLocation: any [] = [];
  selectedDefaultHoldLocation: any  = {};

  dropdownSettingsCity: any = {};
  dropdownSettingsCountry: any = {};
  dropdownSettingsWarehouse: any = {};
  dropdownSettingsTypes: any = {};
  dropdownSettingsRotateBy: any = {};
  dropdownSettingsDefaultQCLocation: any = {};
  dropdownSettingsQCLocation: any = {};
  dropdownSettingsPackLocation: any = {};
  dropdownSettingsPickLocation: any = {};
  dropdownSettingsPutawayLocation: any = {};
  dropdownSettingsSortLocation: any = {};
  dropdownSettingsHoldLocation: any = {};


  formSubmitted: boolean = false;
  isAllowOverShipment: boolean = false;
  isAllowAutoClose: boolean = false;
  isAllowSystemGeneratedLPNN: boolean = false;
  isAllowMixedProduct: boolean = false;
  position:any;

  constructor(private router: Router,private fb: FormBuilder,private toastyService: ToastyService, private toastCommunicationService: NotificationCommunicationService) {}


  ngOnInit() {
    this.customerForm = new FormGroup({
      wmsKey: new FormControl('',Validators.required),
      whsId: new FormControl(''),
      type: new FormControl(''),
      customerId: new FormControl(''),
      name: new FormControl('',Validators.required),
      customerCity: new FormControl(''),
      customerCountry: new FormControl(''),
      address1: new FormControl('',Validators.required),
      address2: new FormControl('',Validators.required),
      address3: new FormControl('',Validators.required),
      address4: new FormControl('',Validators.required),
      primaryContact: new FormControl('',Validators.required),
      secondaryContact: new FormControl('',Validators.required),
      creditLimit: new FormControl('',Validators.required),
      rotateBy: new FormControl(''),
      allowOverShipment: new FormControl(''),
      allowAutoClose: new FormControl(''),
      allowSystemGeneratedLPN: new FormControl(''),
      nopnLength: new FormControl('',Validators.required),
      location: new FormControl('',Validators.required),
      adminEmail: new FormControl('',Validators.required),
      allowMixedProduct: new FormControl(''),
      description: new FormControl(''),
      defaultQCLocation: new FormControl(''),
      defaultPackLocation:  new FormControl(''),
      defaultPickLocation:  new FormControl(''),
      defaultPutawayLocation:  new FormControl(''),
      defaultSortLocation:  new FormControl(''),
      defaultHoldLocation:  new FormControl(''),
      notes: new FormControl('',Validators.required),
      isActive: new FormControl('')
    });


    this.customerForm.patchValue({siteId: 2});
    this.position = "bottom-right";



    this.types = [{id:1, type: 'Type - 1'}];
    this.dropdownSettingsTypes = {
      singleSelection: true,
      idField: 'id',
      textField: 'type',
      selectAllText: 'Select All',
      itemsShowLimit: this.types.length,
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


    this.warehouses = [{id:1, warehouse: 'Warehouse - 1'}];
    this.dropdownSettingsWarehouse = {
      singleSelection: true,
      idField: 'id',
      textField: 'warehouse',
      selectAllText: 'Select All',
      itemsShowLimit: this.warehouses.length,
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

    this.rotateBy = [
      {id:1, rotate: 'Lot'},
      {id:2, rotate: 'Manafacture Date'},
      {id:3, rotate: 'Expire Date'},
      ];
    this.dropdownSettingsRotateBy = {
      singleSelection: true,
      idField: 'id',
      textField: 'rotate',
      selectAllText: 'Select All',
      itemsShowLimit: this.rotateBy.length,
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


    this.cities = [
      {id:1, city: 'Karachi'},
      {id:2, city: 'Hyderabad'},
      {id:3, city: 'Larkana'},
      {id:4, city: 'Rahim Yar Khan'},
    ];
    this.dropdownSettingsCity = {
      singleSelection: true,
      idField: 'id',
      textField: 'city',
      selectAllText: 'Select All',
      itemsShowLimit: this.cities.length,
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

    this.countries = [
      {id:1,country: 'Pakistan'},
      {id:2,country: 'Dubai'}
    ];
    this.dropdownSettingsCountry = {
      singleSelection: true,
      idField: 'id',
      textField: 'country',
      selectAllText: 'Select All',
      itemsShowLimit: this.countries.length,
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
    this.selectedCountry = [{id: 1,country:'Pakistan'}];


    this.defaultQCLocations = [
      {id:1,defaultlocation: 'Qc Location 1'}
    ];
    this.dropdownSettingsDefaultQCLocation = {
      singleSelection: true,
      idField: 'id',
      textField: 'defaultlocation',
      selectAllText: 'Select All',
      itemsShowLimit: this.defaultQCLocations.length,
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

    this.defaultPackLocation = [
      {id:1,defaultpacklocation: 'Pack Location 1'}
    ];
    this.dropdownSettingsPackLocation = {
      singleSelection: true,
      idField: 'id',
      textField: 'defaultpacklocation',
      selectAllText: 'Select All',
      itemsShowLimit: this.defaultPackLocation.length,
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

    this.defaultPickLocation = [
      {id:1,defaultpicklocation: 'Pick Location 1'}
    ];
    this.dropdownSettingsPickLocation = {
      singleSelection: true,
      idField: 'id',
      textField: 'defaultpicklocation',
      selectAllText: 'Select All',
      itemsShowLimit: this.defaultPickLocation.length,
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

    this.defaultPutawayLocations = [
      {id:1,defaultputawaylocation: 'Putaway Location 1'}
    ];
    this.dropdownSettingsPutawayLocation = {
      singleSelection: true,
      idField: 'id',
      textField: 'defaultputawaylocation',
      selectAllText: 'Select All',
      itemsShowLimit: this.defaultPutawayLocations.length,
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

    this.defaultsortLocation = [
      {id:1,defaultsortlocation: 'Default Sort Location 1'}
    ];
    this.dropdownSettingsSortLocation = {
      singleSelection: true,
      idField: 'id',
      textField: 'defaultsortlocation',
      selectAllText: 'Select All',
      itemsShowLimit: this.defaultsortLocation.length,
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


    this.defaultHoldLocation = [
      {id:1,defaultholdlocation: 'Hold Location 1'}
    ];
    this.dropdownSettingsHoldLocation = {
      singleSelection: true,
      idField: 'id',
      textField: 'defaultholdlocation',
      selectAllText: 'Select All',
      itemsShowLimit: this.defaultHoldLocation.length,
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





  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}


  onItemSelectCountry(item: any) {
  }
  onItemDeSelectCountry(item: any) {
  }


  onItemSelectWarehouse(item: any) {
  }
  onItemDeSelectWarehouse(item: any) {
  }

  onItemSelectType(item: any) {
  }
  onItemDeSelectType(item: any) {
  }

  onItemSelectSortLocation(item: any) {
  }
  onItemDeSelectSortLocation(item: any) {
  }

  onItemSelectHoldLocation(item: any) {
  }
  onItemDeSelectHoldLocation(item: any) {
  }


  onItemSelectRotateBy(item: any) {
  }
  onItemDeSelectRotateBy(item: any) {
  }


  onItemSelectDefaultQcLocation(item: any) {
  }
  onItemDeSelectDefaultQcLocation(item: any) {
  }


  onItemSelectDefaultPackLocation(item: any) {
  }
  onItemDeSelectDefaultPackLocation(item: any) {
  }

  onItemSelectDefaultPickLocation(item: any) {
  }
  onItemDeSelectDefaultPickLocation(item: any) {
  }


  onItemSelectCity(item: any) {
  }
  onItemDeSelectCity(item: any) {
  }


  get f() { return this.customerForm.controls; }

  routeBack(){
    this.router.navigate(['/warehouse/list'])
  }

  saveCustomer(){

    this.formSubmitted = true;
    if(!this.customerForm.valid){
      return;
    }else{
      if(this.selectedCity.length > 0 && this.selectedCountry.length > 0){
        let toastOptions: ToastOptions = {
          title: 'Success',
          msg: 'Customer Saved Success',
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



  toggleEditableIsAllowOverShipment(event) {
    if(this.isAllowOverShipment){
      this.isAllowOverShipment = !this.isAllowOverShipment;
    }else{
      this.isAllowOverShipment = !this.isAllowOverShipment;
    }
  }
  toggleEditableIsAllowAutoClose(event) {
    if(this.isAllowAutoClose){
      this.isAllowAutoClose = !this.isAllowAutoClose;
    }else{
      this.isAllowAutoClose = !this.isAllowAutoClose;
    }
  }
  toggleEditableIsAllowSystemGeneratedLPNN(event) {
    if(this.isAllowSystemGeneratedLPNN){
      this.isAllowSystemGeneratedLPNN = !this.isAllowSystemGeneratedLPNN;
    }else{
      this.isAllowSystemGeneratedLPNN = !this.isAllowSystemGeneratedLPNN;
    }
  }
  toggleEditableIsAllowMixedProduct(event) {
    if(this.isAllowMixedProduct){
      this.isAllowMixedProduct = !this.isAllowMixedProduct;
    }else{
      this.isAllowMixedProduct = !this.isAllowMixedProduct;
    }
  }





}



