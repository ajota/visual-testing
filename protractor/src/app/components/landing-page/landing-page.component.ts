import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScNotifyService } from 'src/app/shared/organism/sc-notify/sc-notify.service';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { nameRoutes } from 'src/app/shared/util/name-routes';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor( private router: Router,
               private notify: ScNotifyService, 
               ) { }

  ngOnInit() {
  }

  showAlertRedirect(){
    this.notify.open({
      type: 'confirm',
      icon: 'sc-icon--notify-info',
      title: 'Ten presente',
      message: 'Si solicitaste tu cupo de manera virtual, aún no estará disponible la información de tus créditos. Si tienes alguna duda comunícate al 320 889 98 98',
      onAccept: () => window.location.href='https://servicio.sistecredito.com/clientes/appweb/#/login'
    })
  }
}
