import { Injectable } from '@angular/core';
import { endpoint, headers, requestURL } from 'src/environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NidData, CustomerInformation } from './register-credit.model';
import { getItemSessionCustomer } from 'src/app/shared/util/web-config';
import { name } from 'src/app/shared/util/name-storage';

@Injectable({
  providedIn: 'root'
})

export class RegisterRequestService {

  endpoint = endpoint.credinet;
  passDataService: any;

  urls = {
    getCustomerParams: requestURL.getCustomerParams,
    getRequestById: requestURL.getRequestByIdDocument,
    postSavePhoto: requestURL.postSavePhotoChat
  };

  constructor( private http: HttpClient ) { }

  getCustomerInformation( documentData: NidData, email: string ): Observable<CustomerInformation> {
    const service = requestURL.getCustomerByIdDocumentAndTypeDocument;
    const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`});
    const params = new HttpParams()
      .set('idDocument', documentData.verify_nid)
      .set('typeDocument', documentData.nid_type)
      .set('email', email);
    return this.http.get<CustomerInformation>( this.endpoint + service, {headers: newHeaders, params});
  }
}
