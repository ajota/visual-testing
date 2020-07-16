import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  endpoint,
  requestURL,
  headers
} from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CreditDetail, DetailCalculateCredit, StatusCertificate, CreditToPay, ProcessPayment } from './credit-detail.model';
import { map } from 'rxjs/operators';
import { getItemSessionCustomer } from 'src/app/shared/util/web-config';
import { name } from 'src/app/shared/util/name-storage';

@Injectable({
  providedIn: 'root'
})
export class CreditDetailService {
  endpoint = endpoint.credinet;

  constructor(private http: HttpClient) {}

  getDetailCredit(idCredit): Observable<CreditDetail> {
    const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`});
    const params = new HttpParams().set('idCredit', idCredit);
    return this.http.get<CreditDetail>(
      `${this.endpoint}${requestURL.getDetailCredit}`,
      { headers: newHeaders, params }
    );
  }

  getDetailCalculateCreditCustomer(idCredit): Observable<DetailCalculateCredit> {
    const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`});
    const params = new HttpParams().set('idCredit', idCredit);
    return this.http.get<DetailCalculateCredit>(
      `${this.endpoint}${requestURL.getDetailCalculateCreditCustomer}`,
      { headers: newHeaders, params }
    );
  }

  getStatusCertificate(idCredit) {
    const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`});
    const params = new HttpParams().set('creditId', idCredit);
    return this.http.get<StatusCertificate>(`${this.endpoint}${requestURL.getStatusCertificate}`, {headers: newHeaders, params});
  }

  getBlobDocuments( urlDocument ) {
    const headers = {};
    return this.http.get<any>(urlDocument, {headers, responseType: 'arraybuffer' as 'json'});
  }


  getInfoCustomer( email ): Observable<any> {
    const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`})
    const params = new HttpParams().set('email', email );
    return this.http.get<any>(`${this.endpoint}${requestURL.getInfoCustomer}`, {headers: newHeaders});
  }

  getPaymentStatus(data): Observable<any> {
    const params = new HttpParams().set('creditId', data.idCredit)
                .set('idDocument', data.idDocument)
                .set('typeDocument', data.typeDocument)
    return this.http.get<any>(`${this.endpoint}${requestURL.getPaymentStatus}`, { headers, params});
  }

  postPaymentProcess(creditToPay: CreditToPay): Observable<ProcessPayment> {
    return this.http.post<ProcessPayment>(`${this.endpoint}${requestURL.postPaymentProcess}`, creditToPay, {headers});
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
