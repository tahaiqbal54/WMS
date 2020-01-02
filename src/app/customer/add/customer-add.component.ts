import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastOptions, ToastyService} from 'ng2-toasty';
import {CustomerService, NotificationCommunicationService, WarehouseService} from '../../_services';



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
  strategies: any [] = [];
  selectedStrategies: any = {};
  stages: any [] = [];
  selectedDefaultStages:  any = {};


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
  dropdownSettingsStrategies: any = {};
  dropdownSettingsDefaultStageLocation: any = {};


  formSubmitted: boolean = false;
  isAllowOverShipment: boolean = false;
  isAllowAutoClose: boolean = false;
  isAllowSystemGeneratedLPNN: boolean = false;
  isAllowMixedProduct: boolean = false;
  position:any;

  constructor(private router: Router,private fb: FormBuilder,private toastyService: ToastyService, private toastCommunicationService: NotificationCommunicationService, private warehouseService: WarehouseService,private customerService: CustomerService) {}


  ngOnInit() {
    this.customerForm = new FormGroup({
      wmsKey: new FormControl('',Validators.required),
      whsId: new FormControl('',Validators.required),
      type: new FormControl(''),
      customerId: new FormControl('',Validators.required),
      name: new FormControl('',Validators.required),
      customerCity: new FormControl(''),
      customerCountry: new FormControl(''),
      address1: new FormControl(''),
      address2: new FormControl(''),
      address3: new FormControl(''),
      address4: new FormControl(''),
      primaryContact: new FormControl(''),
      secondaryContact: new FormControl(''),
      primaryContactEmail: new FormControl(''),
      secondaryContactEmail: new FormControl(''),
      primaryContactNumber: new FormControl(''),
      secondaryContactNumber: new FormControl(''),
      creditLimit: new FormControl(''),
      rotateBy: new FormControl(''),
      allowOverShipment: new FormControl(''),
      allowAutoClose: new FormControl(''),
      allowSystemGeneratedLPN: new FormControl(''),
      lpnLength: new FormControl(''),
      location: new FormControl(''),
      adminEmail: new FormControl(''),
      allowMixedProduct: new FormControl(''),
      description: new FormControl(''),
      defaultQCLocation: new FormControl(''),
      defaultPackLocation:  new FormControl(''),
      defaultPickLocation:  new FormControl(''),
      defaultPutawayLocation:  new FormControl(''),
      defaultSortLocation:  new FormControl(''),
      defaultHoldLocation:  new FormControl(''),
      defaultStageLocation:  new FormControl(''),
      notes: new FormControl(''),
      strategies: new FormControl(''),
    });
    this.position = "bottom-right";
    this.getDropDowns();


  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}

  getDropDowns(){
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
    this.customerService.getCustomerType().subscribe((customerTypes) =>{
      this.types = customerTypes;
      this.dropdownSettingsTypes = {
        singleSelection: true,
        idField: 'Id',
        textField: 'CustomerType',
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
    });
    this.warehouseService.getWarehouses().subscribe((warehouses:any)=>{
      if(warehouses){
        this.warehouses = warehouses;
        this.dropdownSettingsWarehouse = {
          singleSelection: true,
          idField: 'Id',
          textField: 'WarehouseName',
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

        this.selectedWarehouse = [warehouses[0]];
        this.getWareHouseLocationDropDown(warehouses[0].Id);
      }
    });
    this.customerService.getCountry().subscribe((countries: any) => {

      this.countries = countries;
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

    },(error: any) => {
      console.log(error);
    });
    this.customerService.getPacks().subscribe((packs:any) =>{
      this.defaultPackLocation = packs;
      this.dropdownSettingsPackLocation = {
        singleSelection: true,
        idField: 'Id',
        textField: 'PackKey',
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
    },(err) =>{
      console.log('err',err);
    })
  }
  getWareHouseLocationDropDown(warehouseId:any){
    this.customerService.getLocation('GetQCLocationByWarehouseId',warehouseId).subscribe((qcLocations:any) =>{
      this.defaultQCLocations = qcLocations;
      this.dropdownSettingsDefaultQCLocation = {
        singleSelection: true,
        idField: 'Id',
        textField: 'LocationName',
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
    },(err) =>{
      console.log('err',err)
    });
    this.customerService.getLocation('GetStageLocationByWarehouseId',warehouseId).subscribe((stageLocations:any) =>{
      this.stages = stageLocations;
      this.dropdownSettingsDefaultStageLocation = {
        singleSelection: true,
        idField: 'Id',
        textField: 'LocationName',
        selectAllText: 'Select All',
        itemsShowLimit: this.stages.length,
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
    },(err) =>{
      console.log('err',err)
    });
    this.customerService.getLocation('GetPickLocationByWarehouseId',warehouseId).subscribe((pickLocations:any) =>{

      this.defaultPickLocation = pickLocations;
      this.dropdownSettingsPickLocation = {
        singleSelection: true,
        idField: 'Id',
        textField: 'LocationName',
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
    },(err) =>{
      console.log('err',err)
    });
    this.customerService.getLocation('GetPackLocationByWarehouseId',warehouseId).subscribe((packLocations:any) =>{

      this.defaultPackLocation = packLocations;
      this.dropdownSettingsPackLocation = {
        singleSelection: true,
        idField: 'Id',
        textField: 'PackKey',
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
    },(err) =>{
      console.log('err',err)
    });
    this.customerService.getLocation('GetSortLocationByWarehouseId',warehouseId).subscribe((sortLocations:any) =>{

      this.defaultsortLocation = sortLocations;
      this.dropdownSettingsSortLocation = {
        singleSelection: true,
        idField: 'Id',
        textField: 'LocationName',
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

    },(err) =>{
      console.log('err',err)
    });
    this.customerService.getLocation('GetPutAwayLocationByWarehouseId',warehouseId).subscribe((putAwayLocations:any) =>{

      this.defaultPutawayLocations = putAwayLocations;
      this.dropdownSettingsPutawayLocation = {
        singleSelection: true,
        idField: 'Id',
        textField: 'LocationName',
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

    },(err) =>{
      console.log('err',err)
    });
    this.customerService.getLocation('GetHoldLocationByWarehouseId',warehouseId).subscribe((holdLocations:any) =>{


      this.defaultHoldLocation = holdLocations;
      this.dropdownSettingsHoldLocation = {
        singleSelection: true,
        idField: 'Id',
        textField: 'LocationName',
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

    },(err) =>{
      console.log('err',err)
    });
    this.customerService.getCustomerStrategies().subscribe((strategies:any) =>{

      this.strategies = strategies;
      this.dropdownSettingsStrategies = {
        singleSelection: true,
        idField: 'Id',
        textField: 'CustomerStrategy',
        selectAllText: 'Select All',
        itemsShowLimit: this.strategies.length,
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
    },(err) =>{
      console.log('err',err);
    })
  }


  onItemSelectCountry(item: any) {
    this.customerService.getCity(item.Id)
      .subscribe(
        (cities: any) => {
          this.cities = cities;
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

          (error: any) => {
            console.log(error);
            // this.inserted = 'failure';
            // this.message = error.error.message;
          }
        });
  }
  onItemDeSelectCountry(item: any) {
  }


  onItemSelectWarehouse(item: any) {
    this.getWareHouseLocationDropDown(item.Id);

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

  onItemSelectDefaultPutAwayLocation(item: any) {
  }
  onItemDeSelectDefaultPutAwayLocation(item: any) {
  }


  onItemSelectDefaultStage(item: any) {
  }
  onItemDeSelectDefaultStage(item: any) {
  }


  onItemSelectCity(item: any) {
  }
  onItemDeSelectCity(item: any) {
  }

  onItemSelectStrategies(item: any) {
  }
  onItemDeSelectStrategies(item: any) {
  }


  get f() { return this.customerForm.controls; }

  routeBack(){
    this.router.navigate(['/customer/list'])
  }

  saveCustomer(){

    this.formSubmitted = true;
    if(!this.customerForm.valid){
      return;
    }else{
      if(this.selectedWarehouse.length > 0 && this.selectedTypes.length > 0){

        console.log('customerForm',this.customerForm.value);



        let customerObj = {
          CustomerId: this.customerForm.get('customerId').value,
          CustomerName: this.customerForm.get('name').value,
          Description: this.customerForm.get('description').value,
          Notes: this.customerForm.get('notes').value,
          CustomerTypeId: this.customerForm.get('type').value[0].Id,
          CustomerType: this.customerForm.get('type').value[0].CustomerType,
          Address1: this.customerForm.get('address1').value,
          Address2: this.customerForm.get('address2').value,
          Address3: this.customerForm.get('address3').value,
          Address4: this.customerForm.get('address4').value,
          CountryId: this.customerForm.get('customerCountry').value[0] ? this.customerForm.get('customerCountry').value[0].Id : "",
          CountryName: this.customerForm.get('customerCountry').value[0] ? this.customerForm.get('customerCountry').value[0].Name : "",
          CityId: this.customerForm.get('customerCity').value[0] ? this.customerForm.get('customerCity').value[0].Id : "",
          CityName: this.customerForm.get('customerCity').value[0] ? this.customerForm.get('customerCity').value[0].Id : "",
          Contact1: this.customerForm.get('primaryContact').value,
          Contact2: this.customerForm.get('secondaryContact').value,
          Phone1: this.customerForm.get('primaryContactNumber').value,
          Phone2: this.customerForm.get('secondaryContactNumber').value,
          Email1: this.customerForm.get('primaryContactEmail').value,
          Email2: this.customerForm.get('secondaryContactEmail').value,
          CreditLimit: this.customerForm.get('creditLimit').value,
          CustomerStrategyId: this.customerForm.get('strategies').value[0] ? this.customerForm.get('strategies').value[0].Id : "" ,
          CustomerStrategy: this.customerForm.get('strategies').value[0] ? this.customerForm.get('strategies').value[0].CustomerStrategy : "" ,
          CustomerRotateById: this.customerForm.get('rotateBy').value[0] ? this.customerForm.get('rotateBy').value[0].id : "" ,
          CustomerRotateBy:  this.customerForm.get('rotateBy').value[0] ? this.customerForm.get('rotateBy').value[0].rotate : "" ,
          AllowMixedProduct: this.customerForm.get('allowMixedProduct').value,
          AllowOverShipment: this.customerForm.get('allowOverShipment').value,
          AllowAutoCloseForASN: this.customerForm.get('allowAutoClose').value,
          AllowSystemGeneratedLPN: this.customerForm.get('allowSystemGeneratedLPN').value,
          LPNLength: this.customerForm.get('lpnLength').value,
          QCLocationId: this.customerForm.get('defaultQCLocation').value[0] ? this.customerForm.get('defaultQCLocation').value[0].Id : "",
          StageLocationId: this.customerForm.get('defaultStageLocation').value[0] ? this.customerForm.get('defaultStageLocation').value[0].Id : "",
          PickLocationId: this.customerForm.get('defaultPickLocation').value[0] ? this.customerForm.get('defaultPickLocation').value[0].Id : "",
          PackLocationId: this.customerForm.get('defaultPackLocation').value[0] ? this.customerForm.get('defaultPackLocation').value[0].Id : "" ,
          SortLocationId: this.customerForm.get('defaultSortLocation').value[0] ? this.customerForm.get('defaultSortLocation').value[0].Id : "" ,
          PutAwayLocationId: this.customerForm.get('defaultPutawayLocation').value[0] ? this.customerForm.get('defaultPutawayLocation').value[0].Id : "",
          HoldLocationId: this.customerForm.get('defaultHoldLocation').value[0] ? this.customerForm.get('defaultHoldLocation').value[0].Id : "",
          AdminEmail: this.customerForm.get('adminEmail').value,
          WarehouseId:  this.customerForm.get('whsId').value[0].Id,
          WarehouseName: this.customerForm.get('whsId').value[0].WarehouseName,
          IsActive: true,
          UDF1: null,
          UDF2: null,
          UDF3: null,
          UDF4: null,
          UDF5: null,
          RelationId: null,
        };


        console.log('customer',customerObj);




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



