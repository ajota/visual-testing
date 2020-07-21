import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {PaymentsService} from './payments.service';
import { ScNotifyService } from 'src/app/shared/organism/sc-notify/sc-notify.service';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';
import { Router } from '@angular/router';
import { getDataSessionCustomer } from 'src/app/shared/util/web-config';
import { payStatus, type, icon } from './payments.model';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  @Input() credit;
  @Output() eventBackButton = new EventEmitter();
  @Output() eventReadyPayment = new EventEmitter();
  enabledPayment = false;
  creditInfo = this.credit;
  detailCredit;
  calculateCredit;
  sessionData;
  currentTab = window;
  infoPayment;
  idPayment: string;
  tabPayment: Window;
  title = this.mapConfigBase.transform('msj_error_generic_title');
  message: string;
  icon: string =  icon.info;
  type: string = type.info;

  waitTimer;

  constructor(
    private paymentService: PaymentsService,
    private notify: ScNotifyService,
    private mapConfigLang: MapConfigLangPipe,
    private mapConfigBase: MapConfigBasePipe,
    private router: Router) { }

  ngOnInit() {
    this.sessionData = getDataSessionCustomer('customer');
    if (this.credit) {
      this.getDetailCredit();
    }
  }

  getDetailCredit() {
    this.paymentService.getDetailCredit(this.credit.idCredit).subscribe(res => {
      this.detailCredit = res.data;
      this.getCalculateDetailCredit();
    }, err => {
      this.eventBackButton.emit();
    });
  }

  getCalculateDetailCredit() {
    this.paymentService.getDetailCalculateCreditCustomer(this.credit.idCredit).subscribe(res => {
      this.calculateCredit = res.data;
      this.creditInfo = {...this.detailCredit, ...this.calculateCredit, ...this.credit};
      this.enabledPayment = true;
    }, err => {
      this.eventBackButton.emit();
    });
  }

  payCredit(credit) {
    const valuePaid = parseInt(credit.creditValue, 10);
    const creditToPay = {
      creditId: this.credit.idCredit,
      idDocument: this.creditInfo.idDocument,
      typeDocument: this.creditInfo.typeDocument,
      name: this.creditInfo.client,
      email: this.credit.email,
      valuePaid };
    this.paymentService.postPaymentProcess(creditToPay).subscribe(res => {
      this.notify.open({
        title:  this.mapConfigLang.transform('msj_info_consider_title'),
        message: this.mapConfigLang.transform('msj_info_consider_txt'),
        icon: 'sc-icon--notify-info',
        type: 'info',
        onAccept: () => this.openZonaVirtual(res.data)
      });
    }, err => {
      this.notify.open({
        title: this.mapConfigLang.transform('lbl_title_wait_a_minute'),
        message: this.mapConfigLang.transform('lbl_sub_title_payment_in_process'),
        icon: 'sc-icon--notify-info',
        type: 'info',
        onAccept: () => { this.eventBackButton.emit(); }
      });
    });
  }

  openZonaVirtual(url) {
    this.tabPayment = window.open( url , '_blank');
    this.waitForPayment();
  }

  waitForPayment() {
    this.waitTimer = setTimeout(() => {
      const paymentId = localStorage.getItem('id_pago');
      if ( paymentId ) {
          clearTimeout(this.waitTimer);
          this.idPayment = paymentId;
          localStorage.removeItem('id_pago');
          this.validateSession();
          alert();
      } else {
          this.waitForPayment();
      }
    }, 2000);
  }

  validateSession() {
    const payment = {};
    if (Object.keys(this.sessionData).length > 0) {
      payment['email'] = this.sessionData.username;
    }
    payment['idPayment'] = this.idPayment;
    this.getInfoPayment(payment);
  }

  getInfoPayment(payment) {
    this.paymentService.getInfoPayment(payment).subscribe(res => {
      this.infoPayment = res.data;
      this.setMessageParams();
    });
  }

  setMessageParams() {
    let transactionStatus;
    if (this.infoPayment) {
      transactionStatus = this.infoPayment.transactionStatus;
    } else {
      transactionStatus = 0;
    }
    switch (transactionStatus) {
      case payStatus.approved:
        this.type = type.success;
        this.icon = icon.success;
        this.title = this.mapConfigBase.transform('lbl_payment_success');
        break;
      case payStatus.pendingStart: case payStatus.pendingCR: case payStatus.pendingEnd:
        this.title = this.mapConfigBase.transform('lbl_processing_payment');
        this.message = this.mapConfigBase.transform('lbl_payment_pending_approval');
        break;
      case payStatus.denied: case payStatus.deniedCR:
        this.message = this.mapConfigBase.transform('lbl_payment_rejected');
        break;
      default:
        this.type = type.info;
        this.icon = icon.info;
        this.title = this.mapConfigBase.transform('msj_error_generic_title');
        break;
    }
    this.notify.open({
      title: this.title,
      message: this.message,
      icon: this.icon,
      type: this.type,
      onAccept: () => { this.eventBackButton.emit(); }
    });
  }
}
