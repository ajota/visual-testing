import { TestBed } from '@angular/core/testing';

import { CreditHistoryService } from './credit-history.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HistoryCreditService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: CreditHistoryService = TestBed.get(CreditHistoryService);
    expect(service).toBeTruthy();
  });
});
