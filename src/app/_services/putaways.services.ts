import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {APIConstants} from '../shared/config/api-constant';

@Injectable()
export class PutAwayService {

  private API: any;
  private currentUser: any;
  private text;
  private accessToken;

  constructor(private http: HttpClient, private APIConfig: APIConstants) {
    this.API = APIConfig.get();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.accessToken = `Bearer ${this.currentUser.AccessToken}`;
  }


  getPutaway(user_id: any) {

    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.RECEIVING_LIST, "UserId=" + user_id), httpOptions)
      .pipe(
        map((data: any) => {
          if (data) {
            return data;
          }
          return data;
        })
      );
  }

  getPutawayDetail(Purchase_id: any) {

    // Add safe, URL encoded search parameter if there is a search term
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      }),
      // params: offset ? new HttpParams().set('offset', offset.toString()) : {}
    };

    return this.http
      .get(this.APIConfig.getUrl(this.API.PUTAWAY_DETAIL, "PurchaseId=" + Purchase_id), httpOptions)
      .pipe(
        map((data: any) => {
          if (data) {
            return data;
          }
          return data;
        })
      );
  }

  PutawayPost(Putaway: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.accessToken
      })
    };
    return this.http.post<any>(this.APIConfig.getUrl(this.API.POST_PUTAWAY), Putaway, httpOptions)
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
