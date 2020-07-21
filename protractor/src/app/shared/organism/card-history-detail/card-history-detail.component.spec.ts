import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHistoryDetailComponent } from './card-history-detail.component';
import { AppModule } from 'src/app/app.module';

describe('CardHistoryDetailComponent', () => {
  let component: CardHistoryDetailComponent;
  let fixture: ComponentFixture<CardHistoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
      providers: [ CardHistoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
