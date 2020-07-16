import { Injectable } from '@angular/core';
import {
  endpoint,
  requestURL,
  headers
} from '../../../environments/environment';
import { DetailCredit } from './credit-history.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getItemSessionCustomer } from 'src/app/shared/util/web-config';
import { name } from 'src/app/shared/util/name-storage';


@Injectable({
  providedIn: 'root'
})
export class CreditHistoryService {


  endpoint = endpoint.credinet;

  constructor(private http: HttpClient) {}

  getDetailCredit(idCredit): Observable<DetailCredit> {
    const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`});
    const params = new HttpParams().set('idCredit', idCredit);
    return this.http.get<DetailCredit>(
      `${this.endpoint}${requestURL.getDetailCredit}`,
      { headers: newHeaders, params }
    );
  }

  postCreditReciept( recieptId ) {
    return this.http.post<any>(
      `${this.endpoint}${requestURL.postCreditReciept}?reprint=false`,
      [ recieptId ],
      { headers }
    ).pipe(
      map( resp => ( resp.data && resp.data[0] ) ? resp.data[0] : '' )
    );
  }
}
