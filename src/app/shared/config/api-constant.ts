import {Injectable} from '@angular/core';

@Injectable()
export class APIConstants {

  private apiConfig: any;

  constructor() {
    this.apiConfig = {
      env: 'local',
      local: {
        BASE_URL: 'http://18.138.159.111:7001/api',
        //BEARER_TOKEN: 'bearer e33c884571755fe2ffbe2fc09219b8454dc3f13c'
      },
      development: {
        BASE_URL: 'http://192.168.100.8:3000/byco',
        // BASE_URL: 'http://53b856a9.ngrok.io/byco',
        BEARER_TOKEN: 'bearer e33c884571755fe2ffbe2fc09219b8454dc3f13c'
      },
      production: {
        BASE_URL: 'http://13.229.236.204:3000/byco',
        BEARER_TOKEN: 'bearer e33c884571755fe2ffbe2fc09219b8454dc3f13c'
      },
      QA: {
        BASE_URL: 'http://3.0.4.208:3005/byco',
        BEARER_TOKEN: 'bearer e33c884571755fe2ffbe2fc09219b8454dc3f13c'
      },
      stagging: {
        BASE_URL: 'http://3.0.4.208:3006/byco',
        BEARER_TOKEN: 'bearer e33c884571755fe2ffbe2fc09219b8454dc3f13c'
      },
      endpoints: {
        AUTHENTICATE: '/login',
        REFRESH_TOKEN: '/oauth/refresh',
        GET_Purchase: '/users',
        LIST_ORDERS: '/Purchases/GetPurchases',
        SAVE_PURCHASE: '/Purchases',
        EDIT_USER: '/users',
        GET_WAREHOUSES: '/Warehouses/GetWarehouseByCustomerId',
        GET_CUSTOMER: '/Customers/GetCustomerByUserId',
        GET_VENDOR: '/Customers/GetVendorByCustomerID',
        GET_PRODUCT: '/Products/CustomerProducts',
        CREATE_DETAILS: '/Purchases/PostPurchaseDetail',
        DELETE_ORDERDETAIL: '/Purchases/DeletePurchaseDetail',
        EDIT_DETAIL_ORDERDETAIL: '/Purchases/GetPurchaseDetailByASNNOandDetailId',
        EDIT_DETAILS_ORDERDETAIL: '/Purchases/PutPurchaseDetail',
        SUBMIT_PURCHASE: '/Purchases/UpdateASNStatus',
        DELETE_ASN: '/Purchases',
        GET_ASN_HEADER: '/Purchases/GetPurchasesFromPurchaseId',
        EDIT_ASN_HEADER:'/Purchases',
        PURCASE_DETAIL_BYPURCHASEID:'/Purchases/GetPurchaseDetailByPurchaseId',
        RECIEVING_LIST:'/Receives/ASNOrdersByUserId',
        RECEIVE_ASN_DETAIL:'/Receives/PurchaseOrderDetailByPurchaseId',
        POST_RECEIVES:'/Receives',
        RECEIVING_LIST:'/PutAways/ReceivingData',
        PUTAWAY_DETAIL:'/PutAways/ReceivingDataFromPurchaseId',
        POST_PUTAWAY:'/PutAways',
        GET_COUNTRY:'/Cities/GetCountry',
        GET_CITY:'/Cities/GetCityByCountryId',
        LIST_SITES:'/Sites',
        POST_SITE:'/Sites',
        GET_SITE:'/Sites',
        GET_SITE_BY_CITY:'/Sites/GetSitesByCityId',
        LIST_WAREHOUSE:'/Warehouses',
        LIST_LOCATION: '/Locations',
        LIST_LOCATION_TYPE: '/Locations/GetLocationType',
        SALES:'/sales_receipts',
        RECONCILIATION:'/stock_reconciliation',
        GET_APPROVALS: '/list_pending_revisions',
        GET_APPROVAL: '/retail_outlet_revisions',
        APPROVAL: '/provision_outlet_revision',
        GET_PLAN: '/cpc/get_plan',
        ADD_EVENT: '/cpc/add_event',
        DELETE_EVENT: '/cpc/delete_event',
        APPROVE_CPC: '/cpc/send_for_approval',
        GET_CPC_APPROVAL: '/cpc/list_approvals',
        CPC_APPROVAL:'/cpc/get_approval',
        REVIEW_PLAN:'/cpc/review_plan',
        TRADE_AREA: '/trade_area',
        REGIONAL_SALES: '/get_regional_sales',
        PRODUCT_SALES: '/get_product_sales',
        INSPECTION_NO: '/get_inspections_count',
        CPC:'/get_cpc_actual_vs_planned',
        GET_TM:'/get_top_tms',
        TOP_STATIONS:'/get_top_stations',
        DORMANT_SITES:'/get_dormant_sites',
        ZERO_SALE:'/get_zero_sale_sites',
        VARIANCE:'/get_positive_variance_sites',
        BEHIND_CP:'/get_behind_cp_volume_sites',
        INSPECTION_RESOLVER:'/get_outlets_for_inspection_approval',
        INSPECTION_RESOLVER_VIEW:'/pending_inspection_items',
        RESOLVED: '/update_inspection_item_status',
        CPC_SUMMARY:'/cpc/get_cpc_summary',
        INSPECTION_STATION:'/getInspectionsStation',
        RECON_STATION:'/get_reconciliation_stations',
        STATION_PERCENT:'/list_regions_percent'
      }
    };
  }

  get(env: string = this.apiConfig.env) {
    return {...this.apiConfig[env], ...this.apiConfig.endpoints};
  }

  getUrl(endpoint: string, params: string = '') {
    return this.apiConfig[this.apiConfig.env].BASE_URL + endpoint + '?' + params;
  }

  getUrl2(endpoint: string, params1: string = '', params2: string = '') {
    return this.apiConfig[this.apiConfig.env].BASE_URL + endpoint + '?' + params1 + '&' + params2;
  }

}
