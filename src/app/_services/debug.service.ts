import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable()
export class DebugService {

  private base_url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private getUrl(url: string) {
    return this.base_url + url;
  }

  debug() {

  }
}
