import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { endpoint,
  requestURL,
  headers
} from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CreditsQuickPayment, CreditToPay, ProcessPayment, InfoPayment } from './quick-paymnet.model';
import { getItemSessionCustomer } from 'src/app/shared/util/web-config';
import { name } from 'src/app/shared/util/name-storage';

@Injectable({
  providedIn: 'root'
})
export class QuickPaymentService {

  endpoint = endpoint.credinet;

  constructor(private _http: HttpClient) { }

  getActiveCredits(user): Observable<CreditsQuickPayment> {
    const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`});
    const params = new HttpParams()
                    .set('idDocument', user.document)
                    .set('typeDocument', user.typeDocument);

    return this._http.get<CreditsQuickPayment>(`${this.endpoint}${requestURL.getActiveCreditsQuickPayment}`,
    {headers: newHeaders, params});
  }


  postPaymentProcess(creditToPay: CreditToPay): Observable<ProcessPayment> {
    return this._http.post<ProcessPayment>(`${this.endpoint}${requestURL.postPaymentProcess}`, creditToPay, { headers });
  }

  getInfoPayment(payment): Observable<InfoPayment> {
    const params = new HttpParams()
                    .set('idPayment', payment.idPayment);
    return this._http.get<InfoPayment>(`${this.endpoint}${requestURL.getInfoPayment}`, {headers, params});
  }

}
