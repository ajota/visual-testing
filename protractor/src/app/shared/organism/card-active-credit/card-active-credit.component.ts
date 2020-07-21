import { Component, OnInit, Input } from '@angular/core';
import { nameRoutes } from '../../util/name-routes';
import { ActiveCredit } from 'src/app/components/credits/credits.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-active-credit',
  templateUrl: './card-active-credit.component.html',
  styleUrls: ['./card-active-credit.component.scss']
})
export class CardActiveCreditComponent implements OnInit {

  @Input() data: ActiveCredit ;
  @Input() enabledPayment: boolean;
  currentDate = new Date();
  nameRoutes = nameRoutes;
  alternatePayment: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    if ( this.data ) {
      this.alternatePayment = this.data.alternatePayment;
    }
  }

  goToCreditDetail( creditId){
    this.router.navigate(['/' + nameRoutes.credits, {outlets:{'main-content':[ nameRoutes.creditDetail, creditId]}} ]);
  }
}
