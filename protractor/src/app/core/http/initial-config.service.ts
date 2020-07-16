import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoint, requestURL, headers } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GetConfigBase } from '../models/config-base';
import { ConfigByLang } from '../models/config-by-lang';

@Injectable({
  providedIn: 'root'
})
export class InitialConfigService {

  endpoint = endpoint.credinet;
  configBase = requestURL.getBaseConfig;
  configByLang = requestURL.getConfigByLang;

  constructor( private http: HttpClient ) {}

  getConfigBase(): Observable<GetConfigBase> {
    return this.http.get<any>(this.endpoint + this.configBase, { headers});
  }

  getConfigByLang(lang): Observable<ConfigByLang> {
    return this.http.get<ConfigByLang>(`${this.endpoint}${this.configByLang}lang=${lang}`, {headers});
  }

}
