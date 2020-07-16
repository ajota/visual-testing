import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NidData, CustomerInformation } from './identity-validation.model';
import { Observable } from 'rxjs';
import { endpoint, headers } from 'src/environments/environment';
import { requestURL } from 'src/environments/environment.prod';
import { getItemSessionCustomer } from 'src/app/shared/util/web-config';
import { name } from 'src/app/shared/util/name-storage';

@Injectable({
  providedIn: 'root'
})
export class IdentityValidationService {

  endpoint = endpoint.credinet;

  constructor( private http: HttpClient ) { }

  getCustomerInformation( documentData: NidData, email: string ): Observable<CustomerInformation> {
    const service = requestURL.getCustomerByIdDocumentAndTypeDocument;
    const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`});
    const params = new HttpParams()
      .set('idDocument', documentData.verify_nid)
      .set('typeDocument', documentData.nid_type)
      .set('email', email);
    return this.http.get<CustomerInformation>(this.endpoint + service, {headers: newHeaders, params});
  }

  sendToken(documentData,  typeValidation): Observable<CustomerInformation>  {
    const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`});
    const service = requestURL.postSendToken;
    const request = {
      idDocument: documentData.verify_nid,
      typeDocument: documentData.nid_type,
      typeToken: typeValidation
    };
    return this.http.post<CustomerInformation>( this.endpoint + service, request, {headers: newHeaders});
  }
}
