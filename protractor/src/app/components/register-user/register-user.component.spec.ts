import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterUserComponent } from './register-user.component';
import { ComponentsModule } from '../components.module';
import { name } from 'src/app/shared/util/name-storage';
import { of } from 'rxjs';
import { RegisterUserService } from './register-user.service';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';

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
class MockRegisterUserService {
  postRegisterUser( param ) {
    return of({
      function: '/api/Account/Register',
      errorCode: 0,
      message: '',
      country: 'co',
      data: {
        id: '',
        name: 'Usuario Prueba',
        email: 'usuarioprueba@gmail.com',
        confirmemail: 'usuarioprueba@gmail.com',
        password: 'UsuarioPrueba123*',
        confirmpassword: 'UsuarioPrueba123*',
        enabled: 'false'
      }
    });
  }

  postValidEmail( param ) {
    return of({
      function: '/api/Account/Register',
      errorCode: 0,
      message: '',
      country: 'co',
      data: true
    });
  }
}

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;
  let service: RegisterUserService;

  beforeEach(async(() => {
    sessionStorage.setItem(name.configBase, JSON.stringify(mockConfigBase));
    TestBed.configureTestingModule({
      imports: [ComponentsModule],
      providers: [
        MapConfigLangPipe,
        MapConfigBasePipe,
        {provide: RegisterUserService, useClass: MockRegisterUserService}
    ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(RegisterUserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should initiate with ', () => {
    expect(component.form).toBeDefined();
  });

  it('Should set the async validator with ', (done) => {
    component.form.verify_email.valueChanges.subscribe( () => {
      expect(component.form.verify_email.valid).toBeTruthy();
      done();
    });

    component.form.email.setValue('usuarioprueba@gmail.com');
    component.form.verify_email.setValue('usuarioprueba@gmail.com');

  });

  it('Should the method sendFormRegister() return the user sent to save', () => {

    component.form.name.setValue('Usuario Prueba');
    component.form.email.setValue('usuarioprueba@gmail.com');
    component.form.verify_email.setValue('usuarioprueba@gmail.com');
    component.form.password.setValue('UsuarioPrueba123');
    component.form.verify_pass.setValue('UsuarioPrueba123');

    component.sendFormRegister( component.form.formRegister.value );
  });

  it('Should validate an existing email', () => {
    expect(component.validatorIsExistingEmail( service, 'usuarioprueba@gmail.com' as any)).toBeDefined();
  });

});
