import { Injectable } from '@angular/core';
import { endpoint, requestURL, headers } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../shared/organism/user-status/user-status.model';
import { getItemSessionCustomer } from 'src/app/shared/util/web-config';
import { name } from 'src/app/shared/util/name-storage';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  endpoint = endpoint.credinet;

  constructor(private http: HttpClient) { }

  getInfoCustomer( email ): Observable<Customer> {
    const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`})
    const params = new HttpParams().set('email', email );
    return this.http.get<Customer>(`${this.endpoint}${requestURL.getInfoCustomer}`, {headers: newHeaders});
  }
}
