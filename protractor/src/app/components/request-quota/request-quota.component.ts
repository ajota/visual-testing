import { Component, OnInit } from '@angular/core';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';
import { ScNotifyService } from 'src/app/shared/organism/sc-notify/sc-notify.service';;

@Component({
  selector: 'app-request-quota',
  templateUrl: './request-quota.component.html',
  styleUrls: ['./request-quota.component.scss']
})
export class RequestQuotaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
