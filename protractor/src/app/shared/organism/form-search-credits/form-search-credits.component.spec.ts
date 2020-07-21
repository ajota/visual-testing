import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSearchCreditsComponent } from './form-search-credits.component';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ScControlComponent } from '../../molecules/sc-control/sc-control.component';

describe('FormSearchCreditsComponent', () => {
  let component: FormSearchCreditsComponent;
  let fixture: ComponentFixture<FormSearchCreditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSearchCreditsComponent, MapConfigLangPipe, MapConfigBasePipe, ScControlComponent ],
      imports: [CommonModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSearchCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
