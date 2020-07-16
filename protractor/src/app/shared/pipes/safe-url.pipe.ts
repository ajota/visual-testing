import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer
  ) {}

  transform(data, param = null): any {
    if ( !param ) {
      return this.sanitizer.bypassSecurityTrustResourceUrl( data );
    }

    if ( param === 'HTML' ) {
      return this.sanitizer.bypassSecurityTrustHtml( data );
    }
  }

}
