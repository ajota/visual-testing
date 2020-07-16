import { TestBed } from '@angular/core/testing';

import { EncryptDataService } from './encrypt-data.service';

describe('EncryptDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncryptDataService = TestBed.get(EncryptDataService);
    expect(service).toBeTruthy();
  });
});
