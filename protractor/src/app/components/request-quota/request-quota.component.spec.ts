import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestQuotaComponent } from './request-quota.component';
import { AppModule } from 'src/app/app.module';

describe('RequestQuotaComponent', () => {
  let component: RequestQuotaComponent;
  let fixture: ComponentFixture<RequestQuotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    })
    .compileComponents();
    fixture = TestBed.createComponent(RequestQuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
