import { Injectable} from '@angular/core';
import { subscribeOn } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PassDataService {

  data: Array<any> | any ;
  count = 0;
  nameRoute = '';
  comulativeData = {};
  notifyDataChanges = new BehaviorSubject({});

  constructor() { }

  setData( newData, id?: string ) {
    if ( id ) {
      this.comulativeData[id] = newData;
    } else {
      this.data = newData;
    }
    this.notifyDataChanges.next(newData);
  }


  getData( id?: string ) {
    if ( id ) {
      return this.comulativeData[id];
    }
    return this.data;
  }

}
