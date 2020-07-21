import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';
import { nameRoutes } from '../../util/name-routes';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';
import { PassDataService } from '../../util/pass-data.service';

@Component({
  selector: 'app-form-validate-token',
  templateUrl: './form-validate-token.component.html',
  styleUrls: ['./form-validate-token.component.scss']
})

export class FormValidateTokenComponent implements OnInit {


  @Output() eventSubmitSendToken = new EventEmitter();
  resendToken: string;
  nameRoutes = nameRoutes;

  regFieldsExp = {
    regPass: this.mapLanguagePipe.transform('str_regular_expression_token_validation')
  };

  formTokenValidation = new FormGroup({
    token_number: new FormControl( '', [Validators.required, Validators.pattern(this.regFieldsExp.regPass),
       Validators.maxLength(6), Validators.minLength(6)])
  });

  constructor(
    private mapLanguagePipe: MapConfigBasePipe,
    private passDataService: PassDataService,
    private mapConfigLang: MapConfigLangPipe
  ) { }

  ngOnInit() {
  }

  get token_number(): AbstractControl {
    return this.formTokenValidation.get('token_number');
  }


  onSubmitForm() {
    const value = this.token_number.value;
    if ( value != null ||  this.resendToken === 'tokenTrue' ) {
      this.eventSubmitSendToken.emit(this.token_number.value);
    }
  }

  showNotificationResendToken() {
    this.resendToken = 'tokenTrue';
    this.eventSubmitSendToken.emit(this.resendToken );
  }

  goBack() {
    const isGoBack = 'backTrue';
    this.eventSubmitSendToken.emit(isGoBack);
  }

}
