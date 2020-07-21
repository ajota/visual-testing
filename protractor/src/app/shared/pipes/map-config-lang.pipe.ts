import { Pipe, PipeTransform } from '@angular/core';
import { getSessionLangStorage } from '../util/web-config';
import { name } from '../util/name-storage';

@Pipe({
  name: 'mapConfigLang'
})
export class MapConfigLangPipe implements PipeTransform {


  constructor() { }

  transform(label: any, ...args: any[]): any {
    const configLang = getSessionLangStorage(name.configbyLang);

    let value = label;
    const cond = configLang.text;
    if ( cond ) {
      value = configLang.text.filter( ( item ) => {
        return item.label === label;
      })[0];
    }

    return value && value.value ? value.value : label;
  }

}
