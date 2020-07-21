import { Injectable } from '@angular/core';
import {
  endpoint,
  requestURL,
  headers
} from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetCustomerParams, Message, Cities } from './chatbot.model';
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from '@angular/fire/database';
import { PassDataService } from 'src/app/shared/util/pass-data.service';
import { getItemSessionCustomer } from '../../util/web-config';
import { name } from '../../util/name-storage';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  endpoint = endpoint.credinet;
  urls = {
    getCustomerParams: requestURL.getCustomerParams,
    getRequestById: requestURL.getRequestByIdDocument,
    postSavePhoto: requestURL.postSavePhotoChat,
    getResendQuestion : requestURL.getResendQuestion,
    getCities: requestURL.getCities
  };

  chat: AngularFireObject<any>;
  message: AngularFireList<any>;

  constructor(
    private _http: HttpClient,
    private db: AngularFireDatabase,
    private passDataService: PassDataService
  ) {}

  getCustomerParams(): Observable<GetCustomerParams> {
    return this._http.get<GetCustomerParams>(
      this.endpoint + this.urls.getCustomerParams,
      { headers }
    );
  }

  // DataCustomerParams
  getRequestByIdDocument(data: any): Observable<any> {
    let nid = getItemSessionCustomer(name.customer, 'verify_nid');
    const email = getItemSessionCustomer(name.customer, 'email');
    let typeDocument = getItemSessionCustomer(name.customer, 'nid_type');
    if(nid == '' || typeDocument === ''){
      nid = getItemSessionCustomer(name.customer, 'document');
      typeDocument = getItemSessionCustomer(name.customer, 'typeDocument');
    }
    // const location = getSessionLocalStorage(name.coordenates);
    const location = this.passDataService.getData('location');
    const params = new HttpParams()
      .set('idDocument', nid)
      .set('levelConfigName', data.defaultLevelConfigName)
      .set('lang', 'es')
      .set('country', 'co')
      .set('SCLocation', location)
      .set('storeId', data.defaultStore)
      .set('typeDocument', typeDocument)
      .set('scStoreId', data.defaultScStoreId)
      .set('email', email);
    return this._http.get<any>(this.endpoint + this.urls.getRequestById, {
      headers,
      params
    });
  }

  getFirebaseMessages(idRequest: string): Observable<Message[]> {
    this.message = this.db.list(`chats/${idRequest}/messages`);
    return this.message.valueChanges();
  }

  getFirebaseStatus(idStore: string, idRequest: string): Observable<number> {
    return this.db
      .object<number>(`stores/${idStore}/${idRequest}/status`)
      .valueChanges();
  }

  sendFirebaseMessage(msg: Message) {
    this.message.push(msg);
  }

  postSavePhoto(body): Observable<any> {
    return this._http.post<any>(this.endpoint + this.urls.postSavePhoto, body, {headers});
  }

  getResendQuestion(idRequest, nameQuestion, idStore, pos = null): Observable<any> {
    let data;
    if (pos === undefined || pos === null) {
       data = {fromObject: {idRequest, nameQuestion, idStore}};
    } else {
       data = {fromObject: {idRequest, nameQuestion, idStore, position: pos }};
    }

    const params = new HttpParams(data);
    return this._http.get<any>(`${this.endpoint}${this.urls.getResendQuestion}`, {headers, params});
  }

  getCities(): Observable<Cities> {
    return this._http.get<Cities>(`${this.endpoint}${this.urls.getCities}`, {headers});
  }
}
