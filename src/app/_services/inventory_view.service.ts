import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {APIConstants} from '../shared/config/api-constant';

@Injectable()
export class InventoryService {

  private API: any;
  private currentUser: any;
  private accessToken;
  private user_ID: any;

  constructor(private http: HttpClient, private APIConfig: APIConstants) {
    this.API = APIConfig.get();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.accessToken = `Bearer ${this.currentUser.AccessToken}`;
    this.user_ID = this.currentUser.User[0].Id;
  }

  disabled(user:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.accessToken
      })
    };
    return this.http.put<any>(this.APIConfig.getUrl(this.API.USER_DISABLE), user, httpOptions)
      .pipe(catchError(this.handleError));
  }

  forgetpass(user:any){
    return this.http.post<any>(this.APIConfig.getUrl(this.API.FORGET_PASSWORD), user)
      .pipe(catchError(this.handleError));
  }

  getCustomer() {

    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.GET_CUSTOMERS , "UserId=" + this.user_ID), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  getWarehouse() {

    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.GET_WAREHOUSE , "UserId=" + this.user_ID), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  getProducts() {

    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.GET_PRODUCTS , "UserId=" + this.user_ID), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  getLocations() {

    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.GET_LOCATIONS , "UserId=" + this.user_ID), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  getLOT() {

    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.GET_LOT , "UserId=" + this.user_ID), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  getLPN() {
    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.GET_LPN), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  getBatch() {
    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };
    return this.http
      .get(this.APIConfig.getUrl(this.API.GET_BATCH), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  getBatchById(Product_Id: any,Warehouse_Id:any) {

    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };
    console.log(httpOptions);
    return this.http
      .get(this.APIConfig.getUrl2(this.API.GET_BATCH_NO,"ProductId="+ Product_Id,"WarehouseId=" + Warehouse_Id), httpOptions)
      .pipe(
        map((data: any) => {
          if (data) {
            return data;
          }
          return data;
        })
      );
  }

  getReason() {
    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.GET_REASONS), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  getJournal() {

    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.GET_Journal , "UserId=" + this.user_ID), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  getInvebtoryData(WarehouseId:any,CustomerId:any,ProductId:any,LocationId:any,Lot:any) {
    // user_id = user_id.trim();
    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl3(this.API.FETCH_INVENTORY, "WarehouseId="+WarehouseId,"CustomerId=" +CustomerId, "ProductId=" +ProductId, "LocationId=" + LocationId, "LotNo=" + Lot), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  getHoldData(WarehouseId:any,CustomerId:any,ProductId:any,Batch:any,Lot:any,LPN:any) {
    // user_id = user_id.trim();
    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl5(this.API.FETCH_HOLD, "WarehouseId="+WarehouseId,"CustomerId=" +CustomerId, "ProductId=" +ProductId, "BatchNo=" + Batch,"LPNNO=" + LPN, "LotNo=" + Lot), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  getUnHoldData(WarehouseId:any,CustomerId:any,ProductId:any,Batch:any,Lot:any,LPN:any,JournalNo:any) {
    // user_id = user_id.trim();
    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl7(this.API.FETCH_UNHOLD, "WarehouseId="+WarehouseId,"LocationId=" +CustomerId, "ProductId=" +ProductId, "BatchNo=" + Batch,"LPNNO=" + LPN, "LotNo=" + Lot, "JournalNo=" + JournalNo), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  getUnholdDetail(UnholdId:any) {

    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.GET_UNHOLD_DETAIL , "InventoryHoldUnholdId=" + UnholdId), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  getTransactionData(Todate:any,Fromdate:any,WarehouseId:any,CustomerId:any,ProductId:any,LocationId:any,Batch:any,Lot:any,LPN:any) {
    // user_id = user_id.trim();
    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl8(this.API.FETCH_TRANSACTIONS,"FromDate=" + Fromdate,"TillDate=" + Todate, "WarehouseId="+WarehouseId,"CustomerId=" +CustomerId, "ProductId=" +ProductId,"LocationId="+ LocationId, "BatchNo=" + Batch,"LPNNO=" + LPN, "LotNo=" + Lot), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  getUpdateData(WarehouseId:any,CustomerId:any,ProductId:any,LocationId:any,Batch:any,Lot:any,LPN:any) {
    // user_id = user_id.trim();
    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl7(this.API.FETCH_UPDATE, "WarehouseId="+WarehouseId,"CustomerId=" +CustomerId, "ProductId=" +ProductId, "LocationId=" +LocationId, "BatchNo=" + Batch,"LPNNO=" + LPN, "LotNo=" + Lot), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  createUnHold(Id:any,Remarks:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.post<any>(this.APIConfig.getUrl2(this.API.POST_UNHOLD,"InventoryHoldUnholdId=" + Id, "UnholdRemarks=" +Remarks), {}, httpOptions)
      .pipe(catchError(this.handleError));
  }


  createHold(WarehouseId: any, Reason:any, Remarks:any, TransactionId:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.post<any>(this.APIConfig.getUrl6(this.API.POST_HOLD_DATA,"WarehouseId="+WarehouseId,"ReasonId=" +Reason, "HoldRemarks=" +Remarks, "InventTransactionId=" + TransactionId), {}, httpOptions)
      .pipe(catchError(this.handleError));
  }

  createUpdate(Id:any,Remarks:any, Update:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.post<any>(this.APIConfig.getUrl2(this.API.POST_UPDATE,"ReasonId=" + Id, "UpdateRemarks=" +Remarks), Update, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getUsers(offset: string = null) {
    // user_id = user_id.trim();
    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.LIST_USERS, (offset) ? offset : '0'), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  getPurchase(user_id: string) {
    user_id = user_id.trim();
    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: user_id ? new HttpParams().set('id', user_id) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.LIST_ORDERS, user_id), httpOptions)
      .pipe((data: any) => {
        if (data.success) {
          return data.data;
        }
        return data;
      });
  }

  createUser(user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.post<any>(this.APIConfig.getUrl(this.API.CREATE_USER), user, httpOptions)
      .pipe(catchError(this.handleError));
  }

  editUser(user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.put<any>(this.APIConfig.getUrl(this.API.EDIT_USER), user, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let err;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      err = 'An error occurred: ' + error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      err = error;
    }
    // return an observable with a user-facing error message
    // return throwError('Something bad happened; please try again later.');
    return throwError(err);
  }

}
