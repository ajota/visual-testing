import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CardActiveCreditComponent } from './card-active-credit.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';

describe('CardActiveCreditComponent', () => {
  let component: CardActiveCreditComponent;
  let fixture: ComponentFixture<CardActiveCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule],
      declarations: [ CardActiveCreditComponent, MapConfigLangPipe ],
      providers: [ CardActiveCreditComponent,
        {provide: Router, useValue: {}},
        {provide: ActivatedRoute, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardActiveCreditComponent);
    component = fixture.componentInstance;
    component.data = { creditId: '', creditValue: '', storeName: '', dueDate: (new Date() ), alternatePayment: false, hasArrearsCharge: true};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
