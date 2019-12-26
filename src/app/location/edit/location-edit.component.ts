import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastOptions, ToastyService} from 'ng2-toasty';
import {NotificationCommunicationService} from '../../_services';



declare var $: any;


@Component({
  selector: 'location-edit',
  templateUrl: 'location-edit.html',
  styleUrls: ['./location-edit.css']
})

export class LocationEditComponent implements AfterViewInit, OnDestroy, OnInit {


  locationForm = this.fb.group({});
  warehouses : any []  = [];
  selectedWarehouse: any = {};
  locationTypes : any []  = [];
  selectedLocationType: any = {};
  ABCClassification : any []  = [];
  selectedABCClassification: any = {};
  dropdownSettingsWarehouse: any = {};
  dropdownSettingsLocationType: any = {};
  dropdownSettingsABCClassification: any = {};
  formSubmitted: boolean = false;
  isActive: boolean = false;
  position:any;

  constructor(private router: Router,private fb: FormBuilder,private toastyService: ToastyService, private toastCommunicationService: NotificationCommunicationService) {}


  ngOnInit() {
    this.locationForm = new FormGroup({
      warehouseId: new FormControl('',Validators.required),
      warehouseName: new FormControl(''),
      locationId: new FormControl('',Validators.required),
      locationName: new FormControl('',Validators.required),
      locationType: new FormControl(''),
      locationDescription: new FormControl(''),
      ABCClassification: new FormControl(''),
      cubicCapacity: new FormControl(''),
      weightCapacity: new FormControl(''),
      width: new FormControl(''),
      height: new FormControl(''),
      length: new FormControl(''),
      notes: new FormControl(''),
    });


    this.position = "bottom-right";

    this.warehouses = [
      {id:1, warehouse: 'Warehouse A'},
      {id:2, warehouse: 'Warehouse B'},
      {id:3, warehouse: 'Warehouse C'},
    ];
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


    this.locationTypes = [
      {id:1, type: 'Pick'},
      {id:2, type: 'Sort'},
      {id:3, type: 'QC'},
      {id:4, type: 'Hold'},
      {id:5, type: 'Stage'},
      {id:6, type: 'Putaway'},
      {id:7, type: 'Pack'}
    ];
    this.dropdownSettingsLocationType = {
      singleSelection: true,
      idField: 'id',
      textField: 'type',
      selectAllText: 'Select All',
      itemsShowLimit: this.locationTypes.length,
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

    this.ABCClassification = [
      {id:1, classification: 'Fast Mover'},
      {id:2, classification: 'Slow Mover'},
      {id:3, classification: 'Average Mover'}
    ];
    this.dropdownSettingsABCClassification = {
      singleSelection: true,
      idField: 'id',
      textField: 'classification',
      selectAllText: 'Select All',
      itemsShowLimit: this.ABCClassification.length,
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


  onItemSelectLocationType(item: any) {
  }
  onItemDeSelectLocationType(item: any) {
  }



  onItemSelectWarehouse(item: any) {

    this.locationForm.patchValue({warehouseId: item.id});
  }
  onItemDeSelectWarehouse(item: any) {
    this.locationForm.patchValue({warehouseId: ''});
  }


  onItemSelectABCClassification(item: any) {
  }
  onItemDeSelectABCClassification(item: any) {
  }


  get f() { return this.locationForm.controls; }

  routeBack(){
    this.router.navigate(['/location/list'])
  }

  saveLocation(){

    this.formSubmitted = true;
    if(!this.locationForm.valid){
      return;
    }else{
      if(this.selectedLocationType.length > 0 && this.selectedWarehouse.length > 0){
        let toastOptions: ToastOptions = {
          title: 'Success',
          msg: 'Location Saved Success',
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



