import { TestBed } from '@angular/core/testing';

import { ScNotifyService } from './sc-notify.service';

describe('ScNotifyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScNotifyService = TestBed.get(ScNotifyService);
    expect(service).toBeTruthy();
  });
});
