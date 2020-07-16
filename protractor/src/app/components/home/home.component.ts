import { Component, OnInit, OnDestroy, ViewChild, Output } from '@angular/core';
import { LoginService } from 'src/app/shared/security/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { saveSessionCustomer, getDataSessionCustomer, getEnabledButtonPayment } from 'src/app/shared/util/web-config';
import { name } from 'src/app/shared/util/name-storage';
import { UserLogin, UserExternalLogin, ExternalLogin, UserLoginResp } from 'src/app/shared/security/user-login.model';
import { state } from 'src/app/shared/util/state-storage';
import { getItemSessionCustomer } from 'src/app/shared/util/web-config';
import { nameRoutes, mapRoutes } from 'src/app/shared/util/name-routes';
import { Subscription } from 'rxjs';
import { PassDataService } from 'src/app/shared/util/pass-data.service';
import { GoogleLoginProvider, AuthService, SocialUser, FacebookLoginProvider } from 'angularx-social-login';
import { ScNotifyService } from 'src/app/shared/organism/sc-notify/sc-notify.service';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { luegoPago, charDocument } from './home.model';
import { environment, headers } from 'src/environments/environment';
import { User } from '../register-user/register-user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('modal', {static: true}) modal;
  @Output() autoCompleteEmail: string;
  user: boolean;
  errorMsg: string;
  tokenUser: string;
  idCustomer: any;
  username: string;
  reqState: number;
  documentId: number;
  typeDocument: string;
  email: string;
  enabledPayment: boolean;
  emailFacebook: UserExternalLogin;

  nameRoutes = nameRoutes;
  googleTokenId: string;

  userLogin: SocialUser;
  loggedIn: boolean;

  // subscriptions
  validateUserSubs: Subscription;
  logInSubs: Subscription;

  typeActionModal: string;

  urlAction;

  env = environment;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private passDataService: PassDataService,
    private authService: AuthService,
    private notify: ScNotifyService,
    private mapConfigBase: MapConfigBasePipe
   ) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.userLogin = user;
      this.loggedIn = (user != null);
      this.autoCompleteEmail = this.passDataService.getData('autoCompleteEmail')
    });

    this.reqState = getItemSessionCustomer(name.customer, 'state');
    this.enabledPayment = getEnabledButtonPayment();
    if ( this.loginService.isLoggedIn ) {
      this.validateCustomerSessionRules();
    }

    // this launch automatically the register popup when the register query param exists
    const isRegister = this.activatedRoute.snapshot.queryParams.register;
    if ( isRegister ) {
      this.showRegisterNotify();
    }

    this.setRedirectAction();

  }

  sendFormToValidate( formData: UserLogin, externalLogin?: SocialUser ) {
    const username: string = formData ? formData.username : externalLogin.email;
    this.email = username.toLocaleLowerCase();
    this.validateUserSubs = this.loginService.postValidDocumentByEmail(username).subscribe( res => {
      if ( res.data ) {
        this.setCustomerSession( res );
      }
      this.loginService.getInfoCustomer(this.email).subscribe( async response => {
        saveSessionCustomer(name.moreCustomer, response.data);
        this.passDataService.setData( this.email, 'email' );
        const redirect = ( res.data.nextScreen ) ? this.router.navigate(['/' + mapRoutes[res.data.nextScreen] ] ) : this.user = false ;
      });
    });
  }

  sendFormToLogin( formData: UserLogin, extLogin?: UserExternalLogin) {
    this.emailFacebook = extLogin;

    const userData = formData ? formData : {
      provider: extLogin.provider,
      client_id: extLogin.id,
      external_token: extLogin.idToken || extLogin.authToken
    } ;

    userData.client_id = 'web_customer';
    this.logInSubs = this.loginService.postLogin(userData).subscribe( res => {
      if ( res.access_token ) {
        const userLogin = formData || {username: extLogin.email, password: null, client_id: userData.client_id, token: res.access_token };
        this.setCustomerAuthorization( res, userLogin as UserLogin );
        this.sendFormToValidate(userLogin as UserLogin);
      } else {
        this.user = false;
      }
    }, error => {
        if ( extLogin ) { this.noEmailFromFacebook(); }
      });
  }

  sendtExternalLogin(external) {
    switch (external) {
      case 'google':
        this.singInGoogle( external );
        break;

      case 'facebook':
        this.signInWithFB(external);
        break;
    }
  }

  singInGoogle( external: string ) {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
      const userExternal: UserExternalLogin = {provider: external, ...res};
      this.sendFormToLogin(null, userExternal);
    });
  }

  signInWithFB(external: string): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res => {
      this.sendFormToLogin(null, res);
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

  setCustomerSession( res ) {
    this.idCustomer = res.data.customerId;
    this.reqState = res.data.requestStatus;
    this.documentId = res.data.idDocument;
    this.typeDocument = res.data.typeDocument;

    saveSessionCustomer(name.customer, {
      id: this.idCustomer,
      document: this.documentId,
      typeDocument: this.typeDocument,
      state: this.reqState,
      email: this.email
    });
  }

  setCustomerAuthorization( res: UserLoginResp, formData: UserLogin ) {
    this.tokenUser = res.access_token;
    this.username = formData.username;

    let sessionData = getDataSessionCustomer( name.customer );
    sessionData = Object.assign(sessionData, {token: this.tokenUser, username: this.username});

    saveSessionCustomer(name.customer, sessionData);

    this.validateCustomerSessionRules();
  }

  validateCustomerSessionRules() {
    const condCustomerCanAccess = this.reqState && ( this.reqState === state.approved || this.reqState === state.denied );
    if ( condCustomerCanAccess ) {
      this.router.navigate(['/' + nameRoutes.dashboard]);
      return;
    }

    const condCustomerHasRequest = (
      this.reqState === state.pending || this.reqState === state.study || this.reqState === state.studyAgent
    );

    if ( condCustomerHasRequest ) {
      this.router.navigate(['/' + nameRoutes.requestQuota]);
      return;
    }
  }

  ngOnDestroy() {
    if( this.validateUserSubs ) {
      this.validateUserSubs.unsubscribe();
    }
    if( this.logInSubs ) {
      this.logInSubs.unsubscribe();
    }
  }

  redirectQuickPaymnet() {
    this.router.navigate([nameRoutes.quickPayment]);
  }

  noEmailFromFacebook() {
    if ( !(this.emailFacebook && this.emailFacebook.facebook.email) ) {
        this.notify.open({
        type: 'info',
        icon: 'sc-icon--notify-info',
        title: this.mapConfigBase.transform('lbl_tittle_no_email_registered_in_facebook'),
        message: this.mapConfigBase.transform('lbl_no_email_registered_in_facebook'),
        onAccept: () => {  this.notify.close(); this.showRegisterNotify(); }
      });
    }
  }

  showRegisterNotify() {
    this.typeActionModal = 'register';
    this.modal.open();
  }

  setRedirectAction() {
    let url = luegoPago.url;
    url += `${luegoPago.paramId}0`;
    this.urlAction = url;
  }
}
