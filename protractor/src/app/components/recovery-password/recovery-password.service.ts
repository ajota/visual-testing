import { Injectable } from '@angular/core';
import { endpoint, requestURL, headers } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RecoveryPassword } from './recovery-password.model';

@Injectable({
  providedIn: 'root'
})
export class RecoveryPasswordService {
  endpoint = endpoint.credinet;

  constructor(private _http: HttpClient) { }

  postRecoveryPassword(data: RecoveryPassword): Observable<any> {
    const url = requestURL.postRecoveryPassword;

    return this._http.post<any>(this.endpoint + url, data, {headers});
  }
}
