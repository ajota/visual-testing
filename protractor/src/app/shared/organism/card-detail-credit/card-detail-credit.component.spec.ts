import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailCreditComponent } from './card-detail-credit.component';
import { AppModule } from 'src/app/app.module';
import { of } from 'rxjs';

describe('CardDetailCreditComponent', () => {
  let component: CardDetailCreditComponent;
  let fixture: ComponentFixture<CardDetailCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailCreditComponent);
    component = fixture.componentInstance;
    component.detailCredit = of({});
    component.detailCancelCredit = of({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
