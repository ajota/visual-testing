import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHistoryCreditComponent } from './card-history-credit.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';
import { CardActiveCreditComponent } from '../card-active-credit/card-active-credit.component';
import { RouterModule } from '@angular/router';

describe('CardHistoryCreditComponent', () => {
  let component: CardHistoryCreditComponent;
  let fixture: ComponentFixture<CardHistoryCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CommonModule, RouterTestingModule.withRoutes([{path: 'credits', redirectTo: '/', pathMatch: 'full'}]) ],
      declarations: [ CardHistoryCreditComponent, CardActiveCreditComponent, MapConfigLangPipe ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHistoryCreditComponent);
    component = fixture.componentInstance;
    component.data = {status: 2, creditId: 0};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
