import { TestBed } from '@angular/core/testing';

import { CreditDetailService } from './credit-detail.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreditDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: CreditDetailService = TestBed.get(CreditDetailService);
    expect(service).toBeTruthy();
  });
});
