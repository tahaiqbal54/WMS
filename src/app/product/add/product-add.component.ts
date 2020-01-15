import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastOptions, ToastyService} from 'ng2-toasty';
import {CustomerService, NotificationCommunicationService, ProductService} from '../../_services';
import {SitesService} from "../../_services/sites.service";
import swal from 'sweetalert2';


declare var $: any;


@Component({
  selector: 'product-add',
  templateUrl: 'product-add.html',
  styleUrls: ['./product-add.css']
})

export class ProductAddComponent implements AfterViewInit, OnDestroy, OnInit {


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


  constructor(private router: Router,private fb: FormBuilder,private toastyService: ToastyService, private toastCommunicationService: NotificationCommunicationService,private customerService: CustomerService,private productService: ProductService) {}


  ngOnInit() {
    this.productForm = new FormGroup({
        wmsProductId: new FormControl(),
        vendorProductId: new FormControl('',Validators.required),
        //sku: new FormControl('',Validators.required),
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
        productStatus: new FormControl(''),
      //Dropdown
        rotateBy: new FormControl(''),
        cycleCount: new FormControl(''),
        lastCycleCount: new FormControl('')
    });
    this.position = "bottom-right";
    this.initiateDropDowns();


    // this.productForm.patchValue({
    //   wmsProductId: 1
    // })



  }

  initiateDropDowns(){


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

    this.customerService.getCustomers().subscribe((customers) =>{
      this.customerNames = customers;
      this.dropdownSettingsCustomerName = {
        singleSelection: true,
        idField: 'Id',
        textField: 'CustomerName',
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

    });
    this.productService.getUOM().subscribe((UOMS) =>{

      this.UOM = UOMS;
      this.dropdownSettingsUOM = {
        singleSelection: true,
        idField: 'Id',
        textField: "UnitName",
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



    },(err) =>{
         console.log('err',err);
    });
    this.productService.getPack().subscribe((packs)=>{

      this.packKeys = packs;
      this.dropdownSettingsPackKey = {
        singleSelection: true,
        idField: 'Id',
        textField: "PackKey",
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


    },(err) =>{
       console.log('err',err);
    });
    this.productService.getABCClassifications().subscribe((abcClassifications) =>{

      this.abcClassifications = abcClassifications;
      this.dropdownSettingsABCClassification = {
        singleSelection: true,
        idField: 'Id',
        textField: "Classification",
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

    },(err)=>{
       console.log('err',err);
    });
    this.productService.getRFDefault().subscribe((rfDefaults) =>{



      //RFDefaultUOM
      this.rfDefaultUOM = rfDefaults;
      this.dropdownSettingsRfDefaultUOM = {
        singleSelection: true,
        idField: 'Id',
        textField: "RFDefaultUOM",
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


    },(err) =>{
        console.log('err',err);
    });




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

     


        let productObj = {
          Id:0,
          SKU: this.productForm.get('vendorProductId').value,
          Description: this.productForm.get('description').value,
          ShelfLife: this.productForm.get('shelfLife').value,
          QCRequired: this.productForm.get('qcRequired').value,
          UDF1: "",
          UDF2: "",
          UDF3: "",
          UDF4: "",
          UDF5: "",
          ProductClassificationId: this.productForm.get('abcClassification').value[0] ? this.productForm.get('abcClassification').value[0].Id : "" ,
          //ProductClassification: this.productForm.get('abcClassification').value[0] ? this.productForm.get('abcClassification').value[0].Classification : "",
          CustomerId: this.productForm.get('customerName').value[0] ? this.productForm.get('customerName').value[0].Id : "",
          //CustomerName: this.productForm.get('customerName').value[0] ? this.productForm.get('customerName').value[0].CustomerName : "",
          STDGrossWeight: this.productForm.get('stdGrossWeight').value,
          STDNetWeight: this.productForm.get('stdNetWeight').value,
          STDArea: this.productForm.get('stdNetWeight').value,
          Notes: this.productForm.get('notes').value,
          Price: this.productForm.get('price').value,
          Cost: this.productForm.get('cost').value,
          OnReceipteCopyPackKey: "",
          ProductRotateById: this.productForm.get('rotateBy').value[0] ? this.productForm.get('rotateBy').value[0].id : "",
          ProductRFDefaultUOMId: this.productForm.get('rfDefaultUOM').value[0] ? this.productForm.get('rfDefaultUOM').value[0].id : "",
          QCLocationId: "",
          CycleCountFrequency: this.productForm.get('cycleCount').value,
          LastCycleCount: this.productForm.get('lastCycleCount').value,
          UnitId: this.productForm.get('UOM').value[0] ? this.productForm.get('UOM').value[0].Id : "",
         // UnitName: this.productForm.get('UOM').value[0] ? this.productForm.get('UOM').value[0].UnitName : "",
          PackId: this.productForm.get('packKey').value[0] ? this.productForm.get('packKey').value[0].Id : "",
         // PackKey: this.productForm.get('packKey').value[0] ? this.productForm.get('packKey').value[0].PackKey : "",
          Weighable: this.productForm.get('weighable').value,
          Volume: this.productForm.get('volume').value,
          ProductStatusId: this.productForm.get('productStatus').value,
          ProductCode: this.productForm.get('vendorProductId').value,
          IsActive:true
        };



        this.productService.createProduct(productObj)
        .subscribe(
          (data: any) => {
            if (data) {
              let toastOptions: ToastOptions = {
                title: 'Success',
                msg: 'Product Saved Success',
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


  toggleEditableIsWeighable(event) {
    if(this.isWeighable){
      this.isWeighable = !this.isWeighable;
      this.productForm.get('stdGrossWeight').disable;
      this.productForm.get('stdNetWeight').disable;
    }else{
      this.isWeighable = !this.isWeighable;
      this.productForm.get('stdGrossWeight').enable;
      this.productForm.get('stdNetWeight').enable;
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



