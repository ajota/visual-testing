import { Component, OnInit,  } from '@angular/core';
import { steps, icon, type, payStatus } from './quick-paymnet.model';
import { QuickPaymentService } from './quick-payment.service';
import { Router } from '@angular/router';
import { getDataSessionCustomer } from 'src/app/shared/util/web-config';
import { ScNotifyService } from 'src/app/shared/organism/sc-notify/sc-notify.service';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';

@Component({
  selector: 'app-quick-payment',
  templateUrl: './quick-payment.component.html',
  styleUrls: ['./quick-payment.component.scss']
})
export class QuickPaymentComponent implements OnInit {

  step: string;
  steps = steps;
  activeCredits;
  credit;
  removePadding = false;
  userData;
  idPayment;
  tabPayment: Window;
  waitTimer;
  infoPayment;
  singleCredit;
  nextStep;
  title = this.mapConfigBase.transform('msj_error_generic_title');
  message: string;
  icon: string =  icon.info;
  type: string = type.info;

  constructor(
    private quickPaymentService: QuickPaymentService,
    private router: Router,
    private notify: ScNotifyService,
    private mapConfigBase: MapConfigBasePipe,
    private mapConfigLang: MapConfigLangPipe) { }

  ngOnInit( ) {
    this.userData = getDataSessionCustomer('customer');
    this.searchCredits();
  }

  searchCredits() {
    const user = getDataSessionCustomer('customer');
    this.userData = user;
    this.quickPaymentService.getActiveCredits(user).subscribe(res => {
      this.credit = res.data;
      this.activeCredits = res.data.credits;
      if (this.activeCredits.length > 0) {
        this.step = steps.result;
      } else {
        this.showAlert();
      }
    }, err => this.showAlert());
  }

  showAlert() {
    this.notify.open({
      title: this.mapConfigBase.transform('lbl_title_not_pending_credits'),
      message: this.mapConfigBase.transform('lbl_msg_not_pending_credits'),
      icon: 'sc-icon--notify-info',
      type: 'info',
      onAccept: () => {this.router.navigate(['/dashboard'])}
    });
  }

  paymentProcess() {
    this.step = steps.payment;
    this.removePadding = true;
    this.nextStep = false;
  }



  payCredit(credit) {
    const valuePaid = parseInt(credit.creditValue, 10);
    const creditToPay = {
      creditId: credit.idCredit,
      idDocument: this.credit.idDocument,
      valuePaid};
    this.quickPaymentService.postPaymentProcess(creditToPay).subscribe(res => {
      this.notify.open({
        title:  this.mapConfigLang.transform('msj_info_consider_title'),
        message: this.mapConfigLang.transform('msj_info_consider_txt'),
        icon: 'sc-icon--notify-info',
        type: 'info',
        onAccept: ()=> this.openZonaVirtual(res.data)
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
    if (Object.keys(this.userData).length > 0) {
      payment['email'] = this.userData.username;
    }
    payment['idPayment'] = this.idPayment;
    this.getInfoPayment(payment);
  }

  getInfoPayment(payment) {
    this.quickPaymentService.getInfoPayment(payment).subscribe(res => {
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
      onAccept: () => { this.router.navigate(['/dashboard']) }
    });
  }

  redirect() {
    this.router.navigate(['/dashboard']);
  }

}
