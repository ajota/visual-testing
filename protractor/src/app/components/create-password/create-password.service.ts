import { Injectable } from '@angular/core';
import {
  endpoint,
  requestURL,
  headers
} from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestParams, DataResponse } from './create-password.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatePasswordService {
  endpoint = endpoint.credinet;
  url = requestURL.postChangePassword;

  constructor(private _http: HttpClient) { }

  postChangePassword( data: RequestParams ): Observable<DataResponse> {
    return this._http.post<DataResponse>(this.endpoint + this.url, data, {headers});
  }

}
