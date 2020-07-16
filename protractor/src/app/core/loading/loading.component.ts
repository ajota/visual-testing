import { Component, OnInit, Input, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { LoadingService } from './loading.service';
import { Subject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
})
export class LoadingComponent implements AfterViewInit {

  @Input() text = this.loadingService.defaultText;

  loadingText$ =  this.loadingService.text$;

  switcher$: Subject<boolean> = this.loadingService.switcher$;

  constructor(
    private  loadingService: LoadingService,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef ) {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.style.display = 'none';
    this.loadingService.switcher$.subscribe(status => {
      this.elementRef.nativeElement.style.display = status ? 'block' : 'none';
      this.changeDetectorRef.detectChanges();
     });
  }

  start( ): void {
    this.switcher$.next( true );
    this.loadingText$.next( this.loadingService.defaultText );
  }

  end( ): void {
    this.switcher$.next( false );
  }

}
