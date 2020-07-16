import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsComponent } from './credits.component';
import { CommonModule } from '@angular/common';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';
import { CardActiveCreditComponent } from 'src/app/shared/organism/card-active-credit/card-active-credit.component';
import { CardHistoryCreditComponent } from 'src/app/shared/organism/card-history-credit/card-history-credit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreditsComponent', () => {
  let component: CreditsComponent;
  let fixture: ComponentFixture<CreditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([{path: '', redirectTo: '/', pathMatch: 'full'}]),
          HttpClientTestingModule
      ],
      providers: [ MapConfigLangPipe],
      declarations: [
        CreditsComponent,
        CardActiveCreditComponent,
        CardHistoryCreditComponent,
        MapConfigLangPipe
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
