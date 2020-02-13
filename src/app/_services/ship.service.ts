import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {APIConstants} from '../shared/config/api-constant';

@Injectable()
export class ShipService {

  private API: any;
  private currentUser: any;
  private text;
  private accessToken;

  constructor(private http: HttpClient, private APIConfig: APIConstants) {
    this.API = APIConfig.get();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.accessToken = `Bearer ${this.currentUser.AccessToken}`;
  }


  getShips(user_id: string) {
    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: user_id ? new HttpParams().set('id', user_id) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.GET_SHIPS, "UserId="+ user_id), httpOptions)
      .pipe((data: any) => {
        if (data) {
          return data;
        }
        return data;
      });
  }

  getShipDetails(SONo: string) {
    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: user_id ? new HttpParams().set('id', user_id) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.GET_SHIP_SONO, "SONo="+ SONo), httpOptions)
      .pipe((data: any) => {
        if (data) {
          return data;
        }
        return data;
      });
  }

  createReceive(Purchase: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.post<any>(this.APIConfig.getUrl(this.API.POST_RECEIVES), Purchase, httpOptions)
      .pipe(catchError(this.handleError));
  }

  AllocateDetail(AllocateDetail: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.post<any>(this.APIConfig.getUrl(this.API.POST_ALLOCATION), AllocateDetail, httpOptions)
      .pipe(catchError(this.handleError));
  }

  DeletePurchaseDetail(PurchaseDetailID: any,PurchaseId:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.delete<any>(this.APIConfig.getUrl2(this.API.DELETE_ORDERDETAIL,"PurchaseDetailId="+ PurchaseDetailID, "PurchaseId=" + PurchaseId), httpOptions)
      .pipe(catchError(this.handleError));
  }

  GetAllocationDetail(ProductID: any,WarehouseId:any, BatchNo:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.get<any>(this.APIConfig.getUrl4(this.API.GET_ALLOCATION_DETAIL,"ProductId="+ ProductID, "WarehouseId=" + WarehouseId,"BatchNo=" + BatchNo), httpOptions)
      .pipe(catchError(this.handleError));
  }

  EditPurchaseDetail(PurchaseDetail: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.put<any>(this.APIConfig.getUrl(this.API.EDIT_DETAILS_ORDERDETAIL), PurchaseDetail, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // UpdatePurchaseStatus(StatusID:any, PurchaseId: any): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Authorization': this.accessToken
  //     })
  //   };
  //   return this.http.post<any>(this.APIConfig.getUrl2(this.API.SUBMIT_PURCHASE, "StatusId=" + StatusID, "PurchaseId=" + PurchaseId), httpOptions)
  //     .pipe(catchError(this.handleError));
  // }

  UpdatePurchaseStatus(StatusId : any, PurchaseId:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.post<any>(this.APIConfig.getUrl2(this.API.SUBMIT_PURCHASE, "StatusId=" + StatusId, "PurchaseId=" + PurchaseId),{}, httpOptions)
      .pipe(catchError(this.handleError));
  }

  DeleteASN(PurchaseId:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.delete<any>(this.APIConfig.getUrl(this.API.DELETE_ASN,"Id=" + PurchaseId), httpOptions)
      .pipe(catchError(this.handleError));
  }

  getASNHeader(Purchase_Id: string) {
    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: user_id ? new HttpParams().set('id', user_id) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.GET_ASN_HEADER, "PurchaseId="+ Purchase_Id), httpOptions)
      .pipe((data: any) => {
        if (data) {
          return data;
        }
        return data;
      });
  }

  editASNHeader(PurchaseId:any,Purchase:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.put<any>(this.APIConfig.getUrl(this.API.EDIT_ASN_HEADER,"Id=" + PurchaseId),Purchase, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getASNDetail(Purchase_Id: string) {
    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: user_id ? new HttpParams().set('id', user_id) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.PURCASE_DETAIL_BYPURCHASEID, "PurchaseId="+ Purchase_Id), httpOptions)
      .pipe((data: any) => {
        if (data) {
          return data;
        }
        return data;
      });
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
