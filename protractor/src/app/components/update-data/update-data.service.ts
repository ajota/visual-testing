import { Injectable } from '@angular/core';
import { endpoint, requestURL, headers } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataCustomer, CustomerInformation, ResponseData } from './update-data.model';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/shared/organism/user-status/user-status.model';
import { getItemSessionCustomer } from 'src/app/shared/util/web-config';
import { name } from 'src/app/shared/util/name-storage';

@Injectable({
  providedIn: 'root'
})
export class UpdateDataService {

  endpoint = endpoint.credinet;
  constructor( private http: HttpClient ) { }

  getCustomerInformation( document, typeDocument, email: string ): Observable<CustomerInformation> {
    const service = requestURL.getCustomerByIdDocumentAndTypeDocument;
    const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`});
    const params = new HttpParams()
      .set('idDocument', document)
      .set('typeDocument', typeDocument)
      .set('email', email);
    return this.http.get<CustomerInformation>(this.endpoint + service, {headers: newHeaders, params});
  }

  sendToken(document, typeDocument,  typeValidation): Observable<CustomerInformation>  {
    const service = requestURL.getAuthorizationToken;
    const params = new HttpParams()
      .set('idDocument', document)
      .set('typeDocument', typeDocument)
      .set('updateField', typeValidation);
    return this.http.get<CustomerInformation>( this.endpoint + service, {headers, params});
  }

  getUniqueEmailValidation( document, typeDocument, email: string ): Observable<ResponseData> {
    const service = requestURL.getUniqueEmailValidation;
    const params = new HttpParams()
      .set('idDocument', document)
      .set('typeDocument', typeDocument)
      .set('email', email);
    return this.http.get<ResponseData>(this.endpoint + service, {headers, params});
  }

  getUniqueMobileValidation( document, typeDocument, mobileNumber: string ): Observable<ResponseData> {
    const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`});
    const service = requestURL.getValidateUniqueMobileNumber;
    const params = new HttpParams()
    .set('mobileNumber', mobileNumber)
    .set('idDocument', document)
    .set('typeDocument', typeDocument);
    return this.http.get<ResponseData>(this.endpoint + service, {headers: newHeaders, params});
  }
}
