import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { firebase} from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { FormLoginComponent } from 'src/app/shared/organism/form-login/form-login.component';
import { ScControlComponent } from 'src/app/shared/molecules/sc-control/sc-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ScModalComponent } from 'src/app/shared/molecules/sc-modal/sc-modal.component';
import { AuthService, AuthServiceConfig } from 'angularx-social-login';

const MockAuthServiceConfig = {
  lazyLoad: true,
  providers: ''
};


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, AngularFireModule.initializeApp(firebase) ],
      declarations: [ HomeComponent, FormLoginComponent, ScControlComponent, MapConfigBasePipe, MapConfigLangPipe, ScModalComponent ],
      providers: [ AngularFireDatabase, MapConfigBasePipe, AuthService, {provide: AuthServiceConfig, useValue: MockAuthServiceConfig} ]
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    backend = TestBed.get( HttpTestingController );
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initiate this global variables ', () => {
    expect(component.user).toBeUndefined();
    expect(component.errorMsg).toBeUndefined();
    expect(component.tokenUser).toBeUndefined();
    expect(component.idCustomer).toBeUndefined();
    expect(component.username).toBeUndefined();
    expect(component.reqState).toBeUndefined();
    expect(component.documentId).toBeUndefined();
    expect(component.typeDocument).toBeUndefined();
  });


});
