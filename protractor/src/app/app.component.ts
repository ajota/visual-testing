import { Component, OnInit } from '@angular/core';
import { NavbarService } from './shared/organism/navbar/navbar.service';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
declare let gtag: Function;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'credinet-personas-front-web-portal';

  stickyClass = this.navbarService.stickyClass$;
  eventLoop: any;

  constructor( private navbarService: NavbarService, public router: Router ) {
    this.setHeightStyles();
    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd ) {
        gtag('config', environment.googleAnalyticsID, {
          page_path: event.urlAfterRedirects
        });
      }
    });
  }

  setHeightStyles() {
    clearTimeout(this.eventLoop);
    this.eventLoop = setTimeout( () => {

      const hasGeneralStyles = document.getElementById('general-styles');
      if ( hasGeneralStyles ) { hasGeneralStyles.remove(); }
      //
      const styleTag = document.createElement('style');
      const styles = `.sc-full-height{min-height: ${window.innerHeight}px;}`;
      styleTag.setAttribute('id', 'general-styles');
      styleTag.setAttribute('type', 'text/css');
      styleTag.innerText = styles;
      document.head.append(styleTag);
    });
  }

}
