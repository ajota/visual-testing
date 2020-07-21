import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterUserComponent } from './form-register-user.component';
import { name } from '../../util/name-storage';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ScControlComponent } from '../../molecules/sc-control/sc-control.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';

const mockConfigBase = {
  data: [
    {
      textBase: [
        { label: 'exit', type: 'text', value: 'Salir' },
        { label: 'lbl_welcome_title', type: 'text', value: '¡Bienvenido!' },
        {
          label: 'lbl_company_title',
          type: 'text',
          value: 'Siste<b>crédito</b>'
        },
        {
          label: 'lbl_welcome_subtitle',
          type: 'text',
          value: 'Ingresa y haz posible lo que sueñas'
        },
        {
          label: 'str_regular_expression_mail_validation',
          type: 'text',
          value:
            '(?:[A-Za-z0-9!#$%&\'*+/=?^_{|}~-]+(?:\\.[A-Za-z0-9!#$%&\'*+/=?^_{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])'
        }
      ]
    }
  ]
};

describe('FormRegisterUserComponent', () => {
  let component: FormRegisterUserComponent;
  let fixture: ComponentFixture<FormRegisterUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, RouterTestingModule.withRoutes([{path: '', redirectTo: '/', pathMatch: 'full'}]) ],
      declarations: [ FormRegisterUserComponent, ScControlComponent, MapConfigBasePipe, MapConfigLangPipe ],
      providers: [ MapConfigBasePipe ]
    }).compileComponents();
  });

  beforeEach(() => {
    sessionStorage.setItem(name.configBase, JSON.stringify(mockConfigBase));

    fixture = TestBed.createComponent(FormRegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should form invalid when empty', () => {
    expect(component.formRegister.valid).toBeFalsy();
  });

  it('should validate fileds and submit form', () => {
    component.name.setValue('asd');

    component.email.setValue('lalo@mail.com');

    component.verify_email.setValue('lalo@mail.com');

    component.password.setValue('asdasd');

    component.verify_pass.setValue('asdasd');

    expect(component.formRegister.valid).toBeFalsy();
    component.onSubmitForm();
  });
});
