import { Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NavbarService {

  stickyClass = '';
  stickyClass$ = new BehaviorSubject<string>(this.stickyClass);
  stickyClassActive = false;

  classGenerated: boolean;

  navbarOnScroll = () => this.activateStickyHeader();
  navbarOnresize = () => this.setHeightClassHeader();

  constructor() {}

  //#region sticky header functionality
  get isMobile() {
    return window.innerWidth <= 992;
  }

  get hasHeader() {
    const header = document.getElementsByClassName('sc-header');
    return header.length > 0;
  }

  initStickyHeader() {
    window.addEventListener( 'scroll', this.navbarOnScroll);
    window.addEventListener( 'resize', this.navbarOnresize);
  }

  setHeightClassHeader() {
    if ( this.isMobile ) {
        this.stickyClass = ( this.stickyClass === '' ) ? 'sc-header--sticky' : '' ;
    } else if ( this.stickyClass !== '' ) {
        this.stickyClass = '';
    }

    this.stickyClass$.next(this.stickyClass);
  }

  activateStickyHeader() {
    // sticky is active?
    const cond  =  this.isMobile && !this.stickyClassActive ;
    if ( cond ) {
      this.stickyClassActive = true;
      this.stickyClass = this.stickyClass + ' is-active';
      this.stickyClass$.next(this.stickyClass);
    }

    // scroll is at the top and the sticky funciton is active
    const cond2 = window.scrollY <= 0 && this.stickyClassActive;
    if ( cond2 ) {
      this.removeSticky();
    }
  }

  removeSticky( force: boolean = false) {
    this.stickyClass = ( !this.isMobile || force ) ? '' : 'sc-header--sticky' ;
    this.stickyClassActive = false;

    if ( this.stickyClass$ ) { this.stickyClass$.next(this.stickyClass); }
  }

  turnOffHeaderStiky() {
    this.removeSticky(true);
    window.removeEventListener('scroll', this.navbarOnScroll);
    window.removeEventListener('resize', this.navbarOnresize);
  }
  //#endregion
}
