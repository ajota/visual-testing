import { Component, OnInit } from '@angular/core';
import { ForgotRecoveryPasswordService } from './forgot-recovery-password.service';
import { ForgotRecoveryPassword } from './forgot-recovery-password.model';
import { ScNotifyService } from 'src/app/shared/organism/sc-notify/sc-notify.service';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { NotifyOpts } from 'src/app/shared/organism/sc-notify/sc-notify.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-recovery-password',
  templateUrl: './forgot-recovery-password.component.html',
  styleUrls: ['./forgot-recovery-password.component.scss']
})
export class ForgotRecoveryPasswordComponent implements OnInit {

  constructor(
    private forgotRecoveryPasswordService: ForgotRecoveryPasswordService,
    private notify: ScNotifyService,
    private router: Router,
    private mapConfigBase: MapConfigBasePipe
    ) {}

  ngOnInit() {
  }

  sendFormForgotPassword( formData ) {
    const forgotRecoveryPassword: ForgotRecoveryPassword = {
      id: '',
      email: formData.email
    };

    const register = this.forgotRecoveryPasswordService.getForgotRecoveryPassword(forgotRecoveryPassword.email).subscribe( res => {

      let notifyOpts: NotifyOpts;
      if ( res.data === true) {
        notifyOpts = {
          title: this.mapConfigBase.transform('lbl_tittle_sign_up_success'),
          message: this.mapConfigBase.transform('lbl_password_recovery_success_instructions'),
          icon: 'sc-icon--notify-sent-email',
          onAccept: () => this.router.navigate(['/']),
          type: 'info'
        };
      }
      this.notify.open( notifyOpts );
      register.unsubscribe();

    });
  }

}
