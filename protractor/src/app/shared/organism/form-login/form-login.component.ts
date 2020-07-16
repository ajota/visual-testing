import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit{

  @Output() eventSubmitLogin = new EventEmitter();
  @Output() eventExternalLogin = new EventEmitter();
  @Input() enabledPayment: boolean;
  @Input() user: boolean;
  @Input() autoCompleteEmail: string;

  passwordTypes = 'password';
  passwordShow = false;

  usernamePattern = this.mapLanguage.transform('str_regular_expression_mail_validation');
  passwordPattern = this.mapLanguage.transform('str_regular_expression_password_validation');

  googleTokenId: string;

  constructor(private mapLanguage: MapConfigBasePipe) {
  }

  formLogin = new FormGroup ({
    username: new FormControl('', [ Validators.pattern(this.usernamePattern), Validators.required]),
    password: new FormControl('', [ Validators.pattern(this.passwordPattern), Validators.required])
  });

  ngOnInit() {
    if ( this.autoCompleteEmail ) {
      this.username.setValue(this.autoCompleteEmail);
    }
  }

  onSubmitLogin() {
    if (this.formLogin.valid) {
      this.eventSubmitLogin.emit(this.formLogin.value);
    } else {
      this.eventSubmitLogin.emit('');
    }
  }

  signInWithExternal( external ): void {
    this.eventExternalLogin.emit(external);
  }

  get username() {
    return this.formLogin.get('username');
  }
  get password() {
    return this.formLogin.get('password');
  }

}
