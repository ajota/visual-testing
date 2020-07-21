import { Component, AfterViewInit } from '@angular/core';
import { ScNotifyService } from '../sc-notify/sc-notify.service';

@Component({
  selector: 'app-locked-location',
  templateUrl: './locked-location.component.html',
  styleUrls: ['./locked-location.component.scss']
})
export class LockedLocationComponent implements AfterViewInit {
  status: string;
  coordenates: string;
  constructor(
    private notify: ScNotifyService) { }

    ngAfterViewInit(): void {
      this.notify.close();
    }
}
