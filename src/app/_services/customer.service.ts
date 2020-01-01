import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {APIConstants} from '../shared/config/api-constant';

@Injectable()
export class CustomerService {

  private API: any;
  private currentUser: any;
  private accessToken;

  constructor(private http: HttpClient, private APIConfig: APIConstants) {
    this.API = APIConfig.get();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.accessToken = `Bearer ${this.currentUser.AccessToken}`;
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



  getCountry() {
    // user_id = user_id.trim();
    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.GET_COUNTRY), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  getCity(country_Id:string) {
    // user_id = user_id.trim();
    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.GET_CITY, "CountryId="+ country_Id), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  getCustomers(offset: string = null) {
    // user_id = user_id.trim();
    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.LIST_CUSTOMERS), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  getCustomer(customerId: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: user_id ? new HttpParams().set('id', user_id) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.LIST_CUSTOMERS, +"id="+customerId), httpOptions)
      .pipe((data: any) => {
        if (data.success) {
          return data.data;
        }
        return data;
      });
  }

  createCustomer(customer: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.post<any>(this.APIConfig.getUrl(this.API.POST_CUSTOMER), customer, httpOptions)
      .pipe(catchError(this.handleError));
  }

  editCustomer(customer: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.put<any>(this.APIConfig.getUrl(this.API.LIST_CUSTOMERS), customer, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getPacks(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.get<any>(this.APIConfig.getUrl(this.API.LIST_PACKS), httpOptions)
      .pipe(catchError(this.handleError));
  }


  getLocation(locationType: any,warehouseId:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.get(this.APIConfig.getUrl(this.API.QC_LIST_LOCATIONS+ locationType,'WarehouseId=' + warehouseId), httpOptions)
      .pipe(catchError(this.handleError));
  }

  getCustomerType(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.get<any>(this.APIConfig.getUrl(this.API.CUSTOMER_TYPE), httpOptions)
      .pipe(catchError(this.handleError));
  }

  getCustomerStrategies(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.get(this.APIConfig.getUrl(this.API.LIST_STRATEGIES), httpOptions)
      .pipe(catchError(this.handleError));
  }
  //Customers/CustomerStrategies





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
