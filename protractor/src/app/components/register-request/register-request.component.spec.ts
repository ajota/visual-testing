import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRequestComponent } from './register-request.component';
import { ComponentsModule } from '../components.module';
import { name } from 'src/app/shared/util/name-storage';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { FormRegisterRequestComponent } from 'src/app/shared/organism/form-register-request/form-register-request.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';
import { ScControlComponent } from 'src/app/shared/molecules/sc-control/sc-control.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire';
import { firebase } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';

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

describe('RegisterRequestComponent', () => {
  let component: RegisterRequestComponent;
  let fixture: ComponentFixture<RegisterRequestComponent>;

  beforeEach(async(() => {
    sessionStorage.setItem(name.configBase, JSON.stringify(mockConfigBase));
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule,
        AngularFireModule.initializeApp(firebase), AngularFireDatabaseModule
      ],
      declarations: [ RegisterRequestComponent, FormRegisterRequestComponent, ScControlComponent,  MapConfigBasePipe, MapConfigLangPipe ],
      providers: [ MapConfigBasePipe ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should send form register', () => {
  //   // component.sendFormRegister('formData');
  //   // expect(component.sendFormRegister('formData')).toHaveBeenCalled();
  // });
});
