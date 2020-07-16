import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';

@Injectable({providedIn: 'root'})
export class LoadingInterceptor implements HttpInterceptor {

  requestCount = 0;
  loadingStarted = false;

  constructor( private loadingService: LoadingService ) {}

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    this.loadingStarted = this.loadingService.isStarted();

    if ( !this.loadingStarted ) {
      this.loadingService.start();
    }

    this.requestCount++;
    return next.handle(req).pipe(
      finalize( this.turnOffLoading )
    );
  }

  turnOffLoading = () =>  {
    this.requestCount--;
    this.loadingStarted = this.loadingService.isStarted();
    if ( this.requestCount <= 0 ) {
      this.loadingService.end();
      this.requestCount = 0;
    }
  }

}
