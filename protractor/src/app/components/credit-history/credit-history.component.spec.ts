import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditHistoryComponent } from './credit-history.component';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';
import { CommonModule } from '@angular/common';
import { CardHistoryDetailComponent } from 'src/app/shared/organism/card-history-detail/card-history-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ScModalComponent } from 'src/app/shared/molecules/sc-modal/sc-modal.component';
import { SafeUrlPipe } from 'src/app/shared/pipes/safe-url.pipe';

describe('CreditHistoryComponent', () => {
  let component: CreditHistoryComponent;
  let fixture: ComponentFixture<CreditHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CommonModule, HttpClientTestingModule, RouterTestingModule.withRoutes([{path: '', redirectTo: '/', pathMatch: 'full'}]) ],
      declarations: [ ScModalComponent, CreditHistoryComponent, CardHistoryDetailComponent, MapConfigLangPipe, SafeUrlPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
