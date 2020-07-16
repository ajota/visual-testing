import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { InitialConfigService } from './http';
import { saveSessionLocalStorage } from '../shared/util/web-config';
import { name } from '../shared/util/name-storage';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class InitialConfigBaseResolver implements Resolve<any> {
  constructor(
    private initialBaseService: InitialConfigService
  ) {}

  resolve(): Observable<any> | Promise<any> | any {
    return this.initialBaseService.getConfigBase().pipe(
      tap(res => {
        saveSessionLocalStorage(name.configBase, res);
      })
    );
  }
}
