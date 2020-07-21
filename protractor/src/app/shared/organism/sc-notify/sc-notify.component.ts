import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ScNotifyService } from './sc-notify.service';
import { NotifyOpts } from './sc-notify.model';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sc-notify',
  templateUrl: './sc-notify.component.html',
  styleUrls: ['./sc-notify.component.scss']
})

export class ScNotifyComponent {
  @ViewChild('backdrop', {static: false}) backdrop: ElementRef;
  @ViewChild('notify', {static: false}) notify: ElementRef;

  @Output() actionAccept = new EventEmitter();

  show$ = this.notifyService.show$;
  message$ = this.notifyService.message$;
  title$ = this.notifyService.title$;
  type$ = this.notifyService.type$;
  icon$ = this.notifyService.icon$;
  subtitle$ = this.notifyService.subtitle$;
  // TODO: --MENA-- Definir un nombramiento mas adecuado
  message2$ = this.notifyService.message2$;
  icon2$ = this.notifyService.icon2$;
  icon3$ = this.notifyService.icon3$;

  showNotify = false;
  btnAcceptName = '';
  btnCancelName = '';
  hasAccept = true;
  hasCancel = false;
  type: string;

  //subs
  behaviorNotify: Subscription;

  constructor(
    private notifyService: ScNotifyService,
    private mapConfigBase: MapConfigBasePipe
  ) {
    this.close();

    this.showNotifyButtons();
    this.setNameToNotifyButtons();
    this.watchNotifyBehavior();
  }

  open( opts: NotifyOpts ) {
    this.notifyService.open( opts );
  }

  close() {
    this.notifyService.close();
  }

  accept() {
    this.actionAccept.emit(true);
    if (this.notifyService.inAcceptAction) {
      this.notifyService.inAcceptAction();
    }
    this.notifyService.close();
  }

  setNameToNotifyButtons() {
    this.type$.subscribe( () => {
      this.btnAcceptName = this.mapConfigBase.transform('btn_accept');
      this.btnCancelName = this.mapConfigBase.transform('btn_cancel');
    });
  }

  showNotifyButtons() {
    this.type$.subscribe( ( res ) => {
      this.type = res;
      if ( res === 'error' || res === 'info' || !res) {
        this.hasCancel = false;
        this.hasAccept = true;
      } else if (res === 'camera') {
        this.hasCancel = false;
        this.hasAccept = false;
      } else if (res === 'noCamera') {
        this.hasCancel = false;
        this.hasAccept = false;
      } else if (res === 'confirm') {
        this.hasCancel = true;
        this.hasAccept = true;
      } else if (res === 'check') {
        this.hasCancel = false;
      } else {
        this.hasCancel = true;
      }
    });
  }

  watchNotifyBehavior() {
    this.behaviorNotify = this.show$.subscribe( res => {
      if ( res && this.backdrop ) {
        this.backdrop.nativeElement.focus();
      }
      this.showNotify = res;
    } );
  }

}
