import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormValidateTokenComponent } from './form-validate-token.component';
import { AppModule } from 'src/app/app.module';

describe('FormValidateTokenComponent', () => {
  let component: FormValidateTokenComponent;
  let fixture: ComponentFixture<FormValidateTokenComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
    .compileComponents();
    fixture = TestBed.createComponent(FormValidateTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default data', () => {
    expect(component.eventSubmitSendToken).toBeDefined();
    expect(component.resendToken).toBeUndefined();
  });

  it('should emit event with value if token number exist', () => {
    spyOn(component.eventSubmitSendToken, 'emit');
    component.resendToken = 'failCase';
    component.onSubmitForm();
    expect(component.eventSubmitSendToken.emit).toHaveBeenCalledWith('');

    component.formTokenValidation.get('token_number').setValue(null);
    component.resendToken = 'tokenTrue';
    component.onSubmitForm();
    expect(component.eventSubmitSendToken.emit).toHaveBeenCalledWith('');

    component.formTokenValidation.get('token_number').setValue('123456');
    component.resendToken = 'tokenTrue';
    component.onSubmitForm();
    expect(component.eventSubmitSendToken.emit).toHaveBeenCalledWith('123456');
  });

  it('should show notification resend token', () => {
    spyOn(component.eventSubmitSendToken, 'emit');
    component.resendToken = 'tokenTrue';
    component.showNotificationResendToken();
    expect(component.eventSubmitSendToken.emit).toHaveBeenCalledWith('tokenTrue');
  });

  it('should emit event whit value backTrue', () => {
    spyOn(component.eventSubmitSendToken, 'emit');
    component.goBack();
    expect(component.eventSubmitSendToken.emit).toHaveBeenCalledWith('backTrue');
  });
});
