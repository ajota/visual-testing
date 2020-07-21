import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from 'src/app/shared/organism/navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import {firebase} from 'src/environments/environment';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { saveSessionCustomer } from 'src/app/shared/util/web-config';
import { name } from 'src/app/shared/util/name-storage';
import { ActivatedRoute } from '@angular/router';
import { ScModalComponent } from 'src/app/shared/molecules/sc-modal/sc-modal.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{path: '', redirectTo: '/', pathMatch: 'full'}]),
        AngularFireModule.initializeApp(firebase),
        HttpClientTestingModule
      ],
      declarations: [ ScModalComponent, DashboardComponent, NavbarComponent, MapConfigLangPipe ],
      providers: [ AngularFireDatabase, MapConfigBasePipe, MapConfigLangPipe, {provide: ActivatedRoute, useValue: {snapshot: {routeConfig: {path: ''}}}} ]
    }).compileComponents();
  }));

  beforeEach(() => {
    saveSessionCustomer(name.customer, { email: 'ajota06@yopmail.com'} );
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
