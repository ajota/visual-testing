import { Injectable } from '@angular/core';
import { endpoint, requestURL, headers } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, ValidEmail } from './register-user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {
  endpoint = endpoint.credinet;

  constructor(private http: HttpClient) { }

  postRegisterUser(data: User): Observable<any> {
    const url = requestURL.postRegisterUser;
    return this.http.post<any>(this.endpoint + url, data, {headers});
  }

  postValidEmail( data: ValidEmail ): Observable<any> {
    const url = requestURL.postValidEmail;
    const newHeaders = {'Content-Type': 'application/json', ...headers};
    return this.http.post<any>( this.endpoint + url, JSON.stringify(data), {headers: newHeaders});
  }

}
