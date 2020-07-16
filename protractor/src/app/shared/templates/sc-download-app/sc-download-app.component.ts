import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { externaLinks } from 'src/environments/environment';

@Component({
  selector: 'app-sc-download-app',
  templateUrl: './sc-download-app.component.html',
  styleUrls: ['./sc-download-app.component.scss']
})
export class ScDownloadAppComponent implements OnInit {

  @ViewChild('modal', {static: true}) modal;
  @Input() openWhenAppInit = false;

  device = null;
  downloadAndroidAppLink;
  eventLoop;

  constructor() {
    this.downloadAndroidAppLink = externaLinks.downloadAndroidApp;
  }

  ngOnInit() {
    if ( this.openWhenAppInit ) {
      this.showSuggestion();
    }
  }

  showSuggestion() {
    this.device = this.getDevice();
    if ( this.device === 'Iphone' ||  this.device === 'Android' ) {
      this.modal.open();
    }
  }

  getDevice() {
    let navigatorInfo = null;

    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIphone = /iP(hone|od|ad)/i.test(navigator.userAgent);

    if ( isAndroid ) { navigatorInfo = 'Android'; }

    if ( isIphone ) { navigatorInfo = 'Iphone'; }

    return navigatorInfo;
  }
}
