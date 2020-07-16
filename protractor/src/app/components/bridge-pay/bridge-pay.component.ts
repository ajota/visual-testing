import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { icon, type } from './bridge-pay.model';

@Component({
  selector: 'app-bridge-pay',
  templateUrl: './bridge-pay.component.html',
  styleUrls: ['./bridge-pay.component.scss']
})
export class BridgePayComponent implements OnInit {

  title =  this.mapConfigBase.transform('msj_error_generic_title');
  message: string;
  icon = icon.info;
  type = type.info;
  action = () => window.close();
  params;

  constructor(
    private mapConfigBase: MapConfigBasePipe,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.params = this.route.snapshot.queryParams;
    localStorage.setItem('id_pago', this.params.id_pago);
  }

}
