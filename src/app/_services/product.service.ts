import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {APIConstants} from '../shared/config/api-constant';

@Injectable()
export class ProductService {

  private API: any;
  private currentUser: any;
  private accessToken;

  constructor(private http: HttpClient, private APIConfig: APIConstants) {
    this.API = APIConfig.get();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.accessToken = `Bearer ${this.currentUser.AccessToken}`;
  }

  disabled(product:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.accessToken
      })
    };
    return this.http.put<any>(this.APIConfig.getUrl(this.API.USER_DISABLE), product, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getProducts() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.LIST_PRODUCTS), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }
  getProduct(ProductId:any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.LIST_PRODUCTS,'Id='+ProductId), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  getUOM(){

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.LIST_UOM), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  getPack(){
    //api/Packs/PackKey

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.LIST_PACKS), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );

  }


  getABCClassifications(){


    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.LIST_ABC_CLASSIFICATION), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );

  }

  getRFDefault(){
    ///Products/RFDefaultUOM
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.LIST_RFDefaultUOM), httpOptions)
      .pipe(
        map((data: any) => {
          if (data.success) {
            return data.data;
          }
          return data;
        })
      );
  }

  createProduct(product: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.post<any>(this.APIConfig.getUrl(this.API.LIST_PRODUCTS), product, httpOptions)
      .pipe(catchError(this.handleError));
  }

  editCustomer(customer: any, customer_id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.put<any>(this.APIConfig.getUrl(this.API.LIST_PRODUCTS, "Id=" + customer_id), customer, httpOptions)
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
