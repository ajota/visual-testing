import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterRequestComponent } from './form-register-request.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { name } from '../../util/name-storage';

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
        }
      ]
    }
  ]
};

describe('FormRegisterCreditComponent', () => {
  let component: FormRegisterRequestComponent;
  let fixture: ComponentFixture<FormRegisterRequestComponent>;

  beforeEach(async(() => {
    sessionStorage.setItem(name.configBase, JSON.stringify(mockConfigBase));
    TestBed.configureTestingModule({
      imports: [ComponentsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegisterRequestComponent);
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
    let nid_type = component.formRegister.controls['nid_type'].setValue('CC');
    let nid = component.formRegister.controls['nid'].setValue('123');
    let verify_nid = component.formRegister.controls['verify_nid'].setValue(
      '123'
    );

    expect(nid).toEqual(verify_nid);
    expect(component.formRegister.valid).toBeTruthy();
    component.onSubmitForm();
  });

  // it('should validate nid_type', () => {
  //   // const comp = new FormRegisterCreditComponent();

  //   // expect(comp.nid_type).toEqual(comp.nid_type);
  // });
});
