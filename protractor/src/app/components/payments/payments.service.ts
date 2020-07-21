import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  endpoint,
  requestURL,
  headers
} from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CreditDetail } from '../credit-detail/credit-detail.model';
import { PaymentStatus, ProcessPayment, CreditToPay, DetailCalculateCredit, InfoPayment } from './payments.model';
import { getItemSessionCustomer } from 'src/app/shared/util/web-config';
import { name } from 'src/app/shared/util/name-storage';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  endpoint = endpoint.credinet;
  constructor(private http: HttpClient) { }

  getInfoCustomer(email): Observable<any> {
    const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`})
    const params = new HttpParams().set('email', email);
    return this.http.get<any>(`${this.endpoint}${requestURL.getInfoCustomer}`, { headers: newHeaders });
  }

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

  getPaymentStatus(creditInfo): Observable<PaymentStatus> {
    const params = new HttpParams()
      .set('creditId', creditInfo.idCredit)
      .set('idDocument', creditInfo.idDocument)
      .set('typeDocument', creditInfo.typeDocument);
    return this.http.get<PaymentStatus>(`${this.endpoint}${requestURL.getPaymentStatus}`, { headers, params });
  }

  postPaymentProcess(creditToPay: CreditToPay): Observable<ProcessPayment> {
    return this.http.post<ProcessPayment>(`${this.endpoint}${requestURL.postPaymentProcess}`, creditToPay, { headers });
  }

  getInfoPayment(payment): Observable<InfoPayment> {
    const params = new HttpParams()
                    .set('idPayment', payment.idPayment)
    return this.http.get<InfoPayment>(`${this.endpoint}${requestURL.getInfoPayment}`, {headers, params});
  }
}

