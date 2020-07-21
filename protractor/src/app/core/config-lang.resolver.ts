import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { InitialConfigService } from './http';
import { saveSessionLocalStorage, getSessionLangStorage } from '../shared/util/web-config';
import { name } from '../shared/util/name-storage';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ConfigLangResolver implements Resolve<any> {
  constructor(private initialBaseService: InitialConfigService) {}

  resolve(): Observable<any> | Promise<any> | any {
    return this.initialBaseService.getConfigByLang('es').pipe(
      tap(res => {
        saveSessionLocalStorage(name.configbyLang, res);
      })
    );
  }
}
