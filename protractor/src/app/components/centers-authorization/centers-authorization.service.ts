import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { requestURL, endpoint, headers } from 'src/environments/environment';
import { VerifyEmailResponse,
         VerifyEmailRequest,
         ChangePasswordResponse,
         CentersAuthorization,
         CentersAuthorizationResponse,
         CentersAuthorizationTextResponse,
         VerifyAccountRequest} from './centers-authorization.model';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CentersAuthorizationService {

  endpoint = endpoint.credinet;

  constructor( private http: HttpClient) { }

  getAuthorizationCenters( data: CentersAuthorization  ): Observable<CentersAuthorizationResponse> {

    const service = requestURL.postAutorizationCenters;

    return this.http.post<CentersAuthorizationResponse>( this.endpoint + service, data, {headers} );

  }

  getCentersAuthorizationText(): Observable<string> {

    const service = requestURL.getCentersAuthorizationText;

    return this.http.get<CentersAuthorizationTextResponse>( this.endpoint + service, {headers} ).pipe(
      map( item => ( item.data && item.data.textBase[0] ) ? item.data.textBase[0].value : '' )
    );
  }

  postVerifyEmail( data: VerifyEmailRequest  ): Observable<VerifyEmailResponse> {

    const service = requestURL.postVerifyEmail;

    return this.http.post<VerifyEmailResponse>( this.endpoint + service, data, {headers} );

  }

  postChangePassword( data: VerifyAccountRequest  ): Observable<ChangePasswordResponse> {

    const service = requestURL.postChangePassword;

    return this.http.post<ChangePasswordResponse>( this.endpoint + service, data, {headers} );

  }


}
