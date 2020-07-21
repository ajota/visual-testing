import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { HistoryCredit, DataCustomer } from 'src/app/components/credits/credits.model';
import { Details } from './credit-history.model';
import { ActivatedRoute } from '@angular/router';
import { CreditHistoryService } from './credit-history.service';
import { getItemSessionCustomer } from 'src/app/shared/util/web-config';
import { name } from 'src/app/shared/util/name-storage';

@Component({
  selector: 'app-credit-history',
  templateUrl: './credit-history.component.html',
  styleUrls: ['./credit-history.component.scss']
})

export class CreditHistoryComponent implements OnInit {

  @ViewChild('modal', {static: false}) modal;

  customer: DataCustomer[];
  historyCredits$ = new Subject<[HistoryCredit]>();
  idCustomer;
  params = this.route.snapshot.params;
  detailCredit$ = new Subject<Details>();
  urlDocument = '';
  viewer = {height: 700};
  modalWidth = '';

  constructor(
    private detailService: CreditHistoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idCustomer = getItemSessionCustomer(name.customer, 'id');
    this.getDetailCredit();
  }

  getDetailCredit() {
    this.detailService.getDetailCredit(this.params.id).subscribe(res => {
      this.detailCredit$.next(res.data);
    });
  }

  getCreditReciept( paymentId = null ) {
    this.urlDocument = '';
    this.modalWidth = 'col-8';
    this.viewer.height = 550;
    this.detailService.postCreditReciept( paymentId ).subscribe(res => {
      const blob = new Blob([res.template], {type: 'text/html'});
      this.urlDocument =  URL.createObjectURL(blob);
    });
    this.modal.open();
  }
}
