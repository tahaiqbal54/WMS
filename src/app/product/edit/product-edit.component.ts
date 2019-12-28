import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastOptions, ToastyService} from 'ng2-toasty';
import {NotificationCommunicationService} from '../../_services';




declare var $: any;


@Component({
  selector: 'product-edit',
  templateUrl: 'product-edit.html',
  styleUrls: ['./product-edit.css']
})

export class ProductEditComponent implements AfterViewInit, OnDestroy, OnInit {


  productForm = this.fb.group({});
  position:any;
  formSubmitted:any = false;

  customerNames: any [] = [];
  UOM: any [] = [];
  packKeys:any [] =[];
  abcClassifications:any [] =[];
  rfDefaultUOM:any [] =[];
  qcLocations:any [] =[];
  rotateBy:any [] =[];




  selectedCustomerNames: any =   {};
  selectedUOM: any =  {};
  selectedPackKeys: any =  {};
  selectedABClassifications: any =  {};
  selectedRfDefaultUOM: any =  {};
  selectedQcLocations: any = {};
  selectedRotateBy: any =  {};

  dropdownSettingsCustomerName: any = {};
  dropdownSettingsUOM: any = {};
  dropdownSettingsPackKey: any = {};
  dropdownSettingsABCClassification: any = {};
  dropdownSettingsRfDefaultUOM: any = {};
  dropdownSettingsRotateBy: any = {};
  dropdownSettingsQcLocation: any = {};

  isWeighable:any = false;
  isVolume:any = false;
  isQcRequired:any = false;


  constructor(private router: Router,private fb: FormBuilder,private toastyService: ToastyService, private toastCommunicationService: NotificationCommunicationService) {}


  ngOnInit() {
    this.productForm = new FormGroup({
        wmsProductId: new FormControl('',Validators.required),
        vendorProductId: new FormControl('',Validators.required),
        sku: new FormControl('',Validators.required),
      //Dropdown
        customerName: new FormControl(''),
        description: new FormControl(''),
        notes: new FormControl(''),
      //Dropdown
        UOM: new FormControl(''),
        shelfLife: new FormControl(''),
      //Dropdown
        packKey:  new FormControl(''),
      ////Dropdown
        abcClassification: new FormControl(''),
        weighable: new FormControl(''),
        stdGrossWeight: new FormControl(''),
        stdNetWeight: new FormControl(''),
        volume: new FormControl(''),
        stdCube: new FormControl(''),
      //Dropdown
        rfDefaultUOM: new FormControl(''),
        price: new FormControl(''),
        cost: new FormControl(''),
        qcRequired: new FormControl(''),
      //Dropdown
        qcLocation: new FormControl(''),
        productStatus: new FormControl(''),
      //Dropdown
        rotateBy: new FormControl(''),
        cycleCount: new FormControl(''),
        lastCycleCount: new FormControl('')
    });
    this.position = "bottom-right";
    this.initiateDropDowns();


    this.productForm.patchValue({
      wmsProductId: 1
    })



  }

  initiateDropDowns(){

    this.customerNames = [{'Id':1,'customer_name':'Amna'}];
    this.dropdownSettingsCustomerName = {
      singleSelection: true,
      idField: 'Id',
      textField: 'customer_name',
      selectAllText: 'Select All',
      itemsShowLimit: this.customerNames.length,
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

    this.UOM = [{'Id':1,'uom_name':'Uom 1'}];
    this.dropdownSettingsUOM = {
      singleSelection: true,
      idField: 'Id',
      textField: "uom_name",
      selectAllText: 'Select All',
      itemsShowLimit: this.UOM.length,
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

    this.packKeys = [{'Id':1,'pack':'Pack 1'}];
    this.dropdownSettingsPackKey = {
      singleSelection: true,
      idField: 'Id',
      textField: "pack",
      selectAllText: 'Select All',
      itemsShowLimit: this.packKeys.length,
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

    this.abcClassifications = [{'Id':1,'abcclassification':'ABC Classification 1'}];
    this.dropdownSettingsABCClassification = {
      singleSelection: true,
      idField: 'Id',
      textField: "abcclassification",
      selectAllText: 'Select All',
      itemsShowLimit: this.abcClassifications.length,
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

    this.rfDefaultUOM = [{'Id':1,'rf_default':'Rf Default 1'}];
    this.dropdownSettingsRfDefaultUOM = {
      singleSelection: true,
      idField: 'Id',
      textField: "rf_default",
      selectAllText: 'Select All',
      itemsShowLimit: this.rfDefaultUOM.length,
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

    this.qcLocations = [{'Id':1,'qc_location':'QC Location 1'}];
    this.dropdownSettingsRfDefaultUOM = {
      singleSelection: true,
      idField: 'Id',
      textField: "qc_location",
      selectAllText: 'Select All',
      itemsShowLimit: this.qcLocations.length,
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

    this.rotateBy = [{'Id':1,'rotate_by':'Rotate By 1'}];
    this.dropdownSettingsRotateBy = {
      singleSelection: true,
      idField: 'Id',
      textField: "rotate_by",
      selectAllText: 'Select All',
      itemsShowLimit: this.rotateBy.length,
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

    this.qcLocations = [{'Id':1,'location':'QC Location 1'}];
    this.dropdownSettingsQcLocation = {
      singleSelection: true,
      idField: 'Id',
      textField: "location",
      selectAllText: 'Select All',
      itemsShowLimit: this.qcLocations.length,
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



  }

  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}




  onItemSelectCustomerName(item: any) {
  }
  onItemDeSelectCustomerName(item: any) {
  }

  onItemSelectUOM(item: any) {
  }
  onItemDeSelectUOM(item: any) {
  }

  onItemSelectPackkey(item: any) {
  }
  onItemDeSelectPackKey(item: any) {
  }


  onItemSelectABCClassification(item: any) {
  }
  onItemDeSelectABCClassification(item: any) {
  }

  onItemSelectRfDefaultUOM(item: any) {
  }
  onItemDeSelectRfDefaulUOM(item: any) {
  }


  onItemSelectQcLocation(item: any) {
  }
  onItemDeSelectQcLocation(item: any) {
  }

  onItemSelectRotateBy(item: any) {
  }
  onItemDeSelectRotateBy(item: any) {
  }


  get f() { return this.productForm.controls; }

  routeBack(){
    this.router.navigate(['/product/list'])
  }



  saveProduct(){

    this.formSubmitted = true;
    if(!this.productForm.valid){
      return;
    }else{
      if(this.selectedCustomerNames.length > 0){
        console.log('Product Form',this.productForm.value);

        let toastOptions: ToastOptions = {
          title: 'Success',
          msg: 'Site Saved Success',
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


  toggleEditableIsWeighable(event) {
    if(this.isWeighable){
      this.isWeighable = !this.isWeighable;
    }else{
      this.isWeighable = !this.isWeighable;
    }
  }
  toggleEditableIsVolume(event) {
    if(this.isVolume){
      this.isVolume = !this.isVolume;
    }else{
      this.isVolume = !this.isVolume;
    }
  }
  toggleEditableQcRequired(event) {
    if(this.isQcRequired){
      this.isQcRequired = !this.isQcRequired;
    }else{
      this.isQcRequired = !this.isQcRequired;
    }
  }

}



