import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { QuickPaymentService } from './quick-payment.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('QuickPaymentService', () => {
  let service: QuickPaymentService;
  let MockBackend: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.get(QuickPaymentService);
    MockBackend = TestBed.get( HttpTestingController );
  });


  it('should be created', () => {
    const service: QuickPaymentService = TestBed.get(QuickPaymentService);
    expect(service).toBeTruthy();
  });
});
