import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastOptions, ToastyService} from 'ng2-toasty';
import {NotificationCommunicationService} from '../../_services';
import {SitesService} from "../../_services/sites.service";



declare var $: any;


@Component({
  selector: 'site-add',
  templateUrl: 'sites-add.html',
  styleUrls: ['./sites-add.css']
})

export class SitesAddComponent implements AfterViewInit, OnDestroy, OnInit {


  siteForm = this.fb.group({});
  cities : any []  = [];
  selectedCity: any = {};
  countries : any []  = [];
  selectedCountry: any = {};
  dropdownSettingsCity: any = {};
  dropdownSettingsCountry: any = {};
  formSubmitted: boolean = false;
  isActive: boolean = false;
  position:any;

  constructor(private router: Router,private fb: FormBuilder,private toastyService: ToastyService, private toastCommunicationService: NotificationCommunicationService,private SitesService: SitesService) {}


  ngOnInit() {
    this.siteForm = new FormGroup({
      siteId: new FormControl('',Validators.required),
      siteName: new FormControl('',Validators.required),
      siteCity: new FormControl(''),
      siteCountry: new FormControl(''),
      siteAddress: new FormControl(''),
      siteContact: new FormControl(''),
      notes: new FormControl('')
    });

    this.position = "bottom-right";


    this.SitesService.getCountry()
      .subscribe(
        (data: any) => {
          console.log(data);
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

        (error: any) => {
          console.log(error);
          // this.inserted = 'failure';
          // this.message = error.error.message;
        }
        });


  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}


  onItemSelectCountry(item: any) {
    this.SitesService.getCity(item.Id)
      .subscribe(
        (data: any) => {
          console.log(data);
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

        (error: any) => {
          console.log(error);
          // this.inserted = 'failure';
          // this.message = error.error.message;
        }
        });

  }
  onItemDeSelectCountry(item: any) {
  }



  onItemSelectCity(item: any) {
  }
  onItemDeSelectCity(item: any) {
  }


  get f() { return this.siteForm.controls; }

  routeBack(){
    this.router.navigate(['/sites/list'])
  }



  saveSite(){

    this.formSubmitted = true;
    if(!this.siteForm.valid){
      return;
    }else{
      if(this.selectedCity.length > 0 && this.selectedCountry.length > 0){


        let obj = {
          SiteId: this.siteForm.get('siteId').value,
          SiteName: this.siteForm.get('siteName').value,

        };
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

}



