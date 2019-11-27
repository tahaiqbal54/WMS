import { Tanks } from './tanks';
import { Dispensers } from './dispensers';
import {Dealer} from "./dealer";
import {Product} from "./product";
import {Facility} from "./facility";

export class Outlet {

  public station_id: number;
  public name: string;
  public sap_id: string;
  public cp_volume: string;
  public financial_status: string;
  public ntn_no: string;
  public strn_no: string;
  public address: string;
  public lat: number;
  public lng: number;
  public last_visited_at: string;
  public land_size: string;
  public land_owner: string;
  public lease_expiry: Date;
  
  public contact_person: string;
  public contact_no: string;
  public email: string;

  public site_bank: string;
  public site_acc_title: string;
  public site_acc_no: string;
  public nearest_depot: string;
  public distance_of_depot: string;
  public city: string;
  public district: any;
  public category: any;
  public retailer_agreement_expiry_date: Date;

  // public avatar: string;
  public territory_id: number;

  public dealer: Dealer;
  public products: Product [];
  public dispensers: Dispensers [];
  public tanks: Tanks [];
  public nfr: Facility [];
  public facilities: Facility [];

  constructor(data?: any) {

    if (data) {
      console.log(data);
      this.station_id = parseInt(data.id, 10);
      this.name = data.name || '';
      this.sap_id = data.sap_id || '';
      this.cp_volume = data.cp_volume || '';
      this.financial_status = data.financial_status || '';
      this.ntn_no = data.ntn_no || '';
      this.strn_no = data.strn_no || '';
      this.address = data.address || '';
      this.lat = data.lat || null;
      this.lng = data.lng || null;
      this.last_visited_at = data.last_visited_at || '';
      this.land_size = data.land_size || '';
      this.land_owner = data.land_owner || '';
      this.lease_expiry = (data.lease_expiry) ? new Date(data.lease_expiry) : null;
      this.city = data.city || '';
      this.district = data.district || '';
      this.category = data.category || null;
      this.retailer_agreement_expiry_date = (data.retailer_agreement_expiry_date) ? new Date(data.retailer_agreement_expiry_date) : null;
      // this.avatar = data.avatar || '';

      this.contact_person = data.contact_person || '';
      this.contact_no = data.contact_no || '';
      this.email = data.email || '';
      
      this.site_bank = data.site_bank || '';
      this.site_acc_title = data.site_acc_title || '';
      this.site_acc_no = data.site_acc_no || '';
      this.nearest_depot = data.nearest_depot || '';
      this.distance_of_depot = data.distance_of_depot || '';
      this.territory_id = parseInt(data.territory_id, 10) || 0;
      if (data.Territory) {
        this.territory_id = parseInt(data.Territory.id, 10) || 0;
      }
      this.dealer = (data.Dealer) ?  new Dealer(data.Dealer) :  new Dealer();
      this.products = [];
      data.Products.forEach((product) => {
        this.products.push(new Product(product));
      });

      this.nfr = [];
      data.Facillities.forEach((facility) => {
        if (facility.type == 'NFR')
          this.nfr.push(new Facility(facility));
      });

      this.facilities = [];
      data.Facillities.forEach((facility) => {
        if (facility.type == 'AFD')
          this.facilities.push(new Facility(facility));
      });

      this.dispensers = [];
     data.Dispensers.forEach((dispenser) => {
     this.dispensers.push(new Dispensers(dispenser));
      });

      this.tanks = [];
     data.Tanks.forEach((tanks) => {
     this.tanks.push(new Tanks(tanks));
      });

      // this.created_at = data.created_at || '';
      // this.updated_at = data.updated_at || '';
      // this.deleted_at = data.deleted_at || '';

    } else {
      this.name = '';
      this.sap_id = '';
      this.cp_volume = '';
      this.financial_status = null;
      this.ntn_no = '';
      this.strn_no = '';
      this.address = '';
      this.lat = null;
      this.lng = null;
      this.last_visited_at = '';
      this.land_size = '';
      this.land_owner = '';
      this.lease_expiry = null;
      // this.avatar = '';

      this.contact_person = '';
      this.contact_no = '';
      this.email = '';
      this.city = '';
      this.district = '';
      this.retailer_agreement_expiry_date = null;
      this.category = null;
      
      this.site_bank = '';
      this.site_acc_title = '';
      this.site_acc_no = '';
      this.nearest_depot = '';
      this.distance_of_depot = '';
      this.territory_id = 0;
      this.dealer = new Dealer();
      this.products = [];
      this.facilities = [];
      this.nfr = [];

    }
  }
}
