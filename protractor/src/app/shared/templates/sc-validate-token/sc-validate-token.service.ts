import { Injectable } from '@angular/core';
import { endpoint, requestURL, headers } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreInformation, CustomerInformation, CustomerRequestInformation } from '../../../components/identity-validation/identity-validation.model';
import { TokenValidationData, GenericRequest } from './sc-validate-token.model';
import { getItemSessionCustomer } from '../../util/web-config';
import { name } from '../../util/name-storage';

@Injectable({providedIn: 'root'})

export class ScValidateTokenService {

  endpoint = endpoint.credinet;
  dataUpdate: string;

  constructor( private http: HttpClient ) { }

  getStoreParams(): Observable<StoreInformation> {
    const service = requestURL.getCustomerParams;

    return this.http.get<StoreInformation>( this.endpoint + service, { headers } );
  }

  validateToken(token, customerData: CustomerInformation): Observable<TokenValidationData>  {
    const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`});
    const service = requestURL.postValidateToken;
    const customer = customerData.data;
    const request = {
      token,
      idDocument: customer.idDocument,
      typeDocument: customer.typeDocument,
      typeToken: customerData.media,
      email: customer.email,
      operation: 'validate'
    };
    return this.http.post<TokenValidationData>( this.endpoint + service, request, {headers: newHeaders});
    }

    sendToken(customerData): Observable<CustomerRequestInformation>  {
      const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`});
      const customer = customerData;
      const service = requestURL.postSendToken;
      const request = {
        idDocument: customer.data.idDocument,
        typeDocument: customer.data.typeDocument,
        typeToken: customerData.media
      };
      return this.http.post<CustomerRequestInformation>( this.endpoint + service, request, {headers: newHeaders});
      }

      updateDataCustomer(customerData,  tokenValue, tokenType, updateValue): Observable<GenericRequest>  {
        let service: string;
        switch (tokenType) {
          case 1:
            service = requestURL.patchChangeEmail;
            this.dataUpdate = 'mail';
            break;
          case 2:
            service = requestURL.patchChangeMobileNumber;
            this.dataUpdate = 'mobileNumber';
            break;
        }
        const request = {
          idDocument: customerData.data.idDocument,
          typeDocument: customerData.data.typeDocument,
          token: tokenValue,
          [this.dataUpdate]: updateValue,
        };
        return this.http.patch<GenericRequest>( this.endpoint + service, request, {headers});
        }

        sendTokenUpdateData(documentData,  typeValidation): Observable<CustomerInformation>  {
          const service = requestURL.getAuthorizationToken;
          const params = new HttpParams()
            .set('idDocument', documentData.data.idDocument)
            .set('typeDocument', documentData.data.typeDocument)
            .set('updateField', typeValidation);
          return this.http.get<CustomerInformation>( this.endpoint + service, {headers, params});
        }
}
