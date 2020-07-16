import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRecoveryPasswordComponent } from './form-recovery-password.component';
import { AppModule } from 'src/app/app.module';

describe('FormRecoveryPasswordComponent', () => {
  let component: FormRecoveryPasswordComponent;
  let fixture: ComponentFixture<FormRecoveryPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRecoveryPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
