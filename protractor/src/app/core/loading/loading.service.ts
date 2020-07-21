import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoadingService  {

  defaultText = 'Espere por favor...';
  textChange = '';
  loadingState = false;
  switcher$ = new Subject<boolean>();
  text$ = new Subject<string>();
  timer: any;

  constructor() {
    this.initiateLoading();
  }

  initiateLoading() {
    this.text$.subscribe( text => this.textChange = text );
    this.text$.next( this.defaultText );

    this.switcher$.subscribe( state => this.loadingState = state );
  }

  start( ): Subject<boolean> {
    const loadingStarted = this.isStarted();

    if ( !loadingStarted ) {
      this.switcher$.next( true );
    }

    return this.switcher$;
  }

  end( ): Subject<boolean> { this.switcher$.next( false ); return this.switcher$; }

  isStarted( ): boolean { return this.loadingState; }

  hasText( ): string { return this.textChange; }

  changeText( customText ): string {
    this.text$.next( customText );
    return this.textChange;
  }
}
