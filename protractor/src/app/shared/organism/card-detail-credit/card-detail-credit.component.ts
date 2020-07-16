import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Details, CalculateCredit } from 'src/app/components/credit-detail/credit-detail.model';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-detail-credit',
  templateUrl: './card-detail-credit.component.html',
  styleUrls: ['./card-detail-credit.component.scss']
})
export class CardDetailCreditComponent implements OnInit {

  @Output() eventShowCertificate = new EventEmitter();
  @Output() eventShowPaymentPlan = new EventEmitter();
  @Output() eventShowCurrentPaymentPlan = new EventEmitter();
  @Output() eventShowPromissoryNote = new EventEmitter();
  @Output() eventPayCredit = new EventEmitter();
  @Input() detailCredit;
  @Input() detailCancelCredit;
  @Input() enabledPayment: boolean;
  // TODO: Por convenciones de nombramiento las variables de comportamiento reactivo deben estar nombradas al final con el simbolo dolar ($)
  credit: Details;
  calculateCredit: CalculateCredit;
  idCredit: string;
  alternatePayment: boolean;
  env = environment;

  constructor(private router: ActivatedRoute) {}

  ngOnInit() {
    this.getDetailCredit();
    this.getDetailCancelCredit();
    this.getIdCredit();
  }

  getDetailCredit() {
    this.detailCredit.subscribe(res => {
      this.credit = res;
    });
  }

  getDetailCancelCredit() {
    this.detailCancelCredit.subscribe(res => {
      this.calculateCredit = res;
    });
  }

  getIdCredit() {
    this.idCredit = this.router.snapshot.params.id;
  }

  sendPayCredit() {
    const credit = {...this.credit , ...this.calculateCredit};
    this.eventPayCredit.emit(credit);
  }
}
