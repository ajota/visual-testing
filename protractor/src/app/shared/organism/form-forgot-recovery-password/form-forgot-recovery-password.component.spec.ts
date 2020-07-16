import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormForgotRecoveryPasswordComponent } from './form-forgot-recovery-password.component';
import { CommonModule } from '@angular/common';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { saveSessionLocalStorage, getSessionLocalStorage } from '../../util/web-config';
import { name } from '../../util/name-storage';
import { ScControlComponent } from '../../molecules/sc-control/sc-control.component';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';
import { RouterTestingModule } from '@angular/router/testing';

const MockTextBase = {data: [
  {textBase: [{label: 'str_regular_expression_mail_validation', type: 'text', value: 'test'}]}
]};

const MockRoutes = [{path: '', redirectTo: '/', pathMatch: 'full'}];

describe('FormForgotRecoveryPasswordComponent', () => {
  let component: FormForgotRecoveryPasswordComponent;
  let fixture: ComponentFixture<FormForgotRecoveryPasswordComponent>;

  beforeEach(async(() => {
    saveSessionLocalStorage(name.configBase, MockTextBase);

    TestBed.configureTestingModule({
      imports: [ CommonModule, FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes( MockRoutes ) ],
      declarations: [ FormForgotRecoveryPasswordComponent, ScControlComponent, MapConfigBasePipe, MapConfigLangPipe ],
      providers: [MapConfigBasePipe, MapConfigLangPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormForgotRecoveryPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
