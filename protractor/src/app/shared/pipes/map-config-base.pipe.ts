import { Pipe, PipeTransform } from '@angular/core';
import { getSessionLocalStorage } from '../util/web-config';
import { name } from '../util/name-storage';

@Pipe({
  name: 'mapConfigBase'
})
export class MapConfigBasePipe implements PipeTransform {


  constructor() { }

  transform(label: any, ...args: any[]): any {
    const configBase = getSessionLocalStorage(name.configBase);
    let value = label;
    const cond = configBase && configBase.textBase;
    if ( cond ) {
       value = configBase.textBase.filter( ( item ) => {
        return item.label === label;
      })[0];
    }
    return value && value.value ? value.value : label;
  }

}
