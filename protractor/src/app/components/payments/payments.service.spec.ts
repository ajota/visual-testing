import { TestBed } from '@angular/core/testing';
import { PaymentsService } from './payments.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let backEnd: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.get(PaymentsService);
    backEnd = TestBed.get(HttpTestingController);
   });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
