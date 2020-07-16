import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { LocationPickerService } from './location-picker.service';
import { City } from './location-picker.model';
import { Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss']
})
export class LocationPickerComponent implements OnInit {

  @Output() sendLocation = new EventEmitter();
  listCities: [City];
  listCitiesFound: City[];
  listNeighborhood: [string];
  city = '';
  neigborhood = '';
  location;
  regFieldsExp = {
    Name: this.mapConfigBase.transform(
      'str_regular_expression_name_validation'
    ),
    NotFound: 'Resultado no encontrado'
  };
  isValidResponse = false;

  constructor(
    private locationService: LocationPickerService,
    private mapConfigLang: MapConfigLangPipe,
    private mapConfigBase: MapConfigBasePipe) {}

  ngOnInit() {
    this.locationService.getCities().subscribe(res => {
      this.listCities = res.data.locations;
    });
  }

 SearchCity() {
    return (city$: Observable<string>) => city$.pipe(
      tap(() => this.listCitiesFound = []),
      debounceTime(100),
      distinctUntilChanged(),
      map(target => target.length <= 1 ? [] : this.listCities.filter((city) => {
        let res;
        try {
          res = city.name.search(new RegExp(this.city, 'i')) >= 0;
        } catch (error) {
        }
        return res;
      }).slice(0, 10).map(res => {
        this.listCitiesFound.push(res);
        return res.name;
      }))
    );
  }

  selectCity(city) {
    const result = this.listCitiesFound.filter( locate => locate.name === city.item)[0];
    this.location = `${this.mapConfigLang.transform('lbl_message_state')}:${result.departament}|${this.mapConfigLang.transform('lbl_message_city')}:${result.name}|`;
  }

  getNeighborhood(city) {
    this.neigborhood = '';
    if ( city.item !== '') {
      this.locationService.getNeighborhood(city.item).subscribe(res => {
        this.listNeighborhood = res.data.neighborhoods;
      });
    }
  }

  SearchNeighborhood() {
      return (neigborhood$: Observable<string>) => neigborhood$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        // tslint:disable-next-line: max-line-length
        map(target => {
          if (this.listNeighborhood.length === 1) {
            this.neigborhood = this.listNeighborhood[0];
            return [this.neigborhood] || target;
          } else {
            return target.length <= 1 ? [] : this.listNeighborhood.filter((neigborhood) =>  (new RegExp(this.neigborhood, 'gi')).test(neigborhood) ).slice(0, 15)
          }
        }),
        map(target => {
          this.validateUserInput();
          return target.length <= 0 ? [`${this.regFieldsExp.NotFound}`] : target;
        }),
      );
  }

  onSubmit() {
    this.location += `${this.mapConfigLang.transform('lbl_message_neighborhood')}: ${this.neigborhood}`;
    this.sendLocation.emit(this.location);
    this.location = '';
    this.city = '';
    this.neigborhood = '';
  }

  validateUserInput(): void {
    const isvalidCity = this.listCities.filter((city) => city.name === this.city);
    const isvalidNeigborhood = this.listNeighborhood.filter((neigborhood) =>  neigborhood === this.neigborhood);
    this.isValidResponse = isvalidCity.length > 0 && isvalidNeigborhood.length > 0 ? true : false;
  }
}
