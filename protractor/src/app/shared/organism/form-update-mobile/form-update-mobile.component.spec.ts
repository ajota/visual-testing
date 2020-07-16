import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateMobileComponent } from './form-update-mobile.component';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScControlComponent } from '../../molecules/sc-control/sc-control.component';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';
import { RouterTestingModule } from '@angular/router/testing';

const MockRoutes = [{path: '', redirectTo: '/', pathMatch: 'full'}];

describe('FormUpdateMobileComponent', () => {
  let component: FormUpdateMobileComponent;
  let fixture: ComponentFixture<FormUpdateMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes( MockRoutes )],
      declarations: [ ScControlComponent, FormUpdateMobileComponent, MapConfigLangPipe, MapConfigBasePipe ],
      providers: [ MapConfigLangPipe, MapConfigBasePipe ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(FormUpdateMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
