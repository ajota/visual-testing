import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  endpoint,
  requestURL,
  headers
} from '../../../environments/environment';
import { UserLogin, CustomerValid, SessionNotification, ExternalLogin, UserLoginResp } from './user-login.model';
import { Observable } from 'rxjs';
import { getItemSessionCustomer } from '../util/web-config';
import { name } from 'src/app/shared/util/name-storage';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  redirectUrl: string;
  // userLogin: any;

  endpoint = endpoint.credinet;
  url = requestURL.postLoginUser;
  urlValidate = requestURL.postValidDocumentByEmail;
  jwt = new JwtHelperService();

  count = 0;
  sessionMessage: AngularFireObject<SessionNotification>;

  constructor(
    private _http: HttpClient,
    private firebaseDb: AngularFireDatabase,
  ) {}

  get isLoggedIn(): boolean {
    const user = getItemSessionCustomer(name.customer, 'token');
    const cond =  user && user !== '' ;
    return cond ? true : false ;
  }

  getSessionData() {
    const token = getItemSessionCustomer( name.customer, 'token');
    return this.jwt.decodeToken( token );
  }

  getSessionNotification( sessionId: string ): AngularFireObject<SessionNotification> {
    return this.firebaseDb.object<SessionNotification>(`sessions/${sessionId}`);
  }

  setInteractionNotificationUser( sessionId: string ): Observable<SessionNotification> {
    this.sessionMessage = this.getSessionNotification( sessionId );
    return this.sessionMessage.valueChanges();
  }

  updateInteractionUserSession(  ) {
    this.sessionMessage.update({count: this.count});
    this.count = ( !this.count ) ? 1 : 0 ;
    return true;
  }

  postLogin(data: UserLogin | ExternalLogin ): Observable<UserLoginResp> {
    return this._http.post<UserLoginResp>(this.endpoint + this.url, data, {
      headers
    });
  }

  postValidDocumentByEmail(data: any): Observable<any> {
    const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`});
    const request: CustomerValid = {email: data};
    return this._http.post<any>(this.endpoint + this.urlValidate, request, {
      headers: newHeaders
    });
  }

  deleteUserSession( manual = false) {
    sessionStorage.removeItem(name.customer);
    sessionStorage.removeItem(name.moreCustomer);
    this.sessionMessage.remove();
    this.sessionMessage = null;
    return true;
  }

    getInfoCustomer( email ): Observable<any> {
    const newHeaders = Object.assign({}, {...headers, Authorization: `bearer ${getItemSessionCustomer(name.customer, 'token')}`})
    const params = new HttpParams().set('email', email );
    return this._http.get<any>(`${this.endpoint}${requestURL.getInfoCustomer}`, {headers: newHeaders});
  }

}
