import { TestBed } from '@angular/core/testing';
import { InitialConfigService } from './initial-config.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppModule } from 'src/app/app.module';

describe('InitialConfigService', () => {
  let service: InitialConfigService;
  let backend: HttpTestingController;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.get( InitialConfigService );
    backend = TestBed.get( HttpTestingController );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
