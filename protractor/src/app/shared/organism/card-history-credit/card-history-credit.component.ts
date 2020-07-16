import { Component, OnInit, Input } from '@angular/core';
import { nameRoutes } from '../../util/name-routes';

@Component({
  selector: 'app-card-history-credit',
  templateUrl: './card-history-credit.component.html',
  styleUrls: ['./card-history-credit.component.scss']
})
export class CardHistoryCreditComponent implements OnInit {

  @Input() data;
  @Input() dataDetail;
  nameRoutes = nameRoutes;

  constructor() { }

  ngOnInit() {
  }
}
