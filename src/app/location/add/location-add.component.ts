import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastOptions, ToastyService} from 'ng2-toasty';
import {NotificationCommunicationService} from '../../_services';
import {LocationService} from '../../_services/location.service';
import swal from 'sweetalert2';


declare var $: any;


@Component({
  selector: 'location-add',
  templateUrl: 'location-add.html',
  styleUrls: ['./location-add.css']
})

export class LocationAddComponent implements AfterViewInit, OnDestroy, OnInit {


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

  constructor(private router: Router,private fb: FormBuilder,private toastyService: ToastyService, private toastCommunicationService: NotificationCommunicationService,private locationService: LocationService) {}


  ngOnInit() {
    this.locationForm = new FormGroup({
      warehouseId: new FormControl('',Validators.required),
      warehouseName: new FormControl(''),
      locationId: new FormControl(),
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

    this.locationService.getWarehouses().subscribe((data :any) =>{
      console.log(data);
         this.warehouses = data;
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

    },(err) =>{
        console.log('err',err);
    });


    this.locationService.getLocationTypes().subscribe((data: any) =>{
          console.log('data',data);
          this.locationTypes = data;
          this.dropdownSettingsLocationType = {
            singleSelection: true,
            idField: 'Id',
            textField: 'LocationTypeCode',
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
    },(err) =>{
        console.log('err',err);
    });







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
console.log(item);
    this.locationForm.patchValue({warehouseId: item.Id});
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
        let selectedWarehouse: any = this.warehouses.filter((warehouse) => warehouse.Id ==  this.locationForm.get('warehouseId').value);
        let locationObj = {
          Id: 0,
          LocationCode: this.locationForm.get('locationId').value,
          LocationName: this.locationForm.get('locationName').value,
          Description: this.locationForm.get('locationDescription').value,
          LocationNotes: this.locationForm.get('notes').value,
          WarehouseId: this.locationForm.get('warehouseId').value,
          LocationTypeId: this.locationForm.get('locationType').value[0] && this.locationForm.get('locationType').value[0].Id ? this.locationForm.get('locationType').value[0].Id : "",
          ClassificationId: this.locationForm.get('ABCClassification').value[0] && this.locationForm.get('ABCClassification').value[0].id ? this.locationForm.get('ABCClassification').value[0].id : "" ,
          CubicCapacity: this.locationForm.get('cubicCapacity').value,
          WeightCapacity: this.locationForm.get('weightCapacity').value,
          Length: this.locationForm.get('length').value,
          Width: this.locationForm.get('width').value,
          Height: this.locationForm.get('height').value,
          IsActive: true,
          IsDefault:true
        };

        this.locationService.createLocation(locationObj)
        .subscribe(
          (data: any) => {
            if (data)
            {
              let toastOptions: ToastOptions = {
                title: 'Success',
                msg: 'Location Saved Success',
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



