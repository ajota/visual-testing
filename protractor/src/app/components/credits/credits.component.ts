import { Component, OnInit, OnDestroy } from '@angular/core';
import { CreditsService } from './credits.service';
import { DataCustomer, ActiveCredit, HistoryCredit} from './credits.model';
import { name } from 'src/app/shared/util/name-storage';
import { getItemSessionCustomer, saveSessionCustomer, getEnabledButtonPayment, getDataSessionCustomer } from 'src/app/shared/util/web-config';
import { Subject, Subscription } from 'rxjs';
import { stateCustomer } from 'src/app/shared/util/state-storage';
import { Details } from '../credit-history/credit-history.model';
import { ScNotifyService } from 'src/app/shared/organism/sc-notify/sc-notify.service';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})

export class CreditsComponent implements OnInit, OnDestroy {
  creditActive = false;
  historyCredit = false;
  customer = {} as DataCustomer;
  activeCredits$ = new Subject<ActiveCredit[]>();
  historyCredits$ = new Subject<HistoryCredit[]>();
  detailCredit$ = new Subject<Details>();
  activeCredits: ActiveCredit[];
  idCustomer: string;
  email: string;
  customerStatus: number;
  toggleHasHistoryCredits = false;
  toggleHasCredits = false;
  alternatePayment: boolean;
  stateCustomerStorage = stateCustomer;
  // observable calls
  creditsListenerSubs: Subscription;
  historyListenerSubs: Subscription;
  enabledPayment: boolean;

  env = environment;

  constructor(
    private creditService: CreditsService,
    private notify: ScNotifyService,
    private mapConfigLang: MapConfigLangPipe,
  ) {}

  ngOnInit() {
    this.enabledPayment = getEnabledButtonPayment();
    this.hasCredits();
    this.hasHistoryCredits();
    this.getInfoCustomer();
  }

  viewCredit() {
    if (this.creditActive === false ) {
      this.creditActive = true;
    } else
    if (this.creditActive === true) {
      this.creditActive = false;
    }
  }

  viewCreditHistory() {
    if (this.historyCredit === false ) {
      this.historyCredit = true;
    } else
    if (this.historyCredit === true) {
      this.historyCredit = false;
    }
  }

  getInfoCustomer() {
    this.customer = getDataSessionCustomer(name.moreCustomer);
    if ( Object.keys(this.customer).length > 0 ) {
        this.customerStatus = this.customer.status;
        saveSessionCustomer(name.customer, {name: this.customer.firstName});
        saveSessionCustomer(name.customer, {lastName: this.customer.firstLastName});
    } else {
      this.email = getItemSessionCustomer(name.customer, 'email');
      this.creditService.getInfoCustomer(this.email).subscribe(res => {
        this.customer = res.data;
        this.customerStatus = this.customer.status;
        saveSessionCustomer(name.customer, {name: this.customer.firstName});
        saveSessionCustomer(name.customer, {lastName: this.customer.firstLastName});
      });
    }
    this.getActiveCredits();
    this.getHistoryCredits();
  }

  getActiveCredits() {
    this.idCustomer = getItemSessionCustomer(name.customer, 'id');
    this.creditService.getActiveCredits(this.idCustomer).subscribe(res => {
      this.activeCredits$.next( res.data.activeCredits );
      this.activeCredits = res.data.activeCredits;
    });
  }

  getHistoryCredits() {
    this.creditService.getHistoryCredits(this.idCustomer).subscribe(res => {
      this.historyCredits$.next(res.data.creditHistory);
    });
  }

  hasCredits( ) {
    this.creditsListenerSubs = this.activeCredits$.subscribe( credits => {
      if (credits && credits.length) {
        this.toggleHasCredits = true;
      } else {
        this.toggleHasCredits = false;
      }
    });
  }

  hasHistoryCredits( ) {
    this.historyListenerSubs = this.historyCredits$.subscribe( credits => {
      if (credits && credits.length) {
        this.toggleHasHistoryCredits = true;
      } else {
        this.toggleHasHistoryCredits = false;
      }
    });
  }


  ngOnDestroy() {
    if ( this.creditsListenerSubs ) {
      this.creditsListenerSubs.unsubscribe();
    }
    if ( this.historyListenerSubs ) {
      this.historyListenerSubs.unsubscribe();
    }

  }
}
