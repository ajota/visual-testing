import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PassDataService } from 'src/app/shared/util/pass-data.service';
import { NotifyOpts } from 'src/app/shared/organism/sc-notify/sc-notify.model';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { ScNotifyService } from 'src/app/shared/organism/sc-notify/sc-notify.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  constructor(
    private passDataService: PassDataService,
    private mapConfigBase: MapConfigBasePipe
  ) { }

  ngOnInit() {}


  sendFormReturn( formData ) {
    this.passDataService.setData(formData);
  }

}
