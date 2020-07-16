import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotifyOpts, NotifyOptsModify } from './sc-notify.model';

@Injectable({
  providedIn: 'root'
})
export class ScNotifyService {

  show$ = new Subject<boolean>();

  title$ = new Subject<string>();
  message$ = new Subject<string>();
  type$ = new Subject<string>();
  icon$ = new Subject<string>();

  subtitle$ = new Subject<string>();
  message2$ = new Subject<string>();
  icon2$ = new Subject<string>();
  icon3$ = new Subject<string>();

  // status
  isNotifyOpen: boolean;

  inAcceptAction = () => {};

  constructor() {
    this.close();
  }

  get isOpen() {
      return this.isNotifyOpen;
  }

  open( options: NotifyOpts ) {
    this.modify( options );
    this.isNotifyOpen = true;
    this.show$.next(this.isNotifyOpen);
  }

  modify(options: NotifyOptsModify) {
    this.title$.next(options.title);
    this.message$.next(options.message);
    this.type$.next(options.type);
    this.icon$.next(options.icon);
    this.subtitle$.next(options.subtitle);
    this.message2$.next(options.message2);
    this.icon2$.next(options.icon2);
    this.icon3$.next(options.icon3);
    this.inAcceptAction = options.onAccept;
  }

  close() {
    this.isNotifyOpen = false;
    this.show$.next(this.isNotifyOpen);
  }

}
