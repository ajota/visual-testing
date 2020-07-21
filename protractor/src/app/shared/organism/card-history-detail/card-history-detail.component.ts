import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Details } from 'src/app/components/credit-history/credit-history.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-history-detail',
  templateUrl: './card-history-detail.component.html',
  styleUrls: ['./card-history-detail.component.scss']
})
export class CardHistoryDetailComponent implements OnInit {

  @Input() detailCredit;
  @Output() showNoBalanceDue = new EventEmitter();
  env = environment;
  credit: Details;

  constructor() {}

  ngOnInit() {
    if ( this.detailCredit ) {
      this.detailCredit.subscribe( res => {
        this.credit = res;
      });
    }
  }
}
