import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InitialConfigService, EncryptDataService } from './http';
import { LoadingComponent } from './loading/loading.component';
import { LoadingInterceptor } from './http/loading.interceptor';
import { ErrorsInterceptor } from './http/errors.interceptor';

@NgModule({
  declarations: [ LoadingComponent ],
  imports: [CommonModule, HttpClientModule],
  providers: [InitialConfigService, EncryptDataService, LoadingInterceptor, ErrorsInterceptor],
  exports: [ LoadingComponent ]
})
export class CoreModule {}
