import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScSelectCreditComponent } from './sc-select-credit.component';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';

const mockCredit = {creditId: '' };

describe('ScSelectCreditComponent', () => {
  let component: ScSelectCreditComponent;
  let fixture: ComponentFixture<ScSelectCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScSelectCreditComponent, MapConfigLangPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScSelectCreditComponent);
    component = fixture.componentInstance;
    component.credit = mockCredit;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
