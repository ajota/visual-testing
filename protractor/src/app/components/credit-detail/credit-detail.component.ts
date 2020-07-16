import { Component, OnInit, ViewChild } from '@angular/core';
import { DataCustomer, HistoryCredit } from 'src/app/components/credits/credits.model';
import { getItemSessionCustomer, getEnabledButtonPayment } from 'src/app/shared/util/web-config';
import { name } from 'src/app/shared/util/name-storage';
import { Subject} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CreditDetailService } from './credit-detail.service';
import { Details, CalculateCredit } from './credit-detail.model';
import { FormGroup, FormControl} from '@angular/forms';
import { creditPlanPayment, creditCurrentPlanPayment } from 'src/app/shared/util/credit-document';
import { requestURL } from 'src/environments/environment';

@Component({
  selector: 'app-credit-detail',
  templateUrl: './credit-detail.component.html',
  styleUrls: ['./credit-detail.component.scss']
})

export class CreditDetailComponent implements OnInit {

  @ViewChild('modal', {static: false}) modal;
  customer: DataCustomer[];
  historyCredits$ = new Subject<[HistoryCredit]>();
  idCustomer: string;
  params = this.route.snapshot.params;
  detailCredit$ = new Subject<Details>();
  detailCalculateCredit$ = new Subject<CalculateCredit>();
  urlDocument: any;
  infoPayment;
  detailCredit: Details;
  typeActionModal: string;
  urlBasePaymentPlan: string;
  urlPromissoryNote: string;
  formPayment = new FormGroup({
    creditValue: new FormControl('')
  });
  hashReference: string;
  enabledPayment: boolean;
  viewer = {height: 700};
  modalWidth = 'col-6';

  constructor(
    private detailService: CreditDetailService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.idCustomer = getItemSessionCustomer(name.customer, 'id');
    this.enabledPayment = getEnabledButtonPayment();
    this.getDetailCredit();
    this.getCalculateDetailCredit();
  }

  getDetailCredit() {
    this.detailService.getDetailCredit(this.params.id).subscribe(res => {
      this.detailCredit$.next(res.data);
      this.detailCredit = res.data;
    });
  }


  getCalculateDetailCredit() {
    this.detailService.getDetailCalculateCreditCustomer (this.params.id).subscribe(res => {
      this.detailCalculateCredit$.next(res.data);
    });
  }

  getStatusCertificate(idCredit) {
    this.detailService.getStatusCertificate(idCredit).subscribe(res => {
        this.showDocument( res.data.accountStatusFileUrl, 'certificate' );
    });
  }

  processCkeckout(credit) {
    const mail = getItemSessionCustomer(name.customer, 'email');
    this.detailService.getInfoCustomer(mail).subscribe(res => {
      this.infoPayment = {idCredit: this.params.id, ...credit, ...res.data};
      this.typeActionModal = 'checkout';
      this.modal.open(true);
    });
  }


  showOriginalPaymentPlan() {
    this.urlDocument = this.buildGetUrl( creditPlanPayment, this.detailCredit);
    this.modalWidth = 'col-6';
    this.viewer.height = 700;
    this.typeActionModal = '';
    this.modal.open();
  }

  showCurrentPaymentPlan() {
    const paramsCurrentPlanPayment = {...creditPlanPayment, ...creditCurrentPlanPayment};
    this.urlDocument = '';
    this.modalWidth = 'col-6';
    this.viewer.height = 700;
    this.urlDocument = this.buildGetUrl( paramsCurrentPlanPayment, this.detailCredit);
    this.modal.open();
  }

  buildGetUrl( params, data) {
    this.urlBasePaymentPlan = requestURL.getUrlBasePaymentPlan;
    let url = '?';
    for ( const param in params ) {
      if ( param ) {
        url += `${param}=${data[params[param]]}&`;
      }
    }
    url = url.substr(0, ( url.length - 1 ) );
    return encodeURI( this.urlBasePaymentPlan + url );
  }

  getPromissoryNote() {
    this.showDocument( this.detailCredit.promissoryNoteFileName, 'promissoryNote' );
  }

  showDocument( urlBlobDocument: string, type ) {
    this.urlDocument = '';
    this.typeActionModal = type;
    this.modalWidth = 'col-6';
    this.viewer.height = 700;
    this.detailService.getBlobDocuments(urlBlobDocument).subscribe((resCert) => {
      const blob = new Blob([resCert], {type: 'application/pdf'});
      this.urlDocument = URL.createObjectURL(blob);
    });
    this.modal.open();
  }

  getCreditReciept( paymentId = null ){
    this.urlDocument = '';
    this.modalWidth = 'col-8';
    this.viewer.height = 550;
    this.detailService.postCreditReciept( paymentId ).subscribe(res => {
      const blob = new Blob([res.template], {type: 'text/html'});
      this.urlDocument =  URL.createObjectURL(blob);
    });
    this.typeActionModal = '';
    this.modal.open();
  }
}
