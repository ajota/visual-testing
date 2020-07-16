import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  endpoint,
  requestURL,
  headers
} from '../../../environments/environment';
import { Observable } from 'rxjs';

import { ForgotRecoveryPassword } from './forgot-recovery-password.model';

@Injectable({
  providedIn: 'root'
})

export class ForgotRecoveryPasswordService {
  endpoint = endpoint.credinet;

  constructor(private http: HttpClient) {}

  getForgotRecoveryPassword(email): Observable<any> {
    const params = new HttpParams().set('email', email);

    return this.http.get<ForgotRecoveryPassword>(
      `${this.endpoint}${requestURL.getForgotRecoveryPassword}`,
      { headers, params }
    );
  }
}
