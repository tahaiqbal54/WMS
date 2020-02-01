import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastOptions, ToastyService} from 'ng2-toasty';
import {NotificationCommunicationService, SitesService} from '../../_services';
import swal from 'sweetalert2';


declare var $: any;


@Component({
  selector: 'site-edit',
  templateUrl: 'sites-edit.html',
  styleUrls: ['./sites-edit.css']
})

export class SitesEditComponent implements AfterViewInit, OnDestroy, OnInit {

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
  siteId:any = null;
  site: any;

  constructor(private router: Router,private route: ActivatedRoute,private fb: FormBuilder,private toastyService: ToastyService, private toastCommunicationService: NotificationCommunicationService,private siteService: SitesService) {}

  ngOnInit() {

     this.route.params.subscribe(params => {
      this.siteId = +params['id'];
    });


    this.siteForm = new FormGroup({
      siteId: new FormControl('',Validators.required),
      siteName: new FormControl('',Validators.required),
      siteCity: new FormControl(''),
      siteCountry: new FormControl(''),
      siteAddress: new FormControl(''),
      siteContact: new FormControl(''),
      notes: new FormControl('')
    });


    if(this.siteId){
       this.siteService.getSite(this.siteId)
         .subscribe(
           (data: any) => {
             console.log(data);
             if(data){
               data.map((site) =>{
                 if(site.Id == this.siteId){
                   this.site = site;
                 }
               })
             }

             if(this.site){

               this.siteForm.patchValue({
                 siteId: this.site.SiteCode,
                 siteName: this.site.SiteName,
                 siteAddress: this.site.SiteAddress,
                 siteContact: this.site.SiteContactNo,
                 notes: this.site.SiteNote
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
                     this.selectedCountry = [{Id: this.site.CountryId,Name: this.site.Country}];

                   },(error: any) => {
                     console.log(error);
                   });



               this.siteService.getCity(this.site.CountryId)
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

                       this.selectedCity= [{Id: this.site.CityId,Name: this.site.City}]

                     },(error: any) => {
                       console.log(error);
                     });

             }

           },
           (error: any) => {
             console.log(error);
           });



     }

    this.position = "bottom-right";





  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}


  onItemSelectCountry(item: any) {
    this.siteService.getCity(item.Id)
      .subscribe(
        (data: any) => {
          this.cities = data;

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


  get f() { return this.siteForm.controls; }

  routeBack(){
    this.router.navigate(['/sites/list']);
  }

  saveSite(){

    this.formSubmitted = true;
    if(!this.siteForm.valid){
      return;
    }else{
      if(this.selectedCity.length > 0 && this.selectedCountry.length > 0){
        let obj = {
          Id: this.siteId,
          SiteCode: this.siteForm.get('siteId').value,
          SiteName: this.siteForm.get('siteName').value,
          SiteAddress: this.siteForm.get('siteAddress').value,
          SiteContactNo: this.siteForm.get('siteContact').value,
          SiteNote: this.siteForm.get('notes').value,
          CountryId: this.siteForm.get('siteCountry').value[0].Id,
          CityId: this.siteForm.get('siteCity').value[0].Id,
          IsActive: true,
          IsDefault: true,
        };

        console.log(obj);

        this.siteService.editSite(obj,this.siteId)
        .subscribe(
          (data: any) => {
            if (data)
            {
              let toastOptions: ToastOptions = {
                title: 'Success',
                msg: 'Site Updated Success',
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



