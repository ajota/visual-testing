import { Component, OnInit } from '@angular/core';
import { RecoveryPasswordService } from './recovery-password.service';
import { RecoveryPassword } from './recovery-password.model';
import { ScNotifyService } from 'src/app/shared/organism/sc-notify/sc-notify.service';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { NotifyOpts } from 'src/app/shared/organism/sc-notify/sc-notify.model';
import { Router } from '@angular/router';
import { TokenGuard } from './token.guard';
import { nameRoutes } from 'src/app/shared/util/name-routes';


@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {

  constructor(
    private recoveryPasswordService: RecoveryPasswordService,
    private notify: ScNotifyService,
    private router: Router,
    private mapConfigBase: MapConfigBasePipe,
    private tokenGuard: TokenGuard
  ) { }

  ngOnInit() {
  }

  sendFormRecoveryPassword( formData ) {
    const recoveryPassWord: RecoveryPassword = {
      id: '',
      password: formData.new_password,
      confirmPassword: formData.verify_new_password,
      paramToken: this.tokenGuard.ParamQueryToken
    };

    const register = this.recoveryPasswordService.postRecoveryPassword(recoveryPassWord).subscribe( res => {

      let notifyOpts: NotifyOpts;
      if ( res.data.changedPassword === true) {
        notifyOpts = {
          title: this.mapConfigBase.transform('lbl_tittle_save_new_success'),
          message: this.mapConfigBase.transform('lbl_save_new_success_indications'),
          icon: 'sc-icon--notify-success',
          onAccept: () => this.router.navigate([nameRoutes.login]),
          type: 'info'
        };

      }
      this.notify.open( notifyOpts );
      register.unsubscribe();
    });
  }
}
