import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { headers, endpoint, requestURL } from 'src/environments/environment';
import { getItemSessionCustomer } from '../../util/web-config';
import { name } from 'src/app/shared/util/name-storage';
import { Customer } from './user-status.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserStatusService {
  endpoint = endpoint.credinet;
  constructor(private http: HttpClient) { }

  
  getInfoCustomer( email ): Observable<Customer> {
    const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`})
    const params = new HttpParams().set('email', email );
    return this.http.get<Customer>(`${this.endpoint}${requestURL.getInfoCustomer}`, {headers: newHeaders});
  }
}
