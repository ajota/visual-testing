import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotRecoveryPasswordComponent } from './forgot-recovery-password.component';
import { name } from 'src/app/shared/util/name-storage';
import { of } from 'rxjs';
import { ForgotRecoveryPasswordService } from './forgot-recovery-password.service';
import { ComponentsModule } from '../components.module';
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

class MockForgotRecoveryPasswordService {
  getForgotRecoveryPassword( param ) {
    return of({
      function: '/api/Account/ForgotRecoveryPassword',
      errorCode: 0,
      message: '',
      country: 'co',
      data: true
    });
  }
}

describe('ForgotRecoveryPasswordComponent', () => {
  let component: ForgotRecoveryPasswordComponent;
  let fixture: ComponentFixture<ForgotRecoveryPasswordComponent>;
  let service: ForgotRecoveryPasswordService;

  beforeEach(async(() => {
    sessionStorage.setItem(name.configBase, JSON.stringify(mockConfigBase));
    TestBed.configureTestingModule({
      imports: [ComponentsModule],
      providers: [ ForgotRecoveryPasswordComponent, {provide: ForgotRecoveryPasswordService, useClass: MockForgotRecoveryPasswordService},
      MapConfigLangPipe, MapConfigBasePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotRecoveryPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(ForgotRecoveryPasswordService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
