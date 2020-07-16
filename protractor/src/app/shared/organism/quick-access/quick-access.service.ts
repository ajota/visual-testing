import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpoint, headers } from 'src/environments/environment';
import { requestURL } from 'src/environments/environment.prod';
import { Customer, CustomerInformation, NidData, DataCustomer} from './quick-access.model';
import { getItemSessionCustomer, saveSessionCustomer } from '../../util/web-config';
import { name } from '../../util/name-storage';

@Injectable({
  providedIn: 'root'
})
export class QuickAccessService {
  endpoint = endpoint.credinet;

  constructor(private http: HttpClient) {}

  getCustomerInformation(): Observable<Customer> {
    const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`})
    const service = requestURL.getInfoCustomer;
    const email = getItemSessionCustomer(name.customer, 'email' );
    const params = new HttpParams().set('email', email );
    return this.http.get<Customer>(this.endpoint + service, { headers: newHeaders});
  }
}
