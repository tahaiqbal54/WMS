import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {APIConstants} from "../shared/config/api-constant";

@Injectable()
export class AuthenticationService {

  private API: any;

  constructor(private http: HttpClient, private APIConfig: APIConstants) {
    this.API = APIConfig.get();
  }

  private getUrl(endpoint: string, params: string[] = []) {
    return this.API.BASE_URL + endpoint + ((params.length > 0) ? '/' + params.join('/') : '');
  }

  login(username: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const body = new HttpParams()
      .set('userlogin', username)
      .set('password', password);
      console.log(username,password);
    return this.http.post<any>(this.getUrl(this.API.AUTHENTICATE), body.toString(), httpOptions)
      .pipe(map((user: any) => {
        //login successful if there's a jwt token in the response
        if (user) {
          // store user details and token in local storage to keep user logged in between page refreshes.
          localStorage.removeItem('currentUser');
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        }
        //console.log(user);
        //return user;
      }))
      .pipe(catchError(this.handleError));
  }
 
  forgetpass(user:any){
    return this.http.post<any>(this.APIConfig.getUrl(this.API.FORGET_PASSWORD), user)
      .pipe(catchError(this.handleError));
  }

  refreshToken(refresh_token: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.API.BEARER_TOKEN
      })
    };

    const body = new HttpParams()
      .set('refresh_token', refresh_token);

    return this.http.post<any>(this.getUrl(this.API.REFRESH_TOKEN), body.toString(), httpOptions)
      .pipe(map((user: any) => {
        // login successful if there's a jwt token in the response
        if (user && user.success) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes.
          console.log(user);
          // localStorage.removeItem('currentUser');
          localStorage.setItem('currentUser', JSON.stringify(user.user));
        }

        return user.user;
      }))
      .pipe(catchError(this.handleError));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.clear();
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
    console.log(err);
    // return an observable with a user-facing error message
    // return throwError('Something bad happened; please try again later.');
    return throwError(err);
  }
}
