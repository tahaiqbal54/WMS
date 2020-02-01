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
        LOCATION_STATUS: '/Locations/UpdateLocationStatus',
        WAREHOUSE_STATUS: '/Warehouses/UpdateWarehouseStatus',
        SITE_STATUS: '/Sites/UpdateSiteStatus',
        PRODUCT_STATUS: '/Products/UpdateProductStatus',
        CUSTOMER_STATUS: '/Customers/UpdateCustomerStatus',
        SALES:'/sales_receipts',
        LIST_CUSTOMERS:'/Customers',
        CUSTOMER_TYPE:'/Customers/CustomerType',
        POST_CUSTOMER:'/Customers',
        LIST_PACKS:'/Packs/PackKey',
        QC_LIST_LOCATIONS: '/Locations/',
        STAGE_LIST_LOCATIONS: '/Locations/GetStageLocationByWarehouseId',
        LIST_STRATEGIES: '/Customers/CustomerStrategies',
        LIST_PRODUCTS: '/Products',
        LIST_UOM: '/Units/UOM',
        LIST_PACK: '/Packs/PackKey',
        LIST_ABC_CLASSIFICATION: '/Products/ProductClassification',
        LIST_RFDefaultUOM: '/Products/RFDefaultUOM',
        GET_CUSTOMERS: '/Customers/GetCustomerByUserId',
        GET_WAREHOUSE: '/Warehouses/GetWarehouseByUserID',
        GET_PRODUCTS: '/Products/GetProductByUserID', 
        GET_LOCATIONS: '/Locations/GetLocationByUserID',
        GET_LOT: '/InventTransactions/GetLotNoByUserID',
        FETCH_INVENTORY: '/InventTransactions/Fetch'
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

  getUrl3(endpoint: string, params1: string = '', params2: string = '',params3: string = '',params4: string = '',params5: string = '') {
    return this.apiConfig[this.apiConfig.env].BASE_URL + endpoint + '?' + params1 + '&' + params2+ '&' + params3+ '&' + params4+ '&' + params5;
  }

}
