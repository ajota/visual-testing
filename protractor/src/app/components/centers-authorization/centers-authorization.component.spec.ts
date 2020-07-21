import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CentersAuthorizationComponent } from './centers-authorization.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CentersAuthorizationService } from './centers-authorization.service';
import { of, Observable } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { VerifyEmailRequest } from './centers-authorization.model';

class MockWelcomeService{

  postVerifyEmail( req ) {
    return new Observable( subs => {
      subs.next({
          function: '',
          errorCode: 0,
          message: '',
          country: 'co',
          data: { enabled: true}
      });
      subs.complete();
    });
  }

  getCentersAuthorizationText() {}
  getAuthorizationCenters() { return of({data: 'data'} ) }
  postChangePassword(){ return of({data:{email: 'asdsa@asdasd.com', changedPassword: true } } ) }
}

describe('CentersAuthorizationComponent', () => {
  let component: CentersAuthorizationComponent;
  let fixture: ComponentFixture<CentersAuthorizationComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule, CommonModule, HttpClientTestingModule, RouterTestingModule.withRoutes([
        {path: 'confirmed-email', component: CentersAuthorizationComponent}
      ]) ],
      providers: [CentersAuthorizationComponent, {provide: CentersAuthorizationService, useClass: MockWelcomeService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentersAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initiate with the variables and values', () => {
    expect(component.emailVerified$).toBeUndefined();
    expect(component.passChanged$).toBeUndefined();
    expect(component.userVeryfied$).toBeUndefined();
    expect(component.requestVerifyAccount$).toBeUndefined();
    expect(component.legalTextCentersAuthorization$).toBeUndefined();

    expect(component.accountToVerify).toBeTruthy();
    expect(component.authorized).toBeFalsy();
    expect(component.data).toEqual( {} as VerifyEmailRequest );
    expect(component.path).toBeDefined();
  });

  it('should prepare to call a set of request (2) to send an account confirmation if there is not password', (done) => {
    // mock
    component.data = {paramToken: 'lkjahdkjahdskhasdas4d56a4s56d4asdas64d56sa4'};

    // variables
    let count = 1;

    // expects
    expect(component.userVeryfied$).toBeUndefined();
    expect(component.setAccountConfirmation()).toBeUndefined();
    expect(component.userVeryfied$).toBeDefined();

    component.userVeryfied$.subscribe( ( ) => {
      if ( count >= 2) {
        expect(count).toEqual(2);
        done();
      }
      count++;
    });

  });

  it('should prepare to call a set of request (3) to send an account confirmation if there is a password', (done) => {
    // mock
    component.data = {paramToken: 'lkjahdkjahdskhasdas4d56a4s56d4asdas64d56sa4', password: '123456'};

    // variables
    let count = 1;

    // expects
    expect(component.userVeryfied$).toBeUndefined();
    expect(component.setAccountConfirmation()).toBeUndefined();
    expect(component.userVeryfied$).toBeDefined();

    component.userVeryfied$.subscribe( ( ) => {
      if ( count >= 3) {
        expect(count).toEqual(3);
        done();
      }
      count++;
    });

  });

  it('sendAccountConfirmation method should send the data for account confirmation if there is a password', (done) => {
    // mock
    component.data = {paramToken: 'lkjahdkjahdskhasdas4d56a4s56d4asdas64d56sa4', password: '123456'};
    spyOn(component, 'redirectForMobileDeeplinking');
    // expects
    expect(component.userVeryfied$).toBeUndefined();
    expect(component.setAccountConfirmation()).toBeUndefined();


    expect(component.sendAccountConfirmation()).toBeUndefined();
    expect(component.userVeryfied$).toBeDefined();


    component.userVeryfied$.subscribe( resp => {
      expect(resp).toBeDefined();
      expect(component.redirectForMobileDeeplinking).toHaveBeenCalledWith( component.path );
      done();
    });

  });

  it('sendAccountConfirmation method should change account to verify variable or call the notify', () => {

    // expects
    component.userVeryfied$ = new Observable( subs => subs.error({error: 400} ) );

    expect(component.sendAccountConfirmation()).toBeUndefined();
    expect(component.accountToVerify).toBeTruthy();

    component.userVeryfied$ = new Observable( subs => {
      subs.next(new Observable( subs2 => {
        subs2.error({error: 400});
      }));
      subs.complete();
    });

    component.sendAccountConfirmation();


  });
});
