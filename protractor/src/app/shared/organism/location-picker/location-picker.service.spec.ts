import { TestBed } from '@angular/core/testing';

import { LocationPickerService } from './location-picker.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LocationPickerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: LocationPickerService = TestBed.get(LocationPickerService);
    expect(service).toBeTruthy();
  });
});
