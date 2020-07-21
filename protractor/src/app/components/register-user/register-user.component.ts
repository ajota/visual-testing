import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { RegisterUserService } from './register-user.service';
import { User, ValidEmail } from './register-user.model';
import { AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ScNotifyService } from 'src/app/shared/organism/sc-notify/sc-notify.service';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { NotifyOpts } from 'src/app/shared/organism/sc-notify/sc-notify.model';
import { Router } from '@angular/router';
import { PassDataService } from 'src/app/shared/util/pass-data.service';
import { BrowserPermissionsService } from 'src/app/core/browser-permissions.service';
import { nameRoutes } from 'src/app/shared/util/name-routes';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements AfterViewInit {

  @ViewChild('form', {static: false}) form;
  statusLocation;

  constructor(
    private registerUserService: RegisterUserService,
    private notify: ScNotifyService,
    private router: Router,
    private mapConfigBase: MapConfigBasePipe,
    private mapLanguagePipe: MapConfigBasePipe,
    private passDataService: PassDataService,
    private browserPermission: BrowserPermissionsService,
    ) {}
    regWhiteSpace = new RegExp(this.mapLanguagePipe.transform('str_regular_expression_no_white_space'), 'gi');

    ngAfterViewInit() {
      setTimeout( () => this.setVerifyEmailExistsWatcher());
      this.browserPermission.askLocation().then(res => this.statusLocation = res);
    }
    sendFormRegister( formData ) {

      const validateLocation = this.passDataService.getData('locationStatus');
      if (validateLocation) {
        const emailLowerCase = formData.email.toLowerCase();
        const emailVerifyLowerCase = formData.verify_email.toLowerCase();
        const user: User = {
          id: '',
          name: formData.name.replace(this.regWhiteSpace, ''),
          email: emailLowerCase,
          confirmEmail: emailVerifyLowerCase,
          password: formData.password,
          confirmPassword: formData.verify_pass,
          enabled: false
        };
        const register = this.registerUserService.postRegisterUser(user).subscribe( res => {
         let notifyOpts: NotifyOpts;
         if ( res.data.email === user.email) {
           this.passDataService.setData(res.data.email, 'autoCompleteEmail');
           notifyOpts = {
             title: this.mapConfigBase.transform('lbl_tittle_sign_up_success'),
             message: this.mapConfigBase.transform('lbl_document_sign_up_success'),
             icon: 'sc-icon--notify-sent-email',
             type: 'info',
             onAccept: () => this.router.navigate(['/login'])
           };
         }
         this.notify.open( notifyOpts );
         if ( register ) {
           register.unsubscribe();
         }
       });

      } else {
        this.notify.close()
        this.router.navigate([nameRoutes.lockedLocation]);
      }
  }

  setVerifyEmailExistsWatcher() {
    this.form.verify_email.valueChanges.subscribe( () => {

      if ( this.form.verify_email.valid ) {
        const data: ValidEmail =  this.form.verify_email.value;
        this.form.verify_email.setAsyncValidators([this.validatorIsExistingEmail( this.registerUserService, data )]);
        this.form.verify_email.updateValueAndValidity();
      }

    });
  }

  validatorIsExistingEmail( service: RegisterUserService, data: ValidEmail ): AsyncValidatorFn {
    return (): Observable<ValidationErrors  | null> => {
      return service.postValidEmail(data).pipe(
        map( email => {
          return ( email && JSON.parse(email.data) ) ? null : { emailNotExist: true} ;
        })
      );
    };
  }
}
