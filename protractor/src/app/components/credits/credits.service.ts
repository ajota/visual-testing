import { Injectable } from '@angular/core';
import { endpoint, requestURL, headers } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Customer, CustomerCredits, CustomerHistoryCredits } from './credits.model';
import { Observable } from 'rxjs';
import { getItemSessionCustomer } from 'src/app/shared/util/web-config';
import { name } from 'src/app/shared/util/name-storage';


@Injectable({
  providedIn: 'root'
})
export class CreditsService {
  endpoint = endpoint.credinet;

  constructor(private http: HttpClient) { }

  getInfoCustomer( email ): Observable<Customer> {
    const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`})
    //TODO: que hace esta haciendo params ahi? por que se quito de la peticion! esto esta dañando las pruebas unitarias.
    const params = new HttpParams().set('email', email );
    return this.http.get<Customer>(`${this.endpoint}${requestURL.getInfoCustomer}`, {headers: newHeaders});
  }

  getActiveCredits(idCustomer: string): Observable<CustomerCredits> {
    const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`});
    const params = new HttpParams().set('idCustomer', idCustomer )
    return this.http.get<CustomerCredits>(`${this.endpoint}${requestURL.getActiveCredits}`, {headers: newHeaders, params});
  }

  getHistoryCredits(idCustomer: string): Observable<CustomerHistoryCredits> {
    const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`});
    const params = new HttpParams().set('idCustomer', idCustomer );
    return this.http.get<CustomerHistoryCredits>(`${this.endpoint}${requestURL.getHistoryCredits}`, {headers: newHeaders, params});
  }
}
