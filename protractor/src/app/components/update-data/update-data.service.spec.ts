import { TestBed } from '@angular/core/testing';
import { UpdateDataService } from './update-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UpdateDataService', () => {
  let service: UpdateDataService;

  beforeEach(() =>{
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    service = TestBed.get(UpdateDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
