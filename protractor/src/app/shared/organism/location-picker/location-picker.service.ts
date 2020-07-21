import { Injectable } from '@angular/core';
import { endpoint, requestURL, headers } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cities, Neighborhoods} from './location-picker.model';

@Injectable({
  providedIn: 'root'
})
export class LocationPickerService {

  endpoint = endpoint.credinet;
  cities = requestURL.getCities;
  neighborhood = requestURL.getNeighborhoods;

  constructor(private _http: HttpClient) { }

  getCities(): Observable<Cities> {
    return this._http.get<Cities>(this.endpoint + this.cities, {headers});
  }

  getNeighborhood(city): Observable<Neighborhoods> {
    return this._http.get<Neighborhoods>(this.endpoint + this.neighborhood + city, {headers});
  }
}
