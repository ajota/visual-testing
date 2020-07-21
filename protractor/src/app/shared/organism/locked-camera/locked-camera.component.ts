import { Component, AfterViewInit } from '@angular/core';
import { ScNotifyService } from '../sc-notify/sc-notify.service';

@Component({
  selector: 'app-locked-camera',
  templateUrl: './locked-camera.component.html',
  styleUrls: ['./locked-camera.component.scss']
})
export class LockedCameraComponent implements AfterViewInit {
  constructor(
    private notify: ScNotifyService) { }

    ngAfterViewInit(): void {
      this.notify.close();
    }

}
